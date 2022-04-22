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
import { connect } from 'react-redux';
import Widget from '../../../components/Widget';
import { withRouter } from "react-router-dom";
import Api from '../../../components/RestApis/Api';
const apiurl="http://172.105.159.222:5000/";

class StoreEdit extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    isFetching: false,
    message: null,
  };

  static meta = {
    title: 'Create new post',
    description: 'About description',
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      fimage:'',
      formData:new FormData()
    };
  }
  componentDidMount=async()=>{
     let id = this.props.match.params.id;
    try{
       let response= await Api.storeById(id);
       if(response && response.data.status=="success")
       {
          this.setState({title:response.data.user.name,dbimage:apiurl+response.data.user.image});
       }
     }
     catch(e)
     {  
     }
  }

  changetitle = (event) => {
    this.setState({title: event.target.value});
  }

  doCreatePost = async(e) => {
    e.preventDefault();
    let id = this.props.match.params.id;
    try{
      this.state.formData.append('name',this.state.title);
      const response= await Api.storeUpdateById(id,this.state.formData);
      if(response.data && response.data.status=="success")
      {
        this.props.history.push('/app/store');
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
    
  }

  handleInput2 = e =>
{
  this.state.formData.append('image',e.target.files[0]);
  let file = e.target.files[0];  
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
  var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
  if(streetaddress=="data:image")
  {
   this.setState({fimage:reader.result,formData:this.state.formData});
  }
  };
}

deleteImage2()
{
  this.state.formData.append('image',"");
  this.setState({fimage:""});
}

  render() {
    const {title} = this.state;
    return (
      <div>
        <h1>Edit Store Category</h1>
         <div class="editdiv_in">
        <Row>
          <Col sm={6}>
              <Form onSubmit={this.doCreatePost}>
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
                    value={title}
                    required
                    onChange={this.changetitle}
                  />
                </FormGroup>
                <FormGroup >
                  <Label for="featured_image">Banner Image</Label>
                  <input type="file" className="form-control" onChange={this.handleInput2.bind(this)}/>              
                </FormGroup> 
                <div class="row">
                  <div className="form-group multi-preview">
                    <div class="col-sm-4 col-md-3">
                        <div className="multiimages">
                        <i class="fa fa-times-circle" onClick={this.deleteImage2.bind(this)}></i>
                        <img src={this.state.fimage!=='' ? this.state.fimage :this.state.dbimage} alt="Snow" defaultstyle="width:100%" className="w-100"/>
                        </div>
                      </div>
                    </div>  
                  </div>
                <div className="d-flex justify-content-end">
                  <ButtonGroup>
                    <Button color="danger" type="submit">
                      {this.props.isFetching ? 'Creating...' : 'Update'}
                    </Button>
                  </ButtonGroup>
                </div>
              </Form>
          </Col>
        </Row>
        </div>
      </div>
    );
  }
}



export default withRouter(StoreEdit);
