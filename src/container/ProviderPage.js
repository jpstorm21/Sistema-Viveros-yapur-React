import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { basename, client } from '../routes/routes.json';
import extend from 'smart-extend';
import empty from 'is-empty';
import ProvidersForm from '../component/ProvidersForm';

const fields = {
    names:'',
    lastnames:'',
    contact:'',
    email:'',
    description:''
};

@observer class ProviderPage extends React.Component {
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
      this.getProviderData();
  }

  getProviderData = () =>{
    let xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/api/providers/${this.props.params.id}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load',()=>{
      if (xhr.status === 200){
        let {data} = xhr.response;
        console.log(data);
        this.pageState.data = data;
      }else{
        this.props.showScreenMessage(xhr.response.message);
      }
    });
    xhr.send(); 
  }

  changeData = event => {
    let { name, value } = event.target;
    this.pageState.data[name] = value;
    console.log(name,":",value)
  };

  registerProvider = () =>{
    event.preventDefault();
    this.props.showLoadingScreen(true);
    let formData = `data=${encodeURIComponent(JSON.stringify(this.pageState.data))}`;
    let xhr = new XMLHttpRequest();
    if(this.pageState.update){
        xhr.open('put',`${basename}/api/provider/${encodeURIComponent(this.props.params.id)}`);
    }else{
        xhr.open('post',`${basename}/api/provider`);
    }
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load',()=>{
        this.props.showLoadingScreen(false);
        this.props.showScreenMessage(xhr.response.message);
        if(xhr.status === 200){
          this.props.history.push(client.providerList);
        }else{
            this.props.showLoadingScreen(false);
            this.pageState.errors = extend.keys(fields).clone(fields, xhr.response.errors);
        }
    });
    xhr.send(formData);
  }

  render () {
    return (
      <ProvidersForm
        onSubmit={this.registerProvider}
        onChange={this.changeData}
        {...this.pageState}
      />
    );
  }
}

export default ProviderPage;