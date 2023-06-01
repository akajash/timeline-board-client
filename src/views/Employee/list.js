import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteProject, fetchProjects} from '../../actions/projects'

import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    
  } from "reactstrap";
import { deleteWorkforce } from '../../actions/workforce';

const EmployeeList = ({employee, setCurrentId, setIsModal, empKey}) => {

    const dispatch = useDispatch()

    const handleUpdate = (employee_id) => {
      setCurrentId(employee_id);
      setIsModal(true)
      

    }

    const handleView = (employee_id) => {
        
    }

    return(
        <tr key={empKey}>
            <td scope="row">
                {employee.name}
            </td>
                <td>{employee.designation}</td>
                <td>{employee.city}</td>
                <td>{employee.primaryContact}</td>
                <td>
                    <Badge color="" className="badge-dot mr-4">
                    <i className="bg-warning" />
                    {employee.work_type}
                    </Badge>
                </td>
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
                            
                            onClick={() =>handleUpdate(employee._id)}
                          >
                            Update
                          </DropdownItem>
                          <DropdownItem
                            
                            onClick={() => dispatch(deleteWorkforce(employee._id))}
                          >
                            Delete
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
            </tr>
    )
}

export default EmployeeList;