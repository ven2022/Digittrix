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
import MultiSelectAll from "./MultiSelectAll";
// import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
class CustomerNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input:{title:"",description:"",selectedOptions:[]},
      pageid:'',filter:[],
    };
  }
  componentDidMount=async()=>{
    let id = this.props.match.params.id;
    this.setState({pageid:id});
    let response= await Api.usersList();
    let filter=[];
        response.data.users.forEach(doc => {
          filter.push({value:doc._id,label:doc.name});
        });
        this.setState({filter:filter,selectedOptions:filter},()=>{
          console.log("this.state.filter",this.state.filter);
        });
  }

  changetitle(event) {
      let input = this.state.input;
      input[event.target.name] = event.target.value;
      this.setState({input});
  }

  //  getDropdownButtonLabel( placeholderButtonLabel, value ) {
  //   if (value && value.some((o) => o.value === "*")) {
  //     return `${placeholderButtonLabel}: All`;
  //   } else {
  //     return `${placeholderButtonLabel}: ${value.length} selected`;
  //   }
  // }

  //  onChange(value, event) {
  //   if (event.action === "select-option" && event.option.value === "*") {
  //     this.setState(this.state.filter);
  //   } else if (
  //     event.action === "deselect-option" &&
  //     event.option.value === "*"
  //   ) {
  //     this.setState([]);
  //   } else if (event.action === "deselect-option") {
  //     this.setState(value.filter((o) => o.value !== "*"));
  //   } else if (value.length === this.state.filter.length - 1) {
  //     this.setState(this.state.filter);
  //   } else {
  //     this.setState(this.state.filter);
  //   }
  // }

  doCreatePost = async(e) => {
    e.preventDefault();
    try{
      let formData=new FormData();
      formData.append('title',this.state.input.title);
      formData.append('description',this.state.input.description);
      formData.append('type','custo');
      for (var i = this.state.selectedOptions.length - 1; i >= 0; i--) {
      formData.append('users',this.state.selectedOptions[i].value);
      }
      let response = await Api.sendnotification(formData);
      if(response.data)
      {
        alert(response.data.message)
      }
      else{
        alert('something went wrong');
      }
      
    }
    catch(e){
     alert(e.message);
    }
    
  }

  render() {
    return (
      <div>
        <h1>Send Notification To Customers</h1>
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

                  <FormGroup>
                  <Label for="input-title">Description</Label>
                  <MultiSelectAll  />
                  

             
                  </FormGroup>
                <div className="d-flex justify-content-end">
                  <ButtonGroup>
                    <Button color="danger" type="submit">
                      {this.props.isFetching ? 'Sending...' : 'Send'}
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



export default withRouter(CustomerNotification);
