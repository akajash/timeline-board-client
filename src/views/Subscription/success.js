import { resolvePlugin } from '@babel/core'
import React, { useEffect, useState, useLocation } from 'react'
import { useHistory } from 'react-router'

import success from './../../images/success.png'
import decode from 'jwt-decode'
import { useDispatch } from "react-redux";
import { Button } from 'reactstrap'



const Success = () => {


    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push("/auth")
      }

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()


  

    useEffect(()=> {
        const token = user?.token
        if(token){
          const decodedToken = decode(token);
    
          if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }else{
          history.push("/auth")
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')))
      },[])
    

    const history = useHistory()

    
    

    return(


        <div>
            <nav className="subscription-nav">

            </nav>
            <section className="subs-hero">

                <img src={success}/>
                <h1>Payment Successful</h1>
                <p>Thank you for purchasing our system. </p>
                <Button color="primary" className="mt-3 mb-3" onClick={() => history.push('/app/dashboard')}>Go to Dashboard</Button>
                
            </section>


        </div>
    )
}


export default Success