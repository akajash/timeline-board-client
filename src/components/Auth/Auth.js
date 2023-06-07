import React,{useState} from 'react'
import {GoogleLogin} from 'react-google-login'

import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import CustomSelect from '../Form/SelectInputEvent.js'
import {signin,signup} from '../../actions/auth'
import { countryList,currency_list } from '../../data.js'

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
import { ERROR } from '../../constants/actionTypes'
import Notification from '../notification'
import Select from 'react-select'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    confirmPassword: '',
    country: 'India',
    currency: 'INR'    
}

const Auth = () => {

    const history = useHistory()
    const dispatch = useDispatch()


    const notify = useSelector((state) => state.error)

    const [showPassword,setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState);
    
    const [isSignup,setIsSignup] = useState(false)

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false)
        dispatch({type:ERROR, payload: ""})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))

        }

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const [step,setStep] = useState(1)

    const nextStep = () => {
      setStep(step+1)
    }

    const prevStep = () => {
      setStep(step-1)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: {result, token }})
            history.push("/")

        } catch(error){
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error);
    }




        
        
       

       const handleSelectChange = (e) => {
         console.log(formData)
         console.log(e.target.value)
          setFormData({ ...formData, [e.target.name]: e.target.value })
          console.log(formData)
       }
    return(
        // <div>
        //     <h3>{isSignup ? 'Sign Up' : 'Sign in'}</h3>
        //     <form onSubmit={handleSubmit}>
        //         {isSignup && (
        //             <>
        //                 <Input type="text" name="firstName" label="First Name" onChange = {handleChange} />
        //                 <input type="text" name="lastName" label="Last Name" onChange = {handleChange}/>
        //             </>
        //         )}

        //         <Input type="email" name = "email" label="Email" onChange = {handleChange} />
        //         <Input type={showPassword ? "text" : "password"} name = "password" label="Password" onChange = {handleChange} handleShowPassword = {handleShowPassword}/>

        //         {isSignup && <Input type="password" name="confirmPassword" label="Repeat Password" onChange = {handleChange}/>}
        //         <button type="submit">
        //             {isSignup ? 'Sign Up' : 'Sign In'}
        //         </button>
                
        //         <div>
        //             <button onClick={switchMode}>{
        //                 isSignup ? "Already a user?" : "Create new account"
        //             }</button>
        //         </div>
        //         <GoogleLogin
        //             clientId = "21078231626-cla617f2hm31p6k1ta2k1raqmoq7cr6r.apps.googleusercontent.com"
        //             render = {(renderProps) => (
        //                 <button onClick = {renderProps.onClick}
        //                 disabled={renderProps.disabled}>Google Sign In</button>
        //             )}
        //             onSuccess={googleSuccess}
        //             onFailure = {googleFailure}
        //         />
        //     </form>
        // </div>

        <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-3">
            <div className="text-muted text-center mt-1 mb-2">
              <small>{isSignup ? "You are one step away from experiencing the magic!" : "Hey! It's good to see you again!"}</small>
            </div>
            {/* <div className="btn-wrapper text-center">
              

                <GoogleLogin
                    clientId = "21078231626-cla617f2hm31p6k1ta2k1raqmoq7cr6r.apps.googleusercontent.com"
                    render = {(renderProps) => (
                        <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            href="#pablo"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <span className="btn-inner--icon">
                            <img
                                alt="..."
                                src={
                                require("../../assets/img/icons/common/google.svg")
                                    .default
                                }
                            />
                            </span>
                            <span className="btn-inner--text">Google</span>
                        </Button>
                        // <button onClick = {renderProps.onClick}
                        // disabled={renderProps.disabled}>Google Sign In</button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure = {googleFailure}
                />
              
            </div> */}
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-3">
              <small>{notify}</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              
            { isSignup && (<FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Company Name" type="text" onChange={handleChange} name="firstName"/>
                </InputGroup>
              </FormGroup>) }
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    name="password"
                  />
                </InputGroup>
              </FormGroup>
              {isSignup && (
                <div>
                  <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      name="confirmPassword"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                <CustomSelect 
                  heading=""
                  options={countryList} 
                  id='_id'
                  label="Country"
                  prompt="Select Country"
                  value={formData.country}
                  onChange={val => setFormData({...formData, country: val})}
              />
                {/* <Select 
                    className="basic-single"
                    classNamePrefix="Select"
                    placeholder="Select Country"
                    options={countryList}
                    name="country"
                    onChange={handleSelectChange}
                  /> */}
              </FormGroup>

              <FormGroup>
              <CustomSelect 
                  heading=""
                  options={currency_list} 
                  id='_id'
                  label="Currency"
                  prompt="Select Currency"
                  value={formData.currency}
                  onChange={val => setFormData({...formData, currency: val})}
              />
                {/* <Select 
                    className="basic-single"
                    classNamePrefix="Select"
                    placeholder="Select Currency"
                    options={currency_list}
                    name="currency"
                    onChange={handleSelectChange}
                  /> */}
              </FormGroup>
              </div>
              )}
              
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              {isSignup && (
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      required
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row> )}
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  {isSignup ? "Sign up" : "Sign in"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          {!isSignup && (
          <Col xs="6">
            <a
              className="text-light"
              href=""
              onClick={() => history.push("/auth/forgot-password")}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          )}
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={switchMode}
            >
              <small>{isSignup ? "Already have an account?" : "Create new account"}</small>
            </a>
          </Col>
        </Row>
      </Col>
      {/* {notify && (
        <Notification status="ad" message={notify}/>
      )} */}
      
    </>
    )
}

export default Auth