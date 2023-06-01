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
import Header from "../../../components/Headers/Header.js";

import CustomPagination from "./pagination.js"
import CustomInput from "../../../components/Form/Input.js"
import { useDispatch,useSelector } from "react-redux";
import {fetchReferences, createReference, updateReference} from "../../../actions/references.js"
import TaxList from "./list.js"
import { createTax, fetchTax, updateTax } from "../../../actions/tax.js";








const Tax = () => {
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isModal,setIsModal] = useState(false);

  
    const [taxData,setTaxData] = useState({
      name : "",
    percent: 0,
    additional_amount: 0,
    description: ""
      

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
    dispatch(fetchTax())
  },[dispatch])

 

    useEffect(() => {
      if(dataSpecific) {
       setTaxData(dataSpecific)
       
       
       
      }
    },[dataSpecific])

   

    const handleChange = (e) => {
      setTaxData({...taxData, [e.target.name]: e.target.value})
      
    }


const handleSubmit = (e) => {
  e.preventDefault();

 

  if(currentId){
    dispatch(updateTax(currentId, {...taxData}))
  }
  else{
    dispatch(createTax({...taxData}))
  }

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setTaxData({
    name : "",
    percent: 0,
    additional_amount: 0,
    description: ""
    
  })

}

  return (
    <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>

      
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
                    <h3 className="mb-0">Tax</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Tax +
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tax Name</th>
                    <th scope="col">Percent</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  {!data?.length ? "Loading": (
                    data.map((d) => (
                        
                      <TaxList  data={d} setCurrentId={setCurrentId} setIsModal = {setIsModal} referencekey={d._id} />
                      
                    ))
                  )}
                  
                </tbody>
              </Table>
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
                Tax Details
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
                      <CustomInput label="Tax Name" 
                            type="text"
                            placeholder="Eg., Service Tax" 
                            idName = "input-tax"
                            name="name"
                            onChange = {handleChange}
                            col="4"
                            value={taxData.name}
                            />
                            
                            <CustomInput label="Percent" 
                            type="Number"
                            placeholder="Eg., 18%" 
                            idName = "input-percent"
                            name="percent"
                            onChange = {handleChange}
                            col="4"
                            value={taxData.percent}
                            />

                          <CustomInput label="Additional Amount" 
                            type="Number"
                            placeholder="Eg., 1000" 
                            idName = "input-add-amount"
                            name="additional_amount"
                            onChange = {handleChange}
                            col="4"
                            value={taxData.additional_amount}
                            />  
                        
                    </Row>
                  
                         <Row>
                                <CustomInput
                                    label="Description"
                                    type="textarea"
                                    col="12"
                                    placeholder="Additional Notes... "
                                    name="description"
                                    onChange={handleChange}
                                    value={taxData.description}
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

export default Tax