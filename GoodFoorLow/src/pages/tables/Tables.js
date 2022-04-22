import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
// import firebase from "firebase";

// const db = firebase.firestore();
var dataSet = [];
//   db.collection("restaurant").get().then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//       dataSet.push([doc.data().name, doc.data().restaurant_email, doc.data().city,'Aprrove']);
// });
// });
const datatableData = dataSet;
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))


// const datatableData = [
//   ["Joe James", "Example Inc.", "Yonkers", "NY","Approve"],
//   ["John Walsh", "Example Inc.", "Hartford", "CT","Approve"],
//   ["Bob Herm", "Example Inc.", "Tampa", "FL","Approve"],
//   ["James Houston", "Example Inc.", "Dallas", "TX","Approve"],
//   ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT","Disable"],
//   ["Kaui Ignace", "Example Inc.", "Yonkers", "NY","Approve"],
//   ["Esperanza Susanne", "Example Inc.", "Hartford", "CT","Approve"],
//   ["Christian Birgitte", "Example Inc.", "Tampa", "FL","Disable"],
//   ["Meral Elias", "Example Inc.", "Hartford", "CT","Approve"],
//   ["Deep Pau", "Example Inc.", "Yonkers", "NY","Approve"],
//   ["Sebastiana Hani", "Example Inc.", "Dallas", "TX","Disable"],
//   ["Marciano Oihana", "Example Inc.", "Yonkers", "NY","Approve"],
//   ["Brigid Ankur", "Example Inc.", "Dallas", "TX","Disable"],
//   ["Anna Siranush", "Example Inc.", "Yonkers", "NY","Approve"],
//   ["Avram Sylva", "Example Inc.", "Hartford", "CT","Approve"],
//   ["Serafima Babatunde", "Example Inc.", "Tampa", "FL","Approve"],
//   ["Gaston Festus", "Example Inc.", "Tampa", "FL","Approve"],
// ];

export default function Tables() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Restaurants" />
      <div className="float-right">
            <button className="btn btn-primary">Add Restaurant</button>
          </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Restaurants List"
            data={datatableData}
            columns={["Restaurants", "Email", "City", {
              label: "Actions",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                          <button class="btn btn-primary" onClick={() => console.log(value, tableMeta) }>
                              Approve
                          </button>
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




