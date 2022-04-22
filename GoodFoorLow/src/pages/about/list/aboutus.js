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
import Api from '../../../components/RestApis/Api';
// import firebase from "firebase";
// const db = firebase.firestore();
class aboutus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      description:"",
      loadings:false
    };
   
  }
  componentDidMount=async()=>
  {      
    try{
       let response= await Api.pageById('6217670bf8c91e3c1599664e');
       if(response && response.data.status=="success")
       {
          this.setState({title:response.data.user.title,editorState: response.data.user.description ? EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(response.data.user.description)
              )):"",
              loadings:false});
       }
     }
     catch(e)
     {  
     }
  }
  changetitle = (event) => {
    this.setState({title: event.target.value});
  }
  onEditorStateChange = (editorState) => {
    this.setState({ editorState }, () => {
      var currentContent = editorState.getCurrentContent();
      var contentRaw = convertToRaw(currentContent);
      const value = currentContent.hasText() ? draftToHtml(contentRaw) : "";
      this.setState({description:value});
    });
  };

  submitform = async() => {
if(this.state.loadings==false)
{
    if(this.state.description=="" || this.state.title=="")
     {
       alert("Please fill all fields");
     }
     else{
    this.setState({loadings:true},async()=>
    {
      try{
      var formData = new FormData();
      formData.append('title', this.state.title);
      formData.append('description', this.state.description);
      const response= await Api.pageUpdateById('6217670bf8c91e3c1599664e',formData);
      if(response.data && response.data.status=="success")
      {
        alert(response.data.message);
        this.componentDidMount();
      }
      else
      {
        alert(response.error.response.data.message);
      }
    }
    catch(e)
    {  
      alert(e.message);
    }
    });
      
        }
      }
    }
   

  render() {
    return (
      <div>
        <h1>Update About Us Page</h1>
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
                  <Label for="input-title">Title</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Title"
                    value={this.state.title}
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
         

    
                                    
               
                <div className="d-flex justify-content-end">
                  <ButtonGroup>
                    <Button color="danger" type="button" onClick={this.submitform.bind(this)}>
                      {this.state.loadings==true ? 'updateing...' : 'Update'}
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



export default withRouter(aboutus);
