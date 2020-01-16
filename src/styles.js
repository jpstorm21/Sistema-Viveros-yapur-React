import { emphasize } from '@material-ui/core/styles/colorManipulator';
import {createMuiTheme  } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: { useNextVariants: true },
});

export const primaryColor = {
  light: '#2e7031',
  main: '#43a047',
  dark: '#68b36b',
  contrastText: '#FFF'
};
export const secondaryColor = {
  light: '#b24c00',
  main: '#ff6d00',
  dark: '#ff8a33',
  contrastText: '#FFF'
};

const menuColor = primaryColor.main;
const menuDegradedColor = primaryColor.light;

export const rootStyles = {
  outerLoading: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    zIndex: 2200,
    display: 'table',
    backgroundColor: 'rgba(255, 255, 255, .4)'
  },
  innerLoading: {
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  snackbar: {
    height: 'auto',
    lineHeight: 3,
    whiteSpace: 'pre-line'
  },
  main: {
    minHeight: '100%',
    minWidth: '100%',
    position: 'absolute',
    backgroundColor: primaryColor.main
  },
  image: {
    height: 100,
    paddingTop: '10px'
  },
};

export const loginStyles = {
  container: {
    minHeight: '100%',
    minWidth: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    textAlign: 'center',
    width: 350,
    //margin: 'auto',
    paddingTop: '20px',
    zIndex: 50,
    //background: '#EEE'
  },
  media: {
    width: 150,
    height: 'auto',
    margin: 'auto',
  },
  title: {
    color: primaryColor.main,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
};

export const baseStyles = {
  app: {
    minHeight: '100%',
    minWidth: '100%',
    position: 'absolute',
    backgroundColor: '#BDBDBD',
  },
  content: {
    padding: 40,
    zIndex: 800
  },
};

export const headerStyles = {
  header: {
    zIndex: 1030,
    display: 'block',
    height: 100,
    overflow: 'hidden'
  },
  toolbar: {
    height: 65,
  },
  leftImageStyle: {
    position: 'absolute',
    top: 5,
    left: 250,
    height: 85
  },
  centerImageStyle: {
    position: 'absolute',
    top: 5,
    left: '48%',
    height: 85
  },
  rightImageStyle: {
    position: 'absolute',
    top: 5,
    right: 40,
    height: 85
  },
  iconStyle: {
    display: 'inline-flex',
    verticalAlign: 'top',
    color: 'white'
  }
};

export const menuStyles = {
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 100,
    minHeight: '100%',
    width: 250,
    display: 'block',
    backgroundColor: menuColor,
    zIndex: 810
  },
  nested: {
    color: '#FFF',
    backgroundColor: menuDegradedColor,
    padding: 0
  },
  textColor: {
    color: '#FFF',
    fontSize: 15
  },
  selectedOption: {
    backgroundColor: secondaryColor.main,
    '&:hover': {
      backgroundColor: secondaryColor.dark,
    },
    '&:focus': {
      backgroundColor: secondaryColor.dark,
    },
    color: '#FFF',
    fontSize: 15
  },
  badgePosition: {
    top: 18,
    right: 16
  },
  icon: {
    margin: 0
  },
  openMenuButton: {
    position: 'absolute',
    marginLeft: 250
  },
  closeMenuButton: {
    position: 'absolute',
    marginLeft: 0
  },
  iconColor: {
    color: '#FFF'
  },
  divider: {
    backgroundColor: '#FFF'
  }
};

export const cardStyles = {
  card: {
    //display: 'flex',
    //padding: 40,
    overflow: 'visible'
  },
  miniCard: {
    width: 200,
    backgroundColor: 'grey'
  },
  container: {
    minWidth: '100%',
  },
  message: {
    fontSize: 16,
    textAlign: 'justify'
  },
  competenceCard:{
    width: 250
  },
  competenceHeader:{
    backgroundColor: primaryColor.main
  },
  competenceBody:{
    backgroundColor: 'rgb(255,255,255)'
  },
  finalMark: {
    backgroundColor: '#E0E0E0'
  },
  levelBody:{
    backgroundColor: 'rgb(255,255,255)'
  },
  label: {
    color: 'black'
  },
  mainTitle: {
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 2,
    color: primaryColor.main,
    textTransform: 'uppercase'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor.main,//'black',
    lineHeight: 1,
    textTransform: 'uppercase'
  },
  VRIDTStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  body: {
    textAlign: 'justify'
  },
  quill: {
    marginTop: 8,
  }
};

export const textStyles = {
  container: {
    width: '100%',
    minHeight: 72,
  },
  label: {
    width: '100%',
    color: primaryColor.main,
    marginTop: 10,
    fontSize: 12
  },
  span: {
    width: '100%',
    fontSize: 16
  },
  error: {
    position: 'relative',
    bottom: 2,
    fontSize: 12,
    lineHeight: '12px',
    color: 'rgb(244, 67, 54)',
    paddingTop: 5
  },
};

export const selectStyles = theme => ({
  root: {
    flexGrow: 1,
    //height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

export const fileUploadStyles = {
  card: {
    marginBottom: 20,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
  },
  cardTable: {
    marginBottom: 20,
    boxShadow: 'none'
  },
  dropZone: {
    width: '100%',
    height: 100,
    margin: 'auto',
    textAlign: 'center',
    backgroundSize: '30px 30px',
    backgroundImage: 'linear-gradient(-45deg, #F6F6F6 25%, transparent 25%, transparent 50%, #F6F6F6 50%, #F6F6F6 75%, transparent 75%, transparent)'
  },
  dropZoneImage: {
    width: 48,
    height: 'auto',
    margin: 'auto',
    color: '#BCBCBC',
    paddingTop: 0
  },
  imageContainer: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    backgroundSize: '30px 30px',
    backgroundImage: 'linear-gradient(-45deg, #F6F6F6 25%, transparent 25%, transparent 50%, #F6F6F6 50%, #F6F6F6 75%, transparent 75%, transparent)'
  },
  imagePreview: {
    width: 150,
    height: 150,
    maxWidth: 150,
    maxHeight: 150,
    minWidth: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '50%'
  },
  icon: {
    color: primaryColor.main
  },
  avatar: {
    backgroundColor: primaryColor.main
  },
  text: {
    fontSize: 14
  },
  delete: {
    cursor: 'pointer'
  },
  link: {
    color: primaryColor.main,
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export const dynamicTableStyle = {
  marginTop: {
    marginTop: 10
  },
  overflow: {
    overflow: 'visible',
    padding: 10
  },
  header: {
    backgroundColor: primaryColor.main
  },
  columnHeader: {
    color: 'white',
    fontWeight: 'bold',
    borderRight:'1px solid white'
  },
  sortIcon: {
    color:'white',
    paddingLeft:5
  }
};

export const instructionMessageStyles = {
  card: {
    width: '100%',
    padding: 0,
    marginTop: '0.5em',
    marginBottom: '0.5em'
  },
  title: {
    fontSize: 14,
    fontWeight: 600
  },
  body: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  header: {
    backgroundColor: 'rgb(232, 232, 232)'
  },
};

export const homeStyle = {
  footer: {
    position: 'absolute',
    bottom: 5,
    right: 5
  },
  introPanel: {
    padding: 50
  }
};

export const modalStyle = {
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0
  }
};

export const autoCompleteStyles = theme => ({
  container: {
    position: 'relative',
  },
  suggestionListContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

const stylesheet = {};

export default stylesheet;