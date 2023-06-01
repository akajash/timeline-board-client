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
    
  } from "reactstrap";

const TaskList = ({task, setCurrentId, setIsModal,taskKey}) => {


  const status = [
    {title:"In Progress",class:"bg-warning"},{title:"Completed",class:"bg-success"},{title:"Pending",class:"bg-danger"}
  ]



    const dispatch = useDispatch()
    const handleUpdate = (task_id) => {
      setCurrentId(task_id);
      setIsModal(true)
      

    }

    const sendMail = () =>{
      //will be completed
    }

    return(
        <tr key={taskKey}>
            <td scope="row">
                {task.job_title}
            </td>
                <td>{task?.allocated_to?.name}</td>
                {/* <td>{task.assigned_by}</td> */}
                <td>{moment(task.deadline).format("MMMM Do YYYY")}</td>
                <td>
                    
                      {task.status !== 0 ? (
                      <Badge color="" className="badge-dot mr-4">
                      <i className={status[task.status]?.class} />
                      {status[task.status]?.title} 
                      </Badge>
                     ) : (
                        moment(task.deadline).isBefore(moment().toDate()) ? 
                        <Badge color="" className="badge-dot mr-4">
                          <i className={status[2]?.class} />
                          {status[2]?.title} 
                      </Badge> 
                         : 
                         <Badge color="" className="badge-dot mr-4">
                          <i className={status[0]?.class} />
                          {status[0]?.title} 
                        </Badge> 
                         
                        ) 
                      }
                    
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
                            
                            onClick={() =>handleUpdate(task._id)}
                          >
                            Update
                          </DropdownItem>
                          
                          <DropdownItem
                            
                            onClick={() => dispatch(deleteTask(task._id))}
                          >
                            Delete
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
            </tr>
    )
}

export default TaskList;