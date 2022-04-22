import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import $ from "jquery";
// data
import mock from "../dashboard/mock";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import MaterialTable from "material-table";
import Api from '../../components/RestApis/Api';
import MultiSelectAll from "./MultiSelectAllR";
class Restaurant extends React.Component {
  constructor() {
    super();
    this.state = { dataSet: [],dataSet2:[],errormsg:"" };
  }


  componentDidMount=async()=>{
    try{
      let response= await Api.notificationList(1);
      if(response && response.data.status=="success")
      {
        const filter=[];
        response.data.users.forEach(doc => {
          filter.push([doc.title, doc.description, doc._id, [doc.title,doc.description],  doc._id, doc._id]);
        });
        this.setState({dataSet:filter});
      }
    }
    catch(e)
    {
      this.setState({errormsg:e.message});
    }
  }
 

restaurantdelete=async(id)=> {
      if (window.confirm("Delete the item?")) {
        try{
          let response= await Api.restaurantsDeleteById(id);
          if(response.data && response.data.status=="success")
          {
            this.componentDidMount();
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
    }
    }
   
    sendnotification=async(title,description)=>{
      let formData = new FormData();
      formData.append('title',title);
      formData.append('description',description);
      formData.append('type','restaurant');
      try{
      let response= await Api.sendnotification(formData);
       if(response.data && response.data.status=="success")
            alert(response.error.response.data.message);
      }
      catch(e)
      {
        alert(e.message);
      }
    }

    // sendmail(e)
    // {
    //   var email=e.currentTarget.id;
    //   var actionCodeSettings = {
    //     url: 'https://vendorapp-aa075.web.app?home=true',
    //     handleCodeInApp: false
    //   };
    //   firebase.auth().sendPasswordResetEmail(e.currentTarget.id,actionCodeSettings).then((res) => {
    //  alert('Email send Successfully on '+email);
    //   }).catch((error) => {
    // console.log('err',error);
    //   });
  
   // }



  render() {
    return(
      <>
      <PageTitle title="Restaurant" />
      <div className="pull-right mt-n-xs">
                <Link to="/app/notifications/NotificationsNew/1" className="btn btn-primary btn-inverse">
                  Create New
                </Link>
              </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            data={this.state.dataSet}
            columns={["Title", "Description",{
              label: "Select Customers",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                          <MultiSelectAll  />
                      )
                  }
                }
              }, {
              label: "Send",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                          <button type='button' onClick={() => this.sendnotification(value[0],value[1])}  className='btn btn-primary'> Send </button>

                      )
                  }
              }
              }, {
              label: "Edit",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                          <Link to={"/app/restaurants/edit/" + value} className='btn btn-primary'> Edit </Link>
                      )
                  }
              }
              },
              {
              label: "Delete",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                      <button className='btn btn-danger' onClick={() => this.restaurantdelete(value)}>Delete</button>
                      )
                  }
              }
          }
          ]}
           
          />
        </Grid>
      </Grid>
    </>
  );
  }
}
export default withRouter(Restaurant);


