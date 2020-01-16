import React from 'react';
import PropTypes from 'prop-types';
import { observable, computed, reaction } from 'mobx';
import { observer, inject, PropTypes as MobXPropTypes } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import extend from 'smart-extend';
import uniqid from 'uniqid';
import empty from 'is-empty';
import arraySort from 'array-sort';
import { dynamicTableStyle } from '../styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paginate from 'react-paginate';
import TextField from '@material-ui/core/TextField';
import ReactSelect from './ReactSelect';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AutoComplete from './AutoComplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import IntegrationDatePicker from './DatePicker.js';
import IntegrationTimePicker from './TimePicker.js';
import FileUpload from './FileUpload';

export const withTableOnChange = Component => {
  @observer class IntegrationTableComponent extends React.Component {
    handleOnChange = event => {
      const { tableName, rowIndex, metadata } = this.props;

      metadata.onChange({
        id: tableName,
        name: tableName,
        key: metadata.columnName,
        index: rowIndex,
        value: event.target.value,
        target: event.target
      });
    };

    render () {
      return (
        <Component
          onChange={this.handleOnChange}
          {...this.props}
        />
      );
    }
  }

  IntegrationTableComponent.propTypes = {
    metadata: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
    }).isRequired
  };

  return IntegrationTableComponent;
};

/**
 * Select component to use with DynamicTable component.
 */
export const TableSelect = withTableOnChange(
  observer(({
    data,
    error,
    onChange,
    tableName,
    rowIndex,
    metadata,
    disabled
  }) => (
    <ReactSelect
      id={tableName}
      name={`${metadata.columnName}_${rowIndex}`}
      options={metadata.dynamicOptions ? metadata.options[rowIndex] : metadata.options}
      onChange={onChange}
      value={data}
      error={!empty(error)}
      helperText={error}
      disabled={disabled}
      fullWidth
      {...metadata.componentProps}
    />
  ))
);

/**
 * TextField component to use with DynamicTable component.
 */
export const TableTextField = withTableOnChange(
  observer(({
    data,
    error,
    onChange,
    tableName,
    rowIndex,
    metadata,
    rowData,
    disabled
  }) => (
    <TextField
      id={tableName}
      name={`${metadata.columnName}_${rowIndex}`}
      type={metadata.type}
      onChange={onChange}
      value={data}
      error={!empty(error)}
      helperText={error}
      disabled={disabled || rowData.disabled}
      fullWidth
      {...metadata.componentProps}
    />
  ))
);

export const TableDatePicker = withTableOnChange(
  observer(({
    data,
    error,
    onChange,
    tableName,
    rowIndex,
    metadata,
    rowData,
    disabled
  }) => (
    <IntegrationDatePicker
      id={tableName}
      name={`${metadata.columnName}_${rowIndex}`}
      type={metadata.type}
      onChange={onChange}
      value={data}
      error={!empty(error)}
      helperText={error}
      disabled={disabled || rowData.disabled}
      fullWidth
      {...metadata.componentProps}
    />
  ))
);

/**
 * FileUpload component to use with DynamicTable component.
 */
export const TableFileUpload = withTableOnChange(
  observer(({
    data,
    error,
    tableName,
    rowIndex,
    metadata,
    rowData,
    onChange,
    disabled
  }) => (
    <FileUpload
      id={tableName}
      name={`${metadata.columnName}_${rowIndex}`}
      onChange={onChange}
      file={data}
      pathname={rowData.pathname}
      downloadName={rowData.downloadName}
      error={error}
      disabled={disabled || metadata.disabled}
      {...metadata.componentProps}
    />
  ))
);

export const TableTimePicker = withTableOnChange(
  observer(({
    data,
    error,
    onChange,
    tableName,
    rowIndex,
    metadata,
    rowData,
    disabled
  }) => (
    <IntegrationTimePicker
      id={tableName}
      name={`${metadata.columnName}_${rowIndex}`}
      type={metadata.type}
      onChange={onChange}
      value={data}
      error={!empty(error)}
      helperText={error}
      disabled={disabled || rowData.disabled}
      fullWidth
      {...metadata.componentProps}
    />
  ))
);

/**
 * AutoComplete component to use with DynamicTable component.
 */
export const TableAutoComplete = withTableOnChange(
  observer(({
    data,
    error,
    onChange,
    tableName,
    rowIndex,
    metadata,
    disabled
  }) => (
    <AutoComplete
      id={tableName}
      name={`${metadata.columnName}_${rowIndex}`}
      dataSource={metadata.dataSource}
      suggestionListLimit={metadata.suggestionListLimit}
      onChange={onChange}
      value={data}
      error={!empty(error)}
      helperText={error}
      disabled={disabled}
      fullWidth
      {...metadata.componentProps}
    />
  ))
);

/**
 * Checkbox component to use with DynamicTable component.
 */
export const TableCheckbox = withTableOnChange(
  observer(({
    data,
    onChange,
    tableName,
    rowIndex,
    metadata
  }) => (
    <FormGroup row>
      <FormControlLabel
        label={metadata.label}
        control={
          <Checkbox
            id={tableName}
            name={`${metadata.columnName}_${rowIndex}`}
            onChange={onChange}
            checked={data}
            //value={true}
            {...metadata.componentProps}
          />
        }
      />
    </FormGroup>
  ))
);

/**
 * Switch Button component to use with DynamicTable component.
 */
export const TableSwitch = withTableOnChange(
  observer(({
    data,
    tableName,
    rowIndex,
    metadata
  }) => (
    <FormGroup row>
      <FormControlLabel
        label={metadata.label}
        control={
          <Switch
            id={tableName}
            name={`${metadata.columnName}_${rowIndex}`}
            onChange={metadata.onChange}
            checked={data}
            value={true}
          />
        }
      />
    </FormGroup>
  ))
);

/**
 * Alert component for dynamic table internal use.
 */
const Alert = observer(({ alert, alertMessage, alertCancelButtonText, alertOkButtonText, handleDialogClose }) => (
  <Dialog
    open={alert.open}
    onClose={handleDialogClose}
  >
    <DialogTitle>{alertMessage}</DialogTitle>

    <DialogActions>
      <Button variant="contained" onClick={handleDialogClose}>
        {alertCancelButtonText}
      </Button>

      <Button variant="contained" onClick={alert.onAccept} autoFocus>
        {alertOkButtonText}
      </Button>
    </DialogActions>
  </Dialog>
));

/**
 * Delete button component for dynamic table internal use.
 */
const DeleteButton = observer(({ rowIndex, rowData, metadata, disabled }) => {
  if (disabled || rowData.dynamicTableImmutable)
    return null;

  return (
    <IconButton onClick={metadata.onClick.bind(null, rowIndex, rowData)}>
      <DeleteIcon />
    </IconButton>
  );
});

/**
 * Render the dynamic table header.
 */
const DynamicTableHeader = observer(({
  id,
  classes,
  columnMetadata,
  disableSort,
  onHeaderClick,
  sortOptions
}) => (
  <TableRow key={`${id}_header`}>
    {
      columnMetadata.map(metadata => (
        <TableCell
          key={`${id}_header_${metadata.displayName}`}
          className={classes.columnHeader}
          style={extend.clone(dynamicTableStyle.columnHeader, metadata.style)}
        >
          {
            (!disableSort && metadata.sortable !== false && (
              <span onClick={onHeaderClick.bind(null, metadata.columnName, metadata.customSort)}>
                { metadata.displayName }
                { sortOptions.sortBy == metadata.columnName && ((sortOptions.reverse && <ArrowDropDownIcon /*style={dynamicTableStyle.sortIcon}*/ />) || <ArrowDropUpIcon /*style={dynamicTableStyle.sortIcon}*/ />) }
              </span>
            )) || metadata.displayName
          }
        </TableCell>
      ))
    }
  </TableRow>
));

/**
 * Render a dynamic table row.
 */
const DynamicTableRow = observer(({
  id,
  classes,
  name,
  columnMetadata,
  rowData,
  rowIndex,
  errors,
  disabled
}) => (
  <TableRow>
    {
      columnMetadata.map(metadata => {
        let Column = metadata.customComponent;
        let data = rowData[metadata.columnName];
        let error = (errors && rowIndex < errors.length && errors[rowIndex][metadata.columnName]) || '';

        return (
          <TableCell
            key={`${id}_${metadata.displayName}`}
            className={classes.overflow}
            /*style={metadata.style || dynamicTableStyle.overflow}*/
          >
            {
              (Column && (
                <Column
                  data={data}
                  error={error}
                  tableName={name}
                  rowData={rowData}
                  rowIndex={rowIndex}
                  metadata={metadata}
                  disabled={disabled}
                />
              )) || data
            }
          </TableCell>
        );
      })
    }
  </TableRow>
));

@inject('showScreenMessage')
@observer class DynamicTable extends React.Component {
  @observable alert = {};
  @observable paginateOptions = {};
  @observable sortOptions = {};
  @observable currentPage = 0;
  @observable rowDisplayed = 5;
  @observable displayAll = false;
  @observable query = '';
  @observable results = [];
  @computed get startIndex () {
    return this.props.disablePagination || this.displayAll ? 0 : this.currentPage * this.rowDisplayed;
  };
  @computed get lastIndex () {
    return this.props.disablePagination || this.displayAll ? this.props.results.length : ((this.currentPage + 1) * this.rowDisplayed) - 1;
  };

  /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.paginateOptions = {
      previousLabel: 'Anterior',
      nextLabel: 'Siguiente',
      pageCount: 0,
      forcePage: this.currentPage,
      marginPagesDisplayed: 2,
      pageRangeDisplayed: 2,
      //breakClassName: 'break-me',
      containerClassName: 'pagination',
      previousClassName: 'page-item',
      previousLinkClassName: 'page-link',
      nextClassName: 'page-item',
      nextLinkClassName: 'page-link',
      pageClassName: 'page-item',
      pageLinkClassName: 'page-link',
      //subContainerClassName: 'pages pagination',
      activeClassName: 'active'
    };

    this.sortOptions = {
      sortBy: '',
      reverse: false,
      customSort: null
    };

    this.alert = {
      open: false,
      onAccept: () => {}
    };
  }

  /**
   * Execute before component first render.
   */
  componentDidMount () {
    // Create a unique id for each row
    this.props.results.map((rowData, rowIndex) => {
      if (rowData.dynamicTableRowId === undefined)
        this.props.results[rowIndex].dynamicTableRowId = uniqid();
    });

    // Add a unique id for each new row
    reaction(
      () => {
        let indexes = [];
        this.props.results.map((rowData, rowIndex) => {
          if (rowData.dynamicTableRowId === undefined)
            indexes.push(rowIndex);
        });
        return indexes;
      },
      indexes => {
        indexes.map(index => {
          this.props.results[index].dynamicTableRowId = uniqid();
        });
      }
    );

    // Update the current page for the pagination component.
    reaction(
      () => this.currentPage,
      currentPage => this.paginateOptions.forcePage = currentPage
    );

    // Filter the table data if results array change.
    reaction(
      () => this.props.results.slice(),
      results => this.getFilteredItems()
    );

    // Initial filter
    this.getFilteredItems();

    // Set the paginate component options
    if (this.props.paginateOptions)
      extend(this.paginateOptions, this.props.paginateOptions);

    // Set the displayed row value
    if (this.props.rowDisplayed && this.props.rowDisplayed > 0)
      this.rowDisplayed = +this.props.rowDisplayed;

    // Add the delete button if needed
    if (this.props.withAddButton) {
      const index = this.props.columnMetadata.findIndex(column => column.columnName == 'dynamicTableRowId');

      if (index == -1) {
        this.props.columnMetadata.push({
          displayName: 'Acciones',
          columnName: 'dynamicTableRowId',
          sortable: false,
          onClick: this.props.showAlert ? this.handleDialogOpen : this.handleCustomRemove,
          style: extend.clone(dynamicTableStyle.columnHeader, { width: '10%' }),
          customComponent: DeleteButton
        });
      } else {
        this.props.columnMetadata[index].onClick = this.props.showAlert ? this.handleDialogOpen : this.handleCustomRemove;
      }
    }

    // Add rows until results has the minimun length
    for (let i = this.props.results.length; i < this.props.tableMinSize; i++)
      this.addRow();

    // Set the table pages number
    this.paginateOptions.pageCount = Math.ceil(this.props.results.length / this.rowDisplayed);

    // Update the table pages number if internal results lenght change
    reaction(
      () => this.results.length,
      length => this.paginateOptions.pageCount = Math.ceil(length / this.rowDisplayed)
    );

    // Add rows until results has the minimun length if received results change
    reaction(
      () => this.props.results.length,
      length => {
        for (let i = length; i < this.props.tableMinSize; i++)
          this.addRow();
      }
    );
  }

  /**
   * Change the filter query value.
   */
  searchChange = event => {
    this.query = event.target.value;
    this.getFilteredItems();
  };

  /**
   * Filter the table items.
   */
  getFilteredItems = () => {
    let items = this.props.results;
    let filteredItems = items;

    if (!this.props.disableSearch && !empty(this.query) && !empty(items)) {
      const queryList = this.query.split(' ');
      const tableColumnList = this.props.columnMetadata.map(row => row.columnName);

      filteredItems = items.filter(item => {
        for (let i = 0; i < tableColumnList.length; i++) {
          const key = tableColumnList[i];

          if (key != 'dynamicTableRowId') {
            let count = 0;
            queryList.map(q => {
              if (String(item[key]).toLowerCase().indexOf(q.toLowerCase()) >= 0)
                count++;
            });

            if (count == queryList.length)
              return true;
          }
        }

        return false;
      });
    }

    while (this.currentPage > 0 && this.startIndex > (filteredItems.length - 1))
      this.currentPage--;

    this.results = filteredItems;
    this.sortItems();
  };

  /**
   * change the sorted column properties.
   *
   * @param {string} newSortColumn - the column object key name.
   * @param {function} customSort - the column custom sort function.
   */
  changeSort = (newSortColumn, customSort) => {
    const { sortBy, reverse } = this.sortOptions;

    this.sortOptions = {
      sortBy: newSortColumn,
      reverse: newSortColumn == sortBy && !reverse,
      customSort: customSort || null
    };

    this.sortItems();
  };

  /**
   * Sort the table items.
   */
  sortItems = () => {
    let items = this.results.slice();
    const { sortBy, reverse, customSort } = this.sortOptions;

    if (!empty(sortBy)) {
      this.results = typeof customSort === 'function' ?
        arraySort(items, (a, b) => customSort(a[sortBy], b[sortBy]), { reverse }) :
        arraySort(items, sortBy, { reverse });
    }
  };

  /**
   * Open the alert dialog.
   */
  handleDialogOpen = (rowIndex, rowData) => {
    this.alert.open = true;
    this.alert.onAccept = this.handleCustomRemove.bind(null, rowIndex, rowData);
  };

  /**
   * Close the alert dialog.
   */
  handleDialogClose = () => {
    this.alert.open = false;
  };

  /**
   * Check if exists a custom function for remove a row.
   */
  handleCustomRemove = (index, data) => {
    if (this.props.customRemove)
      this.props.customRemove(index, this.removeRow, data, this.handleDialogClose);
    else
      this.removeRow(index);
  };

  /**
   * Add a row to the table.
   */
  addRow = () => {
    let row = this.props.rowData;

    this.props.results.push(extend.clone(row, { dynamicTableRowId: uniqid() }));
    //this.props.errors.push(extend.clone(row));

    this.props.columnMetadata.map(metadata => {
      if (metadata.dynamicOptions)
        metadata.options.push([]);
    });

    if (this.props.results.length > 0)
      this.currentPage = Math.floor((this.props.results.length - 1) / this.rowDisplayed);

    this.getFilteredItems();
  };

  /**
   * Remove a row from the table.
   *
   * @param {integer} index - the position of the row to remove.
   */
  removeRow = index => {
    if (this.props.results.length > this.props.tableMinSize) {
      if (index !== -1) {
        this.props.results.splice(index, 1);
        this.props.errors.splice(index, 1);

        this.props.columnMetadata.map(metadata => {
          if (metadata.dynamicOptions)
            metadata.options.splice(index, 1);
        });

        if (this.currentPage > 0 && this.startIndex >= this.props.results.length)
          this.currentPage -= 1;

        this.getFilteredItems();
      } else {
        this.props.showScreenMessage('No se pudo remover la fila especificada.');
      }
    } else if (typeof this.props.showScreenMessage === 'function') {
      this.props.showScreenMessage('No es posible eliminar todas las filas de la tabla.');
    }
  };

  /**
   * change the displayed row value.
   *
   * @param {object} event - the JavaScript event object
   */
  handleShowOptionChange = event => {
    const { value } = event.target;

    this.displayAll = isNaN(+value);
    this.rowDisplayed = value;

    if (!this.displayAll) {
      this.paginateOptions.pageCount = Math.ceil(this.results.length / value);

      while (this.currentPage > 0 && this.currentPage > (this.paginateOptions.pageCount - 1))
        this.currentPage--;
    }
  };

  /**
   * Change the current selected table page.
   *
   * @param {object} data - object containing the selected page number.
   * @param {integer} data.selected - the number of the selected page.
   */
  handlePageClick = data => {
    this.currentPage = data.selected;
  };

  /**
   * Render the component.
   */
  render () {
    const {
      id,
      classes,
      className,
      name,
      results,
      columnMetadata,
      errors,
      disabled,
      disableSearch,
      disablePagination,
      disableSort,
      disableShowRowDisplay,
      showOptionLabel,
      showOptionList,
      withAddButton,
      addButtonLabel,
      showAlert,
      alertOkButtonText,
      alertCancelButtonText,
      alertMessage
    } = this.props;

    let tableRowList = [];

    for (let index = this.startIndex; index <= this.lastIndex && index < this.results.length; index++) {
      let rowData = this.results[index];
      let rowIndex = empty(this.query) && empty(this.sortOptions.sortBy) ? index : results.findIndex(row => row.dynamicTableRowId == rowData.dynamicTableRowId);

      tableRowList.push((
        <DynamicTableRow
          key={`${id}_row_${rowData.dynamicTableRowId}`}
          classes={classes}
          id={`${id}_row_${rowData.dynamicTableRowId}`}
          name={name}
          columnMetadata={columnMetadata}
          rowData={rowData}
          rowIndex={rowIndex}
          errors={errors}
          disabled={disabled}
        />
      ));
    }

    return (
      <div key={id} className={className}>
        {
          !disableSearch && (
            <div className="col-md-6 col-12 p-0">
              <TextField
                id={`${id}_table_search`}
                name={`${id}_table_search`}
                label="Buscar"
                margin="normal"
                onChange={this.searchChange}
                value={this.query}
                fullWidth
              />
            </div>
          )
        }

        {
          !disablePagination && !disableShowRowDisplay && (
            <div className="row col justify-content-end">
              <div className="col-md-6 col-12 p-0">
                <ReactSelect
                  id={`${id}_table_pagination_show`}
                  name={`${id}_table_pagination_show`}
                  label={showOptionLabel}
                  margin="normal"
                  options={showOptionList}
                  onChange={this.handleShowOptionChange}
                  value={this.rowDisplayed}
                  isClearable={false}
                  fullWidth
                />
              </div>
            </div>
          )
        }

        <Table className={classes.overflow}>
          <TableHead className={classes.header}>
            <DynamicTableHeader
              id={id}
              classes={classes}
              columnMetadata={columnMetadata}
              disableSort={disableSort}
              onHeaderClick={this.changeSort}
              sortOptions={this.sortOptions}
            />
          </TableHead>

          <TableBody className={classes.overflow}>
            { tableRowList }
          </TableBody>
        </Table>

        {
          !disablePagination && !this.displayAll && (
            <div className={`${withAddButton && !disabled ? 'col-md-8 ' : ''}col-12 p-0 mt-2`}>
              <Paginate
                breakLabel={<span>...</span>}
                onPageChange={this.handlePageClick}
                {...this.paginateOptions}
              />
            </div>
          )
        }

        {
          withAddButton && !disabled && (
            <div className={`${!disablePagination && !this.displayAll ? 'col-md-4 ' : ''}col-12 p-0 mt-2`}>
              <Button
                className="float-right"
                variant="contained"
                onClick={this.addRow}
                color="secondary"
              >
                {addButtonLabel} <AddIcon />
              </Button>
            </div>
          )
        }

        {
          showAlert && (
            <Alert
              alert={this.alert}
              alertOkButtonText={alertOkButtonText}
              alertCancelButtonText={alertCancelButtonText}
              handleDialogClose={this.handleDialogClose}
              alertMessage={alertMessage}
            />
          )
        }
      </div>
    );
  }
}

// Define default props values.
DynamicTable.defaultProps = {
  showOptionLabel: 'MOSTRAR',
  showOptionList: [5, 10, 20, 50, 'Todas'],
  addButtonLabel: 'AGREGAR',
  alertOkButtonText: 'OK',
  alertCancelButtonText: 'CANCEL',
  alertMessage: '¿Realmente desea eliminar la fila seleccionada?',
  className: 'row col-12 m-0 p-0',
  tableMinSize: 0
};

// Define received props types for validation.
DynamicTable.propTypes = {
  showScreenMessage: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  paginateOptions: PropTypes.object,
  rowDisplayed: PropTypes.number,
  tableMinSize: PropTypes.number,
  columnMetadata: PropTypes.oneOfType([
    PropTypes.array,
    MobXPropTypes.observableArray
  ]).isRequired,
  results: MobXPropTypes.observableArray.isRequired,
  errors: MobXPropTypes.observableArray,
  customRemove: PropTypes.func,
  addButtonLabel: PropTypes.string,
  alertOkButtonText: PropTypes.string,
  alertCancelButtonText: PropTypes.string,
  alertMessage: PropTypes.string
};

export default withStyles(dynamicTableStyle)(DynamicTable);