import { resolvePlugin } from '@babel/core'
import React, { useEffect, useState, useLocation } from 'react'
import { useHistory } from 'react-router'
import { Button, Container } from 'reactstrap'
import { subscribe, verifySub } from '../../api'
import payment from './../../images/payment.svg'
import decode from 'jwt-decode'
import { useDispatch } from "react-redux";

function loadScript(src)  {
    return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
    script.onload = () => {
        resolve(true)
    }
    script.onerror = () => {
        resolve(false)
    }
})
    
}



const __DEV__ = document.domain === 'localhost'

const Subscription = () => {


    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push("/auth")
      }

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    // const location = useLocation()

    const [userData,setUserData] = useState({
        amount: 0,
        currency: "",
        id: ""
    })

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

    async function displayRazorpay(){

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res){
            alert('Payment gateway failed, try again later!')
            return
        }

        // __DEV__ ? "rzp_test_hikMcmJVg0Mwou" :

        const data = await subscribe().then((res) => {
            
            var options = {
                "key":  "", // Enter the Key ID generated from the Dashboard
                "amount": res.data.amount, 
                "currency": res.data.currency,
                "name": "Payment",
                "description": "Thank you for choosing us",
                "image": "https://example.com/your_logo",
                "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                    const rpData = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    }
                    
                    verifySub(rpData).then((res) => {
                        if(res.data.success == true){
                            console.log(res.data.success)
                            history.push('/transaction/success')
                        }else{
                            history.push('/transaction/fail')
                        }
                    })
                },
                // "prefill": {
                //     "name": userData.name,
                //     "email": userData.email,
                    
                // },
               
            };
    
            var paymentObject = new window.Razorpay(options);
            paymentObject.open()
        })
        


        
    }

    

    return(
        // <div>
                      
        //     <Container fluid>
        //         <h1>Subscribe to our Beta-access</h1>
        //         <div className="price-holder">
        //         <section className="price-comparison">
        //         <div className="price-column">
        //                 <div className="price-header">
        //                     <div className="price">
        //                     <div className="dollar">INR</div>
        //                         1299
        //                     <div className="per">Billed Monthly</div>
        //                     </div>
        //                 </div>
        //                 <div className="plan-name">
        //                     Beta-Access
        //                 </div>
        //                 <div className="divider"></div>
        //                 <div className="feature">
        //                     Manage Shoots
        //                 </div>
        //                 <div className="feature">
        //                     Manage Workforces
        //                 </div>
        //                 <div className="feature">
        //                     Manage Tasks
        //                 </div>
        //                 <div className="feature">
        //                     Manage Assets
        //                 </div>
        //                 <div className="feature">
        //                     Send Emails
        //                 </div>

        //                 <Button color="primary" className="mt-3 mb-3" onClick={displayRazorpay}>Subscribe</Button>
        //             </div>
        //             {/* <div className="price-column popular">
        //                 <div className="price-header">
        //                     <div className="price">
        //                     <div className="dollar"> $</div>
        //                         199.99
        //                     <div className="per">Billed Annually</div>
        //                     </div>
        //                 </div>
        //                 <div className="plan-name">
        //                     Beta-Access
        //                 </div>
        //                 <div className="divider"></div>
        //                 <div className="feature">
        //                     Manage Shoots
        //                 </div>
        //                 <div className="feature">
        //                     Manage Workforces
        //                 </div>
        //                 <div className="feature">
        //                     Manage Tasks
        //                 </div>
        //                 <div className="feature">
        //                     Manage Assets
        //                 </div>
        //                 <div className="feature">
        //                     Send Emails
        //                 </div>
                        
        //             </div> */}
        //         </section>
        //         </div>
        //     {/* <button onClick={displayRazorpay}>Pay now</button> */}
        //     <p>Beta-access? Yes, it's a trial system that helps us to analyse the user workflow, and the market parameters. The complete pricing tiers have not disclosed yet, but ofcourse there are perks in being our first few customers.</p>
        //     </Container>
            
        // </div>

        <div>
            <nav className="subscription-nav">

            </nav>
            <section className="subs-hero">
        
                <img src={payment}/>
                <h1>Standard Access</h1>
                <p> 1399 INR/Month</p>
                <Button color="primary" className="mt-3 mb-3" onClick={displayRazorpay}>Subscribe</Button>
                <p>Tailored for photographers of all sizes, this plan provides you with the tools and resources to streamline your workflow, enhance client relationships, and boost your creative business success</p>
                {/* <p>Beta-access? Yes, it's a trial system that helps us to analyse the user workflow, and the market parameters. The complete pricing tiers have not disclosed yet, but ofcourse there are perks in being our first pick of customers.</p> */}
            </section>

        </div>
    )
}


export default Subscription