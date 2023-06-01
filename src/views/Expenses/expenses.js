import React,{useState,useEffect} from "react";
import moment from 'moment'

import empty from "../../images/empty.png"

import ReactDatetime from 'react-datetime'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  
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
// import CustomSelect from '../../components/Form/SelectInputEvent.js'
import ExpenseList from "./list.js";
import { createExpense, fetchExpenses, updateExpense, fetchExpenseByProject } from "../../actions/expenses.js";
import { downloadExpensesByProject } from "../../api";



const Expenses = (props) => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const [isModal,setIsModal] = useState(false);



  const [expenseData,setExpenseData] = useState({
      title: "",
      amount: 0,
      order_id: ""
})



const [currentId,setCurrentId] = useState(null)



  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

  const dispatch = useDispatch()
  const expenses = useSelector((state) => state.data)
  
  const expense = useSelector((state) => currentId ? state.data.find((p) => p._id === currentId) : null);

  
  useEffect(() => {
    var id = props.match.params.id 
    if(id == undefined){
      id = 0
      dispatch(fetchExpenses(1))
    }
    else{
      dispatch(fetchExpenseByProject(id,1))
    }
    
  },[])



    useEffect(() => {
      if(expense) setExpenseData(expense);
    },[expense])

    

    const handleChange = (e) => {
      setExpenseData({...expenseData, [e.target.name]: e.target.value})
    }

    const downloadData = () => {
      downloadExpensesByProject(props.match.params.id)
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
    }

const handleSubmit = (e) => {
  e.preventDefault();

  

  if(currentId){
    dispatch(updateExpense(currentId, {...expenseData}))
  }
  else{
    var id = props.match.params.id 
    if(id == undefined)
    dispatch(createExpense({...expenseData}))
    else
    dispatch(createExpense({...expenseData,order_id: id}))
  }

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setExpenseData({
    title: "",
    amount: 0,
    order_id: ""

})
}


const desc = "Monitor Expenses of an individual project"


  
  return (
    <>
      <UserHeader name="Expenses" description={desc} />
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
                    <h3 className="mb-0">Expenses</h3>
                  </div>
                  <div className="col text-right">
                  {/* <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color="info"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-ui-04 text-white" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            
                            // onClick={() =>handleUpdate(expense._id)}
                          >
                            Today
                          </DropdownItem>
                          <DropdownItem
                            
                            // onClick={() => dispatch(deleteExpense(expense._id)).then(dispatch(fetchExpenses(1)))}
                          >
                            This Week
                          </DropdownItem>
                          <DropdownItem
                            
                            // onClick={() => dispatch(deleteExpense(expense._id)).then(dispatch(fetchExpenses(1)))}
                          >
                            This Month
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown> */}
                      {expenses.length && props.match.params.id ? (
                        <Button
                      
                        color="secondary"
                        onClick={downloadData}
                        size="sm"
                      >
                         <i className="ni ni-cloud-download-95" />
                      </Button>
                      ) : (<div></div>)}
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Expense +
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              {!expenses.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Expenses Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Expense</th>
                    <th scope="col">Amount</th>
                    
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  {!expenses?.length ? "Loading": (
                    expenses?.map((exp) => (
                        
                      <ExpenseList expense={exp} setCurrentId={setCurrentId} setIsModal = {setIsModal} expenseKey={exp._id} />
                      
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
                EXPENSE DETAILS
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
                      <CustomInput label="Expense Name" 
                            type="text"
                            placeholder="Eg., Album" 
                            idName = "input-event-title"
                            name="title"
                            onChange = {handleChange}
                            col="6"
                            value={expenseData.title}
                            />

                      <CustomInput label="Amount" 
                            type="text"
                            placeholder="Eg., 2000" 
                            idName = "input-event-amount" 
                            col="6" 
                            name="amount"
                            onChange={handleChange}
                            value={expenseData.amount}
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

export default Expenses;
