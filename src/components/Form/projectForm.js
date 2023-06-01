import React, { useState } from 'react'

import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
  } from "reactstrap";

import ReactDatetime from 'react-datetime'

import CustomInput from "./Input"


const ProjectForm = () => {
    
    const [projectData,setProjectData] = useState({
        eventName : "",
        eventType : "",
        eventlocation: "",
        dateFrom: new Date(),
        dateTo: new Date(),
        amountQuoted :0,
        amountPaid : 0,
        package: "",
        reference: "",
        additonalNotes: ""
        
    })

    const [isAllDay,setIsAllDay] = useState(false)

    const switchAllDay = () => {
      setIsAllDay((prevIsAllDay) => !prevIsAllDay);
    }

    return(
        <Row>
        <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Order Details</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Event information
                  </h6>
                  <div className="">
                    <Row>
                      <CustomInput label="Event Name" 
                            type="text"
                            placeholder="Eg., John doe" 
                            idName = "input-event-name" />

                      {/* <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-eventName"
                          >
                            Event Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue="lucky.jesse"
                            id="input-eventName"
                            placeholder="Eg., John doe"
                            type="text"
                          />
                        </FormGroup>
                      </Col> */}
                      
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-eventType"
                          >
                            Event Type
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-eventType"
                            placeholder="Eg., Wedding"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-event-location"
                          >
                            Event Location
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-event-location"
                            placeholder="Eg., Bangalore"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-event-amount"
                          >
                            Amount Quoted
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-event-amount"
                            placeholder="Eg., 10000"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-event-amount"
                          >
                            Amount Paid
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="input-event-amount"
                            placeholder="Eg., 1000"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-event-amount"
                          >
                            Discount
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="input-event-amount"
                            placeholder="Eg., 10000"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg={4}>
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-event-location"
                          >
                            Event Start Date
                          </label>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                                inputProps={{
                                    placeholder: "Pick Start Date"
                                }}
                  timeFormat={isAllDay}
                  renderDay={(props, currentDate, selectedDate) => {
                    let classes = props.className;
                    if (
                      projectData.dateFrom &&
                      projectData.dateTo &&
                      projectData.dateFrom._d + "" === currentDate._d + ""
                    ) {
                      classes += " start-date";
                    } else if (
                      projectData.dateFrom &&
                      projectData.dateTo &&
                      new Date(projectData.dateFrom._d + "") <
                        new Date(currentDate._d + "") &&
                      new Date(projectData.dateTo._d + "") >
                        new Date(currentDate._d + "")
                    ) {
                      classes += " middle-date";
                    } else if (
                      projectData.dateTo &&
                      projectData.dateTo._d + "" === currentDate._d + ""
                    ) {
                      classes += " end-date";
                    }
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  }}
                  onChange={e => setProjectData({...projectData, dateFrom: e })}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col lg={4}>
            <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-event-location"
            >
              Event End Date
            </label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-calendar-grid-58" />
                  </InputGroupText>
                </InputGroupAddon>
                <ReactDatetime
                  inputProps={{
                    placeholder: "Date Picker Here"
                  }}
                  timeFormat={isAllDay}
                  renderDay={(props, currentDate, selectedDate) => {
                    let classes = props.className;
                    if (
                      projectData.dateFrom &&
                      projectData.dateTo &&
                      projectData.dateFrom._d + "" === currentDate._d + ""
                    ) {
                      classes += " start-date";
                    } else if (
                      projectData.dateFrom &&
                      projectData.dateTo &&
                      new Date(projectData.dateFrom._d + "") <
                        new Date(currentDate._d + "") &&
                      new Date(projectData.dateTo._d + "") >
                        new Date(currentDate._d + "")
                    ) {
                      classes += " middle-date";
                    } else if (
                      projectData.dateTo &&
                      projectData.dateTo._d + "" === currentDate._d + ""
                    ) {
                      classes += " end-date";
                    }
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  }}
                  onChange={e => setProjectData({ ...projectData,endDate: e })}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col lg={4}>
          <FormGroup>
          <label
            className="form-control-label"
            htmlFor="input-all-day"
          >
            All Day
          </label>
          <InputGroup>
            <label className="custom-toggle">
              <input type="checkbox" defaultChecked onChange={switchAllDay} id="input-all-day" />
              <span className="custom-toggle-slider rounded-circle" />
            </label>
          </InputGroup>
           
          </FormGroup>
          </Col>
        </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Additional Notes</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Notes</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Additional Notes... "
                        rows="4"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          </Row>
    )
}

export default ProjectForm;