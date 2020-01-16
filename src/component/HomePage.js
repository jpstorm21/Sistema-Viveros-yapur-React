import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

@observer class HomePage extends React.Component {
  @observable pageState = {};

  constructor (props) {
    super(props);

    this.pageState = {
   
    };
  }

  render () {

    return (
      <Card className="py-3 px-4">
        <CardHeader
          className="text-center"
          title="Sistema Viveros Yapur"
          subheader="Bienvenido(a) al sistema"
        />
          
        <CardContent>
        </CardContent>
      </Card>
    )
  }
}

export default HomePage;