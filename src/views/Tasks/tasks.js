import React,{useState,useEffect} from "react";
import moment from 'moment'
import Select from 'react-select';
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  
  
  Button
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader.js";

import CustomInput from "../../components/Form/Input.js"
import { useDispatch,useSelector } from "react-redux";

import TaskList from "./taskList.js";
import { createTask, fetchTasks, updateTask } from "../../actions/tasks.js";
import CustomPagination from "./pagination.js";
import CustomSelect from "../../components/Form/SelectInput.js";
import { downloadTasksByProject, fetchAllWorkforces } from "../../api/index.js";
import { fetchLoading } from "../../actions/loading.js";

import SearchQuery from '../../components/Dropdown/searchQuery.js'
import CDropdown from "../../components/Dropdown/cdropdown";



const Tasks = (props) => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const [isModal,setIsModal] = useState(false)

  const [workforces,setWorkforces] = useState([])

  

  const [taskData,setTaskData] = useState({
    
    job_title: "",
    description: "",
    deadline: new Date(),
    feedback: "",
    ratings: 0,
    assigned_by: "",
    status: 0,
    projectId: ""
    
  })


  const [addData,setAddData] = useState({
    allocated_to: {
      id: "",
      name: ""
    },
  }) 


  const preload = async() => {

    

   await fetchAllWorkforces().then((res) => {
      if(res.error){
        console.log(res.error)
      }
      else{  
     
        setWorkforces(res.data)
        
      }
      
  
    })
    
  }


const [currentId,setCurrentId] = useState(null)



  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks)
  const task = useSelector((state) => currentId ? state.tasks.find((p) => p._id === currentId) : null);

  const [data,setData] = useState({})
  const [value,setValue] = useState(null)

  useEffect(async()=>{
    var id = props.match.params.id 
    if(id == undefined){
      id = 0
    }
    dispatch(fetchLoading(true))
    dispatch(fetchTasks(id))
    await preload().then(() => dispatch(fetchLoading(false))) 
    
    
    
    
  },[])


  useEffect(() => {
    if(value)
    setTaskData({
      allocated_to: value
    })
  },[value])
 

    useEffect(() => {
      if(task){
        setTaskData(task);
        setValue(task.allocated_to)
        
      }else{
        setValue(null)
      }
      
    },[task])


    const downloadData = () => {
      downloadTasksByProject(props.match.params.id)
      .then(response => {
        // create a Blob object from the response data
        const blob = new Blob([response.data], { type: 'text/csv' });
  
        // create a URL for the blob
        const url = URL.createObjectURL(blob);
  
        // create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.csv';
  
        // add the link to the DOM and click it
        document.body.appendChild(link);
        link.click();
  
        // cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading CSV:', error);
      });
    }

    const handleChange = (e) => {
  
       setTaskData({...taskData, [e.target.name]: e.target.value})
    }

    const switchStatus = () => {
      if(taskData.status == 0){
        setTaskData({...taskData, status: 1})
      }
      else
        setTaskData({...taskData, status: 0})


    }

    

      const handleSubmit = (e) => {
          e.preventDefault();
          if(currentId){
             dispatch(updateTask(currentId, {...taskData,assigned_by: user.result.name}))
          }
          else{
            var id = props.match.params.id 
            if(id == undefined){
              id = 0
            }
            
             dispatch(createTask({...taskData,assigned_by: user.name, projectId: id}))
          }
          toggleModal()
}


const clear = () => {
    setCurrentId(0);
    setTaskData({
    job_title: "",
    description: "",
    allocated_to: {
      id: "",
      name: ""
    },
    deadline: new Date(),
    feedback: "",
    ratings: 0,
    assigned_by: "",
    projectId: "",
    status: 0
    
    
})

setValue(null)
}




const desc = "Assign and Manage Tasks for the shoot"


  return (
    <>
      <UserHeader name="Tasks" description={desc} />
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
                    <h3 className="mb-0">Tasks</h3>
                  </div>
                  <div className="col text-right">
                  {/* <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color="info"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-ui-04 text-white" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            
                            // onClick={() =>handleUpdate(expense._id)}
                          >
                            Today
                          </DropdownItem>
                          <DropdownItem
                            
                            // onClick={() => dispatch(deleteExpense(expense._id)).then(dispatch(fetchExpenses(1)))}
                          >
                            This Week
                          </DropdownItem>
                          <DropdownItem
                            
                            // onClick={() => dispatch(deleteExpense(expense._id)).then(dispatch(fetchExpenses(1)))}
                          >
                            This Month
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown> */}
                      {tasks.length && props.match.params.id ? (
                        <Button
                      
                        color="secondary"
                        onClick={downloadData}
                        size="sm"
                      >
                         <i className="ni ni-cloud-download-95" />
                      </Button>
                      ) : (<div></div>)}
                      {props.match.params.id && (
                        <Button
                        color="primary"
                        onClick={toggleModal}
                        size="sm"
                      >
                        Task + 
                      </Button>
                      )}
                    
                  </div>
                  </Row>

                
          
           
        

              </CardHeader>

              {!tasks.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Tasks Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Assigned to</th>
                    {/* <th scope="col">Assigned By</th> */}
                    <th scope="col">Deadline</th>
                    <th scope="col">Progress</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                {!tasks?.length ? "No results": (
                    tasks.map((task) => (
                
                <TaskList task={task} setCurrentId={setCurrentId} setIsModal = {setIsModal} taskKey={task._id} />
              
            ))
          )}
                  
                </tbody>
              </Table>
                  )}
             
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
                TASKS DETAILS
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
                    Task Information
                  </h6>
                  <div className="">
                    <Row>
                      <CustomInput label="Task Name" 
                            type="text"
                            placeholder="Eg., Video Editing" 
                            idName = "input-task-name"
                            name="job_title"
                            onChange = {handleChange}
                            col="4"
                            value={taskData.job_title}
                            
                            />
                            <Col lg= {4}>
                              
                            <CustomSelect 
                              heading="Assign To"
                              options={workforces} 
                              id='_id'
                              label="name"
                              prompt="Select Workforce"
                              value={taskData.allocated_to?.name}
                              onChange={val => setTaskData({...taskData, allocated_to: {name: val?.name, id: val?._id}})}
                              required={true}
                              />

                               {/* <CDropdown 
                               options = {workforces}
                               placeholder= "Select Workforce"
                               value = {value}
                               onChange = {val => setValue(val)}
                               label = "name"
                               id = "_id"
                               heading= "Assign to"
                               /> */}
                            </Col>
                   
                      <Col lg={4}>
                      <FormGroup>
                      <label
                            className="form-control-label"
                            htmlFor="input-deadline"
                            >
                            Deadline
                            </label>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <ReactDatetime
                                inputProps={{
                                  placeholder: "Deadline",
                                  name: "deadline",
                                  onChange: {handleChange},
                                  id: "input-deadline",
                                  value:moment(taskData.deadline).format("MMMM Do YYYY"),
                                  
                                }}
                                timeFormat={false}
                                onChange= {e => setTaskData({...taskData, deadline: e })}
                              />
                            </InputGroup>
                          </FormGroup>
                      </Col>
                      
                      
                      
                    </Row>
                    
                    <Row>
                    <CustomInput label="Task Description" 
                            type="textarea"
                            placeholder="Eg., Procedures to complete the task" 
                            idName = "input-task-desc" 
                            col="12" 
                            name="description"
                            onChange={handleChange}
                            value={taskData.description}
                            
                            />


                      
                    </Row>

                    {task && (
                      <Row>
                      <Col lg={12}>
                      <FormGroup>
                          <label
                              className="form-control-label"
                              htmlFor="isCompleted"
                          >
                              Status
                          </label>
                          <InputGroup>
                              <label className="custom-toggle">
                              <input type="checkbox" onChange={switchStatus} id="isCompleted" checked={taskData.status} />
                              <span className="custom-toggle-slider rounded-circle" />
                              </label>
                          </InputGroup>
                          
                          Completed?
                            
                        </FormGroup>
                      {/* <div className="custom-control custom-control-alternative custom-checkbox">
                     <input
                       className="custom-control-input"
                       id="customCheckRegister"
                       type="checkbox"
                       onChange={handleStatus}
                       defaultChecked={taskData.status ? true : false}
                       
                     />
                     <label
                       className="custom-control-label"
                       htmlFor="customCheckRegister"
                     >
                       <span className="text-muted">
                         Completed?
                       </span>
                     </label>
                   </div> */}
                      </Col>
 
                   </Row>
                    )}
                   


                    
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
          

      </Container>
    </>
  );
};

export default Tasks;

