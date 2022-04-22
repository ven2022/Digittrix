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
import Api from '../../../components/RestApis/Api';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

// const db = firebase.firestore();

class CustomerList extends React.Component {
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
      let response= await Api.usersList();
      if(response && response.data.status=="success")
      {
        const filter=[];
        response.data.users.forEach(doc => {
          filter.push([doc.userName,doc.email,doc.mobile,doc._id]);
        });
        this.setState({dataSet:filter});
      }
    }
    catch(e)
    {
      this.setState({errormsg:e.message});
    }
  }
  customerdelete=async(id)=>{
      if (window.confirm("Delete the item?")) {
      try{
        const response = await Api.userDeleteById(id);
        if(response && response.data.status=="success")
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
      <PageTitle title="Customers" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            data={this.state.dataSet}
            columns={["Username", "Email", "Phone", {
              label: "Delete",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                      <button onClick={() => this.customerdelete(value)}>Delete</button>
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
export default withRouter(CustomerList);


