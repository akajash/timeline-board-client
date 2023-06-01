
import Auth from "../components/Auth/Auth.js"
import ForgotPass from "../components/Auth/ForgotPass.js";




var authRoutes = [
    
  {
    path: "/forgot-password",
    name: "forgotPass",
    icon: "ni ni-key-25 text-info",
    component: ForgotPass,
    layout: "/auth",
  },
      {
    path: "/",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Auth,
    layout: "/auth",
  },
      

]

export default authRoutes;