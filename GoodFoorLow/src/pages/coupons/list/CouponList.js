import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

import { Link } from 'react-router-dom';
// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

// data
import mock from "../../dashboard/mock";
// import firebase from "firebase";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import Api from '../../../components/RestApis/Api';

// const db = firebase.firestore();

class CouponList extends React.Component {
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
    this.state = { dataSet: [] };
  }
  componentDidMount=async()=>{
    try{
      let response= await Api.couponsList();
      if(response && response.data.status=="success")
      {
        const dataSet = []
        response.data.users.forEach(doc => {
            dataSet.push([doc.name, doc.code,doc.type, doc.amount, doc.datefrom, doc.dateto, doc.mini, doc.max, doc.count_limit,doc._id,doc._id]);
        });
        this.setState({dataSet:dataSet});
      }
      else
      {
        alert(response.data.message);
      }
    }
    catch(e)
    {
      alert(e.message);
    }
    // db.collection('coupons')
    //         .get()
    //         .then( snapshot => {
    //             const dataSet = []
    //             snapshot.forEach(doc => {
    //                 dataSet.push([doc.data().name, doc.data().code,doc.data().type, doc.data().amount, doc.data().datefrom, doc.data().dateto, doc.data().mini, doc.data().max, doc.data().count_limit,doc.id,doc.id]);
    //             });
    //               return dataSet;
    //           })
    //          .then(userList => { 
    //           this.setState({dataSet:userList});
    //         })
    //     .catch(error => console.log(error))
  }
  coupondelete=async(id)=> {
      if (window.confirm("Delete the item?")) {
        try{
          let response= await Api.couponsDeleteById(id);
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

  render() {
  return (
    <>
      <PageTitle title="Coupons" />
      <div className="pull-right mt-n-xs">
                <Link to="/app/coupons/new" className="btn btn-primary btn-inverse">
                  Create New Coupon
                </Link>
              </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            data={this.state.dataSet}
            columns={["Name", "Code","Type of Value", "Value", "Valid From", "Valid To","Minimum", "Miximum", "Limit", {
              label: "Edit",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                          <Link to={"/app/coupons/edit/" + value} className='btn btn-primary'> Edit </Link>
                      )
                  }
              }
          }, {
              label: "Delete",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                      <button onClick={() => this.coupondelete(value)}>Delete</button>
                      )
                  }
              }
          }]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        {/*<Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid>*/}
      </Grid>
    </>
  );
}
}
export default withRouter(CouponList);



