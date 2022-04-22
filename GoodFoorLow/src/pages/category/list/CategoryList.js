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
import Api from '../../../components/RestApis/Api';

// const db = firebase.firestore();

class CategoryList extends React.Component {
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
    this.state = { dataSet: [],errormsg:""};
  }
  componentDidMount=async()=>{
    try{
      let response= await Api.categoriesList();
      if(response && response.data.status=="success")
      {
        const filter=[];
        response.data.users.forEach(doc => {
          filter.push([doc.name,doc._id,doc._id]);
        });
        this.setState({dataSet:filter});
      }
    }
    catch(e)
    {
      this.setState({errormsg:e.message});
    }
  }
  menudelete=async(id)=> {
    if (window.confirm("Delete the item?")) {
      try{
        const response = await Api.categoriesDeleteById(id);
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
      <PageTitle title="Category" />
      <div className="pull-right mt-n-xs">
                <Link to="/app/category/new" className="btn btn-primary btn-inverse">
                  Create New Category
                </Link>
              </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            data={this.state.dataSet}
            columns={["Name", {
              label: "Edit",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                          <Link to={"/app/category/edit/" + value} className='btn btn-primary'> Edit </Link>
                      )
                  }
              }},
              {
                label: "Delete",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                        <button className='btn btn-danger' onClick={() => this.menudelete(value)}>Delete</button>
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
    </>
  );
}
}
export default withRouter(CategoryList);



