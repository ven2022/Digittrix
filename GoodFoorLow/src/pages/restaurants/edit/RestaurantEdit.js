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
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import Geocode from "react-geocode";
import Select from 'react-select';
import Api from '../../../components/RestApis/Api';
const apiurl="http://172.105.159.222:5000/";
const options = [
  { value: 'Own', label: 'Own' },
  { value: 'Goodforlow', label: 'Goodforlow' }
];
class RestaurantEdit extends React.Component {
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
      restaurant_url: '',
      city: "",
      status: "",
      address: "",
      aboutus:"",
      timings:"",
      phone_no: "",
      images:[],
      Latitude:"",
      Longitude:"",
      banner:"",
      selectedOption: null,
      commission:"",
      fileObj:[],
      files:[],
      dataid:"",
      gmapsLoaded: false
    };
  }
  componentDidMount=async()=>{
     let id = this.props.match.params.id;
    this.setState({dataid:id});
    try{
      const response = await Api.restaurantsById(id);
      if(response && response.data.user)
      {
        let data=response.data.user;
        this.setState({name: data.name,
          restaurant_email: data.restaurant_email,
          banner:data.banner_image ? apiurl+data.banner_image : apiurl+data.featured_images[0],
          restaurant_url: data.restaurant_url,
          status: data.status,
          address: data.address,
          phone_no: data.phone_no,
          timings:data.timings,
          commission:data.commission ? data.commission : "",
          title:data.title,
          aboutus:data.about_us,
          Latitude:data.location ? data.location.coordinates[1] : 0,
          Longitude:data.location ? data.location.coordinates[0] : 0,
          images:data.featured_images,
          editorState: data.description ? EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(data.description)
            )
          ):""});
        for (var i = data.featured_images.length - 1; i >= 0; i--) {
          this.state.images.push(apiurl+data.featured_images[i])
        }
        this.setState({images:this.state.images});
      }
    }
    catch(e)
    {}
    setTimeout(() => {
    this.initMap();
    }, 2000);
  }

  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }

changename = (event) => {
    this.setState({name: event.target.value});
  }

  aboutush(e)
  {
    this.setState({aboutus:e.target.value});
  }

  deleteImage(e)
  {
    this.state.images.splice(e.currentTarget.id,1);
    this.setState({images:this.state.images});
  }


  changecity = (event) => {
    this.setState({city: event.target.value});
  }

  changerestaurant_url = (event) => {
    this.setState({restaurant_url: event.target.value});
  }
  changetitle(e)
  {
    this.setState({title:e.target.value});
  }

  timingf(e)
  {
    this.setState({timings:e.target.value});
  }

  changephone_no = (event) => {
    this.setState({phone_no: event.target.value});
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

  // fetchAddress(lati,lngi)
  //      {
  //        Geocode.setApiKey("AIzaSyDM4LDXtUX7rM-FHenlmmXZ7jbfbczfqWk");
  //        Geocode.setLanguage("en");
  //        Geocode.setRegion("es");
  //        Geocode.setLocationType("ROOFTOP");
  //        Geocode.enableDebug();
  //        Geocode.fromLatLng(lati,lngi).then(
  //           (response) => {
  //             const address = response.results[0].formatted_address;
  //             let city, state, country;
  //             for (let i = 0; i < response.results[0].address_components.length; i++) {
  //               for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
  //                 switch (response.results[0].address_components[i].types[j]) {
  //                   case "locality":
  //                     city = response.results[0].address_components[i].long_name;
  //                     break;
  //                   case "administrative_area_level_1":
  //                     state = response.results[0].address_components[i].long_name;
  //                     break;
  //                   case "country":
  //                     country = response.results[0].address_components[i].long_name;
  //                     break;
  //                 }
  //               }
  //             }
  //             if(state)
  //             {
  //               this.setState({address: city+", "+state+", "+country,city:city});
  //             }
  //             else
  //             {
  //               this.setState({address: city+", "+country,city:city});
  //             }
              
  //           },
  //           (error) => {
  //             console.error(error);
  //           }
  //         );
          

            // this.getDocumentNearBy(lati, lngi, 50);
      
       //}

  doCreatePost=async()=> {
    if(this.state.name=="" || this.state.commission=="" || this.state.address=="" || this.state.timings=="" || this.state.timings==undefined
    || this.state.banner=="" || this.state.phone_no=="" || this.state.description=="" || this.state.title=="" || this.state.aboutus=="" || this.state.Latitude=="" || this.state.Longitude=="")
    {
      alert("Please fill all fields");
    }
    else{
          if(this.state.images.length>0)
          {    
          try{
            let formData = new FormData();
            // let newarray=[];
            // newarray.push(parseFloat(this.state.Latitude));
            // newarray.push(parseFloat(this.state.Longitude));
            // let latlong={'type':'Point','coordinates':newarray};
            // console.log("latlong",latlong);
            formData.append('name', this.state.name);
            formData.append('restaurant_url', this.state.restaurant_url);
            formData.append('timings', this.state.timings);
            formData.append('address', this.state.address);
            formData.append('phone_no', this.state.phone_no);
            formData.append('description', this.state.description);
            formData.append('title', this.state.title);
            formData.append('commission', this.state.commission);
            formData.append('Longitude', this.state.Longitude);
            formData.append('Latitude', this.state.Latitude);
            // formData.append('banner_image', this.state.banner);
            // formData.append('featured_images', this.state.images);
            formData.append('about_us', this.state.aboutus);
            // formData.append('location',latlong);
            let id=this.props.match.params.id;
            const response= await Api.restaurantsUpdateById(id,formData);
              if(response.data && response.data.status=="success")
              {
                this.props.history.push("/app/restaurants");
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
          else
          {
          alert("please select minimum 1 images");
          }
  }
  }
  onEditorStateChange = (editorState) => {
    this.setState({ editorState }, () => {
      var currentContent = editorState.getCurrentContent();
      var contentRaw = convertToRaw(currentContent);
      const value = currentContent.hasText() ? draftToHtml(contentRaw) : "";
      this.setState({description:value});
    });
  };
  // handleInput(e)
  // {
 
  //     this.state.fileObj.push(e.target.files)
  //     var nwarray=[];
  //     for (let i = 0; i < this.state.fileObj[0].length; i++) {
  //         this.state.images.push(URL.createObjectURL(this.state.fileObj[0][i]))
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

  handleInput = e => {
    let file = e.target.files[0];  
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
    var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
    if(streetaddress=="data:image")
    {
      this.handleUpload(reader.result)

    }
 };}

handleUpload =(data)=>{
  this.state.images.push(data);
this.setState({images:this.state.images});
//   this.setState({images:this.state.images});
// var body={image:data};
// axios.post('https://digittrix-staging.live/webci/foodapi/imageurltwo',body, {
//   headers: {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// },
// }).then((res) => {
//   this.state.images.push(res.data.image);
// this.setState({images:this.state.images});
// })
}

handleInput2 = e =>
{
  let file = e.target.files[0];  
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
  var streetaddress= reader.result.substr(0, reader.result.indexOf('/'));
  if(streetaddress=="data:image")
  {
    this.handleUpload2(reader.result)
  }
  };
}
handleUpload2 =(data)=>{
  this.setState({banner:data});
  // var body={image:data};
  // axios.post('https://digittrix-staging.live/webci/foodapi/imageurltwo',body, {
  //   headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
  // }).then((res) => {
  // this.setState({banner:res.data.image});
  // })
}
  
deleteImage2()
{
  this.setState({banner:""});
}


// handleChanges = selectedOption => {
//   this.setState({ selectedOption });
// };
commission = (e)=>
  {
  this.setState({commission:e.target.value});
  }

  render() {
    const {name,restaurant_email,restaurant_owner,restaurant_url,city,opening_status,address,payment,phone_no,seating_type,seating,serves_alcohol,services,tags,cuisines} = this.state;
    return (
      <div className="editdiv">
        <h1>Edit Restaurant</h1>
        <Row>
          <Col sm={12}>
              <div class="editdiv_in">
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
                    readable
                   
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
                    value={this.state.timings}
                    onChange={this.timingf.bind(this)}
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
         
    
                      <FormGroup>
                  <Label for="input-phone_no">About us</Label>
                  <Input
                    id="input-abpit"
                    type="text"
                    placeholder="About us"
                    value={this.state.aboutus}
                    onChange={this.aboutush.bind(this)}

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
              
                {/* <FormGroup>
                  <Label for="input-title">Select delivery type</Label>
                <Select
        value={this.state.selectedOption}
        onChange={this.handleChanges.bind(this)}
        options={options}
      />
       </FormGroup> */}
                <FormGroup>
  <Label for="featured_image">Banner Images</Label>
 <input type="file" className="form-control" onChange={this.handleInput2.bind(this)}/>              
 </FormGroup>
 <div class="row">
                  <div className="form-group multi-preview">
                    {this.state.banner && this.state.banner!=="" ? 
                          <div class="col-sm-4 col-md-3">
                          <div className="multiimages">
                          <i class="fa fa-times-circle" onClick={this.deleteImage2.bind(this)}></i>
                          <img src={this.state.banner} alt="Snow" defaultstyle="width:100%" className="w-100"/>
                          </div>
                        </div> :""}
                </div>  
                </div>               
             <FormGroup sm={6} >
  <Label for="featured_image">Featured Images</Label>
 <input type="file" className="form-control" onChange={this.handleInput.bind(this)}/>              
 </FormGroup>  
 {/* <FormGroup sm={6}>
                    <Button  color="success" type="button" >
                     Upload
                    </Button>
                  </FormGroup> */}
               
               <div class="row">
                  <div className="form-group multi-preview">
                    {(this.state.images || []).map((url,i)=>{
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
                    <Button color="danger" type="button" onClick={this.doCreatePost.bind(this)} >
                      {this.props.loadings ? 'Updateing...' : 'Update Restaurant'}
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
          </Col>
        </Row>
      </div>
    );
  }
}



export default withRouter(RestaurantEdit);
