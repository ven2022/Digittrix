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

class OrderEdit extends React.Component {
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
    title: 'Create new Customer',
    description: 'About description',
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      phone: '',
    };
  }
  componentDidMount(){
//     var id = this.props.match.params.id;
//     db.collection("orders").doc(id).get().then( snapshot => {
//       const dataSet = []
//       snapshot.data().items.forEach(doc => {
//           dataSet.push([doc.dish_name, <img src={doc.image} style={{ width: 80, borderRadius: '50%' }}/>, doc.actual_price, doc.quantity, doc.total]);
//       });
//       this.setState({username:snapshot.data().user_name});
//         return dataSet;
//     })
//    .then(userList => { 
//     this.setState({dataSet:userList});
//   })
// .catch(error => console.log(error))
  }



  render() {
    return (
      <>
        <PageTitle title={"Dish list of "+this.state.username} />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title=""
              data={this.state.dataSet}
              columns={["Dish Name", "Image", "Actual Price","Quantity","Total Price"
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
  
export default withRouter(OrderEdit);
