import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { instructionMessageStyles } from '../styles';

const InstructionHeader = observer(({ classes, type, subtitle }) => {
  if (type == 'help') {
    return (
      <CardHeader
        className="px-0 py-2"
        avatar={<LiveHelpIcon color="primary" />}
        title={<Typography className={classes.title}>INSTRUCCIONES</Typography>}
        subheader={<Typography color="textSecondary">{subtitle}</Typography>}
        disableTypography
      />
    );
  }

  if (type == 'warning') {
    return (
      <CardHeader
        className="px-0 py-2"
        avatar={<WarningIcon color="primary" />}
        title={<Typography className={classes.title}>ADVERTENCIA</Typography>}
        subheader={<Typography color="textSecondary">{subtitle}</Typography>}
        disableTypography
      />
    );
  }

  return <Typography>{subtitle}</Typography>;
});

const InstructionMessage = observer(({ classes, defaultExpanded, type, subtitle, message }) => (
  <ExpansionPanel className={classes.card} defaultExpanded={defaultExpanded}>
    <ExpansionPanelSummary className={classes.header} expandIcon={<ExpandMoreIcon />}>
      <InstructionHeader classes={classes} type={type} subtitle={subtitle} />
    </ExpansionPanelSummary>

    <ExpansionPanelDetails className={classes.body}>
      <Typography component={'span'} variant="body2">
        { message }
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
));

// Define default props values.
InstructionMessage.defaultProps = {
  defaultExpanded: false
};

// Define received props types for validation.
InstructionMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  defaultExpanded: PropTypes.bool,
  type: PropTypes.string,
  subtitle: PropTypes.string,
  message: PropTypes.node.isRequired,
};

export default withStyles(instructionMessageStyles)(InstructionMessage);