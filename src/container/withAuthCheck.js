import React from 'react';
import { observable, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { client } from '../routes/routes.json';
import Auth from '../modules/Auth';
import empty from 'is-empty';
import { Redirect } from 'react-router-dom';

const withAuthCheck = Component => {
  @inject(
    'showLoadingScreen',
    'showScreenMessage',
    'updateParentState',
    'parentState'
  )
  @observer class NewComponent extends React.Component {
    @observable pageState = {};

    /**
     * Class constructor.
     */
    constructor (props) {
      super(props);

      // Set the initial component state.
      this.pageState = {
        isChecking: false,
        redirect: false,
        to: {}
      };

      // Bind component to 'this' value.
      this.onPageLoad = this.onPageLoad.bind(this);
    }

    /**
     * Do before component render for first time.
     */
    componentWillMount () {
      this.onPageLoad();
    }

    /**
     * Check if user is authenticated and get the user data.
     */
    onPageLoad () {
      const { state } = this.props.location;
      const pathname = this.props.match.path;

      this.props.updateParentState({ pathname: pathname });

      if (empty(state) || !state.redirected) {
        this.props.showLoadingScreen(true);
        this.pageState.isChecking = true;

        Auth.checkPermissonAndGetUserData(pathname)
          .then(response => {
            if (response.logged) {
              this.props.updateParentState({
                user: response.user,
                menu: response.menu
              });

              if (pathname == client.login) {
                this.pageState.redirect = true;
                this.pageState.to = {
                  pathname: client.home,
                  state: { redirected: true }
                };
              } else if (!response.hasPermission) {
                this.pageState.redirect = true;
                this.pageState.to = {
                  pathname: client.home,
                  state: { redirected: true }
                };

                this.props.showScreenMessage('No tiene permisos para acceder a la página requerida.');
              }
            } else if (!response.error && pathname != client.login) {
              this.pageState.redirect = true;
              this.pageState.to = {
                pathname: client.login,
                state: { redirected: true }
              };
            }

            this.props.showLoadingScreen(false);

            if (response.error)
              this.props.showScreenMessage('Error al conectar con el servidor.');
            else
              this.pageState.isChecking = false;
          })
          .catch(error => {
            this.props.showLoadingScreen(false);
            this.props.showScreenMessage('Error al cargar la página.');
          });
      } else {
        this.props.history.push({ state: null });
      }
    }

    /**
     * Render the component.
     */
    render () {
      const { isChecking, redirect, to } = this.pageState;

      if (isChecking)
        return null;

      if (redirect)
        return <Redirect to={toJS(to)} />;

      return <Component {...this.props} params={this.props.match.params} />;
    }
  }

  return NewComponent;
};

export default withAuthCheck;