import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

import { Link } from 'react-router-dom';
// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import $ from 'jquery';
// data
import mock from "../../dashboard/mock";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import moment from 'moment';
// const db = firebase.firestore();

class OrderList extends React.Component {
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
    this.state = { dataSet: [],dataSet2:[] };
  }
  componentDidMount(){
    // db.collection('orders').orderBy("order_id", "desc")
    // .get()
    //         .then( snapshot => {
    //             const dataSet = []
    //             snapshot.forEach(doc => {
    //                 dataSet.push([doc.data().order_id, doc.data().user_name, doc.data().email, doc.data().phone,doc.data().street+" "+doc.data().city+" "+doc.data().state+" "+doc.data().country,moment(new Date(Number(doc.data().current_date))).format('DD/MM/YYYY'),
    //                 doc.data().grandtotal,doc.data().commition,doc.data().payment_status,doc.data().payment_method,doc.id]);
    //             });
    //               return dataSet;
    //           })
    //          .then(userList => { 
    //           this.setState({dataSet:userList});
    //         })
    //     .catch(error => console.log(error))
  }
  // submit = () => {
  //   confirmAlert({
  //     title: 'Confirm to submit',
  //     message: 'Are you sure to do this.',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick: () => alert('Click Yes')
  //       },
  //       {
  //         label: 'No',
  //         onClick: () => alert('Click No')
  //       }
  //     ]
  //   });
  // };
  openpop(id)
  {
  //   db.collection("orders").doc(id).get().then( snapshot => {
  //     const dataSet = []
  //     snapshot.data().items.forEach(doc => {
  //         dataSet.push([doc.dish_name, <img src={doc.image} style={{ width: 80, borderRadius: '50%' }}/>, doc.actual_price, doc.quantity, doc.total]);
  //     });
  //     this.setState({username:snapshot.data().user_name});
  //       return dataSet;
  //   })
  //  .then(userList => { 
  //   this.setState({dataSet2:userList});
  // })
  $('#pop').removeClass('blockend');
  }
  closepop()
  {
    $('#pop').addClass('blockend');
    this.setState({dataSet2:[]})
  }
  render() {
  return (
    <>
      <PageTitle title="Orders" />
      <Grid container spacing={4}>
        <Grid item xs={12}>

          <MUIDataTable
            title=""
            data={this.state.dataSet}
            columns={["Order Id", "Name", "Email","Phone","Address","Dates","Total", "Earning","Payment Status", "Method", {
              label: "See Dishes",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                           <Link onClick={this.openpop.bind(this,value)}  className='btn btn-primary'> View </Link>
                           
                      )
                  }
              }
          }
          ]}
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
      <div  id="pop" class="blockend">

        <div class="uupdiv">
      <i class="fa fa-times" aria-hidden="true" onClick={this.closepop.bind(this)}></i>

      
      <MUIDataTable
              title=""
              data={this.state.dataSet2}
              columns={["Dish Name", "Image", "Actual Price","Quantity"
            ]}
              options={{
                filterType: "checkbox",
              }}
            /> 
         </div>
    </div>
    </>
  );
}
}
export default withRouter(OrderList);


