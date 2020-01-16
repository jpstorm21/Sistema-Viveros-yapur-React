import React from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';
import empty from 'is-empty';
import extend from 'smart-extend';
import { rootStyles } from '../styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

const defaultHideDuration = 2000;

const LoadingScreen = observer(({ classes, showLoading }) => {
  if (!showLoading)
    return null;

  return (
    <div className={classes.outerLoading}>
      <div className={classes.innerLoading}>
        <CircularProgress size={70} />
      </div>
    </div>
  );
});

const ScreenMessage = observer((({
  classes,
  open,
  message,
  action,
  autoHideDuration,
  onRequestClose
}) => (
  <Snackbar
    classes={{ root: classes.snackbar }}
    open={open}
    message={message}
    action={action}
    autoHideDuration={autoHideDuration}
    onClose={onRequestClose}
  />
)));

@observer class Root extends React.Component {
  @observable pageState = {};

  /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.pageState = {
      showLoading: false,
      screenMessage: {
        open: false,
        autoHideDuration: defaultHideDuration,
        message: '',
        action: null,
        onActionTouchTap: null
      },
      toInherit: {
        user: {},
        menu: [],
        pathname: ''
      }
    };
  }

  /**
   * Change the loading screen visibility.
   *
   * @param {boolean} show
   */
  handleLoadingScreen = show => {
    this.pageState.showLoading = show;
  };

  /**
   * Show the screen message component.
   *
   * @param {string} message - the message to show in the component.
   * @param {string} time - the time to autohide the component.
   */
  handleScreenMessage = (message, options) => {
    this.pageState.screenMessage.open = false;

    if (empty(message))
      return;

    //let autoHideDuration = (options && options.time) || defaultHideDuration;
    let actionText = (options && options.action) || null;
    let handleActionTouchTap = (options && options.onActionTouchTap) || null;

    this.pageState.screenMessage = {
      open: true,
      message: message,
      //autoHideDuration: autoHideDuration,
      action: actionText,
      onActionTouchTap: handleActionTouchTap,
    };
  };

  /**
   * Hide the screen message component.
   */
  handleRequestClose = () => {
    this.pageState.screenMessage.open = false;
    this.pageState.screenMessage.message = '';
  };

  /**
   * Update the data to inherit.
   *
   * @param {object} newState - object containing the new states values.
   */
  handleChangeInheritState = newState => {
    extend(this.pageState.toInherit, newState);
  };

  /**
   * Render the component.
   */
  render () {
    const { classes, route } = this.props;

    return (
      <div>
        <LoadingScreen
          classes={classes}
          showLoading={this.pageState.showLoading}
        />

        <Provider
          showLoadingScreen={this.handleLoadingScreen}
          showScreenMessage={this.handleScreenMessage}
          updateParentState={this.handleChangeInheritState}
          parentState={this.pageState.toInherit}
        >
          {
            // Child component will be rendered here.
            renderRoutes(route.routes)
          }
        </Provider>

        <ScreenMessage
          classes={classes}
          onRequestClose={this.handleRequestClose}
          {...this.pageState.screenMessage}
        />
      </div>
    );
  }
}

// Define received props types for validation.
Root.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default withStyles(rootStyles)(Root);