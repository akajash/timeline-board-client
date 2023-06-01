import React, { useState,useEffect } from 'react'


import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation();

    


    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        
        history.push("/auth")

        setUser(null)
    }

    useEffect(() => {
            
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return(
    <div>
        <h2>Timeline</h2>
        <div>
            {user ? (
                <div>
                    <p>{user.result.name.charAt(0)}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
            <a href="/auth">Login</a>
            ) }
        </div>
    </div>
    )
}

export default Navbar