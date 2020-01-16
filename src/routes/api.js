import Express from 'express';
import empty from 'is-empty';
import db from '../middleware/postgresApi';
import FormValidator from '../middleware/FormValidator';

const router = new Express.Router();

/**
 * Handle request with form validation.
 *
 * @param {function} preValidation - form data validation function.
 * @param {function} callback - to do after a validation success.
 * @return {function} request handler.
 */
const requestFormValidation = (preValidation, callback) => {
  return (req, res, next) => {
    if (req.body && req.body.data)
      req.body = JSON.parse(req.body.data);

    const formValidation = preValidation(req.body, req.method);

    if (formValidation.isValid)
      return callback(req, res, next);

    res.status(400).json(formValidation);
  };
};

/**
 * Handle request with file upload.
 *
 * @param {function} preValidation - form data validation function.
 * @param {function} callback - to do after the upload process.
 * @return {function} request handler.
 */
const requestUpload = (preValidation, callback, { filterName, fileSize, fieldList }) => {
  return (req, res, next) => {

    if (empty(fieldList)) {
      return res.status(500).json({
        success: false,
        message: 'Error al procesar los archivos.'
      });
    }

    upload(filterName, fileSize).fields(fieldList)(req, res, err => {
      if (req.body && req.body.data)
        req.body = JSON.parse(req.body.data);
      const formValidation = preValidation(req.body, err);

      if (formValidation.isValid)
        return callback(req, res, next);

      const pathList = [];
      fieldList.map(field => {
        if (req.files[field.name])
          req.files[field.name].map(row => pathList.push(row.path));
      });
      deleteFileList(pathList);

      res.status(400).json(formValidation);
    });
  };
};

// Return logged user information request
router.get('/userInfo', (req, res) => {
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    userId: req.user['user_id'],
    type: req.user['user_type_id'],
  });
});
router.post('/authenticatedUser', db.getAuthenticatedUserData);

// DELETE request
// GET request
router.get('/user', db.getUserList);
router.get('/user/:id', db.getUserById);
router.get('/userType', db.getUserTypeList);
router.get('/checks',db.getChecks);
router.get('/checks/:id',db.getCheckById);
router.get('/providers',db.getProviders)
router.get('/providers/:id',db.getProviderById)
// POST request
router.post('/user', requestFormValidation(FormValidator.userForm, db.insertUser));
router.post('/check',requestFormValidation(FormValidator.checkForm,db.insertCheck));
router.post('/provider',requestFormValidation(FormValidator.providerForm,db.insertProvider))
// PUT request
router.put('/user/:id', requestFormValidation(FormValidator.userForm, db.updateUser));
router.put('/check/:id', requestFormValidation(FormValidator.checkForm, db.updateCheck));
router.put('/chargeCheck/:id/:state',db.chargeCheck);
router.put('/provider/:id',requestFormValidation(FormValidator.providerForm,db.updateProvider))
// Handle invalid URI request.
router.all('*', (req, res) => {
  res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;