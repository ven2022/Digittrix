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

class CouponNew extends React.Component {
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
      code: '',
      title: '',
      datefrom: '',
      dateto: '',
    };
  }

  changetitle = (event) => {
    this.setState({title: event.target.value});
  }

  changecode = (event) => {
    this.setState({code: event.target.value});
  }
  changedatefrom = (event) => {
    this.setState({datefrom: event.target.value});
  }
  changedateto = (event) => {
    this.setState({dateto: event.target.value});
  }

  doCreatePost = (e) => {
      db.collection("coupons").add({
        code: this.state.code,
        name: this.state.title,
        datefrom: this.state.datefrom,
        dateto: this.state.dateto,
    }).then(() =>
        this.setState({
          code: '',
          title: '',
          datefrom: "",
          dateto: "",
        }),
        this.props.history.push('/app/coupons')
      );
     e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Create new Coupon</h1>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <span>
                  Add Coupon
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
                <FormGroup>
                  <Label for="input-datefrom">Start Date</Label>
                  <Input
                    id="input-datefrom"
                    type="date"
                    placeholder="Date datefrom"
                    value={this.state.datefrom}
                    onChange={this.changedatefrom}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-dateto">End Date</Label>
                  <Input
                    id="input-dateto"
                    type="date"
                    placeholder="Date To"
                    value={this.state.dateto}
                    onChange={this.changedateto}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-code">Code</Label>
                  <Input
                    id="input-code"
                    type="text"
                    placeholder="Code"
                    value={this.state.code}
                    required
                    onChange={this.changecode}
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



export default withRouter(CouponNew);
