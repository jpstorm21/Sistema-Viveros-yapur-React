import React from 'react';
import PropTypes from 'prop-types';
import { observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Auth from '../modules/Auth';
import empty from 'is-empty';
import { menuStyles } from '../styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import { Scrollbars } from 'react-custom-scrollbars';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

const UserProfile = observer(({ classes, user }) => (
  <List className="text-center">
    <ListItem>
      <Avatar>
        <PersonIcon />
      </Avatar>

      <ListItemText classes={{ primary: classes.textColor }} primary={ user.name || 'No Name' } />
    </ListItem>
  </List>
));

const MenuList = observer(({ classes, menuList, logOut }) => (
  <List>
    { menuList }

    <Divider className={classes.divider} />

    <ListItem
      onClick={logOut}
      button
    >
      <ListItemIcon>
        <ExitToAppIcon classes={{ root: classes.iconColor }} />
      </ListItemIcon>

      <ListItemText classes={{ primary: classes.textColor }} primary="Salir" />
    </ListItem>
  </List>
));

@observer class NestedListItem extends React.Component {
  @observable pageState = {};

  /**
   * Class constructor.
   */
  constructor (props) {
    super(props)

    // Set the initial component state.
    this.pageState = {
      open: this.props.initiallyOpen
    };
  }

  /**
   * Change the nested list open state to open/close the Collapse component.
   */
  handleNestedListToggle = () => {
    this.pageState.open = !this.pageState.open;
  };

  /**
   * Render the component.
   */
  render () {
    const { id, classes, icon, text, nestedItemList } = this.props;
    const { open } = this.pageState;

    return [
      <ListItem
        key={id}
        onClick={this.handleNestedListToggle}
        button
      >
        <ListItemText classes={{ primary: classes.textColor }} primary={text} />

        {
          open ?
            <ExpandLessIcon classes={{ root: classes.iconColor }} /> :
            <ExpandMoreIcon classes={{ root: classes.iconColor }} />
        }
      </ListItem>,
      <Collapse
        key={`${id}_collapse`}
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {nestedItemList}
        </List>
      </Collapse>
    ];
  }
};

// Define received props types for validation.
NestedListItem.propTypes = {
  id: PropTypes.string.isRequired,
  nestedItemList: PropTypes.array.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string,
  initiallyOpen: PropTypes.bool
};

// Define default props values.
NestedListItem.defaultProps = {
  text: '',
  icon: '',
  initiallyOpen: false
};

@inject('parentState')
@observer class MenuContainer extends React.Component {
  @observable pageState = {};
  @computed get menuList () {
    const { menu } = this.props.parentState;

    return this.generateMenu(menu);
  }

  /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.pageState = {
      link: '',
      dialog: {
        open: false,
        title: '¿Realmente desea abandonar la página actual?',
        message: 'Se perderán TODOS los datos sin guardar del formulario.',
      }
    };
  }

  /**
   * Execute before component first render.
   */
  componentWillMount () {
    this.pageState.dialog.onClick = this.handleDialogChangePage;
  }

  /**
   * Generate the system menu.
   *
   * @param {oject} pages - object with the menu structure.
   * @return {object} the menu in JSX.
   */
  generateMenu = (pageList, id) => {
    if (empty(pageList))
      return null;

    const { classes } = this.props;
    const { pathname } = this.props.parentState;

    return pageList.map(page => {
      let key = id ? `${id}_${page.text}` : page.text;

      if (!page.link) {
        return (
          <ListItem
            key={key}
            classes={{ primary: classes.textColor }}
            button
          >
            <ListItemText classes={{ primary: classes.textColor }} primary={page.text} />
          </ListItem>
        );
      }

      switch (typeof page.link) {
        case 'string':
          return (
            <ListItem
              key={key}
              className={pathname == page.link ? classes.selectedOption : null}
              onClick={this.handleChangePage(page.link)}
              button
            >
              <ListItemIcon>
                <Icon classes={{ root: classes.iconColor }}>{page.icon}</Icon>
              </ListItemIcon>

              <ListItemText classes={{ primary: classes.textColor }} primary={page.text} />
            </ListItem>
          );
        case 'function':
          return (
            <ListItem
              key={key}
              onClick={page.link}
              button
            >
              <ListItemText classes={{ primary: classes.textColor }} primary={page.text} />
            </ListItem>
          );
        case 'object':
          const nestedMenu = page.link;
          const open = nestedMenu.findIndex(row => row.link == pathname) != -1;

          return (
            <NestedListItem
              key={key}
              id={key}
              classes={classes}
              text={page.text}
              icon={page.icon}
              initiallyOpen={open}
              nestedItemList={this.generateMenu(page.link, key)}
            />
          );
        default:
          return null;
      }
    });
  };

  /**
   * Go to the received page.
   */
  handleChangePage = link => () => {
    document.activeElement.blur();

    if (empty(link))
      return;

    this.props.history.push(link);
  };

  /**
   * Go to the spedified page on dialog accept.
   */
  handleDialogChangePage = () => {
    this.pageState.dialog.open = false;
    this.props.history.push(this.pageState.link);
  };

  /**
   * Log out the current user.
   */
  handleLogOut = () => {
    Auth.deauthenticateUser(this.props.history);
  };

  /**
   * Render the component.
   */
  render () {
    const { open, classes, parentState } = this.props;

    return (
      <Drawer classes={{ paper: classes.menu }} open={open} variant="persistent">
        <Scrollbars>
          <UserProfile classes={classes} user={parentState.user} />

          <Divider className={classes.divider} />

          <MenuList
            classes={classes}
            menuList={this.menuList}
            logOut={this.handleLogOut}
          />
        </Scrollbars>
      </Drawer>
    );
  }
}

// Define received props types for validation.
MenuContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(menuStyles)(withRouter(MenuContainer));