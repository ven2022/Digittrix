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

class CustomerEdit extends React.Component {
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
    description: 'About description',
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      phone: '',
    };
  }
  componentDidMount(){
    // var id = this.props.match.params.id;
    // console.log(id);
    // db.collection("Users").doc(id).get().then((docRef) => { 
    // var data = docRef.data();
    // this.setState({
    //     email: data.email,
    //     phone: data.phone,
    //     first_name: data.first_name,
    //     last_name: data.last_name,
    //     });
    //  })
    // .catch((error) => { 

    // })
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
    // var id = this.props.match.params.id;
    // db.collection('Users').doc(id).update({
    //     email: this.state.email,
    //     first_name: this.state.first_name,
    //     last_name: this.state.last_name,
    //     phone: this.state.phone,
    //     });
    //  e.preventDefault();
  }

  render() {
    const {email,first_name,last_name,phone} = this.state;
    return (
      <div>
        <h1>Edit Customer</h1>
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
                  <Label for="input-fname">Name</Label>
                  <Input
                    id="input-fname"
                    type="text"
                    placeholder="First Name"
                    value={first_name}
                    required
                    onChange={this.changefname}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="input-lname">Last Name</Label>
                  <Input
                    id="input-lname"
                    type="text"
                    placeholder="Last Name"
                    value={last_name}
                    required
                    onChange={this.changel_name}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-email">Email</Label>
                  <Input
                    id="input-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.changeemail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-phone">Phone</Label>
                  <Input
                    id="input-phone"
                    type="number"
                    placeholder="Phone"
                    value={phone}
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



export default withRouter(CustomerEdit);
