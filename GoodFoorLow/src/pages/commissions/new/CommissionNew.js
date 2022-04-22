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

class CommissionNew extends React.Component {
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
    title: 'Create new Commission',
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      commission_percent: '',
      commission_fix: '',
    };
  }

  changename = (event) => {
    this.setState({name: event.target.value});
  }

  changecommission_percent = (event) => {
    this.setState({commission_percent: event.target.value});
  }
  changecommission_fix = (event) => {
    this.setState({commission_fix: event.target.value});
  }
  
  doCreatePost = (e) => {
    //   db.collection("commission").add({
    //     commission_percent: this.state.commission_percent,
    //     name: this.state.name,
    //     commission_fix: this.state.commission_fix,
    // }).then(() =>
    //     this.setState({
    //       commission_percent: '',
    //       name: '',
    //       commission_fix: "",
    //     }),
    //     this.props.history.push('/app/commissions')
    //   );
    //  e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Create Commission</h1>
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
                    value={this.state.name}
                    required
                    onChange={this.changename}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-commission_percent">Commission Percent</Label>
                  <Input
                    id="input-commission_percent"
                    type="text"
                    placeholder="Commission Percent"
                    value={this.state.commission_percent}
                    onChange={this.changecommission_percent}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-commission_fix">Commission Fix</Label>
                  <Input
                    id="input-commission_fix"
                    type="text"
                    placeholder="Commission Fix"
                    value={this.state.commission_fix}
                    onChange={this.changecommission_fix}
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



export default withRouter(CommissionNew);
