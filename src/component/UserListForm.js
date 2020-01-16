import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { client } from '../routes/routes.json';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import InstructionHeader from './InstructionMessage';
import LinkButton from './LinkButton';
import DynamicTable from './DynamicTable';

export const EditButton = ({ rowData }) => (
  <LinkButton
    icon={<CreateIcon />}
    link={`${client.user}/${rowData.rut}`}
    iconButton
  />
);

const UserListForm = observer(({ userList, tableColumn }) => (
  <Card className="py-3 px-4">
    <CardHeader
      title={
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
        >
          LISTA DE USUARIOS
        </Typography>
      }
      subheader={
        <InstructionHeader
          defaultExpanded={false}
          subtitle="Lea cuidadosamente este apartado si tiene alguna duda"
          type="help"
          message="What is Lorem Ipsum?
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
                  in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum."
        />
      }
      disableTypography
    />

    <CardContent>
      <DynamicTable
        id="userTable"
        name="userList"
        results={userList}
        columnMetadata={tableColumn}
      />
    </CardContent>

    <CardActions>
      <LinkButton
        className="ml-auto"
        link={`${client.user}`}
        label="Agregar Usuario"
        icon={<AddIcon/>}
      />
    </CardActions>
  </Card>
));

UserListForm.propTypes = {
  userList: PropTypes.array.isRequired
};

export default UserListForm;