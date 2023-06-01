import React,{useState,useEffect} from 'react'
import { useDispatch} from "react-redux";
// import { useDispatch,useSelector } from 'react-redux'
import { Container,Form,Row,Col,FormGroup, InputGroup, Button,Card, CardBody,CardHeader,Modal } from 'reactstrap'
import { fetchMailSettings, fetchSingleTemplate, updateMailSettings } from '../../../api/index.js'
import CustomInput from "../../../components/Form/Input.js"
import UserHeader from '../../../components/Headers/UserHeader';
import CDropdown from '../../../components/Dropdown/cdropdown.js';



import { fetchTemplate, updateTemplate,createTemplate} from "../../../actions/emailTemplate.js";
import  EditorToolbar, {formats,modules } from "./EmailToolbar";
import ReactQuill, {Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import '../quill.css'
import { useHistory } from 'react-router-dom';

const EditTemplate = (props) => {
    const desc = "Create Dynamic Templates for sending customized emails"
  
    const [isModal,setIsModal] = useState(false);
    const [body, setBody] = useState('')
    const [value,setValue] = useState(null)
    const history = useHistory()

    const [templateData,setTemplateData] = useState({
        title: "",
        subject: "",
    })

    

    const [currentId,setCurrentId] = useState(null)

    const preload = async() => {
      const id = props.match.params.id 
      setCurrentId(id)

      if(id){

        fetchSingleTemplate(id)
        .then((data) => {
          console.log(data.data)
          setTemplateData(data.data)
          setBody(data.data.body)
        })
      }
          
    }


    useEffect(() => {
      preload()

    },[])

    const handleChange = (e) => {
      setTemplateData({...templateData, [e.target.name]: e.target.value})
    }

    const dispatch = useDispatch()

  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    
    }

const handleSubmit = (e) => {
  e.preventDefault();

  

  if(currentId){
    templateData.body = "body"
    templateData["body"] = body
    dispatch(updateTemplate(currentId, {...templateData}))
  }
  else{
    templateData.body = "body"
    templateData["body"] = body
    dispatch(createTemplate({...templateData}))
    history.push('/app/settings/mail-templates')
    
  }

 
  
}


const insertVariable = (e) =>{
  

  setBody(body + ` ${value.value} `)
  

  toggleModal()

  
}

const handleHTML = html => {
  setBody(html)
};

const variables = [

  {value: "{client_name}", name: "Client Name"},
  {value: "{location}", name: "Location"},
  {value: "{quoted_amount}", name: "Quoted Amount"},
  {value: "{amount_paid}", name: "Amount Paid"},
  {value: "{discount}", name: "Discount"},
  {value: "{discount_type}", name: "Discount Type"},
  {value: "{event_type}", name: "Event Type"},
  {value: "{contact}", name: "Contact"},
  {value: "{client_email}", name: "Client Email"},
  {value: "{package_name}", name: "Package Name"},
  {value: "{reference}", name: "Lead Source"},
  {value: "{start_date}", name: "Start Date"},
  {value: "{end_date}", name: "End Date"},
  {value: "{client_notes}", name: "Notes"},
]
    



    return(
        <>
        <UserHeader name="Email Templates" description={desc}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>

          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Edit Template</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
        
        <Form onSubmit={handleSubmit} autoComplete="off">
                  
                  
        <Row>
                      <CustomInput label="Template Name" 
                            type="text"
                            placeholder="" 
                            idName = "input-title"
                            name="title"
                            onChange = {handleChange}
                            col="12"
                            value={templateData.title}
                            required
                            />

                    
                      
                      
                    </Row>
                    <Row>
                      <CustomInput label="Subject" 
                            type="text"
                            placeholder="Email Subject" 
                            idName = "input-subject"
                            name="subject"
                            onChange = {handleChange}
                            col="12"
                            value={templateData.subject}
                            required
                            />

                    </Row>
                    <Row>
                        <Col lg={12}>
                        <EditorToolbar />
                          <ReactQuill
                          className='rquill'
                            theme="snow"
                            value={body}
                            onChange={handleHTML}
                            placeholder={"Email Body"}
                            modules={modules}
                            formats={formats}
                          />
                        </Col>
                    </Row>
                    
                    <Row>
                      <Col lg={3}>
                    <Button
              block
              className="mb-3 mt-3"
              color="secondary"
              type="button"
              onClick={() => toggleModal("notificationModal")}
            >
              Add variable
            </Button>
            
                    </Col>
                    </Row>
                    {/* <Row>
                      <Col lg={12}>
                        <select>
                          <option value="%company_name%">Company Name</option>
                          <option value="%client_name%">Client Name</option>
                          <option value="%event_type%">Event Type</option>
                          <option value="%event_location%">Event Location</option>
                          <option value="%event_date%">Event Date</option>
                          <option value="%quoted_amount%">Quoted Amount</option>
                          <option value="%company_name%">Company Name</option>
                          <option value="%client_name%">Client Name</option>
                          <option value="%event_type%">Event Type</option>
                          <option value="%event_location%">Event Location</option>
                          <option value="%event_date%">Event Date</option>
                          <option value="%quoted_amount%">Quoted Amount</option>
                        </select>
                      </Col>
                    </Row> */}


                    
                    
                 
                  
                  
                  
              
              <Button color="primary" type="submit">
                Save changes
              </Button>
           
                </Form>
                </CardBody>
                </Card>
                </Col>
                </Row>
                <Modal
              className="modal-dialog-centered"
              
              isOpen={isModal}
              toggle={() => toggleModal("notificationModal")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                   Add Variable
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => toggleModal("notificationModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <Form onSubmit={insertVariable} autoComplete="off">
                    <Row>
                      <Col lg={12}>
                    
                        <CDropdown 
                            options = {variables}
                            placeholder= "Select Variable"
                            value = {value}
                            onChange = {val => setValue(val)}
                            label = "name"
                            id = "_id"
                            heading= "Insert variable"
                          />
                      </Col>
                    </Row>
                  </Form>
                </div>
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
                  <Button color="primary" type="submit" onClick={insertVariable}>
                    Insert
                  </Button>
          
              </div>
            </Modal>
        </Container>
        </>
    )
}

export default EditTemplate