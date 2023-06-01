import React, { useEffect, useState } from 'react'
import { Button,Row,Col, Form,FormGroup,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap'
import moment from 'moment'
import { fetchAllWorkforces,fetchTemplateDD } from '../../api'
import CDropdown from '../../components/Dropdown/cdropdown'
import ReactDatetime from 'react-datetime'
import CustomInput from "../../components/Form/Input.js"
import CustomSelect from '../../components/Form/SelectInput'


const SendMail = ({toggleModal,submit}) => {

    const [workforces,setWorkforces] = useState([])
    const [templates,setTemplates] = useState([])

    const [value,setValue] = useState(null)
    const [valuewf,setValuewf] = useState(null)



    const [mailData,setMailData] = useState({
        action: 1,
        isClient : true,
        template: {
          id: "",
          title: ""
        },
        workforce : {
          id: "",
          name: ""
        }
    })

    const [mailClient,setMailClient] = useState(true)

    const switchRecepient = () => {
      setMailClient((prevMailClient) => !prevMailClient)
      setMailData({...mailData, isClient: mailClient})
    }

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

        fetchTemplateDD().then((res) => {
          if(res.error){
            console.log(res.error)
          }
          else{ 
            res.data.map((e)=>{
              
            })    
         
            setTemplates(res.data)
            
          }
        })
        
      }


    useEffect(()=>{
        preload()
    },[])

    useEffect(() => {
        if(value)
        setMailData({...mailData,
          template: value
        })
      },[value])

      useEffect(() => {
        if(value)
        setMailData({...mailData,
          workforce: valuewf
        })
      },[valuewf])

    const handleChange = (e) => {
        setMailData({...mailData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(mailData)
      submit(mailData)

    }


    return(
        <Form onSubmit={handleSubmit} autoComplete="off">
                  <h6 className="heading-small text-muted mb-4">
                    Mail Information
                  </h6>
                  <div className="">
                    <Row>

                    <Col lg={12}>
                        <FormGroup>
                          <label
                              className="form-control-label"
                              htmlFor="isClient"
                          >
                              Send to Client
                          </label>
                          <InputGroup>
                              <label className="custom-toggle">
                              <input type="checkbox" onChange={switchRecepient} id="isClient" checked={mailData.isClient} />
                              <span className="custom-toggle-slider rounded-circle" />
                              </label>
                          </InputGroup>
                          {mailData.isClient ? (
                            <p>Send Mail to Client</p>
                          ) : (
                            <p>Send Mail to Workforce</p>
                          ) }
                          
                            
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                      <Col lg= {6}>
                            
                          <CustomSelect 
                            heading="Choose Template"
                            options={templates} 
                            id='_id'
                            label="title"
                            prompt="Select Template"
                            value={mailData.template?.title}
                            onChange={val => setMailData({...mailData, template: {title: val?.title, id: val?._id}})}
                            required={true}
                            />

                            
                        </Col>
                        
                      {!mailData.isClient && (

                        <Col lg= {6}>
                            <CustomSelect 
                              heading="Choose Workforce"
                              options={workforces} 
                              id='_id'
                              label="name"
                              prompt="Select Workforce"
                              value={mailData.workforce?.name}
                              onChange={val => setMailData({...mailData, workforce: {name: val?.name, id: val?._id}})}
                              required={!mailData.isClient}
                              />
                            
                        </Col>
                      )}
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

export default SendMail