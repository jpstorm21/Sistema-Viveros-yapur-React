import React from 'react';
import PropTypes from 'prop-types';
import { observable, computed, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Fuse from 'fuse.js';
import empty from 'is-empty';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { autoCompleteStyles } from '../styles';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const InputComponent = ({
  classes,
  inputRef = () => {},
  ref,
  ...other
}) => (
  <TextField
    fullWidth
    InputProps={{
      inputRef: node => {
        ref(node);
        inputRef(node);
      },
      classes: {
        input: classes.input,
      },
    }}
    {...other}
  />
);

const getSuggestionComponent = key => (suggestion, { query, isHighlighted }) => {
  const matcheList = match(suggestion[key], query);
  const partList = parse(suggestion[key], matcheList);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {
          partList.map((part, index) =>
            part.highlight ? (
              <strong key={String(index)}>
                { part.text }
              </strong>
            ) : (
              <span key={String(index)}>
                { part.text }
              </span>
            ),
          )
        }
      </div>
    </MenuItem>
  );
};

const SuggestionListContainer = ({ containerProps, children }) => (
  <Paper {...containerProps} square>
    { children }
  </Paper>
);

@observer class IntegrationAutosuggest extends React.Component {
  @observable pageState = {};
  @computed get Fuse () {
    const { dataSource, labelKey } = this.props;
    const options = {
      keys: [ labelKey ],
      threshold: 0.4,
    };

    return new Fuse(toJS(dataSource), options);
  }

  constructor (props) {
    super(props);

    this.pageState = {
      suggestionList: []
    };
  }

  handleSuggestionListFetch = ({ value }) => {
    const { suggestionListLimit } = this.props;

    this.pageState.suggestionList = empty(value)
      ? []
      : this.Fuse.search(value).slice(0, suggestionListLimit);
  };

  handleSuggestionListClear = () => {
    this.pageState.suggestionList.clear();
  };

  handleGetSuggestion = suggestion => suggestion;

  handleGetSuggestionValue = suggestion => {
    const { labelKey } = this.props;

    return suggestion[labelKey];
  };

  handleOnChange = (event, { newValue, method }) => {
    const { id, name } = this.props;

    this.props.onChange({
      target: {
        id: id,
        name: name,
        suggestion: method == 'type'
         ? null
         : newValue,
        value: method == 'type'
          ? newValue
          : this.handleGetSuggestionValue(newValue)
      }
    });
  };

  render() {
    const { suggestionList } = this.pageState;
    const { classes, labelKey, id, name, label, value, error, helperText, disabled } = this.props;

    return (
      <Autosuggest
        renderInputComponent={InputComponent}
        renderSuggestionsContainer={SuggestionListContainer}
        renderSuggestion={getSuggestionComponent(labelKey)}
        onSuggestionsFetchRequested={this.handleSuggestionListFetch}
        onSuggestionsClearRequested={this.handleSuggestionListClear}
        getSuggestionValue={this.handleGetSuggestion}
        inputProps={{
          classes,
          id,
          name,
          label,
          value,
          onChange: this.handleOnChange,
          error,
          helperText,
          disabled
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionListContainerOpen,
          suggestionsList: classes.suggestionList,
          suggestion: classes.suggestion,
        }}
        suggestions={suggestionList}
      />
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  dataSource: PropTypes.array.isRequired,
  labelKey: PropTypes.string.isRequired,
  suggestionListLimit: PropTypes.number.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

IntegrationAutosuggest.defaultProps = {
  labelKey: 'label',
  suggestionListLimit: 5
};

export default withStyles(autoCompleteStyles)(IntegrationAutosuggest);