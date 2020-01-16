import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import ReactQuill from 'react-quill';

@observer class IntegrationReactQuill extends React.Component {
  handleChange = content => {
    const { id, name } = this.props;

    this.props.onChange({
      target: {
        id: id,
        name: name,
        value: content
      }
    });
  };

  render () {
    const { label, error, helperText, disabled, fullWidth, margin, required, readOnly, onChange, ...other } = this.props;

    return (
      <FormControl
        error={error}
        margin={margin}
        required={required}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        { label && <InputLabel shrink>{ label }</InputLabel> }

        <Input
          inputComponent={ReactQuill}
          inputProps={{
            className: 'p-0',
            theme: 'snow',
            onChange: onChange && this.handleChange,
            readOnly: readOnly
          }}
          disableUnderline={readOnly}
          {...other}
        />

        { helperText && <FormHelperText>{ helperText }</FormHelperText> }
      </FormControl>
    );
  }
}

IntegrationReactQuill.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default IntegrationReactQuill;