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
import Api from '../../../components/RestApis/Api';
const apiurl="http://172.105.159.222:5000/";
// const db = firebase.firestore();
class GoodwordsList extends React.Component {
  constructor() {
    super();
    this.state = { dataSet: [] };
  }
  componentDidMount=async()=>{
  try{
    const response= await Api.goodwordsList();
    if(response.data && response.data.status=="success")
    {
      const dataSet = []
      response.data.users.forEach(doc => {
          dataSet.push([doc.name, <img src={apiurl+doc.image} className="imagclass"/>,doc._id,doc._id]);
      });
      this.setState({dataSet:dataSet});
    }
    else
    {
      alert(response.error.response.data.message)
    }
    }
    catch(e)
    {
      alert(e.message);
    }

    }

    coupondelete=async(id)=> {
      if (window.confirm("Delete the item?")) {
      try{
      const response= await Api.goodwordsDeleteById(id);
      if(response.data && response.data.status=="success")
      {
        this.componentDidMount();
      }
      else
      {
        alert(response.error.response.data.message)
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
      <PageTitle title="Good words" />
      <div className="pull-right mt-n-xs">
                <Link to="/app/goodwords/new" className="btn btn-primary btn-inverse">
                  Create New Good Words
                </Link>
              </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            data={this.state.dataSet}
            columns={["Name", "Image", {
              label: "Edit",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                          <Link to={"/app/goodwords/edit/" + value} className='btn btn-primary'> Edit </Link>
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
export default withRouter(GoodwordsList);



