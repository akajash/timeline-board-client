import React,{useState} from 'react'


import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'



import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
import { forgotPass } from '../../api';


const initialState = {
    
    email: '',
    password:'',
    confirmPassword: '',
       
}

const ForgotPass = () => {

    const history = useHistory()
    const dispatch = useDispatch()



    const [formData, setFormData] = useState(initialState);
    const [sw,setSw] = useState(false)
    

  console.log("forgot pass?")
    



    const handleSubmit = (e) => {
      e.preventDefault();
        
      forgotPass(formData).then((res) =>{
        if (res?.error){
          console.log("Something went wrong")
        }
        else{
          setSw(true)
        }
      })

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

 
 
    return(
  
        <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-3">
            <div className="text-muted text-center mt-1 mb-2">
              <small>Forgot your Password? Enter your registered mail ID.</small>
            </div>
            
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
          {!sw && (
            <Form role="form" onSubmit={handleSubmit}>
              
            
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={handleChange}
                    name="email"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Submit
                </Button>
              </div>
              
            </Form>
            )}

            {sw && (
              <div className="text-center text-muted mb-3">
              <small>Activation link has been sent to your mail.</small>
            </div>
            )}
          </CardBody>
        </Card>
        <Row className="mt-3">
          
          
          
          <Col xs="12">
            <a
              className="text-light"
              href="#pablo"
              onClick={() => history.push("/auth")}
            >
              <small>Sign in?</small>
            </a>
          </Col>
        </Row>
      </Col>
      
      
    </>
    )
}

export default ForgotPass