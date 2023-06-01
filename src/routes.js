
import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Maps from "./views/examples/Maps.js";
import Tables from "./views/examples/Tables.js";
import Icons from "./views/examples/Icons.js";

import Auth from "./components/Auth/Auth.js"
import Projects from "./views/Projects/projects.js"
import Employees from "./views/Employee/employee.js";
import Tasks from "./views/Tasks/tasks.js";
import Expenses from "./views/Expenses/expenses.js";
import AdminDashboard from "./views/AdminDashboard.js";



var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-chart-bar-32 text-blue",
    component: AdminDashboard,
    layout: "/app",
  },
  {
    path: "/projects",
    name: "Shoots",
    icon: "ni ni-camera-compact text-green",
    component: Projects,
    layout: "/app",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/app",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/app",
  // },
  {
    path: "/workforce",
    name: "Work Force",
    icon: "ni ni-circle-08 text-yellow",
    component: Employees,
    layout: "/app",
  },
  {
    path: "/settings/data",
    name: "Data",
    icon: "ni ni-money-coins text-orange",
    component: Expenses,
    layout: "/app",
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: "ni ni-time-alarm text-red",
    component: Tasks,
    layout: "/app",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/app",
  // },
  

  // {
  //   path: "/projects/form",
  //   name: "Projects Form",
  //   icon: "ni ni-key-25 text-info",
  //   component: projectsForm,
  //   layout: "/app",
  // },

  // {
  //   path: "/",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Auth,
  //   layout: "/auth",
  // },
  
];
export default routes;
