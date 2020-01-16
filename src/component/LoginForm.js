import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { staticPath } from '../routes/routes.json';
import { loginStyles, rootStyles } from '../styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/**
 * Render the login form.
 */
const LoginForm = observer(({ classes, data, onSubmit, onChange }) => (
  <div style={loginStyles.container}>
    <div className="row justify-content-center m-0" style={rootStyles.main}>
      <div className="col-auto d-block" >
     
      </div>
    </div>

    <Card className={classes.card} >
      <CardMedia
        className={classes.media}
        component="img"
        image={`${staticPath}/img/logoYapur.png`}
      />

      <CardContent className="p-4">
        <form onSubmit={onSubmit} autoComplete="off" noValidate>
          <TextField
            id="userId"
            name="userId"
            label="RUT"
            margin="dense"
            onChange={onChange}
            value={data.userId}
            autoFocus
            fullWidth
            required
          />

          <TextField
            id="password"
            name="password"
            label="Contraseña"
            margin="dense"
            type="password"
            onChange={onChange}
            value={data.password}
            fullWidth
            required
          />

          <CardActions className="pt-4">
            <Button
              className="m-auto"
              type="submit"
              variant="contained"
              color="primary"
            >
              INGRESAR
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  </div>
));

// Define received props types for validation.
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(loginStyles)(LoginForm);