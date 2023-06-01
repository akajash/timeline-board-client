import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteDesignation} from '../../actions/designation.js'

import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    
  } from "reactstrap";

const DesignationList = ({designation, setCurrentId, setIsModal,designationkey}) => {

    const dispatch = useDispatch()

    const handleUpdate = (designation_id) => {
      setCurrentId(designation_id);
      setIsModal(true)
      

    }

    return(
        <tr key={designationkey}>
            <td scope="row">
                {designation.title}
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
                            
                            onClick={() =>handleUpdate(designation._id)}
                          >
                            Update
                          </DropdownItem>
                          <DropdownItem
                            
                            onClick={() => dispatch(deleteDesignation(designation._id))}
                          >
                            Delete
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
            </tr>
    )
}

export default DesignationList;