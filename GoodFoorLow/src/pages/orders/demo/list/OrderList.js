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
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

const db = firebase.firestore();

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
    this.state = { dataSet: [] };
  }
  componentDidMount(){
    db.collection('orders')
            .get()
            .then( snapshot => {
                const dataSet = []
                snapshot.forEach(doc => {
                    dataSet.push([doc.data().user_name, doc.data().email, doc.data().phone, doc.data().street, doc.data().state, doc.data().grandtotal]);
                });
                  return dataSet;
              })
             .then(userList => { 
              this.setState({dataSet:userList});
            })
        .catch(error => console.log(error))
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
            columns={["Customer Name","Email","Phone","Address","State","Price", {
       
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
    </>
  );
}
}
export default withRouter(OrderList);


