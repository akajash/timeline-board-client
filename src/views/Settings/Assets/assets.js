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
import {fetchAssets, createAsset, updateAsset} from "../../../actions/assets.js"
import AssetList from "./list.js"
import CustomSelect from "../../../components/Form/SelectInput.js";
import { fetchAllWorkforces } from "../../../api/index.js";


import empty from "../../../images/empty.png"




const Assets = () => {
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isModal,setIsModal] = useState(false);

    const [workforces,setWorkforces] = useState([])
    const [assetData,setAssetData] = useState({
      name: "",
      incharge: {
        title: "",
        id: ""
      },
      description: "",

    })


    const [currentId,setCurrentId] = useState(null)


    const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

    const dispatch = useDispatch()
    const data = useSelector((state) => state.data)
  
    const dataSpecific = useSelector((state) => currentId ? state.data.find((p) => p._id === currentId) : null);


    const preload = () => {

    

      fetchAllWorkforces().then((res) => {
        if(res.error){
          console.log(res.error)
        }
        else{ 
          res.data.map((e)=>{
            e.value="value"
            e["value"] = e.name
            e.label = "label"
            e["label"] = e.name
            
          })    
       
          setWorkforces(res.data)
        }
        
    
      })
      
    }

  useEffect(()=>{
    dispatch(fetchAssets())
    preload()
  },[dispatch])

 

    useEffect(() => {
      if(dataSpecific) {
       setAssetData(dataSpecific)
              
      }
    },[dataSpecific])

   

    const handleChange = (e) => {
      setAssetData({...assetData, [e.target.name]: e.target.value})
      
    }


const handleSubmit = (e) => {
  e.preventDefault();

 

  if(currentId){
    dispatch(updateAsset(currentId, {...assetData}))
  }
  else{
    dispatch(createAsset({...assetData}))
  }

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setAssetData({
    name: "",
    incharge: {
      title: "",
      id: ""
    },
    description: "",
  })

}
  const desc = "Manage your assets/ Equipments by assigning a workforce"


  return (
    <>
      <UserHeader name="Assets" description={desc} /> 
        

      
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
                    <h3 className="mb-0">Assets</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Asset +
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              {!data.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Assets Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Asset Name</th>
                    <th scope="col">Incharge</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  {!data?.length ? "Loading": (
                    data.map((d) => (
                        
                      <AssetList  data={d} setCurrentId={setCurrentId} setIsModal = {setIsModal} assetkey={d._id} />
                      
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
                Asset
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
                      <CustomInput label="Asset Name" 
                            type="text"
                            placeholder="" 
                            idName = "input-title"
                            name="name"
                            onChange = {handleChange}
                            col="6"
                            value={assetData.name}
                            />

                    <Col lg={6}>
                     
                     <CustomSelect 
                       heading="Assign To"
                       options={workforces} 
                       id='_id'
                       label="name"
                       prompt="Select Workforce"
                       value={assetData.incharge.title}
                       onChange={val => setAssetData({...assetData, incharge: {title: val?.name, id: val?._id}})}
                       />

                  </Col>
                      
                      
                    </Row>
                    <Row>
                    <CustomInput label="Description" 
                            type="textarea"
                            placeholder="" 
                            idName = "input-desc"
                            name="description"
                            onChange = {handleChange}
                            col="12"
                            value={assetData.description}
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

export default Assets