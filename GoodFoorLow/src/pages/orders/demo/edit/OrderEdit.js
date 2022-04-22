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
import firebase from "firebase";
const db = firebase.firestore();

class OrderEdit extends React.Component {
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
    var id = this.props.match.params.id;
    console.log(id);
    db.collection("orders").doc(id).get().then((docRef) => { 
    var data = docRef.data();
    this.setState({
        email: data.email,
        phone: data.phone,
        name: data.name,
        });
     })
    .catch((error) => { 

    })
  }

changename = (event) => {
    this.setState({name: event.target.value});
  }

  changeemail = (event) => {
    this.setState({email: event.target.value});
  }
  changephone = (event) => {
    this.setState({phone: event.target.value});
  }

  doCreatePost = (e) => {
    var id = this.props.match.params.id;
    db.collection('orders').doc(id).update({
        email: this.state.email,
        name: this.state.name,
        phone: this.state.phone,
        });
     e.preventDefault();
  }

  render() {
    const {email,name,phone} = this.state;
    return (
      <div>
        <h1>Edit Customer</h1>
        <Row>
          <Col sm={6}>
              <Form onSubmit={this.doCreatePost}>
                {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                  <Label for="input-name">Name</Label>
                  <Input
                    id="input-name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    required
                    onChange={this.changename}
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
          </Col>
        </Row>
      </div>
    );
  }
}



export default withRouter(OrderEdit);
