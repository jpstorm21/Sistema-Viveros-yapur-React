import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { staticPath } from '../routes/routes.json';
import { withStyles } from '@material-ui/core/styles';
import { headerStyles } from '../styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

@observer class Header extends React.Component {
  /**
   * Render the component.
   */
  render () {
    const { classes, toggleMenu } = this.props;

    return (
      <AppBar position="relative" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <img className={`d-none d-lg-block ${classes.centerImageStyle}`} src={`${staticPath}/img/logoYapur.png`} />
        </Toolbar>

        <Typography className="pl-2" color="inherit" variant="h6">
          Viveros Yapur
        </Typography>
      </AppBar>
    );
  }
}

// Define received props types for validation.
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default withStyles(headerStyles)(Header);