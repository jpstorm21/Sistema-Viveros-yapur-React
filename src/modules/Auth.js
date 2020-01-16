import Promise from 'bluebird';
import { basename } from '../routes/routes.json';

class Auth {
  /**
   * Check if a user is authenticated - check if exist an active session.
   *
   * @returns {boolean}
   */
  static isUserAuthenticated () {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('get', `${basename}/auth/checkLogin`);
      xhr.responseType = 'json';
      xhr.addEventListener("error", () =>{
        const error = new Error();
        error.message = 'Error al verificar.';

        reject(error);
      });
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(xhr.response.logged);
        } else {
          const error = new Error();
          error.message = 'Error al verificar.';

          reject(error);
        }
      });
      xhr.send();
    });
  }

  /**
   * Check if a user is authenticated using a synchronous request.
   *
   * @returns {boolean}
   */
  static isUserAuthenticatedSync () {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/auth/checkLogin`, false);
    xhr.send();

    if (xhr.status === 200)
      return JSON.parse(xhr.responseText).logged;

    return false;
  }

  /**
   * Deauthenticate a user. Remove user session.
   */
  static deauthenticateUser (history) {
    if (history) {
      const xhr = new XMLHttpRequest();

      xhr.open('get', `${basename}/auth/logout`);
      xhr.addEventListener('load', () => {
        history.push(`${basename}/login`);
      });
      xhr.send();
    }
  }

  /**
   * Get user information.
   *
   * @returns {object}
   */
  static getUser () {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('get', `${basename}/api/userInfo`);
      xhr.responseType = 'json';
      xhr.addEventListener("error", () =>{
        const error = new Error();
        error.message = 'Error al obtener la información del usuario.';

        reject(error);
      });
      xhr.addEventListener('load', () => {
        resolve(xhr.response);
      });
      xhr.send();
    });
  }

  /**
   * Check if user is authenticated and get user information.
   *
   * @param {string} pathname - current page link.
   * @returns {object}
   */
  static checkPermissonAndGetUserData (pathname) {
    let formData = `pathname=${encodeURIComponent(pathname)}`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('post', `${basename}/api/authenticatedUser`);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener("error", () =>{
        const error = new Error();
        error.message = 'Error al obtener la información del usuario.';

        reject(error);
      });
      xhr.addEventListener('load', () => {
        if (xhr.status === 401)
          resolve({ logged: false })
        else
          resolve(xhr.response);
      });
      xhr.send(formData);
    });
  }
}

export default Auth;