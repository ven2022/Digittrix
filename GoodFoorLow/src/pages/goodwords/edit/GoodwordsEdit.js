import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup,
  Alert,
  Label,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { withRouter } from "react-router-dom";
import firebase from "firebase";
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
import axios from 'axios';
import Api from '../../../components/RestApis/Api';
// const db = firebase.firestore();
const apiurl="http://172.105.159.222:5000/";
class GoodwordsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      imagess:"",
      images:"",
      name:"",
      loadings:false,
      loaded:false
    };
  }
  componentDidMount=async()=>{
    var id = this.props.match.params.id;
    try{
      const response = await Api.goodwordsById(id);
      if(response && response.data.user)
      {
        let data=response.data.user;
        this.setState({
          imagess: apiurl+data.image,
          name:data.name,
          editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(data.description)
            )),
            loadings:false,
            loaded:false
            });
      }
    }
    catch(e)
    {}
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

    let id = this.props.match.params.id;
if(this.state.loadings==false)
{
    if(this.state.imagess=="" || this.state.name=="" || this.state.description=="")
     {
       alert("Please fill all fields");
     }
     else{
    this.setState({loadings:true},async()=>
    {
      if(this.state.loaded==true)
      {
        let body={image:this.state.imagess};
        axios.post('https://digittrix-staging.live/webci/foodapi/imageurltwo',body, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        }).then(async(res) => {
        if(res.data.image!=="")
        {
        try{
          let formData = new FormData();
          formData.append('name', this.state.name);
          formData.append('image', res.data.image);
          formData.append('description', this.state.description);
          let id=this.props.match.params.id;
          const response= await Api.restaurantsUpdateById(id,formData);
            if(response && response.data.status=="success")
            {
              this.props.history.push("/app/goodwords");
            }
            else
            {
              alert("something went wrong");
            }
        }
        catch(e)
        {
        alert(e.message)
        }
        }
        })
      }
      else
      {
      try{
        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('image', this.state.imagess);
        formData.append('description', this.state.description);
        let id=this.props.match.params.id;
        const response= await Api.goodwordsUpdateById(id,formData);
        console.log('respo',response)
          if(response.data && response.data.status=="success")
          {
            this.props.history.push("/app/goodwords");
          }
          else
          {
            alert(response.error.response.data.message);
          }
      }
      catch(e)
      {
      alert(e.message)
      }
      }


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
       this.setState({imagess:reader.result,loaded:true});
      }
   };}
  deleteImage()
  {
    this.setState({imagess:""});
  }
  changetitle = (event) => {
    this.setState({name: event.target.value});
  }

  render() {
    const {code,title,datefrom,dateto} = this.state;
    return (
      <div>
        <h1>Edit Good words</h1>
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
                    placeholder="Name"
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
                 {this.state.imagess!==""  ?  <div class="col-sm-4 col-md-3">
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
                      {this.state.loadings==true ? 'Updateing...' : 'Update'}
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
export default withRouter(GoodwordsEdit);
