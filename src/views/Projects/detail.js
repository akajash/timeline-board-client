import React,{useState,useEffect} from 'react'

import UserHeader from "../../components/Headers/UserHeader.js";
import {fetchAllPackages,fetchAllReferences, fetchSingleProject,pushPipeline} from "../../api/index.js"
import CustomInput from "../../components/Form/Input.js"
import { useDispatch,useSelector } from "react-redux";
import { updateProject} from "../../actions/projects.js";
import CustomSelect from "../../components/Form/SelectInput.js";
import {deleteProject} from '../../actions/projects'
import { fetchLoading } from "../../actions/loading.js";
import { useHistory } from 'react-router';


import moment from 'moment'

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
  
  CardBody,
  
  Button
} from "reactstrap";


const ProjectDetail = (props) => {

  const history = useHistory()

    const [isModal,setIsModal] = useState(false);
    const [isDeleteModal,setIsDeleteModal] = useState(false);
  const [isLoading,setIsLoading] = useState(true)
  
  const status = [
    {title:"Lead",class:"bg-danger"},{title:"Order",class:"bg-success"},{title:"Pre-Production",class:"bg-success"},{title:"Production",class:"bg-success"},{title:"Post Production",class:"bg-warning"},{title:"Delivery",class:"bg-warning"},{title:"Wrapped up",class:"bg-dark"}
  ]

  const [projectData,setProjectData] = useState({
    eventName : "",
    eventType : "",
    eventLocation: "",
    dateFrom: "",
    dateTo: "",
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

    const [formData,setFormData] = useState({
      eventName : "",
      eventType : "",
      eventLocation: "",
      dateFrom: "",
      dateTo: "",
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
      status:0
  })
  
    const [references,setReferences] = useState([])
    const [packages,setPackages] = useState([])
    const discount = [
      {value: "Percent", label: "Percent"},
      {value: "Amount", label: "Amount"},
    ]
  
  const preload = async() => {
    const id = props.match.params.id 
    setCurrentId(id)
    await fetchSingleProject(id).then((res) => {
      if(res.error){
        console.log(res.error)
      }
      else{
       
        setProjectData(res.data)
        setFormData(res.data)

        
        
      }
    })


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
    
    // setIsLoading(false)
  }
   
  // const [statusString,setStatusString] = useState("")
  // const [formStatus,setFormStatus] = useState("")
    const [isAllDay,setIsAllDay] = useState(false)
    const [currentId,setCurrentId] = useState(null)
    
    const nextWorkflow = (currentId) => {
      
      pushPipeline(currentId).then(() => {
        var newStatus = projectData.status + 1
        setProjectData({...projectData, status: newStatus})
      })
    }

    
    
    const switchAllDay = () => {
      setIsAllDay((prevIsAllDay) => !prevIsAllDay);
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
      }
    
      const toggleModal = () => {
        setIsModal((prevIsModal) => !prevIsModal)
        setFormData(projectData)
        
      }

      const toggleDeleteModal = () => {
        setIsDeleteModal((prevIsModal) => !prevIsModal)
       
        
      }
    
      const dispatch = useDispatch()


      useEffect(async() => {
        dispatch(fetchLoading(true))
        await preload().then(() => dispatch(fetchLoading(false)))  
      },[])

    const handleUpdate = (project_id) => {
        setCurrentId(project_id);
        setIsModal(true)
        
  
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      
        
      
        
        dispatch(updateProject(currentId, {...formData}))

        setProjectData(formData)
        
        
      
        
        toggleModal()
        window.location.reload()
      }
      
      const handleDelete = (currentId) => {
        dispatch(deleteProject(currentId))
        toggleDeleteModal()
        history.push("/app/projects")
      }
      
      
      const addService = () => {
        setFormData({...formData,services:[...formData.services,{service: "",quantity: 0}]})
        
      }
      
      const deleteService = (index) => {
          const values = [...formData.services]
          values.splice(index,1)
          setFormData({...formData, services:values})
      }
      
      const handleChangeServices = (index,e) => {
        const values = [...formData.services]
        values[index][e.target.name] = e.target.value;
        setFormData({...formData, services:values})
      }
      
      const handleTasks = (id) => {
        // history.push(`/app/tasks/${id}`)
        window.location.replace(`/app/tasks/${id}`);
      }

      const handleExpenses = (id) => {
        // history.push(`/app/revenue/${id}`)
        window.location.replace(`/app/revenue/${id}`);
      }


      const desc = ""

    return(
        <>
        <UserHeader name="Project Detail" description={desc} />
        <Container className="mt--7" fluid>
            <Row>
                <Col>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                        <Row className="align-items-center">
                            <div className="col">
                                <h3 className="mb-0">Project Detail</h3>
                            </div>
                            <div className="col text-right">
                                
                                <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-primary"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          
                          <DropdownItem onClick={() => handleUpdate(currentId)}>Update</DropdownItem>
                          { status < 3  && (
                            <DropdownItem onClick={() => nextWorkflow(currentId)}>Convert to {status[projectData.status+1]?.title}</DropdownItem>
                          )}
                          
                          {/* <DropdownItem onClick={() => handleInvoice(currentId)}>Generate Invoice</DropdownItem> */}
                          <DropdownItem onClick={() => handleTasks(currentId)}>Assign Tasks</DropdownItem>
                          <DropdownItem onClick={() => handleExpenses(currentId)}>Manage Expenses</DropdownItem>
                          <DropdownItem onClick={() => toggleDeleteModal()}>Delete</DropdownItem>


                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                            </div>
                           
                            
                            </Row>
                            
                        </CardHeader>
                        {/* <CardBody>
                        <Row>
                                <Col lg={4}>
                                    <h5 className="text-muted">Event Name</h5>
                                    <p>{projectData.eventName}</p>
                                </Col>
                                <Col lg={4}>
                                    <h5 className="text-muted">Event Type</h5>
                                    <p>{projectData.eventType}</p>
                                </Col>
                                <Col lg={4}>
                                    <h5 className="text-muted">Event Location</h5>
                                    <p>{projectData.eventLocation}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <h5 className="text-muted">Date From</h5>
                                    <p>{moment(projectData.dateFrom).format("MMMM Do YYYY")}</p>
                                </Col>
                                <Col lg={4}>
                                    <h5 className="text-muted">Date Till</h5>
                                    <p>{moment(projectData.dateTo).format("MMMM Do YYYY")}</p>
                                </Col>
                                <Col lg={4}>
                                    <h5 className="text-muted">Reference</h5>
                                    <p>{projectData.reference.title}</p>
                                </Col>
                            </Row>

                            <Row>
                            <Col lg={4}>
                                    <h5 className="text-muted">Email</h5>
                                    <p>{projectData.email}</p>
                                </Col>
                                <Col lg={4}>
                                    <h5 className="text-muted">Primary Contact</h5>
                                    <p>{projectData.primaryContact}</p>
                                </Col>
                                <Col lg={4}>
                                    <h5 className="text-muted">Secondary Contact</h5>
                                    <p>{projectData.secondaryContact}</p>
                                </Col>
                            </Row>

                            <hr className="my-4" />

                            

                            

                            
                            <Row>
                              <Col lg={4}>
                              <h5 className="text-muted">Package Name</h5>
                                    <p>{projectData.package}</p>
                              </Col>
                              <Col lg={4}>
                              <h5 className="text-muted">Tasks</h5>
                                    <p>8 Tasks(2 pending)</p>
                              </Col>
                              <Col lg={4}>
                              <h5 className="text-muted">Status</h5>
                              <Badge color="" className="badge-dot mr-4">
                                  <i className={status[projectData.status]?.class} />
                                  {status[projectData.status]?.title}
                                  </Badge>
                                    
                              </Col>
                            </Row>
                            <h5 className="text-muted">Services</h5>
                            {formData.services?.map((field,index) => (
                              
                                  
                                    <p>{formData.services[index].service} X {formData.services[index].quantity}</p>
                                 
                             
                            ))}

                            <hr className="my-4" />

                            <Row>
                              <Col lg={12}>
                                  <h5 className="text-muted">Additional Notes</h5>
                                    <p>{projectData.additionalNotes}</p>
                              </Col>
                            </Row>
                            <hr className="my-4" />
                      
                        </CardBody> */}
                        
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                              {/* <tr>
                                <th scope="col"/>
                                <th scope="col" />
                              </tr> */}
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">Event Name</th>
                                <td>{projectData.eventName ? projectData.eventName : `-`}</td>
                              </tr>
                              <tr>
                                <th scope="row">Event Type</th>
                                <td>{projectData.eventType ? projectData.eventType : `-`}</td>
                              </tr>
                              <tr>
                                <th scope="row">Event Location</th>
                                <td>{projectData.eventLocation ? projectData.eventLocation : `-`}</td>
                              </tr>
                              <tr>
                                <th scope="row">Date From</th>
                                <td>{moment(projectData.dateFrom).format("MMMM Do YYYY")}</td>
                              </tr>
                              <tr>
                                <th scope="row">Date to</th>
                                <td>{moment(projectData.dateTo).format("MMMM Do YYYY")}</td>
                              </tr>
                              <tr>
                                <th scope="row">Reference</th>
                                <td>{projectData.reference.title ? projectData.reference.title : `-`}</td>
                              </tr>
                              <tr>
                                <th scope="row">Quoted Amount</th>
                                <td>{projectData.amountQuoted}</td>
                              </tr>
                              <tr>
                                <th scope="row">Amount Paid</th>
                                <td>{projectData.amountPaid}</td>
                              </tr>
                              <tr>
                                <th scope="row">Discount</th>
                                <td>{projectData.discount} ({projectData.discount_type ? projectData.discount_type : `None`})</td>
                              </tr>
                              <tr>
                                <th scope="row">Email</th>
                                <td>{projectData.email ? projectData.email : `-`}</td>
                              </tr>
                              <tr>
                                <th scope="row">Primary Contact</th>
                                <td>{projectData.primaryContact ? projectData.primaryContact : `-`}</td>
                              </tr>
                              <tr>
                                <th scope="row">Secondary Contact</th>
                                <td>{projectData.secondaryContact ? projectData.secondaryContact : `-`}</td>
                              </tr>
                              {/* <tr>
                                <th scope="row">Tasks</th>
                                <td>{projectData.tasks}</td>
                              </tr> */}
                              <tr>
                                <th scope="row">Status</th>
                                <td>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className={status[projectData.status]?.class} />
                                  {status[projectData.status]?.title}
                                </Badge>
                                </td>
                              </tr>
                              
                              <tr>
                                <th scope="row">Package</th>
                                <td>{projectData.package ? projectData.package : `-`}</td>
                              </tr>
                              <tr>
                                <th scope="row">Services</th>
                                <td>
                                {formData.services?.map((field,index) => (
                               
                              <h5>{formData.services[index].service} X {formData.services[index].quantity}</h5>
                           
                      ))}
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Notes</th>
                                <td>{projectData.additionalNotes ? projectData.additionalNotes : `-`}</td>
                              </tr>
                            </tbody>
                        </Table>


                    </Card>
                </Col>
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
                            value={formData.eventName}
                            />

                     
                      <CustomInput label="Event Type" 
                            type="text"
                            placeholder="Eg., Wedding" 
                            idName = "input-event-type" 
                            col="4" 
                            name="eventType"
                            onChange={handleChange}
                            value={formData.eventType}
                            />

                        <CustomInput label="Event Location" 
                              type="text"
                              placeholder="Eg., Bangalore" 
                              idName = "input-event-location" 
                              col="4" 
                              name="eventLocation"
                              onChange={handleChange}
                              value={formData.eventLocation}
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
                                    value:moment(formData.dateFrom).format("MMMM Do YYYY")
                                }}
                  timeFormat={isAllDay}
                  renderDay={(props, currentDate, selectedDate) => {
                    let classes = props.className;
                    if (
                      formData.dateFrom &&
                      formData.dateTo &&
                      formData.dateFrom._d + "" === currentDate._d + ""
                    ) {
                      classes += " start-date";
                    } else if (
                      formData.dateFrom &&
                      formData.dateTo &&
                      new Date(formData.dateFrom._d + "") <
                        new Date(currentDate._d + "") &&
                      new Date(formData.dateTo._d + "") >
                        new Date(currentDate._d + "")
                    ) {
                      classes += " middle-date";
                    } else if (
                      formData.dateTo &&
                      formData.dateTo._d + "" === currentDate._d + ""
                    ) {
                      classes += " end-date";
                    }
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  }}
                  onChange={e => setFormData({...formData, dateFrom: e })}
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
                    value:moment(formData.dateTo).format("MMMM Do YYYY")
                  }}
                  timeFormat={isAllDay}
                  renderDay={(props, currentDate, selectedDate) => {
                    let classes = props.className;
                    if (
                      formData.dateFrom &&
                      formData.dateTo &&
                      formData.dateFrom._d + "" === currentDate._d + ""
                    ) {
                      classes += " start-date";
                    } else if (
                      formData.dateFrom &&
                      formData.dateTo &&
                      new Date(formData.dateFrom._d + "") <
                        new Date(currentDate._d + "") &&
                      new Date(formData.dateTo._d + "") >
                        new Date(currentDate._d + "")
                    ) {
                      classes += " middle-date";
                    } else if (
                      formData.dateTo &&
                      formData.dateTo._d + "" === currentDate._d + ""
                    ) {
                      classes += " end-date";
                    }
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  }}
                  onChange={e => setFormData({ ...formData,dateTo: e })}
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
              value={formData.package}
              onChange={val => setFormData({...formData, package: val?.package_name, services: val?.services, amountQuoted: val?.amount})}
              />
            </Col>
            <Col lg={6}>
            <CustomSelect 
              heading="Reference"
              options={references} 
              id='_id'
              label="reference_name"
              prompt="Select Reference"
              value={formData.reference.title}
              onChange={val => setFormData({...formData, reference: {title: val?.reference_name, id: val?._id}})}
              />
            </Col>
        </Row>

                  

        {formData.services?.map((field,index) => (
                          
                              
                          <Row key={index}>
                          <CustomInput label="Service Name"
                            type="text"
                            placeholder="Eg., Candid Photographer"
                            idName = "input-service"
                            name="service"
                            onChange = {e => handleChangeServices(index,e)}
                            col="4"
                            value={formData.services[index].service}
                            />

                            <CustomInput label="Quantity" 
                                type="number"
                                placeholder="Eg., 1" 
                                idName = "input-quantity"
                                name="quantity"
                                onChange = {e => handleChangeServices(index,e)}
                                col="4"
                                value={formData.services[index].quantity}
                                />
                                {formData.services?.length > 1 && (<a
                                    
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
                            value={formData.amountQuoted}
                            />

                    <CustomInput label="Amount Paid" 
                              type="number"
                              placeholder="Eg., 5000" 
                              idName = "input-amount-paid" 
                              col="3" 
                              name="amountPaid"
                              onChange={handleChange}
                              value={formData.amountPaid}
                              />
                      
                       <CustomInput label="Discount" 
                              type="number"
                              placeholder="Eg., 1000" 
                              idName = "input-discount-amount" 
                              col="3" 
                              name="discount"
                              onChange={handleChange}
                              value={formData.discount}
                              />
                              
                      <Col lg={3}>
                          <CustomSelect 
                            heading="Discount Type"
                            options={discount} 
                            id='_id'
                            label="label"
                            prompt="Select..."
                            value={formData.discount_type}
                            onChange={val => setFormData({...formData, discount_type: val?.value})}
                            />
                      </Col>
                      
                    </Row>
                  
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  
                    <Row>
                      
                    </Row>
                    <Row>
                      <CustomInput label="Email Address" 
                              type="email"
                              placeholder="Eg., johndoe@gmail.com" 
                              idName = "input-email" 
                              col="4" 
                              name="email"
                              onChange={handleChange}
                              value={formData.email}
                              />

                      <CustomInput label="Primary Contact" 
                              type="number"
                              placeholder="Eg., 9874563210" 
                              idName = "input-primary-contact" 
                              col="4" 
                              name="primaryContact"
                              onChange={handleChange}
                              value={formData.primaryContact}
                              />

                      <CustomInput label="Secondary Contact" 
                              type="number"
                              placeholder="Eg., 7894561230" 
                              idName = "input-secondary-contact" 
                              col="4" 
                              name="secondaryContact"
                              onChange={handleChange}
                              value={formData.secondaryContact}
                              />
                      
                    </Row>
                    
              
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
                    value={formData.additionalNotes}
                  />
                  </Row>
                  <div className="px-4">         
                  <Row>
                    
                      <Input label="Status" 
                            type="range"
                            min= '0'
                            max= '6'
                            idName = "input-event-status"
                            name="status"
                            onChange = {handleChange}
                            value={formData.status}
                            col="12"
                            
                            />
                            <Badge color="" className="badge-dot mr-4">
                              <i className={status[formData.status]?.class} />
                              {status[formData.status]?.title}
                            </Badge>
                      
                    </Row>
                    </div>
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


          <Modal
            className="modal-dialog-centered p-0"
            isOpen={isDeleteModal}
            toggle={toggleDeleteModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Project?
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggleDeleteModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the current project? It deletes the current project, its related Tasks and Expenses.This operation cannot be undone.</p>
            </div>
                  <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleDeleteModal}
              >
                Close
              </Button>
              <Button color="danger" type="submit" onClick={() => handleDelete(currentId)}>
                Confirm Delete
              </Button>
            </div>
                
            

            
          </Modal>

        </Container>
        </>
    )
}

export default ProjectDetail