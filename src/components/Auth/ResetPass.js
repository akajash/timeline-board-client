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
import { resetPass } from '../../api';


const initialState = {
    
    password:'',
    confirmPassword: '',
       
}

const ResetPass = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()



    const [formData, setFormData] = useState(initialState);
    const [sw,setSw] = useState(false)
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const resetToken = props.match.params.resetToken  
      resetPass(formData,resetToken).then((res) =>{
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
              <small>Update your password</small>
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
                    placeholder="New Password"
                    type="password"
                    autoComplete="new-pass"
                    onChange={handleChange}
                    name="password"
                  />
                </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="text"
                    autoComplete="new-pass"
                    onChange={handleChange}
                    name="confirmPassword"
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
              <small>Your password has been changed. <a
              className="text-light"
              href="#pablo"
              onClick={() => history.push("/auth")}
            >
              <small>Login here</small>
            </a></small>
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

export default ResetPass