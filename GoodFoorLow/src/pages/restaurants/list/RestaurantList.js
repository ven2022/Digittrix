import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import $ from "jquery";
// data
import mock from "../../dashboard/mock";
// import firebase from "firebase";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import MaterialTable from "material-table";
import Api from '../../../components/RestApis/Api';

class RestaurantList extends React.Component {
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

  constructor() {
    super();
    this.state = { dataSet: [],dataSet2:[],errormsg:"" };
  }


  componentDidMount=async()=>{
    try{
      let response= await Api.restaurantsList();
      if(response && response.data.status=="success")
      {
        const filter=[];
        response.data.users.forEach(doc => {
          filter.push([doc.name, doc.restaurant_email, doc.address, doc._id,  doc._id, doc._id, [doc._id,doc.discover],[doc._id,doc.status]]);
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
    restaurantdisable=async(id,v,h)=> {
      if (window.confirm("Are You Sure?")) {
        if(v==0)
        {
        var datas=2;
        }
        else
        {
        var datas=1;
        }
        try{
          let formData = new FormData();
            formData.append('status', datas);
          let response= await Api.restaurantsUpdateById(id,formData);
          if(response.data && response.data.status=='success')
          {
            this.componentDidMount();
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
  }

    addtodiscover=async(id,v,h)=> {
      if (window.confirm("Are You Sure?")) {
        try{
          let formData = new FormData();
            formData.append('discover', v);
          let response= await Api.restaurantsUpdateById(id,formData);
          if(response.data && response.data.status=='success')
          {
            this.componentDidMount();
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
      <PageTitle title="Restaurants" />
      <div className="pull-right mt-n-xs">
                <Link to="/app/restaurants/new" className="btn btn-primary btn-inverse">
                  Create New Restaurants
                </Link>
              </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            data={this.state.dataSet}
            columns={["Restaurants", "Email", "Address", {
              label: "Menulist",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                          <Link to={"/app/restaurants/menu/" + value}  className='btn btn-primary'> Menu </Link>

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
              // {
              //   label: "Rest Password",
              //   options: {
              //       customBodyRender: (value, tableMeta, updateValue) => {
              //           return (
              //             <button className='btn btn-success'  id={value} onClick={this.sendmail.bind(this)} > Send Mail </button>
              //           )
              //       }
              //   }
              //   },
              
              {
              label: "Delete",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                      <button className='btn btn-danger' onClick={() => this.restaurantdelete(value)}>Delete</button>
                      )
                  }
              }
          },{
            label: "Discover Now",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                    <div>
                    {(() => {
          if (value[1]==true) {
            return (
            <button className='btn btn-danger' onClick={() => this.addtodiscover(value[0],false,value[1])}>OFF</button>)
                  }else{
                   return (<button className='btn btn-success' onClick={() => this.addtodiscover(value[0],true,value[1])}>ON</button>)
                }
                })()}
                   </div>)
                }
            }
        }, {
              label: "Action",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                      <div>
                      {(() => {
            if (value[1]==1) {
              return (
              <button className='btn btn-danger' onClick={() => this.restaurantdisable(value[0],0,value[1])}>Disable</button>)
                    }else{
                     return (<button className='btn btn-success' onClick={() => this.restaurantdisable(value[0],1,value[1])}>Enable</button>)
                  }
                  })()}
                     </div>)
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
export default withRouter(RestaurantList);


