import React,{useState,useEffect} from 'react'
// import { useDispatch,useSelector } from 'react-redux'
import { Container,Form,Row,Col,FormGroup, InputGroup, Button,Card, CardBody,CardHeader } from 'reactstrap'
import { fetchMailSettings, updateMailSettings } from '../../api/index.js'
import CustomInput from "../../components/Form/Input.js"
import UserHeader from '../../components/Headers/UserHeader';

const EmailSettings = () => {
    const desc = "Configure your Email server settings to send automated mails."
    const [isSSL,setIsSSL] = useState(true)

    const switchEncryption = () => {
      setIsSSL((prevIsSSL) => !prevIsSSL)
      setInitialData({...initialData, ssl: isSSL})
    }

    const [initialData,setInitialData] = useState({
        server: "",
        username: "",
        password: "",
        port: "",
        ssl: false
         
    })

    useEffect(() => {
      fetchMailSettings()
      .then((data) => {
        
        setInitialData(data.data)

      })
      

    },[])

    const handleChange = (e) => {
        setInitialData({...initialData, [e.target.name]: e.target.value})
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      
        updateMailSettings({...initialData})
        
       
      
      }
    

    return(
        <>
        <UserHeader name="Email Settings" description={desc}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>

          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Email Settings</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
        
        <Form onSubmit={handleSubmit} autoComplete="off">
                  
                  
                    <Row>
                      <CustomInput label="SMTP URL" 
                            type="text"
                            placeholder="Eg., smtp.example.com" 
                            idName = "input-server"
                            name="server"
                            onChange = {handleChange}
                            col="4"
                            value={initialData.server}
                            />

                    
                      
                      
                    </Row>
                    <Row>
                      <CustomInput label="Username" 
                            type="text"
                            placeholder="Eg., admin@abc.com" 
                            idName = "input-username"
                            name="username"
                            onChange = {handleChange}
                            col="4"
                            value={initialData.username}
                            />

                    
                      
                      
                    </Row>
                    <Row>
                    <CustomInput label="Password" 
                            type="password"
                            placeholder="*****" 
                            idName = "input-pwd"
                            name="password"
                            onChange = {handleChange}
                            col="4"
                            
                            />
                    </Row>

                    <Row>
                    <CustomInput label="PORT" 
                            type="number"
                            placeholder="Eg., 123" 
                            idName = "input-port"
                            name="port"
                            onChange = {handleChange}
                            col="4"
                            value={initialData.port}
                            
                            />
                    </Row>

                    <Row>
                    <Col lg={4}>
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-ssl"
                            >
                                Use SSL
                            </label>
                            <InputGroup>
                                <label className="custom-toggle">
                                <input type="checkbox" onChange={switchEncryption} id="input-ssl" checked={initialData.ssl} />
                                <span className="custom-toggle-slider rounded-circle" />
                                </label>
                            </InputGroup>
                            
                        </FormGroup>
                    </Col>
                    </Row>


                    
                    
                 
                  
                  
                  
              
              <Button color="primary" type="submit">
                Save changes
              </Button>
           
                </Form>
                </CardBody>
                </Card>
                </Col>
                </Row>
        </Container>
        </>
    )
}

export default EmailSettings