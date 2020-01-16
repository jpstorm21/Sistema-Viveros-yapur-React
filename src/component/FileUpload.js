import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import empty from 'is-empty';
import browserImageSize from 'browser-image-size';
import { basename } from '../routes/routes.json';
import { textStyles, fileUploadStyles } from '../styles';
import download from 'downloadjs';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PictureAsPDFIcon from '@material-ui/icons/PictureAsPdf';
import ImageIcon from '@material-ui/icons/Collections';
import HelpIcon from '@material-ui/icons/Help';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Dropzone from 'react-dropzone';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const imageList = ['image/png', 'image/jpeg'];

@inject('showScreenMessage', 'showLoadingScreen')
@observer class FileUpload extends React.Component {

  /**
   * Handle the files drag and drop.
   *
   * @param {array} acceptedFile - the accepted file list.
   * @param {array} rejectedFile - a rejected file list.
   */
  handleDropFile = (acceptedFile, rejectedFile) => {
    let file = acceptedFile[0];

    if (rejectedFile.length > 0)
      return this.props.showScreenMessage('El archivo debe ser del tipo aceptado');

    if (imageList.indexOf(file.type) != -1) {
      browserImageSize(file)
        .then(dimensions => {
          if (dimensions.width > 1024 || dimensions.height > 768)
            this.props.showScreenMessage('Las dimensiones de la imagen son demasiado altas');
          else
            this.changeData(file)
        });
    } else {
      this.changeData(file);
    }
  }

  /**
   * Get the corresponding icon for the received file type
   *
   * @param {string} fileType the file extension type
   */
  getIcon = fileType => {
    switch (fileType) {
      case 'application/pdf':
        return <PictureAsPDFIcon />;
      case 'image/jpeg':
      case 'image/png':
        return <ImageIcon />;
      default:
        return <HelpIcon />;
    }
  }

  /**
   * Remove the selected file.
   */
  deleteFile = () => {
    this.changeData('');
  }

  /**
   * Change the selected file calling the received change function.
   *
   * @param {string} data - the selected file
   */
  changeData = data => {
    let target = {
      name: this.props.name,
      id: this.props.id,
      value: empty(data) ? '' : data
    };

    this.props.onChange({ target });
  };

  /**
   * Download the specified file from server.
   *
   * @param {string} pathname - the file path direction.
   * @param {string} downloadName - the file name on download.
   */
  handleDownloadFile = () => {
    //this.props.showLoadingScreen(true);

    let { pathname, downloadName } = this.props;
    //pathname.replace(/\\/g, '/');

    let xhr = new XMLHttpRequest();
    xhr.open('get', `${basename}/api/file/${encodeURIComponent(pathname)}/${encodeURIComponent(downloadName)}`);
    xhr.responseType = 'blob';
    xhr.addEventListener('load', () => {
      this.props.showLoadingScreen(false);

      if (xhr.status == 200) {
        const disposition = xhr.getResponseHeader('Content-Disposition');
        let filename = null;

        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1])
            filename = matches[1].replace(/['"]/g, '');
        }

        //download(xhr.responseURL);
        if (filename)
          download(xhr.response, filename);
        else
          download(xhr.response);
      } else if (xhr.response.indexOf('message') != -1) {
        const { message } = JSON.parse(xhr.response);

        this.props.showScreenMessage(message);
      }
    });
    xhr.send();
  };

  /**
   * Render the component.
   */
  render(){
    const { classes, title, subtitle, accept, multiple, file, error, pathname, downloadName, isTable, disabled } = this.props;
    
    let dropComponent = null;
    if (!disabled) {
      dropComponent = empty(file) ? (
        <Dropzone
          style={fileUploadStyles.dropZone}
          accept={accept}
          onDrop={this.handleDropFile}
          multiple={multiple}
        >
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <CardContent>
                  Haga clic o arrastre su archivo aquí
                </CardContent>

                <CardContent className={classes.dropZoneImage}>
                  <CloudUploadIcon className={`${classes.dropZoneImage} ${classes.icon}`} />
                </CardContent>
              </div>
            </section>
          )}
        </Dropzone>
      ) : (
        <List className="p-0">
          <ListItem key={file.name} className={classes.text}>
            <Avatar className={classes.icon}>{this.getIcon(file.type)}</Avatar>

            <ListItemText primary={`${file.name || 'Sin Archivo'}`} secondary={`${file.size / 1000 || '0'} KB`} />

            <ListItemSecondaryAction>
              <IconButton
                color="secondary"
                onClick={this.deleteFile}
              >
                <DeleteForeverIcon className={classes.delete} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      );
    }

    return (
      <Card className={isTable ? classes.cardTable : classes.card}>
        {
          !disabled && (title || subtitle) && (
            <CardHeader
              className={classes.text}
              avatar={<Avatar className={classes.avatar}><AttachFileIcon /></Avatar>}
              title={title}
              subheader={subtitle}
            />
          )
        }

        {
          //imageList.indexOf(file.type) != -1 && (
          //  <CardMedia
          //    className={`${classes.imageContainer} ${classes.imagePreview}`}
          //    src={file.preview}
          //  />
          //)
        }

        { dropComponent }

        {
          error && (
            <CardContent style={textStyles.error}>
              { error }
            </CardContent>
          )
        }

        {
          !empty(pathname) && (
            <CardActions className="text-center">
              <Button
                onClick={this.handleDownloadFile}
              >
                Descargar <SaveAltIcon />
              </Button>
            </CardActions>
          )
        }
      </Card>
    );
  }
}

export default withStyles(fileUploadStyles)(FileUpload);