import React,{useState,useEffect} from "react";


import empty from "../../../images/empty.png"

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
import {fetchPackages, createPackage, updatePackage} from "../../../actions/packages.js"
import PackageList from "./list.js"








const Packages = () => {
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isModal,setIsModal] = useState(false);

  
    const [packageData,setPackageData] = useState({
        package_name : "",
        amount: "",
        services: [
            {
                service:"",
                quantity: 0
            }
        ],
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
    dispatch(fetchPackages())
  },[dispatch])

 

    useEffect(() => {
      if(dataSpecific) {
       setPackageData(dataSpecific)
       
       
       
      }
    },[dataSpecific])

    const addService = () => {
        setPackageData({...packageData,services:[...packageData.services,{service: "",quantity: 0}]})
        
    }
    
    const deleteService = (index) => {
        const values = [...packageData.services]
        values.splice(index,1)
        setPackageData({...packageData, services:values})
    }

    const handleChange = (e) => {
      setPackageData({...packageData, [e.target.name]: e.target.value})
      
    }

    const handleChangeServices = (index,e) => {
        const values = [...packageData.services]
        values[index][e.target.name] = e.target.value;
        setPackageData({...packageData, services:values})
    }

const handleSubmit = (e) => {
  e.preventDefault();

 

  if(currentId){
    dispatch(updatePackage(currentId, {...packageData}))
  }
  else{
    dispatch(createPackage({...packageData}))
  }

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setPackageData({
    package_name : "",
        amount: "",
        services: [
            {
                service:"",
                quantity: 0
            }
        ],
        description: ""
  })

}
  const desc = "Create a combination of Services that you offer"  

  return (
    <>
      <UserHeader name="Packages" description={desc} /> 
      
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
                    <h3 className="mb-0">Packages</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Package +
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              {!data.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Packages Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Package Name</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  {!data?.length ? "Loading": (
                    data.map((d) => (
                        
                      <PackageList  data={d} setCurrentId={setCurrentId} setIsModal = {setIsModal} packagekey={d._id} />
                      
                    ))
                  )}
                  
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
                PACKAGE
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
                      <CustomInput label="Package Name" 
                            type="text"
                            placeholder="Premium Package" 
                            idName = "input-title"
                            name="package_name"
                            onChange = {handleChange}
                            col="6"
                            value={packageData.package_name}
                            />

                        <CustomInput label="Total Amount" 
                            type="number"
                            placeholder="" 
                            idName = "input-amount"
                            name="amount"
                            onChange = {handleChange}
                            col="6"
                            value={packageData.amount}
                            />
                      
                      
                    </Row>
                    <Row>
                    <CustomInput label="Description" 
                            type="textarea"
                            placeholder="" 
                            idName = "input-desc"
                            name="description"
                            onChange = {handleChange}
                            col="12"
                            value={packageData.description}
                            />
                    </Row>
                    
                      {packageData.services.map((field,index) => (
                          
                              
                              <Row key={index}>
                              <CustomInput label="Service Name" 
                                type="text"
                                placeholder={"Candid Photographer"} 
                                idName = "input-service"
                                name="service"
                                onChange = {e => handleChangeServices(index,e)}
                                col="4"
                                value={packageData.services[index].service}
                                />

                                <CustomInput label="Quantity" 
                                    type="number"
                                    placeholder="1" 
                                    idName = "input-quantity"
                                    name="quantity"
                                    onChange = {e => handleChangeServices(index,e)}
                                    col="4"
                                    value={packageData.services[index].quantity}
                                    />
                                    <a
                                        
                                        className="btn btn-md my-4 justify-items-center btn-icon-only lead"
                                        type="button"
                                        onClick={() => deleteService(index)}
                                    >
                                        <i className="ni ni-fat-remove text-danger"></i>
                                    </a>
                                    <a
                                        
                                        className="btn btn-md my-4 justify-items-center btn-icon-only lead"
                                        type="button"
                                        onClick={addService}
                                    >
                                        <i className="ni ni-fat-add text-success"></i>
                                    </a>
                                
                              </Row>
                              
                              
                         
                      ))}
                        
                    
                      
                      
                    
                    
                    
                    
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

export default Packages