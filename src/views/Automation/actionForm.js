import React from 'react'
import SendInvoice from './sendInvoice'
import SendMail from './sendMail'
import SendTask from './sendTask'


const ActionForm = ({action,toggleModal,submit}) => {
    switch(action){
        case 1:
            return <SendMail toggleModal={toggleModal} submit={submit} />

        case 2: 
            return <SendTask toggleModal={toggleModal} submit={submit}/>

        case 3:
            return <SendInvoice toggleModal={toggleModal} submit={submit} />
            
    }
}

export default ActionForm