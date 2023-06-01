import React,{useState,useEffect} from "react";


// reactstrap components
import {
  
  Card,
  CardHeader,
  
  Table,
  Container,
  Row,
  
  Modal,
  Form,
  Col,
  Button
} from "reactstrap";
// core components
import UserHeader from "../../../components/Headers/UserHeader.js";

import CustomPagination from "./pagination.js"
import CustomInput from "../../../components/Form/Input.js"
import { useDispatch,useSelector } from "react-redux";
import {fetchReferences, createReference, updateReference} from "../../../actions/references.js"
import ReferenceList from "./list.js"
import empty from "../../../images/empty.png"







const References = () => {
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isModal,setIsModal] = useState(false);

  
    const [referenceData,setReferenceData] = useState({
      reference_name : "",
      count: 0

    })


    const [currentId,setCurrentId] = useState(null)


    const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

    const dispatch = useDispatch()
    const data = useSelector((state) => state.data)
  
    const dataSpecific = useSelector((state) => currentId ? state.data.find((p) => p._id === currentId) : null);


  useEffect(()=>{
    dispatch(fetchReferences())
  },[dispatch])

 

    useEffect(() => {
      if(dataSpecific) {
       setReferenceData(dataSpecific)
       
      }
    },[dataSpecific])

   

    const handleChange = (e) => {
      setReferenceData({...referenceData, [e.target.name]: e.target.value})
      
    }


const handleSubmit = (e) => {
  e.preventDefault();

 

  if(currentId){
    dispatch(updateReference(currentId, {...referenceData}))
  }
  else{
    dispatch(createReference({...referenceData}))
  }

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setReferenceData({
    reference_name : "",
    count: 0
  })

}
const desc = "Add Referrals to track and analyse your lead sources"

  return (
    <>
      
      <UserHeader name="Referrals" description={desc} /> 
      
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
                    <h3 className="mb-0">Lead Origins</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Reference +
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              {!data.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Referrals Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Reference Name</th>
                    <th scope="col">Count</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  {
                    data.map((d) => (
                        
                      <ReferenceList  data={d} setCurrentId={setCurrentId} setIsModal = {setIsModal} referencekey={d._id} />
                      
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
                Reference Details
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
                      <CustomInput label="Reference Name" 
                            type="text"
                            placeholder="Eg., Instagram" 
                            idName = "input-ref"
                            name="reference_name"
                            onChange = {handleChange}
                            col="6"
                            value={referenceData.reference_name}
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
    )
}

export default References