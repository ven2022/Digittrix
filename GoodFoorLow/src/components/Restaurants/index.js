 
import React, { Component,useState} from 'react';
import { withRouter  } from "react-router-dom";
import { Link  } from "react-router-dom";
import Sidebar from "../Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import $ from 'jquery';
// import firebase from "firebase";
// import firestore from "../firestore";
import FileUploader from "react-firebase-file-uploader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Autocomplete from 'react-google-autocomplete';


import { Multiselect } from 'multiselect-react-dropdown';
import { Checkbox, CheckboxGroup } from "react-checkbox-group";


import Script from 'react-load-script';


const mapStyles = {
  width: '100%',
  height: '100%'
};
const google = window.google;


class adduser extends Component {
  constructor(props) {
      super(props);
      let private_key = "ALzaSyDUdqgdQ_LG9wLYRJuk9OmD2V2RFi4CjTg";
      this.userfname = this.userfname.bind(this);
      this.userfarabic = this.userfarabic.bind(this);

      this.useremail= this.useremail.bind(this);
      this.userpassword= this.userpassword.bind(this);
      this.usercpassword= this.usercpassword.bind(this);
      this.usermobile= this.usermobile.bind(this);

      this.adduser = this.adduser.bind(this);
      this.handleUploadSuccess=this.handleUploadSuccess.bind(this);
      this.handleUploadError= this.handleUploadError.bind(this);
      this.handleProgress= this.handleProgress.bind(this);
      this.handleUploadStart= this.handleUploadStart.bind(this);
this.workingDays = [1, 3, 5];
      
    this.handleChange = this.handleChange.bind(this);
    this.placeselect = this.placeselect.bind(this);
    this.addClicklocation = this.addClicklocation.bind(this);
    this.handleSChange = this.handleSChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSSelect = this.handleSSelect.bind(this);
    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChangeDatalocation = this.handleChangeDatalocation.bind(this);
    this.removeClick = this.removeClick.bind(this);
    this.removeClicklocation = this.removeClicklocation.bind(this);
    this.handleSubmitData = this.handleSubmitData.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCheckboxChangeM = this.handleCheckboxChangeM.bind(this);
    this.handleCheckboxChangeT = this.handleCheckboxChangeT.bind(this);
    this.handleCheckboxChangeTh = this.handleCheckboxChangeTh.bind(this);
    this.handleCheckboxChangeSa = this.handleCheckboxChangeSa.bind(this);
    this.handleCheckboxChangeF = this.handleCheckboxChangeF.bind(this);
    this.handleCheckboxChangeW = this.handleCheckboxChangeW.bind(this);

    this.addClick = this.addClick.bind(this);
     this.placechange = this.placechange.bind(this);
   
    this.handleChangeSEnd = this.handleChangeSEnd.bind(this);
    this.handleChangeSStart = this.handleChangeSStart.bind(this);

        this.handleChangeMEnd = this.handleChangeMEnd.bind(this);
    this.handleChangeMStart = this.handleChangeMStart.bind(this);

        this.handleChangeTEnd = this.handleChangeTEnd.bind(this);
    this.handleChangeTStart = this.handleChangeTStart.bind(this);

        this.handleChangeThEnd = this.handleChangeThEnd.bind(this);
    this.handleChangeThStart = this.handleChangeThStart.bind(this);

        this.handleChangeFEnd = this.handleChangeFEnd.bind(this);
    this.handleChangeFStart = this.handleChangeFStart.bind(this);

        this.handleChangeWEnd = this.handleChangeWEnd.bind(this);
    this.handleChangeWStart = this.handleChangeWStart.bind(this);

        this.handleChangeSaEnd = this.handleChangeSaEnd.bind(this);
    this.handleChangeSaStart = this.handleChangeSaStart.bind(this);
    this.handleSSelectlocation = this.handleSSelectlocation.bind(this);
      this.state = {
        fname:'',
        lname:'',
        farabic:'',
        larabic:'',
        selCategories:'',
        email:'',
      clocation:'',
         city: '',
      query: '',
      farabic:'',
      larabic:'',
      selectValueSEnd:'6:00PM',
        selectValueMEnd:'6:00PM',
        selectValueTEnd:'6:00PM',
        selectValueThEnd:'6:00PM',
        selectValueWEnd:'6:00PM',
        selectValueFEnd:'6:00PM',
        selectValueSaEnd:'6:00PM',
        password:'',
        cpassword:'',
        mobile:'',
        permanent_address:'',
        selectedValues:[],
        options: [],
        date:'',
        servive:'',
     
        selectValueSStart:'5:00PM',
        selectValueMStart:'5:00PM',
        selectValueTStart:'5:00PM',
        selectValueThStart:'5:00PM',
        selectValueWStart:'5:00PM',
        selectValueFStart:'5:00PM',
        selectValueSaStart:'5:00PM',
         address: '' ,
        avatar: "",
        checked: true, 
        checkedM: true, 
        checkedT: true, 
        checkedTh: true, 
        checkedW: true, 
        checkedF: true, 
        checkedSa: true, 
    isUploading: false,
    progress: 0,
    api_key:private_key,
    avatarURL:"" ,
    variation: [{ SalePrice: 0 ,service:""}],
    slocation: [{servive_location: '' ,
        }],     
      };
    };
componentDidMount() {
this.getservice();
  }
  handleChangeData(i, e) {
     const { name, value } = e.target;
     let variation = [...this.state.variation];
     variation[i] = {...variation[i], [name]: value};
     this.setState({ variation });
  }

  placechange(i,e)
  {
    console.log('lll');
    console.log(this.state.clocation);
    const { name, value } = e.target;
     let slocation = [...this.state.slocation];
     slocation[i] = {...slocation[i], [name]: value};
     this.setState({ slocation });
     console.log(this.state.slocation);
  }

  placeselect(i,e)
  {
    console.log('lll');
    console.log(this.state.clocation);
    const { name, value } = e.target;
     let slocation = [...this.state.slocation];
     slocation[i] = {...slocation[i], [name]: value};
     this.setState({ slocation });
     console.log(this.state.slocation);
  }
  
  removeClick(i){
     let variation = [...this.state.variation];
     variation.splice(i, 1);
     this.setState({ variation });
  }
  removeClicklocation(i){
     let slocation = [...this.state.slocation];
     slocation.splice(i, 1);
     this.setState({ slocation });
  }
  
  handleSubmitData(event) {
    alert('A name was submitted: ' + JSON.stringify(this.state.variation));
    event.preventDefault();
  }

  handleCheckboxChange(event){
    this.setState({ checked: event.target.checked })
    if(event.target.checked ==false)
    {
     this.setState({selectValueSStart:'00:00'});
     this.setState({selectValueSEnd:'00:00'});
    }
    else
    {
      this.setState({selectValueSStart:'05:00PM'});
     this.setState({selectValueSEnd:'06:00PM'});
    }
    }
    handleCheckboxChangeM(event){
    this.setState({ checkedM: event.target.checked })
    if(event.target.checked == false)
    {
     this.setState({selectValueMStart:'00:00'});
     this.setState({selectValueMEnd:'00:00'});
    }
    else
    {
      this.setState({selectValueMtart:'05:00PM'});
     this.setState({selectValueMEnd:'06:00PM'});
    }
   
    }
    handleCheckboxChangeSa(event){
    this.setState({ checkedSa: event.target.checked })
    if(event.target.checked == false)
    {
     this.setState({selectValueSaStart:'00:00'});
     this.setState({selectValueSaEnd:'00:00'});
    }
    else
    {
      this.setState({selectValueSaStart:'05:00PM'});
     this.setState({selectValueSaSEnd:'06:00PM'});
    }
   
    }

    handleCheckboxChangeTh(event){
    this.setState({ checkedTh: event.target.checked })
    if(event.target.checked == false)
    {
     this.setState({selectValueThStart:'00:00'});
     this.setState({selectValueThEnd:'00:00'});
    }
    else
    {
      this.setState({selectValueThStart:'05:00PM'});
     this.setState({selectValueThEnd:'06:00PM'});
    }
   
    }

    handleCheckboxChangeT(event){
    this.setState({ checkedT: event.target.checked })
    if(event.target.checked == false)
    {
     this.setState({selectValueTStart:'00:00'});
     this.setState({selectValueTEnd:'00:00'});
    }
    else
    {
      this.setState({selectValueTStart:'05:00PM'});
     this.setState({selectValueTEnd:'06:00PM'});
    }
   
    }
    handleCheckboxChangeW(event){
    this.setState({ checkedW: event.target.checked })
    if(event.target.checked == false)
    {
     this.setState({selectValueWStart:'00:00'});
     this.setState({selectValueWEnd:'00:00'});
    }
    else
    {
      this.setState({selectValueWStart:'05:00PM'});
     this.setState({selectValueWEnd:'06:00PM'});
    }
   
    }

    handleCheckboxChangeF(event){
    this.setState({ checkedF: event.target.checked })
    if(event.target.checked == false)
    {
     this.setState({selectValueFStart:'00:00'});
     this.setState({selectValueFEnd:'00:00'});
    }
    else
    {
      this.setState({selectValueFStart:'05:00PM'});
     this.setState({selectValueFEnd:'06:00PM'});
    }
   
    }

  userfarabic(e) {
    this.setState({ farabic: e.target.value });
  }
  
   userfname(e) {
    this.setState({ fname: e.target.value });
  }
  
  useremail(e) {
    this.setState({ email: e.target.value });
  }
  userpassword(e) {
    this.setState({ password: e.target.value });
  }
  usercpassword(e) {
    this.setState({ cpassword: e.target.value });
  }

  usermobile(e) {
    this.setState({ mobile: e.target.value });
  }

  handleChangeSStart(e)
  {
    this.setState({ selectValueSStart: e.target.value });
  }
  handleChangeSEnd(e)
  {
    this.setState({ selectValueSEnd: e.target.value });
  }

  handleChangeMStart(e)
  {
    this.setState({ selectValueMStart: e.target.value });
  }
  handleChangeMEnd(e)
  {
    this.setState({ selectValueMEnd: e.target.value });
  }

  handleChangeThStart(e)
  {
    this.setState({ selectValueThStart: e.target.value });
  }
  handleChangeThEnd(e)
  {
    this.setState({ selectValueThEnd: e.target.value });
  }

  handleChangeTStart(e)
  {
    this.setState({ selectValueTStart: e.target.value });
  }
  handleChangeTEnd(e)
  {
    this.setState({ selectValueTEnd: e.target.value });
  }

  handleChangeWStart(e)
  {
    this.setState({ selectValueWStart: e.target.value });
  }
  handleChangeWEnd(e)
  {
    this.setState({ selectValueWEnd: e.target.value });
  }

  handleChangeFStart(e)
  {
    this.setState({ selectValueFStart: e.target.value });
  }
  handleChangeFEnd(e)
  {
    this.setState({ selectValueFEnd: e.target.value });
  }

  handleChangeSaStart(e)
  {
    this.setState({ selectValueSaStart: e.target.value });
  }
  handleChangeSaEnd(e)
  {
    this.setState({ selectValueSaEnd: e.target.value });
  }


getservice(){
  const db = firebase.firestore();
const user = db.collection("services").get()
.then(querySnapshot => {
         const data = querySnapshot.docs.map(doc => doc.data());
         
        this.setState({options:data});
      }).catch()
}

    
    async adduser(e){
//   e.preventDefault();
//   if(this.state.password == this.state.cpassword)
//   {
//   const db = firebase.firestore();
//   const authdb = firebase.auth();
//   const imageUrl =this.state.avatarURL;
//   // alert(this.state.avatarURL);

//  const authusers = await authdb.createUserWithEmailAndPassword(this.state.email,this.state.password);

// const uiddb = authusers.user.uid;

//   const userRef = db.collection('service_provider').doc(uiddb).set({
//     first_name: this.state.fname,
//     first_arabic: this.state.farabic,
    
//     phone_number: this.state.mobile,
   
//     email: this.state.email,
//     profile_image:imageUrl,
//     address:this.state.permanent_address,
//     servive_location:this.state.slocation,
//     user_service:this.state.variation,

//     sunday:[{start:this.state.selectValueSStart,end:this.state.selectValueSEnd}],
//     monday:[{start:this.state.selectValueMStart,end:this.state.selectValueMEnd}],
//     Tuesday:[{start:this.state.selectValueTStart,end:this.state.selectValueTEnd}],
//     Thursday:[{start:this.state.selectValueThStart,end:this.state.selectValueThEnd}],
//     Saturday:[{start:this.state.selectValueSaStart,end:this.state.selectValueSaEnd}],
//     Wednesday:[{start:this.state.selectValueWStart,end:this.state.selectValueWEnd}],
//     Friday:[{start:this.state.selectValueFStart,end:this.state.selectValueFEnd}],
    
//     created_date:Date.now(), 
//     uid:uiddb
    

//   });
//   this.props.history.push('/providers');  
  
// }
// else
// {
// 	alert(" password Mismatch");
// }
};
handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    // this.setState({ avatar: filename, progress: 100, isUploading: false });
    // firebase
    //   .storage()
    //   .ref("images")
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(url => this.setState({ avatarURL: url }));
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
        this.setState({permanent_address:latLng});
      })
      .catch(error => console.error('Error', error));
  };


  handleSChange = servive_address => {
    this.setState({ servive_address });
  };
 
  handleSSelect = servive_address => {
    this.setState({ servive_address });
    geocodeByAddress(servive_address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.setState({servive_location:latLng});})
      .catch(error => console.error('Error', error));
  };

  handleSSelectlocation= servive_location =>{
    this.setState({ servive_location });
    geocodeByAddress(servive_location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.setState({servive_location:latLng});})
      .catch(error => console.error('Error', error));
  };

  handleChangeDatalocation = servive_location => {
      this.setState({ servive_location });
     // const { name, value } = servive_location;
     // let slocation = [...this.state.slocation];
     // slocation[i] = {...slocation[i], [name]: value};
     // this.setState({ slocation });
  }
  addClick(){
    this.setState(prevState => ({ 
        variation: [...prevState.variation, {  SalePrice: 0, service:""
         }]
    }))
  }

  addClicklocation(){
    this.setState(prevState => ({ 
        slocation: [...prevState.slocation, {  servive_location: '' 
         }]
    }))
    
  }

 
 createUI(){
     return this.state.variation.map((el, i) => (
<div className="col-sm-12" key={i}>
<div className="col-form-label col-md-3 col-sm-3 label-align">Service:</div>
<div className="col-sm-6 upladbtndiv">
<select name="service" value={el.service ||''} onChange={this.handleChangeData.bind(this, i)}>
<option value="">--Select Service --</option>
{this.state.options.length > 0 &&
this.state.options.map((item, index) => (
<option key={index} value={item.service_name}>{item.service_name}</option>
))
}
</select>
<label>Price:</label>
<input
type="number"
required={true}
name="SalePrice"
value={el.SalePrice ||''} onChange={this.handleChangeData.bind(this, i)}
placeholder="Service Price"/>
      <button className="btn btn-primary"  onClick={this.addClick.bind(this,i)}>Add more</button>
          <button className="btn btn-danger"  onClick={this.removeClick.bind(this, i)}>Remove</button>
          </div>
       </div>          
     ))
  }
  auto(){
     return this.state.slocation.map((el, i) => (
    <div  className=
       " col-sm-12" key={i}>
       <div className="col-form-label col-md-3 col-sm-3 label-align">Servive Location:</div>
                               <div className="col-sm-6 upladbtndiv">
    <Autocomplete
    key={el}
    name="servive_location"
    style={{width: '40%'}}
    onPlaceSelected={(place,i) => {
      console.log(place.formatted_address);
      this.setState({ clocation: place.formatted_address});

    }}

   onChange={this.placechange.bind(this, i)}
    onSelect={this.placeselect.bind(this,i)}
    
    types={['(regions)']}
    componentRestrictions={{place: "ru"}}
/>
<button className="btn btn-primary"  onClick={this.addClicklocation.bind(this, i)}>Add more</button>
<button className="btn btn-danger"  onClick={this.removeClicklocation.bind(this, i)}>Remove</button>
          </div>
          </div>
))

  }
  
  

    render() {

      
        return (
          <div>
          <Sidebar/>
<div className="right_col" role="main" style={{"margin-left":"219px"}}>
<div className="page-title">
              <div className="title_left">
                <h3>Service Providers<small></small></h3>
              </div>

              <div className="title_right">
                <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                  <div className="input-group">
                    
                  </div>
                </div>
              </div>
            </div>
 
            <div className="col-md-12 col-sm-12 ">
              <div className="x_panel">
                <div className="x_title">
                  <h2>Add New Form  <small></small></h2>
                  <ul className="nav navbar-right panel_toolbox">
                    <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                      <ul className="dropdown-menu" role="menu">
                        <li><a className="dropdown-item" href="#">Settings 1</a>
                        </li>
                        <li><a className="dropdown-item" href="#">Settings 2</a>
                        </li>
                      </ul>
                    </li>
                    <li><a className="close-link"><i className="fa fa-close"></i></a>
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
                <div className="x_content">
                  <br />
                  <div id="demo-form2" data-parsley-validate className="form-horizontal form-label-left">

                    <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name"> Name in English <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">
                        <input type="text" id="fname" onChange={this.userfname}
    value={this.state.fname} required="required" name="fname" className="form-control "/>
                      </div>
                    </div>

                    <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name"> Name in Arabic <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">
                        <input type="text" id="farabic" onChange={this.userfarabic}
    value={this.state.farabic} required="required" name="farabic" className="form-control "/>
                      </div>
                    </div>

                    
                    <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Email Id <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">
                        <input type="email" onChange={this.useremail}
    value={this.state.email} id="email" name="email" required="required" className="form-control"/>
                      </div>
                    </div>
                    <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Password <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">
                        <input type="password" id="password" onChange={this.userpassword}
    value={this.state.password} name="password" required="required" className="form-control"/>
                      </div>
                    </div>
                    <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name"> Confirm Password <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">
                        <input type="password" id="cpassword" onChange={this.usercpassword}
    value={this.state.cpassword} name="cpassword" required="required" className="form-control"/>
                      </div>
                    </div>
                    <div className="item form-group">
                      <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Mobile Number</label>
                      <div className="col-md-6 col-sm-6 ">
                        <input id="mobile" onChange={this.usermobile}
    value={this.state.mobile} className="form-control" type="text" name="mobile"/>
                      </div>
                    </div>
                

                    <div className="item form-group row">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name"> sunday <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">

                      <input type=
                      "checkbox"
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
          />
          <span> Start time</span>
                      
                       <select defaultValue={this.state.selectValueSStart}   value={this.state.selectValueSStart} 
 onChange={this.handleChangeSStart} 
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="5:00PM">5:00PM</option>
    <option value="00:00">00:00</option>
  </select>
  <span>End time</span>
                     
                       <select defaultValue={this.state.selectValueSEnd} 
                        value={this.state.selectValueSEnd} 
 onChange={this.handleChangeSEnd} 
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="6:00PM">6:00PM</option>
    <option value="00:00">00:00</option>
  </select>
                      </div>

                      </div>
                      <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name"> Monday <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">

                      <input type=
                      "checkbox"
            checked={this.state.checkedM}
            onChange={this.handleCheckboxChangeM}
          />
          <span> Start time</span>
                      
                       <select defaultValue={this.state.selectValueMStart} 
 onChange={this.handleChangeMStart} value={this.state.selectValueMStart}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="5:00PM">5:00PM</option>
    <option value="00:00">00:00</option>
  </select>
  <span>End time</span>
                     
                       <select defaultValue={this.state.selectValueMEnd} 
 onChange={this.handleChangeMEnd} value={this.state.selectValueMEnd}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="6:00PM">6:00PM</option>
    <option value="00:00">00:00</option>
  </select>
                      </div>

                      </div>
                       <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name"> Tuesday <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">

                      <input type=
                      "checkbox"
            checked={this.state.checkedT}
            onChange={this.handleCheckboxChangeT}
          />
          <span> Start time</span>
                      
                       <select defaultValue={this.state.selectValueTStart} 
 onChange={this.handleChangeTStart} value={this.state.selectValueTStart}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="5:00PM">5:00PM</option>
    <option value="00:00">00:00</option>
  </select>
  <span>End time</span>
                     
                       <select defaultValue={this.state.selectValueTEnd} 
 onChange={this.handleChangeTEnd} value={this.state.selectValueTEnd}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="6:00PM">6:00PM</option>
    <option value="00:00">00:00</option>
  </select>
                      </div>

                      </div>

                      <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name"> Wednesday <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">

                      <input type=
                      "checkbox"
            checked={this.state.checkedW}
            onChange={this.handleCheckboxChangeW}
          />
          <span> Start time</span>
                      
                       <select defaultValue={this.state.selectValueWStart} 
 onChange={this.handleChangeWStart} value={this.state.selectValueWStart}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="5:00PM">5:00PM</option>
    <option value="00:00">00:00</option>
  </select>
  <span>End time</span>
                     
                       <select defaultValue={this.state.selectValueWEnd} 
 onChange={this.handleChangeWEnd} value={this.state.selectValueWEnd}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="6:00PM">6:00PM</option>
    <option value="00:00">00:00</option>
  </select>
                      </div>

                      </div>

                      <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name"> Thursday <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">

                      <input type=
                      "checkbox"
            checked={this.state.checkedTh}
            onChange={this.handleCheckboxChangeTh}
          />
          <span> Start time</span>
                      
                       <select defaultValue={this.state.selectValueThStart} 
 onChange={this.handleChangeThStart} value={this.state.selectValueThStart}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="5:00PM">5:00PM</option>
    <option value="00:00">00:00</option>
  </select>
  <span>End time</span>
                     
                       <select defaultValue={this.state.selectValueThEnd} 
 onChange={this.handleChangeThEnd} value={this.state.selectValueThEnd}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="6:00PM">6:00PM</option>
    <option value="00:00">00:00</option>
  </select>
                      </div>

                      </div>

                      <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name"> Friday <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">

                      <input type=
                      "checkbox"
            checked={this.state.checkedF}
            onChange={this.handleCheckboxChangeF}

          />
          <span> Start time</span>
                      
                       <select defaultValue={this.state.selectValueFStart} 
 onChange={this.handleChangeFStart} value={this.state.selectValueFStart}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="5:00PM">5:00PM</option>
    <option value="00:00">00:00</option>
  </select>
  <span>End time</span>
                     
                       <select defaultValue={this.state.selectValueFEnd} 
 onChange={this.handleChangeFEnd} value={this.state.selectValueFEnd}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="6:00PM">6:00PM</option>
    <option value="00:00">00:00</option>
  </select>
                      </div>

                      </div>
                      <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name"> Saturday <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 ">

                      <input type=
                      "checkbox"
            checked={this.state.checkedSa}
            onChange={this.handleCheckboxChangeSa}
          />
          <span> Start time</span>
                      
                       <select defaultValue={this.state.selectValueSaStart} 
 onChange={this.handleChangeSaStart} value={this.state.selectValueSaStart}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="5:00PM">5:00PM</option>
    <option value="00:00">00:00</option>
  </select>
  <span>End time</span>
                     
                       <select defaultValue={this.state.selectValueSaEnd} 
 onChange={this.handleChangeSaEnd} value={this.state.selectValueSaEnd}
 >
    <option value="1:00 PM">1:00 PM</option>
    <option value="2:00PM">2:00PM</option>
    <option value="3:00PM">3:00PM</option>
    <option value="6:00PM">6:00PM</option>
    <option value="00:00">00:00</option>
  </select>
                      </div>

                      </div>
                    <div className="item form-group">
                       <label className="col-form-label col-md-3 col-sm-3 label-align">Profile Image:</label>
          
          <div className="col-md-6 col-sm-6 upload-div">
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img class="upload-image" src={this.state.avatarURL} />}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          </div>
                    </div>
                    
                   
<div className="item form-group row">

       {this.createUI()}        
          
         
          </div>
                    
          <div className="item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Address<span className="required">*</span>
                      </label>
                      
          <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
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
      </PlacesAutocomplete>
   
      </div>


          <div className="item form-group row">
         
          {this.auto()}
          
  </div>       
          
        

                    
                  
                    <div className="ln_solid"></div>
                    <div className="item form-group">
                      <div className="col-md-6 col-sm-6 offset-md-3">
                        <button type="submit" onClick={this.adduser} className="btn btn-success">Submit</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
      

        
     
      </div>
      <footer>
          <div className="pull-right">
            Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
          </div>
          <div className="clearfix"></div>
        </footer>
      </div>
    

  
  
  

   );
    }
}





export default withRouter(adduser);