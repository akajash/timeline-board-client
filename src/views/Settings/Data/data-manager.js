
import React, { useState,useEffect } from "react";

import ReactDatetime from 'react-datetime'
import moment from 'moment'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
// core components
import UserHeader from "../../../components/Headers/UserHeader.js";
import CustomSelect from "../../../components/Form/SelectInput.js";
import { downloadProjects, downloadTasks, downloadExpenses } from "../../../api/index.js";
import { useDispatch } from "react-redux";
import { fetchLoading } from "../../../actions/loading.js";
import fileDownload from 'js-file-download'

const DataManager = () => {

  const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState({
        startDate: Date(),
        endDate: Date(),
        downloadParameter: {
          label:0,
          value:0
        },
        onCreated: true,
        
    })

    const dispatch = useDispatch()

    const parameters = [
      {value: 1, label: "Projects"},
      {value: 2, label: "Tasks"},
      {value: 3, label: "Expenses"},
    ]

   const handleChange = (e) => {
      
    setData({...data, [e.target.name]: e.target.value})

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data.downloadParameter.value)
    switch(data.downloadParameter.value){
      case 1: downloadProjects(data)
      .then(response => {
        // create a Blob object from the response data
        const blob = new Blob([response.data], { type: 'text/csv' });
  
        // create a URL for the blob
        const url = URL.createObjectURL(blob);
  
        // create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.csv';
  
        // add the link to the DOM and click it
        document.body.appendChild(link);
        link.click();
  
        // cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading CSV:', error);
      });

      case 2: downloadTasks(data)
      .then(response => {
        // create a Blob object from the response data
        const blob = new Blob([response.data], { type: 'text/csv' });
  
        // create a URL for the blob
        const url = URL.createObjectURL(blob);
  
        // create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.csv';
  
        // add the link to the DOM and click it
        document.body.appendChild(link);
        link.click();
  
        // cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading CSV:', error);
      });
      break;

      case 3: downloadExpenses(data)
      .then(response => {
        // create a Blob object from the response data
        const blob = new Blob([response.data], { type: 'text/csv' });
  
        // create a URL for the blob
        const url = URL.createObjectURL(blob);
  
        // create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.csv';
  
        // add the link to the DOM and click it
        document.body.appendChild(link);
        link.click();
  
        // cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading CSV:', error);
      });
      break;
    }
    
   
}

    const desc = "Downloadable data can be used as a backup or used for further analysis. (in CSV Format)"
  return (
    <>
      <UserHeader name="Data Manager" description={desc}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Data Manager</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Row>
                <Col lg="12" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0 shadow">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-muted"
                        >
                          Download Data
                        </CardTitle>
                        
                      </div>
                      
                    </Row>
                    <Form onSubmit={handleSubmit} autoComplete="off">
                  
                          <Row>
                          <Col lg={4}>
                          <CustomSelect 
                            heading="Download"
                            options={parameters} 
                            id='_id'
                            label="label"
                            prompt="Select..."
                            value={data.downloadParameter?.label}
                            onChange={val => setData({...data, downloadParameter: {label: val?.label,value:val?.value}})}
                            />
                      </Col>
                          <Col lg={4}>
                      <FormGroup>
                      <label
                            className="form-control-label"
                            htmlFor="input-deadline"
                            >
                            Start Date
                            </label>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <ReactDatetime
                                inputProps={{
                                  placeholder: "Start Date",
                                  name: "Start Date",
                                  onChange: {handleChange},
                                  id: "input-start-date",
                                  value:moment(data.startDate).format("MMMM Do YYYY"),
                                  
                                }}
                                timeFormat={false}
                                onChange= {e => setData({...data, startDate: e })}
                              />
                            </InputGroup>
                          </FormGroup>
                      </Col>
                      
                      <Col lg={4}>
                      <FormGroup>
                      <label
                            className="form-control-label"
                            htmlFor="input-deadline"
                            >
                            End Date
                            </label>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <ReactDatetime
                                inputProps={{
                                  placeholder: "End Date",
                                  name: "End Date",
                                  onChange: {handleChange},
                                  id: "input-end-date",
                                  value:moment(data.endDate).format("MMMM Do YYYY"),
                                  
                                }}
                                timeFormat={false}
                                onChange= {e => setData({...data, endDate: e })}
                              />
                            </InputGroup>
                          </FormGroup>
                      </Col>
                      
                    </Row>
                    
                      <Button color="primary" type="submit">
                        Download
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
                
              </Col>
              </Row>

             
              <p className="text-muted m-3">*You can download Tasks and Expenses of a single project in the shoots section</p>
              </CardBody>
              
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
};

export default DataManager;
