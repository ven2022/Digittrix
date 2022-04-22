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
class StoreNew extends React.Component {
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
      fimage:'',formData:new FormData()
    };
  }

  changetitle = (event) => {
    this.setState({title: event.target.value});
  }

  doCreatePost = async(e) => {
    e.preventDefault();
    try{
      this.state.formData.append('name',this.state.title);
      this.state.formData.append('status',1);
      let response = await Api.storeAdd(this.state.formData);
      if(response.data && response.data.status=='success')
      {
        this.props.history.push('/app/store');
      }
      else
      {
        alert(response.error.response.data.message);
      }
    }
    catch(e){
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
    return (
      <div>
        <h1>Create New Store Category</h1>
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
                    value={this.state.title}
                    required
                    onChange={this.changetitle}
                  />
                </FormGroup>
                <FormGroup >
                  <Label for="featured_image">Banner Image</Label>
                  <input type="file" className="form-control" onChange={this.handleInput2.bind(this)}/>              
                </FormGroup> 
                <div class="row">
                  <div className="form-group multi-preview">{this.state.fimage!=="" ? 
                    <div class="col-sm-4 col-md-3">
                        <div className="multiimages">
                        <i class="fa fa-times-circle" onClick={this.deleteImage2.bind(this)}></i>
                        <img src={this.state.fimage} alt="Snow" defaultstyle="width:100%" className="w-100"/>
                        </div>
                      </div>:""} 
                    </div>  
                  </div>
                <div className="d-flex justify-content-end">
                  <ButtonGroup>
                    <Button color="danger" type="submit">
                      {this.props.isFetching ? 'Creating...' : 'Create'}
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



export default withRouter(StoreNew);
