import React,{useState} from 'react'

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col
  } from "reactstrap";
import ProjectForm from '../Form/projectForm';


export const toggleModal = () => {
    ProjectModal.setIsModal((prevIsModal) => !prevIsModal)
}

  
  const ProjectModal = (props) => {
    
   

    const [isModal,setIsModal] = useState()

    console.log(props.isModal);

    console.log(isModal);

    
      

    

      return (
        <>
          
         
          <Modal
            className="modal-dialog-centered"
            isOpen={props.isModal}
            toggle={toggleModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggleModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("exampleModal")}
              >
                Close
              </Button>
              <Button color="primary" type="button">
                Save changes
              </Button>
            </div>
          </Modal>
        </>
      );
    }
 
  
export default ProjectModal;