import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import empty from 'is-empty'; 
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InstructionHeader from './InstructionMessage';
import SaveIcon from '@material-ui/icons/Save';
import IntegrationDatePicker from './DatePicker';
import ReactQuill from './ReactQuill';

const ChecksForm = observer (({
    data,
    errors,
    onSubmit,
    onChange,
    update
}) => (
    <Card className ="py-3 px-4">
        <CardHeader
            title={
                <Typography
                    variant="h5"
                    color="primary"
                    gutterBottom
                    >
                    Cheques
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
                <div className="row mb-2">
                    <div className="col-12 col-md-6">
                        <TextField 
                            id="number"
                            name="number"
                            label="Numero de cheque"
                            margen="dense"
                            type="number"
                            helperText={errors.number}
                            value={data.number}
                            error={!empty(errors.number)}
                            onChange={onChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <TextField 
                            id="amount"
                            name="amount"
                            label="Monto del cheque"
                            margen="dense"
                            type="number"
                            helperText={errors.amount}
                            value={data.amount}
                            error={!empty(errors.amount)}
                            onChange={onChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-md-6">
                        <TextField 
                            id="names"
                            name="names"
                            label="Nombres"
                            margen="dense"
                            helperText={errors.names}
                            value={data.names}
                            error={!empty(errors.names)}
                            onChange={onChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <TextField 
                            id="bank"
                            name="bank"
                            label="Banco"
                            margen="dense"
                            helperText={errors.bank}
                            value={data.bank}
                            error={!empty(errors.bank)}
                            onChange={onChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-md-6">
                        <TextField 
                            id="lastName"
                            name="lastName"
                            label="Apellidos"
                            margen="dense"
                            helperText={errors.lastName}
                            value={data.lastName}
                            onChange={onChange}
                            error={!empty(errors.lastName)}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <TextField 
                            id="numberAccount"
                            name="numberAccount"
                            label="Numero de cuenta"
                            margen="dense"
                            type="number"
                            helperText={errors.numberAccount}
                            value={data.numberAccount}
                            error={!empty(errors.numberAccount)}
                            onChange={onChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-md-6">
                        <IntegrationDatePicker 
                            id="beginDate"
                            name="beginDate"
                            label="Fecha de emision"
                            margen="dense"
                            helperText={errors.beginDate}
                            value={data.beginDate}
                            error={!empty(errors.beginDate)}
                            onChange={onChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <IntegrationDatePicker 
                            id="endDate"
                            name="endDate"
                            label="Fecha de vencimiento"
                            margen="dense"
                            helperText={errors.endDate}
                            value={data.endDate}
                            error={!empty(errors.endDate)}
                            onChange={onChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12">
                    <ReactQuill
                        id="description"
                        name="description"
                        label="Descripcion"
                        margin="dense"
                        onChange={onChange}
                        value={data.description}
                        error={!empty(errors.description)}
                        helperText={errors.description}
                        fullWidth
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
                    { update ? ' ACTUALIZAR' : ' GUARDAR' }
                </Button>
            </CardActions>
        </form>
    </Card>
));

ChecksForm.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
  
export default ChecksForm;