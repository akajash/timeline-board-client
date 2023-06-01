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

const ProjectList = ({project, setCurrentId, setIsModal,projectkey}) => {

  const status = [
    {title:"Lead",class:"bg-danger"},{title:"Order",class:"bg-success"},{title:"Pre-Production",class:"bg-success"},{title:"Production",class:"bg-success"},{title:"Post Production",class:"bg-warning"},{title:"Delivery",class:"bg-warning"},{title:"Wrapped up",class:"bg-dark"}
  ]
  
    const history  = useHistory()

    const handleUpdate = (project_id) => {
      setCurrentId(project_id);
      setIsModal(true)
      

    }

    const viewDetail = (project_id) => {
      setCurrentId(project_id)
      history.push(`/app/project/${project_id}`)
    }

   

    return(
      
        <tr key={projectkey}>
          
            <td scope="row">
                {project.eventName ? project.eventName : `-`}
            </td>
                <td>{project.eventType ? project.eventType : `-`}</td>
                <td>{project.eventLocation ? project.eventLocation : `-`}</td>
                <td>{moment(project.dateFrom).format("MMMM Do YYYY")}</td>
                <td>
                    <Badge color="" className="badge-dot mr-4">
                    <i className={status[project.status]?.class} />
                    {status[project.status]?.title}
                    </Badge>
                </td>
                <td className="text-right">
                  
                      {/* <UncontrolledDropdown>
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
                            
                            onClick={() =>handleUpdate(project._id)}
                          >
                            Update
                          </DropdownItem>
                          <DropdownItem
                            
                            onClick={() => dispatch(deleteProject(project._id)).then(dispatch(fetchProjects()))}
                          >
                            Delete
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown> */}
                      <Button 
                      color="" 
                      size="sm"
                      onClick={() => viewDetail(project._id)}
                      >
                        <i className="ni ni-bold-right text-primary"></i>
                      </Button>
                    </td>
                    
            </tr>
            
    )
}

export default ProjectList;