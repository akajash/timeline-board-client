import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteAsset} from '../../../actions/assets.js'

import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    
  } from "reactstrap";

const AssetList = ({data, setCurrentId, setIsModal,assetkey}) => {

    const dispatch = useDispatch()

    const handleUpdate = (item_id) => {
      setCurrentId(item_id);
      setIsModal(true)
      

    }

    return(
        <tr key={assetkey}>
            <td scope="row">
                {data.name}
            </td>
            <td scope="row">
                {data.incharge.title}
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
                            
                            onClick={() => dispatch(deleteAsset(data._id))}
                          >
                            Delete
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
            </tr>
    )
}

export default AssetList;