import React,{useState,useEffect,useRef} from "react";
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
  
  
  
  Button
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";


import CustomPagination from "./pagination.js"
import CustomInput from "../../components/Form/Input.js"
import CustomSelect from "../../components/Form/SelectInput.js";
import { useDispatch,useSelector } from "react-redux";
import WorkflowList from "./list.js";
import { createWorkflow, fetchWorkflows } from "../../actions/workflow.js";
import UserHeader from "../../components/Headers/UserHeader";
import { fetchWorkflowEvents } from "../../api/index.js";
import empty from "../../images/empty.png"

const Automation = () => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const [isModal,setIsModal] = useState(false);

 

  const [automationData,setAutomationData] = useState({
    title: "",
    event: 0,
    offset: 0,
    actions: [
      {
        action:0,
        
      }
    ]
    
})

const [events,setEvents] = useState([])


const offsets = [
  {value: 1, label: "Immediately"},
  // {value: 3, label: "In a day"},
  // {value: 4, label: "In 3 days"},
  // {value: 5, label: "In a week"}
]



const [currentId,setCurrentId] = useState(null)




  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

  const dispatch = useDispatch()
  const automation = useSelector((state) => state.projects)
  
  const preload = async() => {
    await fetchWorkflowEvents().then((res) => {
      if(res.error){
        console.log(res.error)
      }
      // var eventArray = Array()
      // for (var e of Object.keys(res.data.availableEvents)){
      //   let element = {}
      //   element.label = "label"
      //   element.value = "value"
      //   element['value'] = e
      //   element['label'] = res.data.availableEvents[e]
      //   eventArray.push(element)
      // }
      setEvents(res.data)
    })
  }


  useEffect(async() => {
    
    dispatch(fetchWorkflows(1))
    await preload()
  },[])

  useEffect(() => {
    preload()
  },[automation])

    

    const handleChange = (e) => {
      setAutomationData({...automationData, [e.target.name]: e.target.value})
    }

const handleSubmit = (e) => {
  e.preventDefault();

  


  dispatch(createWorkflow({...automationData}))
  

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setAutomationData({
    title: "",
    event: 0,
    offset: 0,
    actions: []
})
}

const desc = ""

  
  return (
    <>
      <UserHeader name="Workflow Automation" description={desc} />
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
                    <h3 className="mb-0">Workflow</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Workflow +
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              {!automation.length ? (
                <div className="text-center d-4">
                <img src={empty} className="n-icon"/>
                <p>No Automations Available</p>
                
              </div>
              ) : (

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  {!automation.length ? (
                    <div className="text-center d-4">
                    <img src={empty} className="n-icon"/>
                    <p>Loading</p>
                    
                  </div>
                  ): (
                    automation.map((w) => (
                        
                      <WorkflowList  workflow={w} setCurrentId={setCurrentId} setIsModal = {setIsModal} workflowkey={w._id} />
                      
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
                WORKFLOW DETAILS
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
                  
                  <div className="">
                    <Row>
                      <CustomInput label="Workflow Name" 
                            type="text"
                            placeholder="Eg., Wedding Workflow" 
                            idName = "input-event-name"
                            name="title"
                            onChange = {handleChange}
                            col="6"
                            value={automationData.title}
                            />

                    <Col lg={6}>      
                      <CustomSelect 
                        heading="On Event"
                        options={events} 
                        id='_id'
                        label="label"
                        prompt= "Select Event"
                        value = {events.find(item => item.value === automationData?.event)?.label}
                        // value={events[automationData.event-1]?.label}
                        onChange={val => setAutomationData({...automationData, event: val?.value})}
                        />
                    </Col>
                  
                      
                      
                    </Row>
                    <Row>
                      <Col lg={6}>
                      <CustomSelect 
                        heading="Offset"
                        options={offsets} 
                        id='_id'
                        label="label"
                        prompt="Select Offset"
                        value={offsets[automationData.offset-1]?.label}
                        onChange={val => setAutomationData({...automationData, offset: val?.value})}
                        />
                      </Col>
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
          

      </Container>
    </>
  );
};

export default Automation;
