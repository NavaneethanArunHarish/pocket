import React, { Component } from 'react';
import './notesSection.css';
import {Grid, Image, Icon, Button} from 'semantic-ui-react';
import Webcam from 'react-webcam';
import LightBox from 'react-images';

export default class NotesSectionBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
     imageUrls: [],
     autoScrollPosition:true,
     width: window.innerWidth,
     webcam:false,
     lightboxIsOpen:false,
     selectImgUrl:''

    };
  }

  uploadImage() {
    var indexId =  this.props.index +"input";
    document.getElementById(indexId).click();
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  handleDevice() {
    if(this.state.width < 700) {
      this.uploadImage();
    } 
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageUrls: [...this.state.imageUrls, imageSrc] ,webcam:false});
  };


  handleChange(e) {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = (url) => {
          //for saving images into DB we need to use variable 'file'
          this.setState({ imageUrls: [...this.state.imageUrls, url.target.result] });
      }
     reader.readAsDataURL(file);
  }

  selectedImage(img) {
    this.setState({ selectImgUrl: img, lightboxIsOpen: true});
  }

  closeLightbox() {
    this.setState({ lightboxIsOpen: false});
  }

  onLoadImg(e) {
    var height = e.target.offsetHeight;
    var thumnailImg = this.props.index +"img";
    if(height < 45) {
      document.getElementById(thumnailImg).style.marginTop = "18px";
    }
  }

  render() {
    // due to 365 div iteration , app is little slow now
    // will change the dates + or - 5Dates dynamically in the upcoming commit
    var divId = this.props.index +"div";
    var inputId = this.props.index +"input";
    var thumnailImg = this.props.index +"img";
    return (
      <div id={divId}>
       <Grid>
       <Grid.Column className='inputColumn' onClick={this.handleDevice.bind(this)}>
       <input id={inputId} onChange={this.handleChange.bind(this)} type="file" style={{display:'none'}} accept="image/*" capture="camera"/>
          <Icon onClick={(e) => this.setState({autoScrollPosition:false, webcam: true})} name='plus' size='huge' className = 'iconStyle'/>
       </Grid.Column>
         {this.state.imageUrls.map((image,i) => (
         <Grid.Column key={i} className='imageColumn'>
           <Image id={thumnailImg} src={image} size='medium' onLoad={this.onLoadImg.bind(this)} onClick={ (e) => this.selectedImage(image) }/>
         </Grid.Column>
         ))}
       </Grid>
      {this.state.selectImgUrl === ''? '':<LightBox
        images={[{ src: this.state.selectImgUrl }]}
        isOpen={this.state.lightboxIsOpen}
        onClose={this.closeLightbox.bind(this)}
        showCloseButton={true}
        backdropClosesModal={true}
      />}
       {this.state.width < 700 ? '' : this.state.webcam === true ?<div>
       <Webcam id={this.props.index} ref={this.setRef} screenshotFormat="image/jpeg" className='cameraStyle'/>
        <div className="takePhotoBtn"> <Button positive icon='camera' labelPosition='right' content="Take Picture" onClick={ (e) => this.capture() } /></div>
        </div>:''}
     </div>
    )
  }
}
