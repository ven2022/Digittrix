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
// import firebase from "firebase";
// const db = firebase.firestore();

class CategoryEdit extends React.Component {
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
    };
  }
  componentDidMount=async()=>{
     let id = this.props.match.params.id;
    try{
       let response= await Api.categoriesById(id);
       if(response && response.data.status=="success")
       {
          this.setState({title:response.data.user.name});
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
      const response= await Api.categoriesUpdateById(id,this.state.title);
      if(response.data && response.data.status=="success")
      {
        this.props.history.push('/app/category');
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

  render() {
    const {title} = this.state;
    return (
      <div>
        <h1>Edit Category</h1>
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



export default withRouter(CategoryEdit);
