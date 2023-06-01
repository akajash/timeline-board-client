import React from 'react'
import {useDispatch} from 'react-redux'


import {
   
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    
  } from "reactstrap";
import { deleteTax } from '../../../actions/tax.js';

const TaxList = ({data, setCurrentId, setIsModal,taxkey}) => {

    const dispatch = useDispatch()

    const handleUpdate = (item_id) => {
      setCurrentId(item_id);
      setIsModal(true)
      

    }

    return(
        <tr key={taxkey}>
            <td scope="row">
                {data.name}
            </td>
            <td scope="row">
                {data.percent}
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
                            
                            onClick={() => dispatch(deleteTax(data._id))}
                          >
                            Delete
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
            </tr>
    )
}

export default TaxList;