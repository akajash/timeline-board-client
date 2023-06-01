import React,{useState,useEffect} from "react";


import ReactDatetime from 'react-datetime'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  
  Table,
  Container,
  Row,
  
  
  Modal,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
 
  Col,
  
  
  
  Button
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader.js";


import CustomPagination from "./pagination.js"
import CustomInput from "../../components/Form/Input.js"
import { useDispatch,useSelector } from "react-redux";

import DesignationList from "./list.js";
import empty from "../../images/empty.png"
import { fetchDesignation, updateDesignation,createDesignation } from "../../actions/designation.js";


const Designation = () => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const [isModal,setIsModal] = useState(false);

  


  const [designationData,setDesignationData] = useState({
    title : "",
    
})


const [currentId,setCurrentId] = useState(null)


  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

  const dispatch = useDispatch()
  const designation = useSelector((state) => state.designation)
  
  const des = useSelector((state) => currentId ? state.designation.find((p) => p._id === currentId) : null);


  useEffect(()=>{
    dispatch(fetchDesignation())
  },[dispatch])

 

    useEffect(() => {
      if(des) setDesignationData(des);
    },[des])

    

    const handleChange = (e) => {
      setDesignationData({...designationData, [e.target.name]: e.target.value})
    }

const handleSubmit = (e) => {
  e.preventDefault();

  

  if(currentId){
    dispatch(updateDesignation(currentId, {...designationData}))
  }
  else{
    dispatch(createDesignation({...designationData}))
  }

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setDesignationData({
  title : "",
  })
}

const desc = "Define Roles/ Positions for your Enterprise"


  return (
    <>
      <UserHeader name="Roles" description={desc} /> 

      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                {/* <h3 className="mb-0">Card tables</h3> */}
                <Row className="align-items-center">
                <div className="col">
                    <h3 className="mb-0">Designation</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Designation +
                    </Button>
                  </div>
                  </Row>

              </CardHeader>
              {!designation.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Designations Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  {
                    designation.map((des) => (
                        
                      <DesignationList  designation={des} setCurrentId={setCurrentId} setIsModal = {setIsModal} designationkey={des._id} />
                      
                    ))
                  }
                  
                </tbody>
              </Table>
                  )}
              <CustomPagination/>
            </Card>
          </div>
        </Row>
        

          <Modal
            className="modal-dialog-centered modal-xl p-0"
            isOpen={isModal}
            toggle={toggleModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                DESIGNATION DETAILS
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
            <Form onSubmit={handleSubmit} autoComplete="off">
                  
                  <div className="">
                    <Row>
                      <CustomInput label="Designation Title" 
                            type="text"
                            placeholder="Eg., Photographer" 
                            idName = "input-title"
                            name="title"
                            onChange = {handleChange}
                            col="6"
                            value={designationData.title}
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
                Save changes
              </Button>
            </div>
                </Form>
            </div>

            
          </Modal>
          

      </Container>
    </>
  );
};

export default Designation;
