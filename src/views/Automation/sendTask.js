import React, { useEffect, useState } from 'react'
import { Button,Row,Col, Form,FormGroup,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap'
import moment from 'moment'
import { fetchAllWorkforces } from '../../api'
import CDropdown from '../../components/Dropdown/cdropdown'
import ReactDatetime from 'react-datetime'
import CustomInput from "../../components/Form/Input.js"
import CustomSelect from '../../components/Form/SelectInput'


const SendTask = ({toggleModal,submit}) => {

    const [workforces,setWorkforces] = useState([])
    const [value,setValue] = useState(null)


    const [taskData,setTaskData] = useState({
        action: 2,
        job_title: "",
        description: "",
        allocated_to: {
          id: "",
          name: ""
        },
        deadline: "",
    })

    const preload = () => {

        fetchAllWorkforces().then((res) => {
          if(res.error){
            console.log(res.error)
          }
          else{ 
            res.data.map((e)=>{
              
            })    
         
            setWorkforces(res.data)
            
          }
        })
        
      }


    useEffect(()=>{
        preload()
    },[])

    useEffect(() => {
        if(value)
        setTaskData({...taskData,
          allocated_to: value
        })
      },[value])

    const handleChange = (e) => {
        setTaskData({...taskData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(taskData)
      submit(taskData)

    }


    return(
        <Form onSubmit={handleSubmit} autoComplete="off">
                  <h6 className="heading-small text-muted mb-4">
                    Task Information
                  </h6>
                  <div className="">
                    <Row>
                      <CustomInput label="Task Title" 
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
                        </Col>
                   
                        <CustomInput label="Deadline (In Days)" 
                            type="number"
                            placeholder="Eg., 2" 
                            idName = "input-task-deadline"
                            name="deadline"
                            onChange = {handleChange}
                            col="4"
                            value={taskData.deadline}
                            required
                            />
                      
                      
                      
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
                Add Action
              </Button>
            </div>
                </Form>
    )
}

export default SendTask