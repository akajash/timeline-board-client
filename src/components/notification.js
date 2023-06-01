import React,{useEffect, useState} from 'react'

const Notification = ({status,message}) => {

    const [isOpen,setIsOpen] = useState(false)

    useEffect(() => {
        
        const interval = setInterval(() => {
            setIsOpen(true);
          }, 5000);
          return () => clearInterval(interval);
        
        
    },[isOpen])

    return(
        
        <div className={`toast ${isOpen ? "hide" : ""}`}>
            <div className="holder">
                <div className="content">
                    <div className="icon">
                        {status}
                    </div>
                    <div classname="message">
                        {message}
                    </div>
                </div>
                <div className="close" onClick={() => setIsOpen(true)}>

                    <i classname="ni ni-fat-remove"></i>
                </div>
            </div>
        </div>
    )
}

export default Notification