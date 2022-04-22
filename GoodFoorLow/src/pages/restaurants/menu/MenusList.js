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
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";
import Api from '../../../components/RestApis/Api';

class MenusList extends React.Component {
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
    this.state = { dataSet: [],columns:[
      { title: 'Dish Name', field: 'dish_name' },
      { title: 'Image', field: 'image'},
      { title: 'Foodtype', field: 'foodtype'},
      { title: 'ProductType', field: 'productType'},
      { title: 'Required Member', field: 'memberReq'},
      { title: 'Quantity Available', field: 'stockAvail' },
      { title:  'Description', field: 'description'},
      { title:  'Price', field: 'price'}
    ] }
  
  }


  componentDidMount=async()=>{
    
    try{
      let formData=new FormData();
      formData.append('id',this.props.match.params.id);
      let response= await Api.fetchdishesh(formData);
      if(response && response.data.status=="success")
      {
        const filter=[];
        response.data.result.forEach(doc => {
          filter.push({dish_name:doc.name,image: <img src={'http://172.105.159.222:5000/'+doc.images[0]} style={{ width: 40, borderRadius: '50%' }} />,foodtype:doc.foodtype,productType: doc.productType == 1 ? 'Signle':'Group',
            memberReq:doc.memberReq,stockAvail:doc.stockAvail,description:doc.description,price:doc.price});
        });
        this.setState({dataSet:filter});
      }
    }
    catch(e)
    {
      this.setState({errormsg:e.message});
    }
  }
 


  render() {
    return(
      <>
      <PageTitle title="Menus" />
      <Link to={'/app/restaurants'}><i class="fa fa-arrow-left romoveback"></i></Link>
      <div className="pull-right mt-n-xs">
                
              </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MaterialTable
            title=""
            data={this.state.dataSet}
            columns={this.state.columns}
            title="Menus"
          />
        </Grid>
      </Grid>
    </>
  );
  }
}



export default withRouter(MenusList);


