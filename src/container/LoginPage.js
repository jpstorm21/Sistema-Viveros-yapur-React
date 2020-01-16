import React from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { basename, client } from '../routes/routes.json';
import Promise from 'bluebird';
import extend from 'smart-extend';
import Rut from 'rutjs';
import LoginForm from '../component/LoginForm';

const fields = {
  userId: '',
  password: ''
};

@observer class LoginPage extends React.Component {
  @observable pageState = {};

  /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.pageState = {
      errors: extend.clone(fields),
      data: extend.clone(fields)
    };
  }

  /**
   * Send the form data to the insert or update route.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = event => {
    // Prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // Show loading screen.
    this.props.showLoadingScreen(true);
    // Create a string for an HTTP body message.
    let userId = encodeURIComponent(this.pageState.data.userId);
    let password = encodeURIComponent(this.pageState.data.password);
    let formData = `user_id=${userId}&password=${password}`;

    // Create an AJAX request.
    let xhr = new XMLHttpRequest();
    xhr.open('post', `${basename}/auth/login`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      // Hide loading screen.
      this.props.showLoadingScreen(false);

      if (xhr.status === 200) {
        // Change the component-container state.
        this.pageState.errors = {};

        // Change the current URL to homePage.
        this.props.history.push(client.home);
      } else {
        // Show an error message.
        this.props.showScreenMessage('Rut o contraseña incorrectos.');
      }
    });
    xhr.send(formData);
  };

  /**
   * Check if the provided credentials is an online ucn account.
   */
  checkUCNLogin = () => {
    return new Promise((resolve, reject) => {
      // Create a string for an HTTP body message.
      let userId = encodeURIComponent(this.pageState.data.userId);
      let password = encodeURIComponent(this.pageState.data.password);
      let formData = `userId=${userId}&password=${password}`;

      let xhr = new XMLHttpRequest();
      xhr.open('post', `${basename}/auth/loginUCN`);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('error', () =>{
        const error = new Error();
        error.message = 'Error al verificar login UCN.';
        reject(error);
      });
      xhr.addEventListener('load', () => {
        resolve(xhr);
      });
      xhr.send(formData);
    });
  };

  /**
   * Change the form data object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeData = event => {
    let { name, value } = event.target;

    if (name == 'userId') {
      let rut = new Rut(value);
      if (rut.isValid)
        value = rut.getNiceRut();
    }

    this.pageState.data[name] = value;
  };

  /**
   * Render the component.
   */
  render () {
    return (
      <LoginForm
        onChange={this.changeData}
        onSubmit={this.processForm}
        {...this.pageState}
      />
    );
  }
}

// Define received props types for validation.
LoginPage.propTypes = {
  showLoadingScreen: PropTypes.func.isRequired,
  showScreenMessage: PropTypes.func.isRequired,
};

export default LoginPage;