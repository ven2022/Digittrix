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
// import firebase from "firebase";
// const db = firebase.firestore();

class CustomerNew extends React.Component {
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
    title: 'Create new Customer',
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
    };
  }

  changefname = (event) => {
    this.setState({first_name: event.target.value});
  }
  changelname = (event) => {
    this.setState({last_name: event.target.value});
  }
  changeemail = (event) => {
    this.setState({email: event.target.value});
  }
  changephone = (event) => {
    this.setState({phone: event.target.value});
  }
  
  doCreatePost = (e) => {
    //   db.collection("Users").add({
    //     email: this.state.email,
    //     first_name: this.state.first_name,
    //     last_name: this.state.last_name,
    //     phone: this.state.phone,
    // }).then(() =>
    //     this.setState({
    //       email: '',
    //       first_name: '',
    //       last_name: '',
    //       phone: "",
    //     }),
    //     this.props.history.push('/app/customers')
    //   );
    //  e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Create new Customer</h1>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <span>
                  Add Customer
                </span>
              }
            >
              <Form onSubmit={this.doCreatePost}>
                {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                  <Label for="input-fname">First Name</Label>
                  <Input
                    id="input-fname"
                    type="text"
                    placeholder="First Name"
                    value={this.state.first_name}
                    required
                    onChange={this.changefname}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-name">Last Name</Label>
                  <Input
                    id="input-name"
                    type="text"
                    placeholder="Last Name"
                    value={this.state.last_name}
                    required
                    onChange={this.changelname}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-email">Email</Label>
                  <Input
                    id="input-email"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.changeemail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-phone">Phone</Label>
                  <Input
                    id="input-phone"
                    type="number"
                    placeholder="Phone"
                    value={this.state.phone}
                    onChange={this.changephone}
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
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}



export default withRouter(CustomerNew);
