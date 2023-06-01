import React from 'react'
import {useDispatch} from 'react-redux'
import moment, { months } from 'moment'

import {deleteTask, fetchTasks} from '../../actions/tasks'

import { handleProgress } from '../../api'

import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Row,
    Col
    
  } from "reactstrap";

const ActionList = ({action,actKey,deleteAction}) => {


    const actions = {
      1: ["Send Mail","bg-info"],
      2: ["Assign Task","bg-success"],
      3: ["Send Invoice", "bg-primary"]
    }


    return(
        <tr key={actKey}>
            <td scope="row">
              <Badge color="" className="badge-dot mr-4">
                <i className= {`${actions[action?.action]?.[1]}`} />
                {actions[action?.action]?.[0]} 
              </Badge>
                
                {action.action == 2 && (
                  <h5>{action?.job_title} - {action?.allocated_to['name']}</h5>
                )}

                {action.action == 1 && (
                  <h5>{action?.isClient ? "Client" : action?.workforce['name']} - {action?.template['title']}</h5>
                )}
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
                    
                    onClick={() => deleteAction(actKey)}
                >
                    Delete
                  </DropdownItem>
                  
                </DropdownMenu>
              </UncontrolledDropdown>
          </td>
      </tr>
    )
}

export default ActionList;