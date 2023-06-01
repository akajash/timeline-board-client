import React,{useState,useEffect,useRef} from "react";
import moment from 'moment'
import empty from "../../images/empty.png"

import ReactDatetime from 'react-datetime'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  
  Modal,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
 
  Col,
  
  
  
  Button
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader.js";


import CustomPagination from "./pagination.js"
import CustomInput from "../../components/Form/Input.js"
import CustomSelect from "../../components/Form/SelectInput.js";
import { useDispatch,useSelector } from "react-redux";
import { updateProject,createProject, fetchProjects } from "../../actions/projects.js";
import {fetchAllPackages,fetchAllReferences} from "../../api/index.js"
import ProjectList from "./list.js";
import { fetchLoading } from "../../actions/loading.js";

const Projects = () => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const [isModal,setIsModal] = useState(false);

 

  const [projectData,setProjectData] = useState({
    eventName : "",
    eventType : "",
    eventLocation: "",
    dateFrom: new Date(),
    dateTo: new Date,
    amountQuoted :0,
    amountPaid : 0,
    package: "",
    reference: {
      title: "",
      id: ""
    },
    additionalNotes: "",
    discount: 0,
    discount_type: "",
    primaryContact: "",
    secondaryContact: "",
    services: [
      {
        service:"",
        quantity: 0
      }
    ],
    status: 0
    
})
  
  const [references,setReferences] = useState([])
  const [packages,setPackages] = useState([])
  const discount = [
    {value: "Percent", label: "Percent"},
    {value: "Amount", label: "Amount"},
  ]

const preload = async() => {
  await fetchAllPackages().then((res) => {
    if(res.error){
      console.log(res.error)
    }
    else{ 
      res.data.map((e)=>{
        e.value="value"
        e["value"] = e.package_name
        e.label = "label"
        e["label"] = e.package_name
        
      })    
   
      setPackages(res.data)
    }
    

  })
  
    
  
  await fetchAllReferences().then((res) => {
    if(res.error){
      console.log(res.error)
    }
    else{
      res.data.map((e) => {
        e.value = "value"
        e["value"] = e.reference_name
        e.label = "label"
        e["label"] = e.reference_name
       
      })

      setReferences(res.data)
      
    }
  })

  dispatch(fetchProjects(1))
}



const [isAllDay,setIsAllDay] = useState(false)
const [currentId,setCurrentId] = useState(null)


const switchAllDay = () => {
  setIsAllDay((prevIsAllDay) => !prevIsAllDay);
}

  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects)
  
  // const project = useSelector((state) => currentId ? state.projects.find((p) => p._id === currentId) : null);


  useEffect(async() => {
    dispatch(fetchLoading(true))
    await preload().then(() => dispatch(fetchLoading(false)))    
  },[])



    // useEffect(() => {
    //   if(project) setProjectData(project);
    // },[project])

    

    const handleChange = (e) => {
      setProjectData({...projectData, [e.target.name]: e.target.value})
    }

const handleSubmit = (e) => {
  e.preventDefault();

  

  if(currentId){
    dispatch(updateProject(currentId, {...projectData}))
  }
  else{
    dispatch(createProject({...projectData}))
  }

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setProjectData({eventName : "",
  eventType : "",
  eventLocation: "",
  dateFrom: new Date(),
  dateTo: new Date(),
  amountQuoted :0,
  amountPaid : 0,
  package: "",
  reference: {
    title: "",
    id: ""
  },
  additionalNotes: "",
  discount: 0,
  discount_type: "",
  primaryContact: "",
  secondaryContact: "",
  services: [{
    service:"",
    quantity: 0
}],
status: 0
})
}

const addService = () => {
  setProjectData({...projectData,services:[...projectData.services,{service: "",quantity: 0}]})
  
}

const deleteService = (index) => {
    const values = [...projectData.services]
    values.splice(index,1)
    setProjectData({...projectData, services:values})
}

const handleChangeServices = (index,e) => {
  const values = [...projectData.services]
  values[index][e.target.name] = e.target.value;
  setProjectData({...projectData, services:values})
}

const desc = "Manage and track your shoot's status"

  
  return (
    <>
      <UserHeader name="Shoots" description={desc} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                {/* <h3 className="mb-0">Card tables</h3> */}
                <Row className="align-items-center">
                <div className="col">
                    <h3 className="mb-0">Projects</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Project +
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              {!projects.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Shoots Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Event Name</th>
                    <th scope="col">Event Type</th>
                    <th scope="col">Location</th>
                    <th scope="col">Event Date</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  
                    {projects.map((proj) => (
                        
                      <ProjectList  project={proj} setCurrentId={setCurrentId} setIsModal = {setIsModal} projectkey={proj._id} />
                      
                    ))}
                  
                  
                </tbody>
              </Table>
              )}
              <CustomPagination/>
            </Card>
          </div>
        </Row>
        

          <Modal
            className="modal-dialog-centered modal-xl p-0"
            isOpen={isModal}
            toggle={toggleModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ORDER DETAILS
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
            <Form onSubmit={handleSubmit} autoComplete="off">
                  <h6 className="heading-small text-muted mb-4">
                    Event information
                  </h6>
                  <div className="">
                    
                    <Row>
                      <CustomInput label="Event Name" 
                            type="text"
                            placeholder="Eg., John doe" 
                            idName = "input-event-name"
                            name="eventName"
                            onChange = {handleChange}
                            col="4"
                            value={projectData.eventName}
                            />

                     
                      <CustomInput label="Event Type" 
                            type="text"
                            placeholder="Eg., Wedding" 
                            idName = "input-event-type" 
                            col="4" 
                            name="eventType"
                            onChange={handleChange}
                            value={projectData.eventType}
                            />

                        <CustomInput label="Event Location" 
                              type="text"
                              placeholder="Eg., Bangalore" 
                              idName = "input-event-location" 
                              col="4" 
                              name="eventLocation"
                              onChange={handleChange}
                              value={projectData.eventLocation}
                              />
                      
                      
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
                                    placeholder: "Pick Start Date",
                                    value:moment(projectData.dateFrom).format("MMMM Do YYYY")
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
                    placeholder: "End date",
                    value:moment(projectData.dateTo).format("MMMM Do YYYY")
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
                  onChange={e => setProjectData({ ...projectData,dateTo: e })}
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
        
        <h6 className="heading-small text-muted mb-4">
          Services
        </h6>
        <div className="pl-lg-4"></div>
        <Row>
            <Col lg={6}>
            <CustomSelect 
              heading="Package"
              options={packages} 
              id='_id'
              label="package_name"
              prompt="Select Package"
              value={projectData.package}
              onChange={val => setProjectData({...projectData, package: val?.package_name, services: val?.services, amountQuoted: val?.amount})}
              />
            </Col>
            <Col lg={6}>
              
            <CustomSelect 
              heading="Reference"
              options={references} 
              id='_id'
              label="reference_name"
              prompt="Select Reference"
              value={projectData.reference.title}
              onChange={val => setProjectData({...projectData, reference: {title: val?.reference_name, id: val?._id}})}
              required={true}
              />
            </Col>
        </Row>

                  

        {projectData.services?.map((field,index) => (
                          
                              
                          <Row key={index}>
                          <CustomInput label="Service Name"
                            type="text"
                            placeholder="Eg., Candid Photographer"
                            idName = "input-service"
                            name="service"
                            onChange = {e => handleChangeServices(index,e)}
                            col="4"
                            value={projectData.services[index].service}
                            />

                            <CustomInput label="Quantity" 
                                type="number"
                                placeholder="Eg., 1" 
                                idName = "input-quantity"
                                name="quantity"
                                onChange = {e => handleChangeServices(index,e)}
                                col="4"
                                value={projectData.services[index].quantity}
                                />
                                {projectData.services?.length > 1 && (<a
                                    
                                    className="btn btn-md my-4 justify-items-center btn-icon-only lead"
                                    type="button"
                                    onClick={() => deleteService(index)}
                                >
                                    <i className="ni ni-fat-remove text-danger"></i>
                                </a>)}
                                <a
                                    
                                    className="btn btn-md my-4 justify-items-center btn-icon-only lead"
                                    type="button"
                                    onClick={addService}
                                >
                                    <i className="ni ni-fat-add text-success"></i>
                                </a>
                            
                          </Row>
                          
                          
                     
                  ))}
        <Row>
                    <CustomInput label="Amount Quoted" 
                            type="number"
                            placeholder="Eg., 10000" 
                            idName = "input-event-amount" 
                            col="3" 
                            name="amountQuoted"
                            onChange={handleChange}
                            value={projectData.amountQuoted}
                            />

                    <CustomInput label="Amount Paid" 
                              type="number"
                              placeholder="Eg., 5000" 
                              idName = "input-amount-paid" 
                              col="3" 
                              name="amountPaid"
                              onChange={handleChange}
                              value={projectData.amountPaid}
                              />
                      
                       <CustomInput label="Discount" 
                              type="number"
                              placeholder="Eg., 1000" 
                              idName = "input-discount-amount" 
                              col="3" 
                              name="discount"
                              onChange={handleChange}
                              value={projectData.discount}
                              />
                              
                      <Col lg={3}>
                          <CustomSelect 
                            heading="Discount Type"
                            options={discount} 
                            id='_id'
                            label="label"
                            prompt="Select..."
                            value={projectData.discount_type}
                            onChange={val => setProjectData({...projectData, discount_type: val?.value})}
                            />
                      </Col>
                      
                    </Row>
                  
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    
                    <Row>
                      <CustomInput label="Email Address" 
                              type="email"
                              placeholder="Eg., johndoe@gmail.com" 
                              idName = "input-email" 
                              col="4" 
                              name="email"
                              onChange={handleChange}
                              value={projectData.email}
                              />

                      <CustomInput label="Primary Contact" 
                              type="number"
                              placeholder="Eg., 9874563210" 
                              idName = "input-primary-contact" 
                              col="4" 
                              name="primaryContact"
                              onChange={handleChange}
                              value={projectData.primaryContact}
                              />

                      <CustomInput label="Secondary Contact" 
                              type="number"
                              placeholder="Eg., 7894561230" 
                              idName = "input-secondary-contact" 
                              col="4" 
                              name="secondaryContact"
                              onChange={handleChange}
                              value={projectData.secondaryContact}
                              />
                      
                    </Row>
                    
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <Row>
                  <CustomInput
                    label="Additional Notes"
                    type="textarea"
                    col="12"
                    placeholder="Additional Notes... "
                    name="additionalNotes"
                    onChange={handleChange}
                    value={projectData.additionalNotes}
                  />
                  </Row>
                  

                  {/* <div className="pl-lg-4">
                    <FormGroup>
                      <label>Notes</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Additional Notes... "
                        rows="4"
                        type="textarea"
                      />
                    </FormGroup>
                  </div> */}
                  <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleModal}
              >
                Close
              </Button>
              <Button color="primary" type="submit">
                Save changes
              </Button>
            </div>
                </Form>
            </div>

            
          </Modal>
          

      </Container>
    </>
  );
};

export default Projects;
