import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import empty from 'is-empty';
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

@observer class IntegrationDateTimePicker extends React.Component {
  @computed get value() {
    const { value, format } = this.props;
    return empty(value) ? null : moment(value, format).toDate();
  }

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    moment.locale('es');
  }

  /**
   * Change the component value calling the external function.
   *
   * @param {object} event - the JavaScript event object
   * @param {date} date - the selected date value
   */
  handleChange = momentDate => {
    const { id, name, format, onChange } = this.props;

    let target = {
      id: id,
      name: name,
      value: empty(momentDate) ? '' : momentDate.format(format)
    };

    onChange({ target });
  };

  /**
   * Render the component.
   */
  render() {
    const { id, name, label, value, onChange, ...other } = this.props;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          id={id}
          name={name}
          label={label}
          onChange={this.handleChange}
          value={this.value}
          {...other}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

// Define default props values.
IntegrationDateTimePicker.defaultProps = {
  format: 'DD/MM/YYYY HH:mm',
  clearLabel: 'LIMPIAR',
  cancelLabel: 'CANCELAR',
  ampm: false,
  clearable: true,
  autoOk: true
}

// Define received props types for validation.
IntegrationDateTimePicker.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default IntegrationDateTimePicker;