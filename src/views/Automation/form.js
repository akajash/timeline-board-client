import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'

import tasks from "../../assets/img/icons/tasks.png"
import mail from "../../assets/img/icons/mail.png"
import invoice from "../../assets/img/icons/invoice.png"


import ActionForm from './actionForm'



const StepForm = ({data,nextStep,prevStep,handle,toggleModal,submit}) => {

    
    const [actionId ,setActionId] = useState(0)

    const handleForm = (action) => {
        setActionId(action)
        nextStep()
    }

    
    
    switch(data.step){
        case 1:
            return (
                <div className='card-container'>
                    <Row>
                        <Col lg={6}>
                        <div className='card border-info cursor-pointer mb-4' onClick={() => handleForm(1)}>
                            <div className='card-body d-flex align-items-center'>
                                <img src={mail} className="mr-4"/>
                                <h3>Send Mail</h3>
                            </div>
                        </div>
                        </Col>
                        <Col lg={6}>
                        <div className='card border-success cursor-pointer mb-4' onClick={() => handleForm(2)}>
                            <div className='card-body d-flex align-items-center'>
                                <img src={tasks} className='mr-4'/>
                                <h3>Assign Tasks</h3>
                            </div>
                        </div>
                        </Col>
                        {/* <Col lg={4}>
                        <div className='card border-primary cursor-pointer mb-4' onClick={() => handleForm(3)}>
                            <div className='card-body d-flex align-items-center'>
                                <img src={invoice} className='mr-4'/>
                                <h3>Send Invoice</h3>
                            </div>
                        </div>
                        </Col> */}
                    </Row>
                </div>
            )
        
        case 2: 
            
            return <ActionForm action={actionId} toggleModal={toggleModal} submit={submit}/>
            
    }

    return(
        <div>

        </div>
    )
}

export default StepForm