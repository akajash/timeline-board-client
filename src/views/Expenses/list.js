import React from 'react'
import {useDispatch} from 'react-redux'

import moment from 'moment'
import {deleteProject, fetchProjects} from '../../actions/projects'

import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Button
  } from "reactstrap";
import { useHistory } from 'react-router';
import { deleteExpense, fetchExpenses } from '../../actions/expenses';

const ExpenseList = ({expense, setCurrentId, setIsModal,expenseKey}) => {

    const dispatch = useDispatch()
    const history  = useHistory()

    const handleUpdate = (expense_id) => {
      setCurrentId(expense_id);
      setIsModal(true)
      

    }



    return(
      
        <tr key={expenseKey}>
          
            
                <td>{expense.title}</td>
                <td className="text-danger"><i className='fas fa-arrow-down'></i> {expense.amount}</td>
                
                <td className="text-right">
                  
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            
                            onClick={() =>handleUpdate(expense._id)}
                          >
                            Update
                          </DropdownItem>
                          <DropdownItem
                            
                            onClick={() => dispatch(deleteExpense(expense._id)).then(dispatch(fetchExpenses(1)))}
                          >
                            Delete
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                    
            </tr>

        // <tr className="expense-row" key={expenseKey}>
        //   <td>
        //     Nandita's Album
        //   </td>
        //   <td>
        //     150 USD
        //   </td>
        //   <td className="text-right">
                  
        //                <UncontrolledDropdown>
        //              <DropdownToggle
        //                   className="btn-icon-only text-light"
        //                   href="#pablo"
        //                   role="button"
        //                   size="sm"
        //                   color=""
        //                   onClick={(e) => e.preventDefault()}
        //                 >
        //                   <i className="fas fa-ellipsis-v" />
        //                 </DropdownToggle>
        //                 <DropdownMenu className="dropdown-menu-arrow" right>
        //                   <DropdownItem
                            
        //                     // onClick={() =>handleUpdate(project._id)}
        //                   >
        //                     Update
        //                   </DropdownItem>
        //                   <DropdownItem
                            
        //                     // onClick={() => dispatch(deleteProject(project._id)).then(dispatch(fetchProjects()))}
        //                   >
        //                     Delete
        //                   </DropdownItem>
                          
        //                 </DropdownMenu>
        //               </UncontrolledDropdown>
        //             </td>
        // </tr>
            
    )
}

export default ExpenseList;