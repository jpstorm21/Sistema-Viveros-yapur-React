import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import empty from 'is-empty';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const ValidationDialog = observer(({
  open,
  title,
  message,
  list,
  onClose,
  onAccept,
  hasComment,
  data,
  errors,
  onChange,
  commentLabel
}) => (
  <Dialog
    open={open}
    maxWidth="md"
    onClose={onClose}
    disableBackdropClick
    fullWidth
  >
    <DialogTitle>
      { title }
    </DialogTitle>

    <DialogContent>
      <DialogContentText>
        { message }
      </DialogContentText>

      {
        list && (
          <DialogContentText>
            { list.map( row => <li>{ row.name }</li>) }
          </DialogContentText>
        )
      }

      {
        hasComment && (
          <TextField
            id="comment"
            name="comment"
            label={commentLabel}
            margin="dense"
            onChange={onChange}
            value={data.comment}
            error={!empty(errors.comment)}
            helperText={errors.comment}
            autoFocus
            fullWidth
            required
          />
        )
      }
    </DialogContent>

    <DialogActions>
      <Button
        variant="contained"
        color="secondary"
        onClick={onClose}
      >
        CANCELAR
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={onAccept}
      >
        ACEPTAR
      </Button>
    </DialogActions>
  </Dialog>
));

ValidationDialog.defaultProps = {
  hasComment: false,
  commentLabel: 'Comentario'
};

ValidationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object),
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  hasComment: PropTypes.bool.isRequired,
  data: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  commentLabel: PropTypes.string,
};

export default ValidationDialog;