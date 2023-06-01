
import React, { useState,useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "../components/Headers/UserHeader.js";
import { currency_list,countryList } from "../data.js";
import CustomSelect from "../components/Form/SelectInputEvent.js";
import { fetchProfileData,updateProfile } from "../api/index.js";
import { useDispatch } from "react-redux";
import { fetchLoading } from "../actions/loading.js";

const Profile = () => {

    const [data,setData] = useState({
        name: "",
        email: "",
        country: "",
        currency: "",
        shoots: 0,
        workforces: 0,
        tasks: 0,
        subscription: 0
    })

    const dispatch = useDispatch()

    const preload = async() => {
      
      await fetchProfileData().then((res) => {
        if(res.data.error){
          console.log(res.data.error)
        }
        else{
          setData({
            country: res.data.country,
            currency: res.data.currency,
            name: res.data.name,
            email: res.data.email,
            shoots: res.data.shoots,
            workforces: res.data.workforces,
            tasks: res.data.tasks
          })
        }
      })
        

    }

    useEffect(async() => {
      dispatch(fetchLoading(true))
      await preload().then(() => dispatch(fetchLoading(false)))    
      
   },[])

   const handleChange = (e) => {
      
    setData({...data, [e.target.name]: e.target.value})

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(data).then(() => {
      setData(data)
    })
   
}

    const desc = "Update your General Profile details, which assists in providing you better solutions."
  return (
    <>
      <UserHeader name="Profile" description={desc}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="Photo by Alex Andrews from Pexels"
                        className="rounded-circle"
                        src={
                          require("../assets/img/theme/profile.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  {/* <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Choose File
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Save
                  </Button> */}
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{data.shoots}</span>
                        <span className="description">Shoots</span>
                      </div>
                      <div>
                        <span className="heading">{data.tasks}</span>
                        <span className="description">Tasks</span>
                      </div>
                      <div>
                        <span className="heading">{data.workforces}</span>
                        <span className="description">Workforces</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {data.name}
                    {/* <span className="font-weight-light">, 27</span> */}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {data.country}, {data.currency}
                  </div>
                  {/* <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
                </div> 
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
            <Form onSubmit={handleSubmit} autoComplete="off">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Profile</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      type="submit"
                      // onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                
                  
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Company Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={data.name}
                            id="input-username"
                            placeholder=""
                            type="text"
                            name="name"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={data.email}
                            id="input-email"
                            placeholder=""
                            type="email"
                            name="email"
                            onChange={handleChange}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                   
                  </div>
                
                  
                  <div className="pl-lg-4">
                    
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                        
                        <CustomSelect 
                            heading="Country Name"
                            options={countryList} 
                            id='_id'
                            label="Country"
                            prompt="Select Country"
                            value={data.country}
                            onChange={val => setData({...data, country: val})}
                        />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                        <CustomSelect 
                            heading="Currency"
                            options={currency_list} 
                            id='_id'
                            label="Currency"
                            prompt="Select Currency"
                            value={data.currency}
                            onChange={val => setData({...data, currency: val})}
                        />
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    <Row>
                      <h3>Subscription: Beta Access</h3>
                    </Row>
                  </div>
                  
                
              </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
