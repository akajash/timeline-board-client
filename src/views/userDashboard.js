

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./../assets/css/dash-style.css"
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    CardTitle,
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../variables/charts.js";
import { dashboardData, fetchReferences,fetchAnalytics, fetchProjects, fetchSub,fetchUpcomingEvents } from "../api/index.js";
import moment from 'moment'
import { useDispatch } from "react-redux";
import { fetchLoading } from "../actions/loading.js";

import empty from "../images/empty.png"
import AdminNavbar from "../components/Navbars/AdminNavbar";


const UserDashboard = () => {
     const [activeNav, setActiveNav] = useState(1);
     const [chartExample1Data, setChartExample1Data] = useState("data1");
     const [isLoading,setIsloading] = useState(false)
     const [data,setData] = useState({
        revenue: 0,
        leads : 0,
        orders: 0,
        leadsInc: true,
        leadsPercentage: 0.0,
        ordersInc: true,
        ordersPercentage: 0.0,
        tasks: 0,
        pendingTasks: 0,
        currency: ""
     })

     const history = useHistory()

     const [projects,setProjects] = useState([])
     const [references,setReferences] = useState([])
   
     if (window.Chart) {
       parseOptions(Chart, chartOptions());
     }
   
     const toggleNavs = (e, index) => {
       e.preventDefault();
       setActiveNav(index);
       setChartExample1Data("data" + index);
     };
     const dispatch = useDispatch()

     const preload = async() => {
      
      await dashboardData().then((res) => {
        if(res.data.error){
          console.log(res.data.error)
        }
        else{
          console.log(res.data.leads)
          setData({
            revenue: res.data.revenue,
            leads: res.data.leads,
            orders: res.data.orders,
            leadsInc: res.data.leadsInc,
            ordersInc : res.data.ordersInc,
            leadsPercentage: res.data.leadsPercentage,
            ordersPercentage: res.data.ordersPercentage,
            tasks: res.data.tasks,
            pendingTasks: res.data.pendingTasks,
            currency: res.data.currency
          })
        }
      })

      

      fetchReferences().then((res) => {
        if(res.data.error){
          console.log(res.data.error)
        }
        else{
          // res.data.map((e) => {
          //   e.value = "value"
          //   e["value"] = e.reference_name
          //   e.value = "value"
          //   e["value"] = e.count
            


          // })
        
          setReferences(res.data.data)
          console.log(references)
        }
       })

      fetchUpcomingEvents().then((res) => {
         if (res.data.error){
           console.log(res.data.error)
         }
         else{
           setProjects(res.data.data)
           console.log(projects)
         }
       })
        
          
       
      

    }

     useEffect(async() => { 
        dispatch(fetchLoading(true))
        await preload().then(() => dispatch(fetchLoading(false)))    
        
     },[])
  return (
    <>
       <div className = "dash-wrapper">
        <input type = "checkbox" />
        <div className="dashbar">
            <div className="brand-logo">
                <h3>
                    <span className=""></span>
                </h3>
            </div>
            <div className="profile-card">
                <div className="profile-img"></div>
                <div className="profile-info">
                    <h2 className="text-white">Karthick Jayachandran</h2>
                    <small>Signature Frames</small>
                </div>
                <div className="profile-action">
                    <a href="" className="btn btn-white">
                        <span className=""></span>
                        $2400
                    </a>
                </div>
                <div className="profile-icons">
                    <span className="ni ni-user-run"></span>
                    <span className="ni ni-user-run"></span>
                    <span className="ni ni-user-run"></span>
                    
                </div>
            </div>

            <div className="sidebar-menu">
                <div className="menu-item">
                    <a href="">
                        <span className="ni ni-user-run"></span>
                        <span>Projects</span>
                    </a>
                </div>
                <div className="menu-item">
                    <a href="">
                        <span className="ni ni-user-run"></span>
                        <span>Projects</span>
                    </a>
                </div>
                <div className="menu-item">
                    <a href="">
                        <span className="ni ni-user-run"></span>
                        <span>Projects</span>
                    </a>
                </div>
                <div className="menu-item">
                    <a href="">
                        <span className="ni ni-user-run"></span>
                        <span>Projects</span>
                    </a>
                </div>
                <div className="menu-item">
                    <a href="">
                        <span className="ni ni-user-run"></span>
                        <span>Projects</span>
                    </a>
                </div>
                <div className="menu-item">
                    <a href="">
                        <span className="ni ni-user-run"></span>
                        <span>Projects</span>
                    </a>
                </div>
                

            </div>
            <div className="sidebar-card">
                <h2 className="text-white">Hello Karthick</h2>
                <p>You have tasks that are certainly needed to be taken care of.</p>
                <a href="" className="btn btn-white">Get Started</a>
            </div>
        </div>
        <div className="dash-main-content">
            <header>
                <label for= "menu-toggler">
                    <span className="fas fa-bars"></span>
                </label>

                <div className="head-icons">
                    <span className=""></span>
                    <span className=""></span>
                    <span className=""></span>
                    <div className="head-avatar">
                        <div className="avatar"></div>
                        <span>Karthick Jayachandran</span>
                    </div>
                </div>
            </header>
            <main>
                <div className="page-header">
                    <h1>Hey Karthick</h1>
                    <small>Have a nice day</small>
                </div>
                <div className="analytics">
                    <div className="dash-card engage-card">
                        <div className="dash-card-head">
                            Engagements
                        </div>
                        <div className="dash-card-body">

                        </div>
                    </div>
                    <div className="card emails-card">

                    </div>
                </div>
            </main>
        </div>
       </div>
    </>
  );
};

export default UserDashboard;
