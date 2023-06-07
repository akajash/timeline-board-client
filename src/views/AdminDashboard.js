

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./../assets/css/admin-style.css"
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
  Badge
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
import user01 from "../assets/img/icons/user01.png"
import user02 from "../assets/img/icons/user02.png"
import user03 from "../assets/img/icons/user03.png"
import user04 from "../assets/img/icons/user04.png"
import user05 from "../assets/img/icons/user05.png"
import user06 from "../assets/img/icons/user06.png"
import user07 from "../assets/img/icons/user07.png"
import user08 from "../assets/img/icons/user01.png"
import user09 from "../assets/img/icons/user02.png"
// const user01 = require('../assets/img/icons/user01.png')
// const user02 = require('../assets/img/icons/user02.png')
// const user03 = require('../assets/img/icons/user03.png')
// const user04 = require('../assets/img/icons/user04.png')
// const user05 = require('../assets/img/icons/user05.png')
// const user06 = require('../assets/img/icons/user06.png')
// const user07 = require('../assets/img/icons/user07.png')
// const user08 = require('../assets/img/icons/user01.png')
// const user09 = require('../assets/img/icons/user02.png')


const AdminDashboard = () => {
     const [activeNav, setActiveNav] = useState(1);
     const [isLoading,setIsloading] = useState(false)
     const [data,setData] = useState({
        leads : 0,
        orders: 0,
        leadsInc: true,
        leadsPercentage: 0.0,
        ordersInc: true,
        ordersPercentage: 0.0,
        upcoming: [],
        notifications: [],
        clients: [],
        leadSource: "",
        leadSourceCount: 0
     })

     const status = [
      {title:"Lead",class:"bg-danger"},{title:"Order",class:"bg-success"},{title:"Pre-Production",class:"bg-success"},{title:"Production",class:"bg-success"},{title:"Post Production",class:"bg-warning"},{title:"Delivery",class:"bg-warning"},{title:"Wrapped up",class:"bg-dark"}
    ]

     const history = useHistory()

     const [projects,setProjects] = useState([])
     const [references,setReferences] = useState([])
   
     if (window.Chart) {
       parseOptions(Chart, chartOptions());
     }
   
    //  const toggleNavs = (e, index) => {
    //    e.preventDefault();
    //    setActiveNav(index);
    //    setChartExample1Data("data" + index);
    //  };
     const dispatch = useDispatch()

     const preload = async() => {
      
      await dashboardData().then((res) => {
        if(res.data.error){
          console.log(res.data.error)
        }
        else{
          setData({
            leads: res.data.leads,
            orders: res.data.orders,
            leadsInc: res.data.leadsInc,
            ordersInc : res.data.ordersInc,
            leadsPercentage: res.data.leadsPercentage,
            ordersPercentage: res.data.ordersPercentage,
            upcoming: res.data.upcoming,
            notifications: res.data.notifications,
            clients: res.data.productionClients,
            leadSource: res.data.leadSource,
            leadSourceCount: res.data.leadSourceCount
          })
        }
      })

 

    }

    const viewDetail = (project_id) => {
      history.push(`/app/project/${project_id}`)
    }

     useEffect(async() => { 
        dispatch(fetchLoading(false))
        await preload().then(() => dispatch(fetchLoading(false)))    
        
     },[])

     const images = [user01,user02,user03,user04,user05,user06,user07]
  return (
    <>
        {/* <div className="navbar"></div> */}
        <div className="dash-nav">
          <h3>Hi there! Here's what we brewed for you.</h3>
        </div>
        <div className="container-fluid">
          <div className="main">
            <article>
              <header>
                {/* <h1>Dashboard</h1> */}
              </header>
              <div className="dash-grid">
              <section className="my-team">
                <header>
                    <h1 className="text-light">Projects</h1>
                  </header>
                  <div className="team">
                    {data.clients != 0 ? (
                      data.clients.map((c,index) => 
                      <div className = "team-member" key={index}>
                      <div className="avatar">
                        <img src={images[Math.floor(Math.random() * images.length)]} />
                      </div>
                      <div className="name">
                        {c.eventName}
                      </div>
                      <Badge color="" className="title text-left badge-dot mr-4">
                        <i className={status[c.status]?.class} />
                        {status[c.status]?.title}
                      </Badge>
                    </div>
                    

                    )
                    // {
                    //   <p className="text-primary text-center">End of Results</p>
                    // }
                    ) : (
                      <p className="text-left ml-2">Projects that are being processed in production will be displayed here. Easy to track each project's status from this board. </p>
                    )
                    }
                    
                    {/*   <a href="#">View All</a> */}
                  </div> 
                  {data.clients == 0 && (
                    <div className="text-center">
                    <img src={empty} className="n-icon"/>
                    <p>No Data Available</p>
                    
                  
                </div>
                  )}
                  
                </section> 
              <section className="project-1">
                  <div className="insights-icon">
                    <i className="ni ni-chart-pie-35"></i>
                  </div>
                  <div className="insights-detail">
                    <h4>Total Leads</h4>
                    <h2>{data.leads}</h2>
                    <p>{data.leadsInc ? "Increased" : "Decreased"} by {data?.leadsPercentage?.toFixed(2)}% as compared to last month</p>
                  </div>
                </section>
                <section className="project-2">
                <div className="insights-icon">
                    <i className="ni ni-chart-bar-32"></i>
                  </div>
                  <div className="insights-detail">
                    <h4>Total Sales</h4>
                    <h2>{data.orders}</h2>
                    <p>{data.ordersInc ? "Increased" : "Decreased"} by {data?.ordersPercentage?.toFixed(2)}% as compared to last month</p>
                  </div>
                </section>
                <section className="project-3">
                <div className="insights-icon">
                    <i className="ni ni-notification-70"></i>
                  </div>
                  <div className="insights-detail">
                    <h4>Lead Source</h4>
                    {data.leadSource != "" ? 
                    (
                      <div>
                      <h2>{data.leadSource}</h2>
                      <p>{data.leadSourceCount} lead(s) are from this source</p>
                      </div>
                    )
                    :
                    (
                      <div>
                      <h2>-</h2>
                      <p>No data to show</p>
                      </div>
                    )
                  }
                    
                    
                  </div>
                </section>
               
                
                <section className="follow-up">
                <header>
                    <h1 className="text-light">Upcoming Projects</h1>
                  </header>
                  <div className="detail">
                    {data.upcoming != 0 ? (
                      data.upcoming.map((u) => 
                      <div className="item">
                      <div className="date-fill">
                        <h5>{moment(u.dateFrom).format('MMM')}</h5>
                        <h2>{moment(u.dateFrom).format('DD')}</h2>
                      </div>
                      <div className="brief">
                        <h3>{u.eventName}</h3>
                        <h5>{u.eventLocation}</h5>
                      </div>
                    </div>
                      )
                    ) : (
                      <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Data Available</p>
                      
                    </div>
                    )}
                    
                    
                    
                    {data.upcoming != 0 && (
                        <a href="/app/projects">View Shoots</a>
                    )}
                  </div>
                </section>
                
                
                <section className="pending">
                  <header>
                    <h1 className="text-light">Heads Up</h1>

                  </header>
                  <div className="leads">
                    {data.notifications != 0 ? (
                      data.notifications.map((n) =>
                        <div className="lead-item">
                        <div className="ic">
                        <button 
                            className="btn-custom"
                            onClick={() => viewDetail(n._id)}
                            >
                              <i className="ni ni-curved-next"></i>
                            </button>
                          
                        </div>
                        <div className="heads-up-content">
                          <h5 className="text-primary">{n.eventName}</h5>
                          <p>It's been 3 days, Follow up for better conversion</p>
                        </div>
                        
                      </div>
                      )
                    ) : (
                      <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Data Available</p>
                      
                    </div>
                    )}
                    
                    
                    
                    {data.notifications != 0 && (
                        <a href="/app/projects">View shoots</a>
                    )}
                  </div>
                  
                </section>
              </div>
            </article>
            

          </div>
           
          
        </div>  
    </>
  );
};

export default AdminDashboard;
