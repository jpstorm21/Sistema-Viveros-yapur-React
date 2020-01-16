import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { basename, client } from '../routes/routes.json';
import extend from 'smart-extend';
import empty from 'is-empty';
import ChecksForm from '../component/ChecksForm';

const fields = {
    number:'',
    amount:'',
    names:'',
    bank:'',
    lastName:'',
    numberAccount:'',
    beginDate:'',
    endDate:'',
    description:''
};

@observer class ChecksPage extends React.Component {
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
      update :!empty(this.props.params.id)
    };

    if(this.pageState.update)
      this.getCheckData();
  }

  getCheckData = () =>{
    let xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/api/checks/${this.props.params.id}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load',()=>{
      if (xhr.status === 200){
        let {data} = xhr.response;
        this.pageState.data.number = data.number
        this.pageState.data.amount = data.amount
        this.pageState.data.names = data.names
        this.pageState.data.bank = data.bank
        this.pageState.data.lastName = data.lastname
        this.pageState.data.numberAccount = data.numberaccount
        this.pageState.data.beginDate = data.begindate
        this.pageState.data.endDate = data.enddate
        this.pageState.data.description = data.description
      }else{
        this.props.showScreenMessage(xhr.response.message);
      }
    });
    xhr.send();
  }

  changeData = event => {
    let { name, value } = event.target;
    //falta formatear los valores
    this.pageState.data[name] = value;
    console.log(name,":",value)
  };

  registerCheck = () =>{
    event.preventDefault();
    this.props.showLoadingScreen(true);
    let formData = `data=${encodeURIComponent(JSON.stringify(this.pageState.data))}`;
    let xhr = new XMLHttpRequest();
    if(this.pageState.update){
        xhr.open('put',`${basename}/api/check/${encodeURIComponent(this.props.params.id)}`);
    }else{
        xhr.open('post',`${basename}/api/check`);
    }
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load',()=>{
        this.props.showLoadingScreen(false);
        this.props.showScreenMessage(xhr.response.message);
        if(xhr.status === 200){
          this.props.history.push(client.checkList);
        }else{
            this.props.showLoadingScreen(false);
            this.pageState.errors = extend.keys(fields).clone(fields, xhr.response.errors);
        }
    });
    xhr.send(formData);
  }

  render () {
    return (
      <ChecksForm
        onSubmit={this.registerCheck}
        onChange={this.changeData}
        {...this.pageState}
      />
    );
  }
}

export default ChecksPage;