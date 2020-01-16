import connection from './postgresConnection';
import { client } from '../routes/routes.json';
import User from '../models/user';

const functionQueries = {};

functionQueries.getAuthenticatedUserData = (req, res) => {
  let user = {
    id: req.user.id,
    userId: req.user['user_id'],
    campus: req.user['campus_id'],
    name: req.user.name,
    type: req.user['user_type_id'],
  };
  let data = { type: user.type, pathname: req.body.pathname || '' };

  connection.tx(t => {
    let queries = [];

    let query = 'SELECT COUNT(*)\
                FROM user_permission INNER JOIN system_page ON user_permission.system_page_id = system_page.id\
                WHERE user_permission.user_type_id = ${type} AND system_page.link = ${pathname}';
    queries.push(t.one(query, data));

    query = 'SELECT menu_group.text, CASE WHEN menu_group.menu_order IS NULL THEN 0 ELSE menu_group.menu_order END AS menu_order,\
              json_agg(json_build_object(\'text\', system_page.text, \'link\', system_page.link, \'icon\', system_page.icon) ORDER BY user_permission.menu_order) AS link\
            FROM user_permission\
              INNER JOIN system_page ON user_permission.system_page_id = system_page.id\
              LEFT JOIN menu_group ON user_permission.menu_group_id = menu_group.id\
            WHERE user_type_id = ${type} AND in_menu\
            GROUP BY menu_group.menu_order, menu_group.text\
            ORDER BY menu_order';
    queries.push(t.any(query, data));

    return t.batch(queries);
  })
    .then(result => {
      let menu = [];

      result[1].map(row => {
        if (!row.text)
          row.link.map(menuItem => menu.push(menuItem));
        else
          menu.push(row);
      });

      let permission = [client.login, client.home, '*'].indexOf(data.pathname) != -1 || result[0].count > 0;

      res.status(permission ? 200 : 403).json({
        logged: true,
        hasPermission: permission,
        user,
        menu
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err, message: 'Error al obtener los datos del usuario.' });
    });
};


/**
 * 
 */
functionQueries.getUserById = (req, res) =>{
  let query = 'SELECT user_id as rut, user_type_id as user_type, name, email, phone FROM public.user WHERE user_id = $1';

  connection.oneOrNone(query, req.params.id)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(400).json({
        error:err,
        message:'Error al obtener los datos del usuario.'
      });
    });
};

functionQueries.getCheckById = (req,res) =>{
  let query = ` SELECT numerocheque as number, montocheque as amount, nombremisor as names,banco as bank,
                apellidoemisor as lastname, numerocuenta as numberAccount,TO_CHAR(fecharecepcion,'DD/MM/YYYY') as beginDate,
                TO_CHAR(fechavencimiento,'DD/MM/YYYY') as endDate,descripcioncheque as description,chequecobrados_n
                FROM cheques
                WHERE id = $1`;
  connection.oneOrNone(query,req.params.id)
    .then(data =>{
      res.status(200).json({data});
    })
    .catch(err =>{
      console.log(err)
      res.status(400).json({
        error :err,
        message : 'Error al obtener la informacion del cheque'
      });
    })
};

functionQueries.getProviderById = (req,res) =>{
  let query = ` SELECT nombresproveedor as names, apellidosproveedor as lastnames, contactoproveedor as contact,emailproveedor as email,descripcionproveedor as description
                FROM proveedores
                WHERE id = $1`;
  connection.oneOrNone(query,req.params.id)
    .then(data =>{
      res.status(200).json({data});
    })
    .catch(err =>{
      console.log(err)
      res.status(400).json({
        error :err,
        message : 'Error al obtener la informacion del proveedor'
      });
    })
};

/**
 * 
 */
functionQueries.getUserList = (req, res) =>{
  let query = 'SELECT user_id AS rut, user_type_id AS user_type, name, email, phone FROM "user"';

  connection.any(query)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Error al obtener la lista de usuarios.'
      });
    });
};

/**
 * 
 */
functionQueries.getUserTypeList = (req, res) =>{
  connection.any('SELECT * FROM user_type')
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Error al obtener la lista de tipos de usuario.'
      });
    });
};

functionQueries.getChecks = (req, res) =>{
  connection.any('SELECT * FROM cheques')
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
        message: 'Error al obtener la lista de cheques.'
      });
    });
};

functionQueries.getProviders = (req, res) =>{
  connection.any('SELECT * FROM proveedores')
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
        message: 'Error al obtener la lista de cheques.'
      });
    });
};

/**
 * 
 */
functionQueries.insertUser = (req, res) =>{
  User.register(
    {
      user_id: req.body.rut,
      user_type_id: req.body.userType,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    },
    req.body.password,
    err => {
      if (err) {
        let error = 'No se pudo procesar el formulario.';
        if (err.message.indexOf('User already exists') !== -1) {
          error = 'El usuario ingresado ya existe.'
        }

        return res.status(400).json({
          success: false,
          message: error,
          error: err.message
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Usuario ingresado con correctamente.'
        });
      }
    }
  );
};


/**
 * 
 */
functionQueries.updateUser = (req, res) =>{
  connection.tx(t => {
    let queryData = {
      user_id: req.params.id,
      name: req.body.name,
      user_type_id: req.body.userType,
      email: req.body.email,
      phone: req.body.phone
    };
    let query = 'UPDATE "user"\
                SET user_type_id = ${user_type_id}, name = ${name}, email = ${email}, phone = ${phone}\
                WHERE user_id = ${user_id}';

    return t.none(query, queryData);
  })
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(400).json({
        error:err,
        message:'Error al actualizar los datos del usuario.'
      });
    });
};

functionQueries.updateCheck = (req,res) =>{
  connection.tx(t=>{
    let queryData = {
      id: req.params.id,
      numerocheque : req.body.number,
      fecharecepcion: req.body.beginDate,
      numerocuenta: req.body.numberAccount,
      montocheque: req.body.amount,
      banco: req.body.bank,
      apellidoemisor: req.body.lastName,
      fechavencimiento: req.body.endDate,
      descripcioncheque : req.body.description,
      nombremisor:req.body.names
    }
    let query = 'UPDATE cheques SET numerocheque = ${numerocheque},fecharecepcion = ${fecharecepcion}, numerocuenta =${numerocuenta},\
                 montocheque = ${montocheque}, banco = ${banco}, apellidoemisor =${apellidoemisor}, fechavencimiento =${fechavencimiento},\
                 descripcioncheque =${descripcioncheque},nombremisor =${nombremisor} WHERE id = ${id}';
    return t.none(query,queryData);
  })
  .then(data => {
    res.status(200).json({ message: "Cheque actualizado correctamente" });
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({
      error:err,
      message:'Error al actualizar los datos del cheque.'
    });
  });
}

functionQueries.updateProvider =(req, res) =>{
  connection.tx(t=>{
    let queryData = {
      id: req.params.id,
      nombresproveedor : req.body.names,
      apellidosproveedor: req.body.lastnames,
      contactoproveedor: req.body.contact,
      emailproveedor: req.body.email,
      descripcionproveedor: req.body.description,
    };
    let query = 'UPDATE proveedores SET nombresproveedor =${nombresproveedor}, apellidosproveedor=${apellidosproveedor},contactoproveedor=${contactoproveedor}\
                 , emailproveedor=${emailproveedor},descripcionproveedor=${descripcionproveedor} WHERE id = ${id}';
    return t.none(query,queryData);
  })
  .then(data => {
    res.status(200).json({ message: "Proveedor actualizado correctamente" });
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({
      error:err,
      message:'Error al actualizar los datos del proveedor.'
    });
  });
}

functionQueries.chargeCheck = (req,res) =>{
  connection.tx(t=>{
    let query = 'UPDATE cheques SET chequecobrados_n = $1 WHERE id = $2';
    return t.none(query,[req.params.state,req.params.id]);
  })
  .then(data => {
    res.status(200).json({ message: "Cheque actualizado correctamente" });
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({
      error:err,
      message:'Error al actualizar los datos del cheque.'
    });
  });
}


functionQueries.insertCheck = (req,res)=>{
  let queryData = {
    numerocheque : req.body.number,
    fecharecepcion: req.body.beginDate,
    numerocuenta: req.body.numberAccount,
    montocheque: req.body.amount,
    banco: req.body.bank,
    apellidoemisor: req.body.lastName,
    fechavencimiento: req.body.endDate,
    descripcioncheque : req.body.description,
    chequecobrados_n:false,
    nombremisor:req.body.names
  };
  connection.tx(t =>{
    let query = 'INSERT INTO cheques (${this~}) VALUES (${numerocheque},${fecharecepcion},${numerocuenta},${montocheque},${banco},${apellidoemisor},${fechavencimiento},${descripcioncheque}, \
                                                        ${chequecobrados_n},${nombremisor})';
    return t.none(query,queryData);
  })
  .then(data => {
    res.status(200).json({ message: "Cheque ingresado correctamente" });
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({
      error:err,
      message:'Error al actualizar los datos del usuario.'
    });
  });
};

functionQueries.insertProvider = (req,res)=>{
  let queryData = {
    nombresproveedor : req.body.names,
    apellidosproveedor: req.body.lastnames,
    contactoproveedor: req.body.contact,
    emailproveedor: req.body.email,
    descripcionproveedor: req.body.description,
  };
  connection.tx(t =>{
    let query = 'INSERT INTO proveedores (${this~}) VALUES (${nombresproveedor},${apellidosproveedor},${contactoproveedor},${emailproveedor},${descripcionproveedor})';
    return t.none(query,queryData);
  })
  .then(data => {
    res.status(200).json({ message: "Proveedor ingresado correctamente" });
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({
      error:err,
      message:'Error al ingresar los datos del proveedor.'
    });
  });
};


export default functionQueries;