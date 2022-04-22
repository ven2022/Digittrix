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
import Select from 'react-select';
import Widget from '../../../components/Widget';
import { Multiselect } from 'multiselect-react-dropdown';
import { withRouter } from "react-router-dom";
import Api from '../../../components/RestApis/Api';
// import firebase from "firebase";
// const db = firebase.firestore();

class CouponEdit extends React.Component {
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
      amt:0,
      sdata:"",
      selectedCat:[],
      mini:0,
      max:0,
      restlist:[],
      selectedValue:{},forms:[
        {name:'Percentage'},
        {name:'Fixed'},
    ]
    };
  }
  componentDidMount=async()=>{
    let id=this.props.match.params.id;
    try{
      const response = await Api.couponsById(id);
      if(response.data && response.data.user)
      {
        let data=response.data.user;
        this.setState({
          code: data.code ? data.code:"",
          title: data.name ? data.name:"",
          datefrom: data.datefrom ? data.datefrom:"",
          dateto: data.dateto ? data.dateto:"",
          amt:data.amount ? data.amount :0,
          selectedCat:data.restu,
          num:data.count_limit,
          max:data.max,
          mini:data.mini,
          sdata:{name:data.type},});
      }
    }
    catch(e)
    {}    
  }

  changetitle = (event) => {
    this.setState({title: event.target.value});
  }
  forchaneform=(data)=>
  {
   this.setState({sdata:data});
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
  onSelectCat(selectedList, selectedItem) {
    this.setState({selectedCat:selectedList});
}
onRemoveCat(selectedList, removedItem) {
  this.setState({selectedCat:selectedList});
}
datecompare(){
  const g1 = new Date(this.state.datefrom);
  const g2 = new Date(this.state.dateto);
  if (g1.getTime() < g2.getTime())
  {
    return true;
  }
  else
  {
    return "Starting Date Must be Less than Enddate";
  }
}
minlesscompare(){
  if (Number(this.state.mini) < Number(this.state.max))
  {
    return true;
  }
  else
  {
    return "Minimum price Must be Less than Maximum Price";
  }
}
  doCreatePost = async(e) => {
    e.preventDefault();
    let dateco=this.datecompare();
    let priceco=this.minlesscompare();
    if(dateco==true && priceco==true){
    try{
      let formData={'code':this.state.code,'name': this.state.title,'dateto':this.state.dateto,'datefrom':this.state.datefrom,'amount':this.state.amt,'restu':this.state.selectedCat,
    'type':this.state.sdata.name,'mini':this.state.mini,'max':this.state.max,'count_limit':this.state.num,'count':0};
      let id=this.props.match.params.id;
      const response= await Api.couponsUpdateById(id,formData);
      console.log('response',response);
        if(response.data && response.data.status=="success")
        {
          this.props.history.push("/app/coupons");
        }
        else
        {
          alert(response.error.response.data.message);
        }
    }
    catch(e)
    {
    alert(e.message)
    }
    }
    else if(dateco!==true)
    {
      alert(dateco);
    }
    else if(priceco!==true)
    {
      alert(priceco);
    }
    return;
  }
  amount=(event)=>
  {
    this.setState({amt:event.target.value});
  }
  mini(e)
  {
    this.setState({mini:e.target.value});
  }
  max(e)
  {
    this.setState({max:e.target.value});
  }
  num(e)
  {
    this.setState({num:e.target.value});
  }
  render() {
    const {code,title,datefrom,dateto} = this.state;
    return (
      <div>
        <h1>Edit Coupon</h1>
        <Row>
          <Col sm={6}>
              <Form onSubmit={this.doCreatePost}>
                {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                <Label for="input-title">Select Reastaurants</Label>
                <Multiselect
options={this.state.restlist} // Options to display in the dropdown
selectedValues={this.state.selectedCat} // Preselected value to persist in dropdown
onSelect={this.onSelectCat.bind(this)} // Function will trigger on select event
onRemove={this.onRemoveCat.bind(this)} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>
        </FormGroup>
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
                <FormGroup>
                <Label for="input-code">Select Coupon Value Type</Label>
                <Select
                onChange={this.forchaneform.bind(this)}
                options={this.state.forms}
               value={this.state.sdata}
                //  getOptionValue={opt => opt.id}
                placeholder="Select Type of Coupon Value"
                getOptionLabel={opt => opt.name}
                />
                </FormGroup>
                <FormGroup>
                  <Label for="input-datefrom">Start Date</Label>
                  <Input
                    id="input-datefrom"
                    type="date"
                    placeholder="Date From"
                    value={datefrom}
                    onChange={this.changedatefrom}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-dateto">End Date</Label>
                  <Input
                    id="input-dateto"
                    type="date"
                    placeholder="Date To"
                    value={dateto}
                    onChange={this.changedateto}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-code">Code</Label>
                  <Input
                    id="input-code"
                    type="text"
                    placeholder="Code"
                    value={code}
                    required
                    onChange={this.changecode}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-code">Price Value</Label>
                  <Input
                    id="input-code"
                    type="number"
                    placeholder="Price value"
                    value={this.state.amt}
                    required
                    onChange={this.amount.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-code">Minimum Amount</Label>
                  <Input
                    id="input-code"
                    type="text"
                    placeholder="number"
                    value={this.state.mini}
                    required
                    onChange={this.mini.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-code">Maximum</Label>
                  <Input
                    id="input-code"
                    type="number"
                    placeholder="Code"
                    value={this.state.max}
                    required
                    onChange={this.max.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-code">Usage limit</Label>
                  <Input
                    id="input-code"
                    type="number"
                    placeholder="Code"
                    value={this.state.num}
                    required
                    onChange={this.num.bind(this)}
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



export default withRouter(CouponEdit);
