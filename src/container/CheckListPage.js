import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import  { basename } from '../routes/routes.json';
import CheckListForm, { EditButton, ChargeCheck } from '../component/CheckListForm';
import Promise from 'bluebird';

@observer class CheckListPage extends React.Component {
    @observable pageState = {};

   /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.pageState = {
      options: {
        title:"Cobrar Cheque",
        chequeId: null,
        open:false,
        message:"¿Esta seguro que desea cambiar el estado del cheque a cobrado?",
        hasComment:false,
        commentLabel:"¿Desea agregar algun comentario?",
        state:false
      },
      checkList: [],
      tableColumn: [
        {
          displayName: 'Numero Cheque',
          columnName: 'numerocheque'
        },
        {
          displayName: 'Nombre Emisor',
          columnName: 'nombremisor'
        },
        {
          displayName: 'Apellidos emisor',
          columnName: 'apellidoemisor'
        },
        {
          displayName: 'Fecha de Recepción',
          columnName: 'fecharecepcion'
        },
        {
          displayName: 'Fecha de Vencimiento',
          columnName: 'fechavencimiento'
        },
        {
          displayName: 'Monto',
          columnName: 'montocheque'
        },
        {
          displayName: 'Editar',
          columnName: 'edit',
          customComponent: EditButton,
        },
        {
          displayName: 'Acciones',
          columnName: 'action',
          customComponent: ChargeCheck,
          onClick: this.handleDialogOpen,
          componentProps:{
            disabled:true
          }
        }
      ]
    };

    this.checkList();
  }

  handleDialogOpen = chequeId => (event) => {
    console.log(event.target.disabled)
    this.pageState.options.chequeId = chequeId;
    let promesa = new Promise((resolve)=>{
      setTimeout(resolve,100,this.checkState(chequeId))
    });  
    promesa.then(() => {
      if(this.pageState.options.state){
        this.props.showScreenMessage("Cheque ya se encuentra cobrado");
        event.target.disabled = true;
      }else{
        this.pageState.options.open = true
      }
    })
  }

  handleDialogClose = () =>{
    this.pageState.options.open = false
  }

  changeDynamicTableData = ({ id, key, index, value }) => {
    console.log("hola")
    console.log(id,index,value)
    this.pageState.data[id][index][key] = value;
  };


  checkState = (id) =>{
    let xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/api/checks/${id}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load',()=>{
      if(xhr.status === 200){
        let {data} = xhr.response
        this.pageState.options.state = data.chequecobradosN
        return data.chequecobradosN;
      }
    });
    xhr.send();
  }

  registerDialog = () =>{
    event.preventDefault();
    this.pageState.options.open = false
    let xhr = new XMLHttpRequest();
    xhr.open('put',`${basename}/api/chargeCheck/${this.pageState.options.chequeId}/${true}`)
    xhr.responseType = 'json';
    xhr.addEventListener('load', ()=>{
      this.props.showScreenMessage(xhr.response.message);
    })
    xhr.send();
  }

  checkList = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/api/checks`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200){
            let {data} =  xhr.response;
            data.map(t=>{
                let fechaI = t.fecharecepcion.split('T');
                let fechaF = t.fechavencimiento.split('T');
                t.fecharecepcion = fechaI[0];
                t.fechavencimiento = fechaF[0];
            });
            this.pageState.checkList = data
        }else{
            this.props.showScreenMessage(xhr.response.message);
        }
    });
    xhr.send();
  };

  render () {
    return (
      <CheckListForm
        onClose={this.handleDialogClose}
        onAccept={this.registerDialog}
        {...this.pageState}
      />
    );
  }
}

export default CheckListPage;