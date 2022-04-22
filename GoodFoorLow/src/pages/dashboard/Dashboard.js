import React, { useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,

  Area,
  // PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
import { PieChart } from 'react-minimal-pie-chart';

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import firebase from "firebase";
import moment from "moment";
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";
import { Line } from "react-chartjs-2";
import Api from "../../components/RestApis/Api";
// const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

// export default function Dashboard(props) {

  // var classes = useStyles();
  // var theme = useTheme();

 
 

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',totalview:0,totalrestu:0,totalorder:0,alltotal:0,columns:[
        { title: 'Email', field: 'email' },
        { title: 'Phone Number', field: 'phone'},
        { title: 'Date', field: 'date' },
        { title: 'Country', field: 'country' },
        { title: 'City', field: 'city' },
        { title: 'Total Amount', field: 'total' },
        { title: 'Commition', field: 'commition' },
      
      ],dataSet:[],totalToday:0,totalWeb:0,totalApp:0,totaltwo:0,rate:0,tcomm:0,totalco:0,
    };
  }
  componentDidMount()
  {
    this.resutcount();
//     var elx = new Date();
//     var datq= moment(elx).format('DD/MM/YYYY');
//     var datqt= moment(elx).format('YYYY');
//     var dr= moment(elx).format('MM');
//     var response2 = await db.collection("views").where('date', '==', datq).get();
//     const data2 = await response2.docs.map(doc => doc.data());
//     var response3 = await db.collection("restaurants").get();
//     const data3 = await response3.docs.map(doc => doc.data());
//     var response4 = await db.collection("orders").get();
//     const data4 = await response4.docs.map(doc => doc.data());
//     var response5 = await db.collection("Users").get();
//     const data5 = await response5.docs.map(doc => doc.data());
//     var response6 = await db.collection("Rattings").where('date', '==', Math.floor(Date.now()/1000)).get();
//     const data6 = await response6.docs.map(doc => doc.data());
//     this.setState({totalview:data2.length,totalrestu:data3.length,totalorder:data4.length,totalWeb:data5.length});
//     var total=0;
//     var tcomm=0;
//     var title=[];
//     var jan=0;
//     var feb=0;
//     var march=0;
//     var april=0;
//     var may=0;
//     var jun=0;
//     var july=0;
//     var agust=0;
//     var sept=0;
//     var oct=0;
//     var nov=0;
//     var dec=0;
//     var totaltwo=0;
//     var totalco=0;
//    for (let index = 0; index < data4.length; index++) {
//     total+=data4[index].grandtotal;
//     tcomm+=data4[index].commition;
// if(datq==moment(new Date(data4[index].current_date)).format('DD/MM/YYYY'))
// {

//       title.push({
//       email:data4[index].email,
//       phone: data4[index].phone,
//       date:moment(new Date(data4[index].current_date)).format('DD/MM/YYYY'),
//       country: data4[index].country,
//       city:data4[index].country,
//       total:Math.round(data4[index].grandtotal),
//       commition:Math.round(data4[index].commition)
//       });
//       totaltwo+=data4[index].grandtotal;
//       totalco+=data4[index].commition;
//     }
//     if(datqt==moment(new Date(data4[index].current_date)).format('YYYY'))
//     {
//       if("01"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         jan+=data4[index].grandtotal;
//       }
//       if("02"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         feb+=data4[index].grandtotal;
//       }
//       if("03"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         march+=data4[index].grandtotal;
//       }
//       if("04"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         april+=data4[index].grandtotal;
//       }
//       if("05"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         may+=data4[index].grandtotal;
//       }
//       if("06"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         jun+=data4[index].grandtotal;
//       }
//       if("07"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         july+=data4[index].grandtotal;
//       }
//       if("08"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         agust+=data4[index].grandtotal;
//       }
//       if("09"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         sept+=data4[index].grandtotal;
//       }
//       if("10"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         oct+=data4[index].grandtotal;
//       }
//       if("11"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         nov+=data4[index].grandtotal;
//       }
//       if("12"==moment(new Date(data4[index].current_date)).format('MM'))
//       {
//         dec+=data4[index].grandtotal;
//       }
//     }
     
//    }
//    this.setState({totalco:totalco,totaltwo:totaltwo,alltotal:total,tcomm:tcomm,dataSet:title,jan:jan,feb:feb,march:march,april:april,may:may,jun:jun,july:july,agust,agust,sept:sept,oct:oct,nov:nov,dec:dec});
//    var totalr=[];
//    for (let index = 0; index < data5.length; index++) {
//     if(datq == moment(new Date(data5[index].current_date)).format('DD/MM/YYYY'))
//     {
//       totalr.push(data5[index]);
//     }
//    }
//    this.setState({totalToday:totalr.length});
//    var element=0;
//    for (let index = 0; index < data6.length; index++) {
//       element+=data6[index].ratting;
//    }
//    if(element!==0)
//    {
//    this.setState({rate:element/data6.length});
//   }
  }

  resutcount=async()=>
  {
    try{
    const response= await Api.restaurantsCount();
    
    if(response.data.users>0)
    {
      this.setState({totalrestu:response.data.users});
    }
  }
  catch(e){}
  }
render(){
  // local
  // var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>
      {/* <PageTitle title="Dashboard" button={<Button
      variant="contained"
      size="medium"
      color="secondary"
    >
        Latest Reports
    </Button>} /> */}
    
      <Grid container spacing={4} >
        
        <Grid item lg={3} md={6} sm={6} xs={12} className="topclass list1">
        <div class="listtab">
          <Widget
            title="Visits Today"
            upperTitle
          >
            <div>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
               {this.state.totalview}
              </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="totalrestu"><img src="/images/users.png"/></div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                 Today Earning
                </Typography>
                <Typography size="md">{'€'+Math.round(this.state.totaltwo)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text" colorBrightness="secondary" noWrap>
               Restaurant Earning
                </Typography>
                <Typography size="md">{'€'+Math.round(this.state.totaltwo-this.state.totalco)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text" colorBrightness="secondary" noWrap>
               Admin Earning
                </Typography>
                <Typography size="md">{'€'+Math.round(this.state.totalco)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                   Today Rate
                </Typography>
                <Typography size="md">{Math.round(this.state.rate)+'%'}</Typography>
              </Grid>
            </Grid>
          </Widget>
          </div>
        </Grid>

        <Grid item lg={3} md={6} sm={6} xs={12} className="topclass list1">
        <div class="listtab">
          <Widget
            title="Total Restaurant"
            upperTitle>
                <div>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                 <Typography size="xl" weight="medium" noWrap>
              {this.state.totalrestu}
              </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="totalrestu"><img src="/images/restu.png"/></div>
          </Widget>
          </div>
        </Grid>

        <Grid item lg={3} md={6} sm={6} xs={12} className="topclass list1">
        <div class="listtab">
          <Widget
            title="Total Orders"
            upperTitle
          >
            <div >
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
              {this.state.totalorder}
              </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="totalrestu"><img src="/images/cart.png"/></div>
          </Widget>
          </div>
        </Grid>

        <Grid item lg={3} md={6} sm={6} xs={12} className="topclass list1">
        <div class="listtab">
          <Widget title="Revenue Breakdown" >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                <PieChart
                data={[
                    { title: 'Admin Earning', value: Math.round(this.state.alltotal*20/100), color: '#3cd4a0' },
                    { title: 'Restaurant Earning', value: Math.round(this.state.alltotal-this.state.alltotal*20/100), color: '#ffc260' },
                    { title: 'Total Earning', value: this.state.alltotal, color: '#000' },
                ]}
                />
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div >
                  
                    <div  className="red">
                      <Dot fill="#de3b58" className="red" />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{'Total Earning'}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{'€'+this.state.alltotal}
                      </Typography>
                    </div>
                    <div className="yellow">
                      <Dot backgroundcolor="#de3b58" className="yellow" />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{'Restaurant Earning'}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{'€'+Math.round(this.state.alltotal-this.state.tcomm)}
                      </Typography>
                    </div>
                    <div className="green">
                      <Dot backgroundcolor="#de3b58" className="green" />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{'Admin Earning'}&nbsp;
                      </Typography>
                      <Typography color="#ffc260" colorBrightness="secondary">
                        &nbsp;{'€'+Math.round(this.state.tcomm)}
                      </Typography>
                    </div>

                
                </div>
              </Grid>
            </Grid>
          </Widget>
          </div>
        </Grid>
       
        <Grid item xs={12}>
          <Widget
            // bodyClass={classes.mainChartBody}
            header={
              <div >
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
               Earning Chart
                </Typography>
              
              </div>
            }>
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
            <Line data={{labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","July","Aug","sep","Oct","Nov","Dec"],
            datasets: [
                {
                label: "Web",
                data: [this.state.jan,this.state.feb,this.state.march,this.state.april,this.state.may,this.state.jun,this.state.july,this.state.agust,this.state.sept,this.state.oct,this.state.nov,this.state.dec],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
                },
                {
                label: "App",
                data: [0,0,0,0,0,0,0,0,0,0,0,0],
                fill: false,
                borderColor: "#742774"
                }
            ]
            }} />
           </ResponsiveContainer>
          </Widget>
        </Grid>
      

          <Grid item md={4} sm={6} xs={12} className="bottomclass"  >
          <Widget
            title="Today Users Registrations"
            upperTitle>
            <div>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
              {this.state.totalToday}
              </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="resgisteruser"><img src="/images/user2.png"/></div>
          </Widget>
          </Grid>

          <Grid item md={4} sm={6} xs={12} className="bottomclass" >
          <Widget
            title="Total Registrations from App"
            upperTitle>
            <div>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
              {this.state.totalApp}
              </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="resgisteruser"><img src="/images/app.png"/></div>
          </Widget>
          </Grid>

          <Grid item md={4} sm={6} xs={12} className="bottomclass">
          <Widget
            title="Total Registrations from web"
            upperTitle>
            <div>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
              {this.state.totalWeb}
              </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="resgisteruser"><img src="/images/web.png"/></div>
          </Widget>
          </Grid>
    
        <Grid item xs={12}>
          <Widget
            title="Today Orders"
            upperTitle
            noBodyPadding
            // bodyClass={classes.tableWidget}
          >
            <MaterialTable
            title=""
            data={this.state.dataSet}
            columns={this.state.columns}
          />
          </Widget>
        </Grid>
        
      </Grid>

    </>
  );
}

// #######################################################################
// function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
//   var array = new Array(length).fill();
//   let lastValue;

//   return array.map((item, index) => {
//     let randomValue = Math.floor(Math.random() * multiplier + 1);

//     while (
//       randomValue <= min ||
//       randomValue >= max ||
//       (lastValue && randomValue - lastValue > maxDiff)
//     ) {
//       randomValue = Math.floor(Math.random() * multiplier + 1);
//     }

//     lastValue = randomValue;

//     return { value: randomValue };
//   });
// }

// function getMainChartData() {
//   var resultArray = [];
//   var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
//   var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
//   var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

//   for (let i = 0; i < tablet.length; i++) {
//     resultArray.push({
//       tablet: tablet[i].value,
//       desktop: desktop[i].value,
//       mobile: mobile[i].value,
//     });
//   }

//   return resultArray;
// }


}
export default withRouter(Dashboard);
