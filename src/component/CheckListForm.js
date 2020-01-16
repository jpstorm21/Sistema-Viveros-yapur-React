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
import Check from '@material-ui/icons/Check';
import CreateIcon from '@material-ui/icons/Create';
import InstructionHeader from './InstructionMessage';
import LinkButton from './LinkButton';
import DynamicTable from './DynamicTable';
import Button from '@material-ui/core/Button';
import ValidationDialog from './ValidationDialog';

export const EditButton = ({ rowData }) => (
  <LinkButton
    icon={<CreateIcon />}
    link={`${client.checks}/${rowData.id}`}
    iconButton
  />
);

export const ChargeCheck = ({rowData, metadata}) => (
  <Button
    variant="contained"
    color="secondary"
    onClick={metadata.onClick(rowData.id)}
    disabled={rowData.chequecobradosN ? true : false}
  >
     {<Check/>}
    {rowData.chequecobradosN ? "COBRADO" : "COBRAR"}
  </Button>
);

const CheckListForm = observer(({ 
  checkList, 
  tableColumn,
  onAccept,
  onClose,
  options
}) => (
  <Card className="py-3 px-4">
    <CardHeader
      title={
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
        >
          LISTA DE CHEQUES
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
        id="checkTable"
        name="checkList"
        results={checkList}
        columnMetadata={tableColumn}
      />
    </CardContent>

    <CardActions>
      <LinkButton
        className="ml-auto"
        link={`${client.checks}`}
        label="Agregar Cheque"
        icon={<AddIcon/>}
      />
    </CardActions>

    <ValidationDialog 
      onAccept={onAccept}
      onClose={onClose}
      {...options}
    />

  </Card>
));

CheckListForm.propTypes = {
  checkList: PropTypes.array.isRequired
};

export default CheckListForm;