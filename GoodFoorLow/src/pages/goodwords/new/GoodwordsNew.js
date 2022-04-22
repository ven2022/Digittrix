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
//import firebase from "firebase";
import axios from 'axios';
import Api from '../../../components/RestApis/Api';
// const db = firebase.firestore();
const options = [
  { value: 'Ambience', label: 'Ambience' },
  { value: 'Food', label: 'Food' }
];
class GoodwordsNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagess:"",
      images:"",
      name:"",
      description:"",formData : new FormData(),
      loadings:false
    };
   
  }
  componentDidMount()
  {
    this.setState({loadings:false,imagess:"",
    images:"",
    name:"",
    description:""})
  }


  submitform = async() => {
 
        if(this.state.imagess=="" || this.state.name=="" || this.state.description=="")
          {
            alert("Please fill all fields");
          }
          else{
          this.state.formData.append('name', this.state.name);
          this.state.formData.append('description', this.state.description);
          try{
          const response= await Api.goodwordsAdd(this.state.formData);
          if(response.data && response.data.status=="success")
          {
            this.props.history.push('/app/goodwords');
          }
          else
          {
            alert(response.error.response.data.message)
          }
          }
          catch(e)
          {
            alert(e.message);
          }
       
       }
      
    }
    handleInput = e => {
      let file = e.target.files[0];
      this.state.formData.append('image', e.target.files[0]);  
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
      var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
      if(streetaddress=="data:image")
      {
      //  this.handleUpload(reader.result)
       this.setState({imagess:reader.result,formData:this.state.formData})
      }
   };}
   changetitle = (event) => {
    this.setState({name: event.target.value});
  }
  onEditorStateChange = (editorState) => {
    this.setState({ editorState }, () => {
      var currentContent = editorState.getCurrentContent();
      var contentRaw = convertToRaw(currentContent);
      const value = currentContent.hasText() ? draftToHtml(contentRaw) : "";
      this.setState({description:value});
    });
  };

   deleteImage(){

    this.setState({imagess:""})
   }
   

  render() {
    return (
      <div>
        <h1>Add New Good Words</h1>
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
                  <Label for="input-title">Name</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Title"
                    value={this.state.name}
                    required
                    onChange={this.changetitle.bind(this)}
                  />
                </FormGroup>
              
              <FormGroup>
              <Label for="input-opening_status">Description</Label>
              <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange.bind(this)}
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



export default withRouter(GoodwordsNew);
