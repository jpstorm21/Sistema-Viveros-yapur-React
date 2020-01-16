import Express from 'express';
import { basename, client } from './routes.json';
import Passport from 'passport';


const router = new Express.Router();

router.post('/login', Passport.authenticate('local'), (req, res) => {
  return res.json({
    success: true,
    message: 'Ha logrado ingresar al sistema con éxito!',
    user: req.user
  });
});

router.get('/checkLogin', (req, res) => {
  res.status(200).json({
    logged: req.isAuthenticated()
  });
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect(basename + client.login);
});


/* router.get('/register', (req, res) => {
  User.register(
    {user_id: '19.042.481-2', 
     user_type_id: 'ADM', 
     name: 'Juan Pablo Martínez',
     email:'jmr032@alumnos.ucn.cl',
     phone:963511317},
    'lolowerty21',
    (err, user) => 
    {
      console.log(err);
      res.json({user, err})
    }
  );
}); */

export default router;