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
const db = firebase.firestore();
const options = [
  { value: 'Ambience', label: 'Ambience' },
  { value: 'Food', label: 'Food' }
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
    let private_key = "AIzaSyDM4LDXtUX7rM-FHenlmmXZ7jbfbczfqWk";
    this.state = {
      name: '',
      restaurant_email: '',
      restaurant_owner: '',
      restaurant_url: '',
      status: 1,
      commission:"",
      address: "",
      phone_no: "",
      description:"",
      password:"",
      title:"",
      aboutus:"",
      loading:false,
      loadings:false,
      timing:"",
      delivery:"",
      images:[],fimage:"",banner:"",
      api_key:private_key,fileObj:[],
      fileArray:[],files:[],gmapsLoaded: false,imagess:[],selectedOption: null
    };
   
  }
  componentDidMount()
  {
    window.initMap = this.initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDM4LDXtUX7rM-FHenlmmXZ7jbfbczfqWk&libraries=places&callback=initMap`;
    // https://maps.googleapis.com/maps/api/js?key=SECRET_EATING&libraries=places&callback=initMap
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
  }
  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }

  changename = (event) => {
    this.setState({name: event.target.value});
  }
  changetitle = (event) => {
    this.setState({title: event.target.value});
  }
  changerestaurant_email = (event) => {
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
  handleChanges = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };


 handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.setState({Latitude:latLng.lat,Longitude:latLng.lng,permanent_address:latLng});
        this.fetchAddress(latLng.lat,latLng.lng);
      })
      .catch(error => console.error('Error', error));
  };

  fetchAddress(lati,lngi)
       {

         Geocode.setApiKey("AIzaSyDM4LDXtUX7rM-FHenlmmXZ7jbfbczfqWk");
         Geocode.setLanguage("en");
         Geocode.setRegion("es");
         Geocode.setLocationType("ROOFTOP");
         Geocode.enableDebug();
         Geocode.fromLatLng(lati,lngi).then(
            (response) => {
              const address = response.results[0].formatted_address;
              let city, state, country;
              for (let i = 0; i < response.results[0].address_components.length; i++) {
                for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                  switch (response.results[0].address_components[i].types[j]) {
                    case "locality":
                      city = response.results[0].address_components[i].long_name;
                      break;
                    case "administrative_area_level_1":
                      state = response.results[0].address_components[i].long_name;
                      break;
                    case "country":
                      country = response.results[0].address_components[i].long_name;
                      break;
                  }
                }
              }
              this.setState({address: city+", "+state+", "+country,city:city});
            },
            (error) => {
              console.error(error);
            }
          );
          

            // this.getDocumentNearBy(lati, lngi, 50);
      
       }
  // uploadbtn()
  // {
  
  // }
  // handleInput(e)
  // {
 
  //     this.state.fileObj.push(e.target.files)
  //     var nwarray=[];
  //     for (let i = 0; i < this.state.fileObj[0].length; i++) {
  //         this.state.fileArray.push(URL.createObjectURL(this.state.fileObj[0][i]))
  //         let reader = new FileReader();
  //         reader.readAsDataURL( e.target.files[i]);
  //         reader.onloadend = () => {
  //         var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
  
  //         if(streetaddress=="data:image")
  //         {
  //           this.state.files.push(reader.result);
  //           // this.state.files.push("^");
  //           nwarray.push(reader.result);
           
  //         }
  //       }
  //     }
  //     setTimeout(() => {
  //          const body={image:nwarray.join("^")};
  //       axios.post('https://digittrix.com/staging/soldat/multipleimage',body, {
  //         headers: {
  //         Accept: 'multipart/form-data',
  //          "Content-Type": 'multipart/form-data',
  //          },
  //         })
  //         .then((res) => {
  //           console.log('fetch images',res);
  //           this.setState({images:res.data.file});
  //         })
  //     }, 1000);
     

  //     this.setState({ files:this.state.files });
     
  // }

  getImages()
  {
    console.log('stetrep 2 under imges');
    const body={image:this.state.imagess.join("^")};
    axios.post('https://digittrix-staging.live/webci/foodapi/multipleimage',body, {
      headers: {
      Accept: 'multipart/form-data',
       "Content-Type": 'multipart/form-data',
       },
      })
      .then((res) => {
        console.log('fetchimages',res)
        this.setState({images:res.data.file},()=>
        {
this.getbannerimage();
        });
      })
  }
  getbannerimage()
  {
    var body={image:this.state.fimage};
axios.post('https://digittrix-staging.live/webci/foodapi/imageurltwo',body, {
  headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
},
}).then((res) => {
  if(res.data.image!=="")
  {
    this.setState({banner:res.data.image},()=>
    {
      this.storerestu();
    })
  }
})
  }

  
  storerestu=async()=>
  {
    console.log('under thired');
    const authusers = await firebase.auth().createUserWithEmailAndPassword(this.state.restaurant_email,this.state.password);
    if(authusers.user.uid)
    {
        const userRef = await db.collection('restaurant').doc(authusers.user.uid).set({
        name: this.state.name,
        restaurant_email: this.state.restaurant_email,
        restaurant_url: this.state.restaurant_url,
        city: this.state.city,
        timings:this.state.timing,
        status: this.state.status,
        address: this.state.address,
        phone_no: this.state.phone_no,
        description:this.state.description,
        title:this.state.title,
        commission:this.state.commission,
        delivery_type:this.state.selectedOption.value,
        banner_image:this.state.banner,
        featured_images:this.state.images,
        about_us:this.state.aboutus,
        lat:this.state.Latitude,
        lng:this.state.Longitude,
        restaurant_id:authusers.user.uid,
        resturent_id:authusers.user.uid,
        ratting:0,
        });
        var body={uid:authusers.user.uid,name:this.state.name,email:this.state.restaurant_email,
        title:this.state.title,lat:this.state.Latitude,long:this.state.Longitude,featured_images:this.state.banner};
        axios.post('https://digittrix-staging.live/webci/foodapi/addRestu',body, {
        headers: {
        Accept: 'multipart/form-data',
        "Content-Type": 'multipart/form-data',
        },
        })
        .then((res) => {
          this.setState({loadings:false});
        this.props.history.push("/app/restaurants");
        });
        }
  }

  handleInput = e => {
    let file = e.target.files[0];  
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
    var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
    if(streetaddress=="data:image")
    {
    //  this.handleUpload(reader.result)
     this.state.imagess.push(reader.result);
     this.setState({imagess:this.state.imagess})
    }
 };}

handleInput2 = e =>
{
  let file = e.target.files[0];  
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
  var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
  if(streetaddress=="data:image")
  {
   this.setState({fimage:reader.result})
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
    if(this.state.name=="" || this.state.timing=="" || this.state.fimage==""
    || this.state.restaurant_email=="" || this.state.city=="" || this.state.status=="" || this.state.address==""
     || this.state.phone_no=="" || this.state.description=="" || this.state.title=="" || this.state.aboutus=="" || this.state.Latitude=="" || this.state.Longitude=="")
     {
       alert("Please fill all fields");
     }
     else{
    if(this.state.imagess.length>0)
    {
    this.setState({loadings:true},()=>
    {
      console.log('step first');
      this.getImages();
    });
      }
        else
        {
        alert("please select minimum 1 images");
        }
        }
      }
    }

    commission = (e)=>
    {
    this.setState({commission:e.target.value});
    }
    deliverycharges(e)
    {
      this.setState({delivery:e.target.value});
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
                  {this.state.gmapsLoaded && (<PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange.bind(this)}
        onSelect={this.handleSelect.bind(this)}
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
                <FormGroup>
                  <Label for="input-title">Select delivery type</Label>
                <Select
        value={this.state.selectedOption}
        onChange={this.handleChanges.bind(this)}
        options={options}
      />
       </FormGroup>

       {this.state.selectedOption.value=="Ucooking" ? <FormGroup>
                  <Label for="input-phone_no">delivery Charges</Label>
                  <Input
                    id="input-percentage"
                    type="text"
                    placeholder="Percentage"
                    value={this.state.delivery}
                    onChange={this.deliverycharges.bind(this)}
                  />
                </FormGroup> :""}

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
 <input type="file" className="form-control" onChange={this.handleInput.bind(this)}/>              
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
