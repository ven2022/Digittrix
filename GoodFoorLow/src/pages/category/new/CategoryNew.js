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



class CategoryNew extends React.Component {
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

  changetitle = (event) => {
    this.setState({title: event.target.value});
  }

  doCreatePost = async(e) => {
    e.preventDefault();
    try{
      let response = await Api.categoriesAdd(this.state.title);
      if(response.data && response.data.status=='success')
      {
        this.props.history.push('/app/category');
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

  render() {
    return (
      <div>
        <h1>Create New Category</h1>
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



export default withRouter(CategoryNew);
