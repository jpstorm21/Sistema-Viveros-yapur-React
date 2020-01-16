import React from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { renderRoutes } from 'react-router-config';
import { baseStyles } from '../styles';
import Header from './Header';
import Menu from './Menu';

@observer class Base extends React.Component {
  @observable pageState = {};

  /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.pageState = {
      openMenu: true,
      contentClass: 'open-menu'
    };
  }

  /**
   * Change the current menu visibility.
   */
  toggleMenuVisibility = () => {
    this.pageState.openMenu = !this.pageState.openMenu;
    this.pageState.contentClass = this.pageState.openMenu ? 'open-menu' : 'close-menu';
  };

  /**
   * Render the component.
   */
  render () {
    const { route } = this.props;
    const { openMenu, contentClass } = this.pageState;

    return (
      <div style={baseStyles.app}>
        <Header toggleMenu={this.toggleMenuVisibility} />

        <Menu open={openMenu} />

        <div style={baseStyles.content} className={contentClass}>
          {
            // Child component will be rendered here.
            renderRoutes(route.routes)
          }
        </div>
      </div>
    );
  }
}

// Define received props types for validation.
Base.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Base;