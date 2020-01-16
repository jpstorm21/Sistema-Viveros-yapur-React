import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import empty from 'is-empty';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntegrationReactSelect from './ReactSelect';
import InstructionHeader from './InstructionMessage';
import SaveIcon from '@material-ui/icons/Save';
const UserForm = observer (({
  data,
  errors,
  onSubmit,
  onChange,
  userTypeList,
  update
}) =>(
  <Card className="py-3 px-4">
    <CardHeader
      title={
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
        >
          USUARIO
        </Typography>
      }
      subheader={
        <InstructionHeader
          defaultExpanded={false}
          subtitle="Lea cuidadosamente este apartado si tiene alguna duda"
          type="help"
          message="What is Lorem Ipsum?
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised 
                  in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                  including versions of Lorem Ipsum."
        />
      }
      disableTypography
    />

    <form onSubmit={onSubmit} autoComplete="off" noValidate>
      <CardContent>
        <div className="row">
          <div className="col-12 col-md-6">
            <TextField
              id="rut"
              name = "rut"
              label="Rut"
              margin="normal"
              helperText={errors.rut}
              error={!empty(errors.rut)}
              value={data.rut}
              onChange={onChange}
              disabled={update}
              variant="outlined"
              fullWidth
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <TextField
              id="name"
              name="name"
              label="Nombre"
              margin="normal"
              helperText={errors.name}
              error={!empty(errors.name)}
              value={data.name}
              onChange={onChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <TextField
              id="email"
              name="email"
              label="Email"
              margin="normal"
              helperText={errors.email}
              error={!empty(errors.email)}
              value={data.email}
              onChange={onChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <TextField
              id="phone"
              name="phone"
              label="Telefono"
              type="number"
              margin="normal"
              helperText={errors.phone}
              error={!empty(errors.phone)}
              value={data.phone}
              onChange={onChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>
        </div> 
          
        {
          !update && (
            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <TextField
                    id="password"
                    label="Contraseña"
                    name="password"
                    type="password"
                    margin="normal"
                    helperText={errors.password}
                    error={!empty(errors.password)}
                    value={data.password}
                    onChange={onChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
              </div>

              <div className="col-12 col-md-6">
                <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    type="password"
                    margin="normal"
                    helperText={errors.confirmPassword}
                    error={!empty(errors.confirmPassword)}
                    value={data.confirmPassword}
                    onChange={onChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
              </div>
            </div>
          )
        }

        <div className="row">
          <div className="col-12">
            <IntegrationReactSelect
              id="userType"
              name="userType"
              label="Tipo de usuario"
              helperText={errors.userType}
              error={!empty(errors.userType)}
              value={data.userType}
              options={userTypeList}
              onChange={onChange}
              
              fullWidth
              withBorder
              required
            />
          </div>
        </div>
      </CardContent>

      <CardActions>
        <Button
          className="ml-auto"
          variant="contained"
          color="secondary"
          type="submit"
        >
          {<SaveIcon/>}          
          { update ? ' ACTUALIZAR' : ' REGISTAR' }
        </Button>
      </CardActions>
    </form>
  </Card>
));

UserForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;