import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

@observer class LinkButton extends React.Component {
  /**
   * Handle page change to the received link.
   */
  goToLink = () => {
    this.props.history.push(this.props.link);
  };

  /**
   * Render the component.
   */
  render () {
    const { iconButton, label, icon, className, color } = this.props;

    if (iconButton) {
      return (
        <Tooltip title={label}>
          <IconButton
            className={className}
            color={color}
            onClick={this.goToLink}
        >
            { icon }
          </IconButton>
        </Tooltip>
      );
    }

    return (
      <Button
        className={className}
        variant="contained"
        color={color}
        onClick={this.goToLink}
      >
        { label } { icon }
      </Button>
    );
  }
}

// Define default props values.
LinkButton.defaultProps = {
  label: 'IR A',
  icon: null,
  color: 'secondary',
  link: ''
};

// Define received props types for validation.
LinkButton.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default withRouter(LinkButton);