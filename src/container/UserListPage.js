import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import  { basename } from '../routes/routes.json';
import UserListForm, { EditButton } from '../component/UserListForm';

@observer class UserListPage extends React.Component {
    @observable pageState = {};

   /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.pageState = {
      userList: [],
      tableColumn: [
        {
          displayName: 'Rut',
          columnName: 'rut',
        },
        {
          displayName: 'Nombre',
          columnName: 'name'
        },
        {
          displayName: 'Email',
          columnName: 'email'
        },
        {
          displayName: 'Tipo de usuario',
          columnName: 'userType'
        },
        {
          displayName: 'Editar',
          columnName: 'edit',
          customComponent: EditButton
        }
      ]
    };

    this.userList();
  }

  userList = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/api/user`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200)
        this.pageState.userList = xhr.response.data.map(userList => {
          console.log(userList.userType);
          return { rut: userList.rut, name: userList.name,email:userList.email,phone:userList.phone,userType:userList.userType === 'ADM' ? 'Administrador': 'Usuario'};
        });
      else
        this.props.showScreenMessage(xhr.response.message);
    });
    xhr.send();
  };

  render () {
    return (
      <UserListForm
        {...this.pageState}
      />
    );
  }
}

export default UserListPage;