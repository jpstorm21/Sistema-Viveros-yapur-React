import Sequelize from 'sequelize';
import PassportLocalSequelize from 'passport-local-sequelize';
import { dbUri } from '../config.json';

// Setup sequelize db connection
const db = new Sequelize(dbUri, { logging: false, operatorsAliases: false });

// Define the User model.
const User = db.define(
  'user',
  {
    user_id: Sequelize.STRING,
    user_type_id: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.INTEGER,
    password_hash: Sequelize.STRING,
    password_salt: Sequelize.STRING    
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

// Atach passport to user model.
PassportLocalSequelize.attachToUser(User, {
  usernameField: 'user_id',
  hashField: 'password_hash',
  saltField: 'password_salt'
});

User.update = (id, password, cb) => {
  User.findByUsername(id, (err, user) => {
    if (err)
      return cb(err);

    if (!user)
      return cb(new Error('El usuario no existe.'));

    user.setPassword(password, (err, user) => {
      if (err)
        return cb(err);

      user.setActivationKey((err, user) => {
        if (err)
          return cb(err);

        user['user_id'] = id;

        user.save()
          .then(() => cb(null, user))
          .catch((err) => cb(err));
      });
    });
  });
};

export default User;