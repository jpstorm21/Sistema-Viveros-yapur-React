import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import  { basename } from '../routes/routes.json';
import ProvidersListForm, { EditButton,DeleteProvider } from '../component/ProvidersListForm';
import swal from 'sweetalert';

@observer class ProvidersListPage extends React.Component {
    @observable pageState = {};

   /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.pageState = {
      providersList: [],
      tableColumn: [
        {
          displayName: 'Nombre',
          columnName: 'nombresproveedor',
        },
        {
          displayName: 'Apellido',
          columnName: 'apellidosproveedor'
        },
        {
          displayName: 'Contacto',
          columnName: 'contactoproveedor'
        },
        {
          displayName: 'Email',
          columnName: 'emailproveedor'
        },
        {
          displayName: 'Editar',
          columnName: 'edit',
          customComponent: EditButton
        },
        {
          displayName: 'Eliminar',
          columnName: 'delete',
          customComponent: DeleteProvider,
          onClick: this.deleteProvider
        }
      ]
    };

    this.providerList();
  }

  deleteProvider = (id) => () =>{
      console.log(id)
      swal({
        title: "Eliminar Proveedor",
        text: "¿Esta seguro que desea eliminar este proveedor?",
        icon: "warning"
      })
  };

  providerList = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/api/providers`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200)
        this.pageState.providersList = xhr.response.data
      else
        this.props.showScreenMessage(xhr.response.message);
    });
    xhr.send();
  };

  render () {
    return (
      <ProvidersListForm
        {...this.pageState}
      />
    );
  }
}

export default ProvidersListPage;