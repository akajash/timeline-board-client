import React,{useState,useEffect} from "react";
import moment from 'moment'
import empty from "../../images/empty.png"

import ReactDatetime from 'react-datetime'
// reactstrap components
import {
  
  Card,
  CardHeader,
  CardFooter,
  
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
 
  
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

import CustomInput from "../../components/Form/Input.js"
import { useDispatch,useSelector } from "react-redux";

import EmployeeList from "./list.js";
import { createWorkforce, fetchWorkforce, updateWorkforce } from "../../actions/workforce.js";
import { fetchDesignationDD } from "../../api/index.js";

import Select from 'react-select';
import CustomSelect from "../../components/Form/SelectInput.js";
import CustomPagination from "./pagination.js";
import { fetchLoading } from "../../actions/loading.js";
import SearchBar from "../../components/Form/Search";
import UserHeader from "../../components/Headers/UserHeader.js";


const Employees = () => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const [isModal,setIsModal] = useState(false)


  const [designations,setDesignations] = useState([])

  const [employeeData,setEmployeeData] = useState({
    name : "",
    primaryContact : "",
    secondaryContact: "",
    dateOfJoining: new Date(),
    payout_type: "",
    payout_amount :0,
    identity: "",
    noOfTasks : 0,
    designation: "",
    address: "",
    email: "",
    about: ""
    
})





const [currentId,setCurrentId] = useState(null)


  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

  const dispatch = useDispatch()
  const workforce = useSelector((state) => state.data)
  const wf = useSelector((state) => currentId ? state.workforce.find((p) => p._id === currentId) : null);


  const preload = () => {
    fetchDesignationDD().then((res) => {
      if(res.error){
        console.log(res.error)
      }
      else{
        res.data.map((e)=>{
          e.value="value"
          e["value"] = e.title
          e.label = "label"
          e["label"] = e.title
          
        })    

        
        setDesignations(res.data)
      }
    })
  }


  

  useEffect(() => {
    preload()
  },[])

  useEffect(()=>{
    dispatch(fetchWorkforce(1))
    
  },[dispatch])

 

    useEffect(() => {
      if(wf) setEmployeeData(wf);
    },[wf])



    const handleChange = (e) => {
      setEmployeeData({...employeeData, [e.target.name]: e.target.value})
    }


    const handleSelect = (result,nameResult) => {
      const {name} = nameResult 
      
      setEmployeeData({...employeeData,[name]: result?.value})

    }

const handleSubmit = (e) => {
  e.preventDefault();

  

  if(currentId){
    dispatch(updateWorkforce(currentId, {...employeeData}))
  }
  else{
    dispatch(createWorkforce({...employeeData}))
  }

  clear()
  toggleModal()
}



const clear = () => {
    setCurrentId(0);
    setEmployeeData({name : "",
    primaryContact : "",
    secondaryContact: "",
    dateOfJoining: new Date(),
    payout_type: "",
    payout_amount :0,
    identity: "",
    noOfTasks : 0,
    designation: "",
    address: "",
    email: "",
    work_type: "",
    about: ""
})
}

const roles = [
  {value: "Intern", label: "Intern"},
  {value: "Freelancer", label: "Freelancer"},
  {value: "Employee", label: "Employee"},
  {value: "Vendor", label: "Vendor"},
]

const payouts = [
  {value: "Project based", label: "Project based"},
  {value: "Monthly", label: "Monthly"},
  {value: "Weekly", label: "Weekly"},
  {value: "Hourly", label: "Hourly"},
]
  
const desc = "Manage Details of Employees and Vendors"

  return (
    <>
      <UserHeader name="Workforces" description={desc} />
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
                    <h3 className="mb-0">Work Force</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Add New 
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              {!workforce.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Workforce Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">City</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Role</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                {!workforce?.length ? "No results": (
                    workforce.map((emp) => (
                
                <EmployeeList employee={emp} setCurrentId={setCurrentId} setIsModal = {setIsModal} empKey={emp._id} />
              
            ))
          )}
                  
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
                WORKFORCE DETAILS
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
                    Personal Information
                  </h6>
                  <div className="">
                    <Row>
                      <CustomInput label="Full Name" 
                            type="text"
                            placeholder="Eg., John doe" 
                            idName = "input-employee-name"
                            name="name"
                            onChange = {handleChange}
                            col="6"
                            value={employeeData.name}
                            required
                            />

                      <CustomInput label="Email" 
                            type="email"
                            placeholder="Eg., johndoe@company.com" 
                            idName = "input-employee-email"
                            name="email"
                            onChange = {handleChange}
                            col="6"
                            value={employeeData.email}
                            />

                      
                      
                      
                      
                    </Row>
                    
                    <Row>
                    <CustomInput label="Primary Contact" 
                            type="text"
                            placeholder="Eg., 9874563210" 
                            idName = "input-primary-contact" 
                            col="4" 
                            name="primaryContact"
                            onChange={handleChange}
                            value={employeeData.primaryContact}
                            required
                            />

                    <CustomInput label="Secondary Contact" 
                              type="text"
                              placeholder="Eg., 7896541230" 
                              idName = "input-secondary-contact" 
                              col="4" 
                              name="secondaryContact"
                              onChange={handleChange}
                              value={employeeData.secondaryContact}
                              />
                      
                      <Col lg={4}>
                    
                      <FormGroup>
                      <label
                            className="form-control-label"
                            htmlFor="input-doj"
                            >
                            Date of Joining
                            </label>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <ReactDatetime
                                inputProps={{
                                  placeholder: "Date of Joining",
                                  
                                  value:moment(employeeData.dateOfJoining).format("MMMM Do YYYY"),
                                  id: "input-doj"
                                }}
                                timeFormat={false}
                                onChange= {e => setEmployeeData({...employeeData, dateOfJoining: e })}
                              />
                            </InputGroup>
                          </FormGroup>
                      </Col>

                      
                    </Row>
                    <Row>
                        <CustomInput label="Address first line" 
                              type="text"
                              placeholder="Enter Address here..." 
                              idName = "input-address" 
                              col="12" 
                              name="address"
                              onChange={handleChange}
                              value={employeeData.address}
                              />

                      
                            


                    </Row>

                    <Row>
                    <CustomInput label="City" 
                            type="text"
                            placeholder="Eg., Bangalore" 
                            idName = "input-city"
                            name="city"
                            onChange = {handleChange}
                            col="4"
                            value={employeeData.city}
                            required
                            />

                    <CustomInput label="State/Province" 
                            type="text"
                            placeholder="Eg., Tamil Nadu" 
                            idName = "input-state"
                            name="state"
                            onChange = {handleChange}
                            col="4"
                            value={employeeData.state}
                            />   

                      <CustomInput label="PinCode" 
                            type="text"
                            placeholder="Eg., 600010" 
                            idName = "input-pincode"
                            name="pincode"
                            onChange = {handleChange}
                            col="4"
                            value={employeeData.pincode}
                            />

                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Official information
                  </h6>
                  {/* <div className="pl-lg-4"> */}

                      <Row>
                      <Col lg={6}>
                        {/* <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-assign-to"
                        >
                        Designation
                        </label>
                      <Select
                          className="basic-single"
                          classNamePrefix="select"
                          isDisabled= {false}
                          isLoading= {false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name="designation"
                          options={designations}
                          placeholder={employeeData.designation}
                          theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            border:none,
                            boxShadow: rgba(0,0,4,0.4)
                          })}
                          
                          onChange={handleSelect}
                          id="input-designation"
                                  />   
                            </FormGroup>  */}
                            {/* <SearchBar
                            label="Designation"
                            data={designations} 
                            idName='_id'
                            placeholder="Start Typing"
                            value={employeeData.designation}
                            onChange={val => setEmployeeData({...employeeData, designation: val?.title})}
                            required
                            /> */}
                            <CustomSelect 
                              heading="Designation"
                              options={designations} 
                              id='_id'
                              label="label"
                              prompt="Select Designation..."
                              value={employeeData.designation}
                              onChange={val => setEmployeeData({...employeeData, designation: val?.title})}
                              required
                              />
                      </Col>

                      <Col lg={6}>
                          <CustomSelect 
                            heading="Role"
                            options={roles} 
                            id='_id'
                            label="label"
                            prompt="Select Role..."
                            value={employeeData.work_type}
                            onChange={val => setEmployeeData({...employeeData, work_type: val?.value})}
                            required
                            />
                      </Col>
                        {/* <CustomInput label="Role" 
                              type="text"
                              placeholder="Eg., Employee" 
                              idName = "input-work-type" 
                              col="6" 
                              name="work_type"
                              onChange={handleChange}
                              value={employeeData.work_type}
                              /> */}
                      </Row>

                    <Row>
                    

                    <CustomInput label="Identity No." 
                              type="text"
                              placeholder="Identity no." 
                              idName = "input-payout-type" 
                              col="4" 
                              name="identity"
                              onChange={handleChange}
                              value={employeeData.identity}
                              />

                        <Col lg={4}>
                          <CustomSelect 
                            heading="Payout Frequency"
                            options={payouts} 
                            id='_id'
                            label="label"
                            prompt="Select Payout frequency..."
                            value={employeeData.payout_type}
                            onChange={val => setEmployeeData({...employeeData, payout_type: val?.value})}
                            />
                      </Col>

                          <CustomInput label="Payout Amount" 
                              type="number"
                              placeholder="Eg., 10000" 
                              idName = "input-payout-amount" 
                              col="4" 
                              name="payout_amount"
                              onChange={handleChange}
                              value={employeeData.payout_amount}
                              />     

                          
                    </Row>
                    
                 
                  <hr className="my-4" />
                 <Row>
                  <CustomInput label="About" 
                      type="textarea"
                      placeholder="About the Workforce" 
                      idName = "input-about" 
                      col="12" 
                      name="about"
                      onChange={handleChange}
                      value={employeeData.about}
                      /> 
                 </Row>
               
                  
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

export default Employees;

