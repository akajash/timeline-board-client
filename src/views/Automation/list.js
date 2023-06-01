import React from 'react'


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

const WorkflowList = ({workflow, setCurrentId, setIsModal,workflowkey}) => {

 
  
    const history  = useHistory()

    const handleUpdate = (id) => {
      setCurrentId(id);
      setIsModal(true)
      

    }

    const viewDetail = (id) => {
      setCurrentId(id)
      history.push(`/app/workflow/${id}`)
    }

   

    return(
      
        <tr key={workflowkey}>
          
            <td scope="row">
                {workflow.title}
            </td>
                
                <td className="text-right">
                  
                      
                      <Button 
                      color="" 
                      size="sm"
                      onClick={() => viewDetail(workflow._id)}
                      >
                        <i className="ni ni-bold-right text-primary"></i>
                      </Button>
                    </td>
                    
            </tr>
            
    )
}

export default WorkflowList;