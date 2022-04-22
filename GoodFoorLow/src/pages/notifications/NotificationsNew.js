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
import Widget from '../../components/Widget';
import { withRouter } from "react-router-dom";
import Api from '../../components/RestApis/Api';
class NotificationsNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input:{title:"",description:""},
      pageid:''
    };
  }
  componentDidMount(){
    let id = this.props.match.params.id;
    this.setState({pageid:id});
  }

    changetitle(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({input});
    }

  doCreatePost = async(e) => {
    e.preventDefault();
    try{
      let formData=new FormData();
      formData.append('title',this.state.input.title);
      formData.append('description',this.state.input.description);
      formData.append('pageid',this.state.pageid);
      let response = await Api.notificationAdd(formData);
      if(response.data && response.data.status=='success')
      {
        if(this.state.pageid==2){
          this.props.history.push('/app/notifications/restaurant');
        }
        else if(this.state.pageid==1)
        {
          this.props.history.push('/app/notifications/customer');
        }
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
        <h1>Create New Notification</h1>
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
                  <Label for="input-title">Title</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={this.state.input.title}
                    required
                    onChange={this.changetitle.bind(this)}
                  />
                </FormGroup>
                  <FormGroup>
                  <Label for="input-title">Description</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={this.state.input.description}
                    required
                    onChange={this.changetitle.bind(this)}
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



export default withRouter(NotificationsNew);
