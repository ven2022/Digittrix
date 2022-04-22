import React from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup,
  Alert,
  CustomInput,
  Label,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import Widget from '../../../components/Widget';
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import Select from 'react-select';
import axios from 'axios';
const db = firebase.firestore();
const options = [
  { value: 'Ambience', label: 'Ambience' },
  { value: 'Food', label: 'Food' }
];
class GalleryNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      imagess:"",
      images:"",
      loadings:false
    };
   
  }
  componentDidMount()
  {
    this.setState({loadings:false,selectedOption: null,
      imagess:"",
      images:"",})
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  submitform = async() => {
if(this.state.loadings==false)
{
    if(this.state.imagess=="" || this.state.selectedOption=="" || this.state.selectedOption==null)
     {
       alert("Please fill all fields");
     }
     else{
    this.setState({loadings:true},()=>
    {
var body={image:this.state.imagess};
axios.post('https://digittrix-staging.live/webci/foodapi/imageurltwo',body, {
  headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
},
}).then((res) => {
  if(res.data.image!=="")
  {
    db.collection("gallerys").add({
      category:this.state.selectedOption.value,
      image:res.data.image
  })
  this.componentDidMount();
  }
})
});}}
    }
    handleInput = e => {
      let file = e.target.files[0];  
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
      var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
      if(streetaddress=="data:image")
      {
      //  this.handleUpload(reader.result)
       this.setState({imagess:reader.result})
      }
   };}


   deleteImage(){

    this.setState({imagess:""})
   }
   

  render() {
    return (
      <div>
        <h1>Create New Gallery Images</h1>
        <Row>
          <Col sm={12}>
            <Widget
       
            >
              <div>
                {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                
                <FormGroup>
                  <Label for="input-title">Select Category</Label>
                <Select
        value={this.state.selectedOption}
        onChange={this.handleChange.bind(this)}
        options={options}
      />
       </FormGroup>

                <FormGroup >
  <Label for="featured_image">Images</Label>
 <input type="file" className="form-control" onChange={this.handleInput.bind(this)}/>              
 </FormGroup>  
 <div class="row">
                  <div className="form-group multi-preview">
                 {this.state.imagess!=="" ?  <div class="col-sm-4 col-md-3">
                          <div className="multiimages">
                          <i class="fa fa-times-circle" onClick={this.deleteImage.bind(this)}></i>
                          <img src={this.state.imagess} alt="Snow" defaultstyle="width:100%" className="w-100"/>
                          </div>
                        </div>:""}
                     
                       
                
                </div>  
                </div> 

    
                                    
               
                <div className="d-flex justify-content-end">
                  <ButtonGroup>
                    <Button color="danger" type="button" onClick={this.submitform.bind(this)}>
                      {this.state.loadings==true ? 'Creating...' : 'Create'}
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}



export default withRouter(GalleryNew);
