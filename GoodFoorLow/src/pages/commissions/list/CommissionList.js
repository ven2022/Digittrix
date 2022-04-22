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
// const db = firebase.firestore();

class CommisionList extends React.Component {
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
    // db.collection('commission')
    //         .get()
    //         .then( snapshot => {
    //             const dataSet = []
    //             snapshot.forEach(doc => {
    //                 dataSet.push([doc.data().name, doc.data().commission_percent, doc.data().commission_fix,doc.id,doc.id]);
      
    //             });
    //               return dataSet;
    //           })
    //          .then(userList => { 
    //           this.setState({dataSet:userList});
    //         })
    //     .catch(error => console.log(error))
  }
 

commissionsdelete(id) {
    //   if (window.confirm("Delete the item?")) {
    //   db.collection("commission").doc(id).delete();
    //   this.componentDidMount();
    // }
    }

  render() {
  return (
    <>
      <PageTitle title="Commission" />
      <div className="pull-right mt-n-xs">
                <Link to="/app/commissions/new" className="btn btn-primary btn-inverse">
                  Create New Commission
                </Link>
              </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            data={this.state.dataSet}
            columns={["Name", "Commission Percent", "Commission Fix", {
              label: "Edit",
              label: "Edit",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                          <Link to={"/app/commissions/edit/" + value} className='btn btn-primary'> Edit </Link>
                      )
                  }
              }
          }, {
              label: "Delete",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                      <button onClick={() => this.commissionsdelete(value)}>Delete</button>
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



export default withRouter(CommisionList);




