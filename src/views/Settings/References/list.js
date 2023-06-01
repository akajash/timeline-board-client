import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteReference} from '../../../actions/references.js'

import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    
  } from "reactstrap";

const ReferenceList = ({data, setCurrentId, setIsModal,referencekey}) => {

    const dispatch = useDispatch()

    const handleUpdate = (item_id) => {
      setCurrentId(item_id);
      setIsModal(true)
      

    }

    return(
        <tr key={referencekey}>
            <td scope="row">
                {data.reference_name}
            </td>
            <td scope="row">
                {data.count}
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
                            
                            onClick={() =>handleUpdate(data._id)}
                          >
                            Update
                          </DropdownItem>
                          <DropdownItem
                            
                            onClick={() => dispatch(deleteReference(data._id))}
                          >
                            Delete
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
            </tr>
    )
}

export default ReferenceList;