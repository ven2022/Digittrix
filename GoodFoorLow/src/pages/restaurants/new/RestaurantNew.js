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
  CustomInput,
  Label,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import axios from "axios";
import Widget from '../../../components/Widget';
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import Geocode from "react-geocode";
import Select from 'react-select';
import $ from 'jquery';
import Api from '../../../components/RestApis/Api';
import validator from 'validator';
// const db = firebase.firestore();
const options = [
  { value: 'Own', label: 'Own' },
  { value: 'Goodforlow', label: 'Goodforlow' }
];
const google = window.google
class RestaurantNew extends React.Component {
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
      name: '',
      restaurant_email: '',
      restaurant_owner: '',
      emailError:'',
      restaurant_url: '',
      status: 1,
      address: "",
      phone_no: "",
      description:"",
      password:"",
      title:"",
      city:"",
      aboutus:"",
      loading:false,
      loadings:false,
      timing:"",
      Latitude:0,
      Longitude:0,
      images:[],fimage:"",banner:{},fileObj:[],
      fileArray:[],files:[],gmapsLoaded: false,imagess:[],commission:"",formData:new FormData(),selectedOption: null,optionstype:[],store_id:"",
    };
   
  }
  componentDidMount=async()=>
  {
     setTimeout(() => {
       this.initMap();
     }, 2000);
     let response= await Api.storeList();
      if(response && response.data.status=="success")
      {
        let newval=[];
        for (var i = 0; i < response.data.users.length; i++) {
          newval.push({value:response.data.users[i]._id,label:response.data.users[i].name});
        }
        this.setState({optionstype:newval});
      }

  }
  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }

  handleChangeDrop = (selectedOption) => {
    this.setState({ selectedOption:selectedOption,store_id:selectedOption.value })
  };

  changename = (event) => {
    this.setState({name: event.target.value});
  }
  changetitle = (event) => {
    this.setState({title: event.target.value});
  }
  changerestaurant_email = (event) => {
    if (!validator.isEmail(event.target.value)) {
      this.setState({emailError:'Enter valid Email!'});
    }
    else
    {
      this.setState({emailError:''});
    }
    this.setState({restaurant_email: event.target.value});
  }
  changerestaurant_url = (event) => {
    this.setState({restaurant_url: event.target.value});
  }
  changephone_no = (event) => {
    this.setState({phone_no: event.target.value});
  }
  timingh(e)
  {
    this.setState({timing:e.target.value});
  }

  commission = (e)=>
  {
  this.setState({commission:e.target.value});
  }

 handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({Latitude:latLng.lat,Longitude:latLng.lng,permanent_address:latLng,address:address});
      })
      .catch(error => console.error('Error', error));
  };



  
  storerestu=async()=>
  {
    if(validator.isEmail(this.state.restaurant_email)){
    try{
    // let newarray=[];
    // newarray.push(parseFloat(this.state.Longitude));
    // newarray.push(parseFloat(this.state.Latitude));
    // let latlong={'type':'Point','coordinates':newarray};
    this.state.formData.append('name', this.state.name);
    this.state.formData.append('restaurant_email', this.state.restaurant_email);
    this.state.formData.append('restaurant_url', this.state.restaurant_url);
    this.state.formData.append('timings', this.state.timing);
    this.state.formData.append('status', this.state.status);
    this.state.formData.append('address', this.state.address);
    this.state.formData.append('phone_no', this.state.phone_no);
    this.state.formData.append('description', this.state.description);
    this.state.formData.append('title', this.state.title);
    this.state.formData.append('commission', this.state.commission);
    this.state.formData.append('about_us', this.state.aboutus);
    //this.state.formData.append('location',latlong);
    this.state.formData.append('Longitude', this.state.Longitude);
    this.state.formData.append('Latitude', this.state.Latitude);
    this.state.formData.append('password', this.state.password);
    this.state.formData.append('store_id', this.state.store_id);
    this.state.formData.append('discover', false);
    this.state.formData.append('ratting', 0);   
    const response= await Api.restaurantsAdd(this.state.formData);
    if(response.data && response.data.status=="success")
    {
      this.sendemail(this.state.name,this.state.restaurant_email);
      console.log("response.data",response.data);
      alert(response.data.message);
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
  }else
  {
    alert("Please Enter Valid Email");
  }
  }
  sendemail(a,b)
  {
    var body={name:a,email:b};
    axios.post('https://digittrix-staging.live/webci/foodapi/send_email',body,{
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    },
    }).then((res) => {
      this.setState({loadings:false});
      this.props.history.push("/app/restaurants");
    })
  }

  handleInput = e => {
    let file = e.target.files[0];
    console.log('e.target.files[0]',e.target.files[0]);
    this.state.formData.append('banner_image',e.target.files[0]);  
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
    var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
    if(streetaddress=="data:image")
    {
    //  this.handleUpload(reader.result)
     this.state.imagess.push(reader.result);
     this.setState({imagess:this.state.imagess,formData:this.state.formData})
    }
 };}

handleInput2 = e =>
{
  this.state.formData.append('featured_images',e.target.files[0]);
  let file = e.target.files[0];  
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
  var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
  if(streetaddress=="data:image")
  {
   this.setState({fimage:reader.result,formData:this.state.formData});
  }
  };
}

deleteImage2()
{
  this.setState({fimage:""});
}

// handleUpload =(data)=>{
// var body={image:data};
// axios.post('https://digittrix.com/staging/soldat/imageurltwo',body, {
//   headers: {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// },
// }).then((res) => {
//   this.state.images.push(res.data.image);
  
// this.setState({images:this.state.images});
// })
// }
  password(e)
  {
    this.setState({password:e.target.value});
  }

  deleteImage(e)
  {
    this.state.imagess.splice(e.currentTarget.id,1);
    this.setState({imagess:this.state.imagess});
  }
  onEditorStateChange = (editorState) => {
    this.setState({ editorState }, () => {
      var currentContent = editorState.getCurrentContent();
      var contentRaw = convertToRaw(currentContent);
      const value = currentContent.hasText() ? draftToHtml(contentRaw) : "";
      this.setState({description:value});
    });
  };
  aboutus = (e) => {
      this.setState({aboutus:e.target.value});
  };
  submitform = async() => {
      if(this.state.loadings==false)
        {
        if(this.state.name=="" || this.state.timing=="" || this.state.fimage=="" || this.state.commission==""
        || this.state.restaurant_email=="" || this.state.status=="" || this.state.address==""
        || this.state.phone_no=="" || this.state.description=="" || this.state.title=="" || this.state.aboutus=="")
        {
         alert("Please fill all fields");
        }
        else{
        if(this.state.imagess.length>0)
        {
        this.setState({loadings:true},()=>
        {
        this.storerestu();
        });
        }
        else
        {
        alert("please select minimum 1 images");
        }
          }
      }
    }

  render() {
    return (
      <div>
        <h1>Create New Restaurant</h1>
        <Row>
          <Col sm={12}>
            <Widget
              title={
                <span>
                  Add Restaurant
                </span>
              }
            >
              <div>
                {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                <Label for="input-title">Store Type</Label>
                <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeDrop.bind(this)}
                options={this.state.optionstype}
                />
                </FormGroup>
                <FormGroup>
                  <Label for="input-title">Name</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Restaurant Name"
                    value={this.state.name}
                    required
                    onChange={this.changename.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-title">Title</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Title"
                    value={this.state.title}
                    required
                    onChange={this.changetitle.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-datefrom">Email</Label>
                  <Input
                    id="input-datefrom"
                    type="email"
                    placeholder="Email"
                    value={this.state.restaurant_email}
                    onChange={this.changerestaurant_email.bind(this)}
                  />
                  {this.state.emailError!=="" ? <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{this.state.emailError}</span> :""}
                </FormGroup>
                <FormGroup>
                  <Label for="input-phone_no">Phone No</Label>
                  <Input
                    id="input-phone_no"
                    type="number"
                    placeholder="Phone No"
                    value={this.state.phone_no}
                    onChange={this.changephone_no.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-restaurant_url">Restaurant Url</Label>
                  <Input
                    id="input-restaurant_url"
                    type="text"
                    placeholder="Restaurant Url"
                    value={this.state.restaurant_url}
                    onChange={this.changerestaurant_url.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-timing">Timing</Label>
                  <Input
                    id="input-timing"
                    type="text"
                    placeholder="Timing"
                    value={this.state.timing}
                    onChange={this.timingh.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                <Label for="input-autocomplete">Address</Label>
                {this.state.gmapsLoaded && (
                <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange.bind(this)}
                onSelect={this.handleSelect.bind(this)}
                id='delta'
                >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input 
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-control',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>

          
        )}
      </PlacesAutocomplete>)}
           
                </FormGroup>
              <FormGroup>
              <Label for="input-opening_status">Description</Label>
              <Editor
              editorState={this.state.editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange.bind(this)}
              />
                      </FormGroup>
              {/* <FormGroup>
              <Label for="input-opening_status">About us</Label>
              <Text className="text-muted" onChnage={this.aboutus.bind(this)}>
     Enter about us
    </Text>
              </FormGroup> */}
    
                      <FormGroup>
                  <Label for="input-phone_no">About us</Label>
                  <Input
                    id="input-abpit"
                    type="text"
                    placeholder="About us"
                    value={this.state.aboutus}
                    onChange={this.aboutus.bind(this)}

                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-phone_no">Password</Label>
                  <Input
                    id="input-password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.password.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-phone_no">Commission</Label>
                  <Input
                    id="input-percentage"
                    type="text"
                    placeholder="Percentage"
                    value={this.state.commission}
                    onChange={this.commission.bind(this)}
                  />
                </FormGroup>
                <FormGroup>


                </FormGroup>
                <FormGroup >
                <Label for="featured_image">Banner Image</Label>
                <input type="file" className="form-control" onChange={this.handleInput2.bind(this)}/>              
                </FormGroup> 
                <div class="row">
                <div className="form-group multi-preview">{this.state.fimage!=="" ? 
                <div class="col-sm-4 col-md-3">
                <div className="multiimages">
                <i class="fa fa-times-circle" onClick={this.deleteImage2.bind(this)}></i>
                <img src={this.state.fimage} alt="Snow" defaultstyle="width:100%" className="w-100"/>
                </div>
                </div>:""}
                </div>  
                </div> 
                <FormGroup sm={6} >
                <Label for="featured_image">Multiple Images</Label>
                <input type="file" className="form-control" onChange={this.handleInput.bind(this)} />              
                </FormGroup>  
                <div class="row">
                  <div className="form-group multi-preview">
                    {(this.state.imagess || []).map((url,i)=>{
                      return(
                        <div class="col-sm-4 col-md-3">
                          <div className="multiimages">
                          <i class="fa fa-times-circle" id={i} onClick={this.deleteImage.bind(this)}></i>
                          <img src={url} alt="Snow" defaultstyle="width:100%" className="w-100"/>
                          </div>
                        </div>
                      
                    )})}
                </div>  
                </div>     
                <div className="d-flex justify-content-end">
                  <ButtonGroup>
                    <Button color="danger" type="button" onClick={this.submitform.bind(this)}>
                      {this.state.loadings==true ? 'Creating...' : 'Add Restaurant'}
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}



export default withRouter(RestaurantNew);
