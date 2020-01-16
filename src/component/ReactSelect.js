import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import empty from 'is-empty';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { selectStyles } from '../styles';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const NoOptionsMessage = ({ selectProps, innerProps, children }) => (
  <Typography
    color="textSecondary"
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}
  >
    { children }
  </Typography>
);

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

const Control = ({ selectProps, innerRef, children, innerProps }) => (
  <TextField
    fullWidth
    InputProps={{
      inputComponent,
      inputProps: {
        className: selectProps.classes.input,
        inputRef: innerRef,
        children: children,
        ...innerProps,
      },
    }}
    {...selectProps.textFieldProps}
  />
);

const Option = ({ innerRef, isFocused, isSelected, innerProps, children }) => (
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    style={{
      fontWeight: isSelected ? 600 : 400,
    }}
    {...innerProps}
  >
    { children }
  </MenuItem>
);

const Placeholder = ({ selectProps, innerProps, children }) => (
  <Typography
    color="textSecondary"
    className={selectProps.classes.placeholder}
    {...innerProps}
  >
    { children }
  </Typography>
);

const SingleValue = ({ selectProps, innerProps, children }) => (
  <Typography className={selectProps.classes.singleValue} {...innerProps}>
    { children }
  </Typography>
);

const ValueContainer = ({ selectProps, children }) => (
  <div className={selectProps.classes.valueContainer}>
    { children }
  </div>
);

const MultiValue = ({ children, isFocused, selectProps, removeProps }) => (
  <Chip
    tabIndex={-1}
    label={children}
    className={classNames(selectProps.classes.chip, {
      [selectProps.classes.chipFocused]: isFocused,
    })}
    onDelete={removeProps.onClick}
    deleteIcon={<CancelIcon {...removeProps} />}
  />
);

const Menu = ({ selectProps, innerProps, children }) => (
  <Paper square className={selectProps.classes.paper} {...innerProps}>
    { children }
  </Paper>
);

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

@observer class IntegrationReactSelect extends React.Component {
  @computed get selectItems () {
    const { options } = this.props;
    let selectItems = options;

    if (selectItems.length > 0 && typeof selectItems[0] !== 'object') {
      selectItems = selectItems.map(value => {
        return {
          value: value,
          label: value
        };
      });
    }

    return selectItems;
  }
  @computed get selectValue () {
    const { value } = this.props;

    return Array.isArray(value)
      ? value.map(item => this.selectItems.find(d => d.value == item) || { value: item })
      : this.selectItems.find(d => d.value == value) || value;
  }

  /**
   * Change the selected option value.
   *
   * @param {object|array} selectedOption - object containing the selected value, or an array of objects.
   * @param {object} event - the JavaScript event object
   */
  handleChange = selectedOption => {
    const { id, name, isMulti, onChange } = this.props;

    onChange({
      target: {
        id: id,
        name: name,
        value: isMulti
          ? (empty(selectedOption) ? [] : selectedOption.map(d => d.value))
          : (empty(selectedOption) ? '' : selectedOption.value)
      }
    });
  };

  /**
   * Render the component.
   */
  render () {
    const {
      classes,
      theme,
      id,
      name,
      label,
      value,
      options,
      onChange,
      helperText,
      error,
      disabled,
      required,
      ...other
    } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            id={id}
            name={name}
            classes={classes}
            styles={selectStyles}
            components={components}
            textFieldProps={{
              label: label,
              InputLabelProps: {
                shrink: true,
              },
              disabled: disabled,
              helperText:helperText,
              error: error,
              required: required
            }}
            options={this.selectItems}
            onChange={this.handleChange}
            value={this.selectValue}
            isDisabled={disabled}
            {...other}
          />
        </NoSsr>
      </div>
    );
  }
}

// Define received props types for validation.
IntegrationReactSelect.defaultProps = {
  placeholder: 'Seleccione una opción',
  isMulti: false,
  isClearable: true
};

// Define received props types for validation.
IntegrationReactSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  required: PropTypes.bool
};

export default withStyles(selectStyles, { withTheme: true })(IntegrationReactSelect);