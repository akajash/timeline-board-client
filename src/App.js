import React,{useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route,Redirect} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import {getPosts} from './actions/posts'

import memories from './images/memories.jpg'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import Navbar from './components/Navbar/Navbar'

import Auth from "./components/Auth/Auth"

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";

import ProjectForm from "./components/Form/projectForm.js"
import { fetchProjects } from './actions/projects'

import Subscription from './views/Subscription/subscription'
import { fetchSub } from './api'
import Success from './views/Subscription/success'
import Failed from './views/Subscription/failed'
import UserDashboard from './views/userDashboard'


const App = () => {

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()

    // useEffect(() => {
        
    //     fetchSub().then((res) => {
    //         var today = new Date()
    //         if (res.data.expiry_date < today){
                
        
    //           console.log("u r not allowed")
    //         }
    //       })
    //     console.log("Im called")
    // },[])

    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/app" render={(props) => <AdminLayout {...props} />} />
                    <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                    <Route path="/admin/dashboard" exact component = {UserDashboard} />
                    <Route path="/subscription" exact component = {Subscription}/>
                    <Route path="/transaction/failed" exact component = {Failed}/>
                    <Route path="/transaction/success" exact component = {Success}/>
                    {/* <Route path="/invoice/:id" exact component={} /> */}

                    <Redirect from="/" to="/app/dashboard" />
                </Switch>
            </BrowserRouter>
            {/* <BrowserRouter>
                <Navbar/>
                <Switch>
                    
                    <Route path="/auth" exact component={Auth}/>
                    
                </Switch>
            </BrowserRouter> */}
            
        </div> 
    )
}

export default App