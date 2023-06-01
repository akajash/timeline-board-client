import React from 'react'
import { Card, CardBody, CardTitle, Container, Row, Col,CardHeader } from "reactstrap";
import UserHeader from '../../components/Headers/UserHeader';

const SettingsList = () => {

    const desc = "Create, Track and Manage your Packages, Lead Origins, Assets and Employee Designations."
    return(
        <>
        <UserHeader name="Settings" description={desc}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>

          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Settings</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <h5 className="text-muted my-4 pl-1">STUDIO SETTINGS</h5>
              <Row>
            <Col lg="6" xl="3">
            <a href="/app/settings/designation">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Designation
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Add multiple positions to workforces, to categorize and assign tasks with ease.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
            <a href="/app/settings/packages">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Packages
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Create custom packages to categorize the services you offer.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
            <a href="/app/settings/references">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          References
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Add lead sources to track the potential and increase the sales.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
            <a href="/app/settings/assets">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Assets
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Manage the studio equipments/assets and assign an incharge.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
            </Row>
            <h5 className="text-muted my-4 pl-1">ADVANCED SETTINGS</h5>
            <Row>
          <Col lg="6" xl="3">
            <a href="/app/settings/data">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Data
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Advanced data backup management for better user experience.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
            <a href="/app/settings/workflow">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Workflow Automation
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Automate literally anything! Set up custom actions that gets triggered on Events.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
            </Row>

            <h5 className="text-muted my-4 pl-1">EMAIL SETTINGS</h5>
            <Row>
          <Col lg="6" xl="3">
            <a href="/app/settings/mail-setup/">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Email Settings
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Update Email Credentials to send Automated mails.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
            <a href="/app/settings/mail-templates">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Email Templates
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Create dynamic mail templates to automate your workflow.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
            </Row>
              </CardBody>
            </Card>
          </Col>

          
        </Row>
      </Container>
        {/* <h5 className="text-muted my-4 pl-1">GENERAL SETTINGS</h5>
         <Row>
              
              <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className=" text-primary mb-0"
                        >
                          Manage Users
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Register and manage users and their roles/permissions to access the application.</span>
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
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Tax
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Add or manage taxes for revenue calculations and embedding tax information in Invoice.</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <h5 className="text-muted my-4 pl-1">EMAIL SETTINGS</h5>
            <Row>
            <Col lg="6" xl="3">
              <a href="/app/settings/mail-setup">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Email Settings
                        </CardTitle>
                        
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="ni ni-email-83" />
                        </div>
                      </Col> 
                    </Row> 
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Connect your gmail account, or custom SMTP Servers to send automated mails.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
                  <a href="/app/settings/mail-templates">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Email Templates
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Create custom dynamic mail templates for faster communication.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
            </Row>
            <h5 className="text-muted my-4 pl-1">AUTOMATION SETTINGS</h5>
        <Row>
              
              <Col lg="6" xl="3">
              <a href="/app/settings/workflow">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Automation
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Create and manage your workflow automation.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Tax
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Add or manage taxes for revenue calculations and embedding tax information in Invoice.</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row> */}
            {/* <h5 className="text-muted my-4 pl-1">STUDIO SETTINGS</h5>
            <Row>
            <Col lg="6" xl="3">
            <a href="/app/settings/designation">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Designation
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Add multiple positions to workforces, to categorize and assign tasks with ease.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
            <a href="/app/settings/packages">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Packages
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Create custom packages to categorize the services you offer.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
            <a href="/app/settings/references">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          References
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Add lead sources to track the potential and increase the sales.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
              <Col lg="6" xl="3">
            <a href="/app/settings/assets">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-primary mb-0"
                        >
                          Assets
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span>Manage the studio equipments/assets and assign an incharge.</span>
                    </p>
                  </CardBody>
                </Card>
                </a>
              </Col>
            </Row>
            </Container> */}
        </>
    )
}

export default SettingsList