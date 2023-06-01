

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
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

const Dashboard = () => {
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
    
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Revenue
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data.revenue}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span className="text-nowrap">{data.currency}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Leads
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.leads}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={`${data.leadsInc ? 'text-success' : 'text-danger' } mr-2`}>
                        <i className={`fas ${data.leadsInc ? 'fa-arrow-up' : 'fa-arrow-down'} `} /> {data.leadsPercentage}%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Sales
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.orders}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={`${data.ordersInc ? 'text-success' : 'text-danger' } mr-2`}>
                        <i className={`fas ${data.ordersInc ? 'fa-arrow-up' : 'fa-arrow-down'} `} /> {data.ordersPercentage}%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tasks
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.tasks}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        {data.pendingTasks}
                      </span>
                      <span className="text-nowrap">pending tasks</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          </Container>
          </div>

          <div className="mt-4"></div>

          <Container fluid>

          <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Upcoming Events</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href=""
                      onClick={(e) => history.push("projects/")}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {!projects.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No shoots Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Shoots</th>
                    <th scope="col">Place</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>

                {!projects?.length ? "Loading": (
                    projects.map((e) => (
                    
                    <tr>
                      <th scope="row">{e.eventName}</th>
                      <td>{e.eventLocation}</td>
                      <td>{moment(e.dateFrom).fromNow()}</td>
                      
                    
                    </tr>
                    ))
                  )}
                  
                  
                </tbody>
              </Table>
                  )}
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Lead Origins</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href=""
                      onClick={() => history.push("settings/references")}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {!references.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No referrals Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Count</th>
                    
                  </tr>
                </thead>
                <tbody>
                {!references?.length ? "Loading": (
                    references.map((d) => (
                    <tr>
                      <th scope="row">{d.reference_name}</th>
                      <td>{d.count}</td>
                      
                    </tr>
                     
                      
                    ))
                  )}
                  
                  
                </tbody>
              </Table>
                )}
            </Card>
          </Col>
          
        </Row>
        
        </Container>
        
        
      
    </>
  );
};

export default Dashboard;
