import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { basename, client } from '../routes/routes.json';
import extend from 'smart-extend';
import Rut from 'rutjs';
import empty from 'is-empty';
import UserForm from '../component/UserForm';

const fields = {
  rut : '',
  name : '',
  email: '',
  phone :'',
  password: '',
  confirmPassword:'',
  userType:''
};

@observer class UserPage extends React.Component {
  @observable pageState = {};

  /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.pageState = {
      data: extend.clone(fields),
      errors: extend.clone(fields),
      userTypeList: [],
      update :!empty(this.props.params.id)
    };

    this.userTypeList();

    if (this.pageState.update)
        this.getInformationUser();
  }

  getInformationUser = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/api/user/${encodeURIComponent(this.props.params.id)}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load',()=>{
      if (xhr.status === 200)
        extend.keys(fields)(this.pageState.data, xhr.response.data);
      else
        this.props.showScreenMessage(xhr.response.message);
    });
    xhr.send();
  };

  userTypeList = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/api/userType`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.pageState.userTypeList = xhr.response.data.map(userType => {
           return { label: userType.name, value: userType.id };
        });
      } else {
        this.props.showScreenMessage(xhr.response.message);
      }
    });
    xhr.send();
  }

  changeData = event => {
    let { name, value } = event.target;

    if (name == 'rut') {
      let rut = new Rut(value);
      if (rut.isValid)
        value = rut.getNiceRut();
    }

    this.pageState.data[name] = value;
  };

  registerUser = () =>{
    event.preventDefault();
    this.props.showLoadingScreen(true);

    let formData = `data=${encodeURIComponent(JSON.stringify(this.pageState.data))}`;

    let xhr = new XMLHttpRequest();
    if (this.pageState.update)
      xhr.open('put', `${basename}/api/user/${encodeURIComponent(this.props.params.id)}`);
    else
      xhr.open('post', `/api/user`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      this.props.showLoadingScreen(false);
      this.props.showScreenMessage(xhr.response.message);

      if(xhr.status === 200)
        this.props.history.push(client.userList);
      else
        this.pageState.errors = extend.keys(fields).clone(fields, xhr.response.errors);
    });
    xhr.send(formData);
  }

  render () {
    return (
      <UserForm
        onSubmit={this.registerUser}
        onChange={this.changeData}
        {...this.pageState}
      />
    );
  }
}

export default UserPage;