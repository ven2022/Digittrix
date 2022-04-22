import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import firebase from "firebase";
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import { withRouter } from "react-router-dom";
// const db = firebase.firestore();
class Messages extends React.Component {
  constructor() {
    super();
    this.state = { dataSet: [] };
  }
  componentDidMount(){
    // db.collection('messages')
    //         .get()
    //         .then( snapshot => {
    //             const dataSet = []
    //             snapshot.forEach(doc => {
    //                 dataSet.push([doc.data().name, doc.data().email, doc.data().phone, doc.data().messages,doc.id]);
    //             });
    //               return dataSet;
    //           })
    //          .then(userList => { 
    //           this.setState({dataSet:userList});
    //         })
    //     .catch(error => console.log(error))
  }
  coupondelete(id) {
    //   if (window.confirm("Delete the item?")) {
    //   db.collection("messages").doc(id).delete();
    //   this.componentDidMount();
    // }
    }

  render() {
  return (
    <>
      <PageTitle title="Messages" />
      <div className="pull-right mt-n-xs">
                
              </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            data={this.state.dataSet}
            columns={["Name", "Email", "Phone Number", "Messages", {
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
export default withRouter(Messages);



