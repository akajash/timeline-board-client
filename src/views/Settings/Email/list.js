import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteTemplate} from '../../../actions/emailTemplate.js'

import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    
  } from "reactstrap";
import { updateTemplate } from '../../../api/index.js';
import { useHistory } from 'react-router-dom';

const TemplateList = ({data, setCurrentId, setIsModal,templatekey}) => {

    const dispatch = useDispatch()

    const handleUpdate = (template_id) => {
      setCurrentId(template_id);
      setIsModal(true)
      

    }

    const history = useHistory()

    const updateTemplate = (template_id) => {
      history.push(`/app/settings/mail-templates/update/${template_id}`)
    }

    return(
        <tr key={templatekey}>
            <td scope="row">
                {data.title}
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
                            
                            onClick={() => updateTemplate(data._id)}
                          >
                            Update
                          </DropdownItem>
                          <DropdownItem
                            
                            onClick={() => dispatch(deleteTemplate(data._id))}
                          >
                            Delete
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
            </tr>
    )
}

export default TemplateList;