import React,{useState,useEffect} from 'react'

import UserHeader from "../../components/Headers/UserHeader.js";

import {fetchSingleWorkflow} from "../../api/index.js"
import CustomInput from "../../components/Form/Input.js"
import { useDispatch} from "react-redux";
import CustomSelect from "../../components/Form/SelectInputEvent.js";
import {deleteWorkflow,updateWorkflow} from '../../actions/workflow.js'
import StepForm from './form.js';
import {fetchAllPackages,fetchAllReferences, fetchSingleProject,pushPipeline} from "../../api/index.js"
import empty from "../../images/empty.png"
import { updateProject} from "../../actions/projects.js";

import {deleteProject} from '../../actions/projects'

import { useHistory } from 'react-router';
import ActionList from './actionList.js';

import moment from 'moment'

import ReactDatetime from 'react-datetime'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
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

import { fetchLoading } from '../../actions/loading.js';

const WorkflowDetail = (props) => {

  const history = useHistory()

  const [isModal,setIsModal] = useState(false);
  const [isDeleteModal,setIsDeleteModal] = useState(false);
const [isLoading,setIsLoading] = useState(true)

const [references,setReferences] = useState([])
const [packages,setPackages] = useState([])

const [actionArray,setActionArray] = useState([])

const [automationData,setAutomationData] = useState({
  title: "",
  event: 0,
  offset: 0,
  actions: []
  
})

const [formData,setFormData] = useState({
  step: 1,
  action_id: 0,
  title: "",
  event: 0,
  offset: 0,
  actions: [
    {
      action: 0,
      mail: 0,
      mailTemplate: {
        id: "",
        name: ""
      },
      workforce: {
        id: "",
        name: ""
      },
      job_title: "",
      description: "",
      allocated_to: {
        id: "",
        name: ""
      },
      deadline: new Date(),
      projectId: ""
    }
  ]
  
})

const events = [{ label: "On Lead", value: 1 },  { label: "On Order", value: 2 },  { label: "On Pre-Production", value: 3 },{ label: "On Production", value: 4 },{ label: "On Post Production", value: 5 },{ label: "On Delivery", value: 6 },{ label: "On Wrapped Up", value: 7 }]


const offsets = [
  {value: 1, label: "Immediately"},
  // {value: 2, label: "After a day"},
  // {value: 3, label: "After 3 days"},
  // {value: 4, label: "After a week"},

  
  ]




  


const preload = async() => {
  const id = props.match.params.id 
  setCurrentId(id)
  await fetchSingleWorkflow(id).then((res) => {
    if(res.error){
      console.log(res.error)
    }
    else{
      setAutomationData({
        title: res.data.title,
        event: res.data.event,
        offset: res.data.offset,
        actions: res.data.actions
      })
      
      
      
      // console.log(actionArray)
    }

    
  })


  // setIsLoading(false)
}
 

  const [currentId,setCurrentId] = useState(null)
  
 

  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)

    
  }
 


  const handleChange = (e) => {
      setAutomationData({...automationData, [e.target.name]: e.target.value})
    }
  

    const toggleDeleteModal = () => {
      setIsDeleteModal((prevIsModal) => !prevIsModal)
      
      
    }
  
    const dispatch = useDispatch()

      useEffect(async() => {
        dispatch(fetchLoading(true))
        await preload().then(() => dispatch(fetchLoading(false)))  
      },[])


      const sendPayload = (actionData) => {
        // e.preventDefault();
      
        toggleModal()
        const actionValues = Array()
        for(var i=0;i<automationData.actions.length;i++){
          if(automationData.actions[i].action != undefined){
            actionValues.push(automationData.actions[i])
          }
        }
        actionValues.push(actionData)
        setAutomationData({
          title: automationData.title,
          event: automationData.event,
          offset: automationData.offset,
          actions: actionValues
        })

        dispatch(updateWorkflow(currentId, {
          title: automationData.title,
          event: automationData.event,
          offset: automationData.offset,
          actions: actionValues
        }))
        
      }

      const deleteAction = (keyIndex) => {

        const payload = Array()
        for(var i=0;i<automationData.actions.length;i++){
          if(i == keyIndex) continue
          if(automationData.actions[i].action != undefined){
            payload.push(automationData.actions[i])
          }
        }

        setAutomationData({
          title: automationData.title,
          event: automationData.event,
          offset: automationData.offset,
          actions: payload
        })

        dispatch(updateWorkflow(currentId, {
          title: automationData.title,
          event: automationData.event,
          offset: automationData.offset,
          actions: payload
        }))
      }


    const handleSubmit = () => {
      // e.preventDefault();
    
      // toggleModal()
      // setAutomationData({...automationData,actions: actionData})
      // console.log(actionData)
      
      // const actionValues = [...automationData.actions]
      // console.log(actionValues)
      // actionValues.push(actionData)
      // console.log(actionValues)
      // actionValues[index][e.target.name] = e.target.value;
      // setAutomationData({...automationData, events:actionValues})

      // setAutomationData({...automationData, actions: actionValues})
      // setAutomationData({
      //   title: "Shankar",
      //   offset: automationData.offset,
      //   event: automationData.event,
      //   actions: actionValues
      // })

      
      
      console.log(automationData)

      

      dispatch(updateWorkflow(currentId, {...automationData}))

      // switch(formData.actions.action){
      //   case 1:
          
      // }

      // setAutomationData(formData)
      
    }


    
    const handleDelete = (currentId) => {
      dispatch(deleteWorkflow(currentId))
      toggleDeleteModal()
      history.push("/app/settings/workflow")
    }
    
    
    // const addService = () => {
    //   setFormData({...formData,services:[...formData.services,{service: "",quantity: 0}]})
      
    // }
    
    // const deleteService = (index) => {
    //     const values = [...formData.services]
    //     values.splice(index,1)
    //     setFormData({...formData, services:values})
    // }
    
    const handleChangeActions = (index,e) => {
      const values = [...automationData.events]
      values[index][e.target.name] = e.target.value;
      setAutomationData({...automationData, events:values})
    }
    
    const mailAutomation = () => {
      setAutomationData({...automationData,actions:[...automationData.actions,{action: "1",label: "Send Mail",rec: 0}]})
      toggleModal()
    }

    const handleActions = () => {
      setFormData({
        step:1
      })
      toggleModal()
    }


    const nextStep = () => {
      setFormData({
        
        step: formData.step+1
      })
    }

    const prevStep = () => {
      setFormData({
        
        step: formData.step-1
      })
    }
    

  const desc = "Create Automation Workflows to trigger actions based on events"


  return(
      <>
      <UserHeader name="Workflow Automation" description={desc} />

      <Container className="mt--7" fluid>
          <Row>
              <Col>
                  <Card className="shadow">
                      <CardHeader className="border-0">
                      <Row className="align-items-center">
                          <div className="col">
                              <h3 className="mb-0">Workflow Detail</h3>
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
                          
                          <DropdownItem onClick={toggleDeleteModal}>Delete</DropdownItem>
                          
                          


                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                  
                          </div>
                         
                          
                          </Row>
                          
                      </CardHeader>
                      <CardBody>
                      <Form onSubmit={handleSubmit} autoComplete="off">
                  
                  <div className="">
                    <Row>
                      <CustomInput label="Workflow Name" 
                            type="text"
                            placeholder="Eg., Wedding Workflow" 
                            idName = "input-event-name"
                            name="title"
                            onChange = {handleChange}
                            col="12"
                            value={automationData.title}
                            />

                          </Row>
                          <Row className='mb-2'>

                    <Col lg={6} className="mb-2">      
                      {/* <CustomSelect 
                        
                        heading="On Event"
                        options={events} 
                        id='_id'
                        label="label"
                        prompt="On Event"
                        value={events[automationData.event-1]?.label}
                        onChange={val => setAutomationData({...automationData, event: val?.value})}
                        /> */}

                        <label className='form-control-label'>
                          On Event
                        </label>
                        <h3>{events[automationData.event-1]?.label}</h3>
                    </Col>
                  
                    <Col lg={6} className="mb-2">      
                      {/* <CustomSelect 
                        disabled
                        heading="Offset"
                        options={offsets} 
                        id='_id'
                        label="label"
                        prompt="Immediately"
                        value={offsets[automationData.offset-1]?.label}
                        onChange={val => setAutomationData({...automationData, offset: val?.value})}
                        /> */}

                        <label className='form-control-label'>
                          Offset
                        </label>
                        <h3>{offsets[automationData.offset-1]?.label}</h3>  
                    </Col>
                    </Row>
                    
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Actions</th>                  
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                {!automationData.actions.length ? (
                  <div className="m-4 p-4 d-4 text-center float-left">
                  <img src={empty} className="n-icon"/>
                  <p>No Actions Available</p>
                  
                </div>
                ): (
                    automationData.actions.map((act,index) => (
                
                <ActionList action={act} actKey={index} deleteAction = {deleteAction}/>
              
                  ))
                )}
                  
                </tbody>
                
              </Table>
              

               


              </div>   

              <Button block color="primary" size="lg" type="button" onClick={() => handleActions()}>
                Add Action + 
              </Button>
        
                 
              {/* <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleDeleteModal}
              >
                Delete
              </Button> */}
              <Button color="secondary" type="submit" className='mt-4 ml-0'>
                Save changes
              </Button>
           
                </Form>

                
              
                          
                          
                </CardBody>
                      
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
                Choose an action
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

            <StepForm data={formData} nextStep = {nextStep} prevStep={prevStep} toggleModal={toggleModal} submit={sendPayload}/>          
                
            </div>

            
          </Modal>

          <Modal
            className="modal-dialog-centered p-0"
            isOpen={isDeleteModal}
            toggle={toggleDeleteModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Workflow?
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
              <p>Are you sure you want to delete the current workflow? This operation cannot be undone.</p>
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

export default WorkflowDetail