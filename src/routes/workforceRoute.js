import Designation from '../views/Designation/designation.js'
import Employees from "../views/Employee/employee.js";
import Tasks from "../views/Tasks/tasks.js";
import Projects from "../views/Projects/projects.js"
import Icons from "../views/examples/Icons.js";
import EmailTemplate from '../views/Settings/Email/emailTemplate.js';
import EditTemplate from '../views/Settings/Email/EditTemplate.js';
import SettingsList from '../views/Settings/main.js';
import EmailSettings from '../views/Settings/emailSettings.js';
import Packages from '../views/Settings/Packages/packages.js';
import References from '../views/Settings/References/references.js';
import ProjectDetail from '../views/Projects/detail.js';
import Auth from "../components/Auth/Auth.js"
import Automation from '../views/Automation/automation.js';
import WorkflowDetail from '../views/Automation/detail.js';
import Expenses from '../views/Expenses/expenses.js';
import Tax from '../views/Settings/Tax/tax.js';
import Dashboard from '../views/dashboard.js';
import Subscription from '../views/Subscription/subscription.js'
import ForgotPass from '../components/Auth/ForgotPass.js';
import Profile from '../views/profile.js';
import Assets from '../views/Settings/Assets/assets.js'
import DataManager from '../views/Settings/Data/data-manager.js';
import AdminDashboard from '../views/AdminDashboard.js';




var appRoutes = [

  {
    path: "/dashboard",
    name: "Work Force",
    icon: "ni ni-single-02 text-yellow",
    component: AdminDashboard,
    layout: "/app",
  },
  {
    path: "/admin/dashboard",
    name: "Admin Dashboard",
    icon: "ni ni-single-02 text-yellow",
    component: AdminDashboard,
    layout: "/app",
  },
    {
        path: "/workforce",
        name: "Work Force",
        icon: "ni ni-single-02 text-yellow",
        component: Employees,
        layout: "/app",
    },
    {
      path: "/project/:id",
      name: "Projects",
      icon: "ni ni-key-25 text-info",
      component: ProjectDetail,
      layout: "/app",
    },
    {
        path: "/projects",
        name: "Projects",
        icon: "ni ni-key-25 text-info",
        component: Projects,
        layout: "/app",
    },
    {
      path: "/tasks/:id",
      name: "Project Tasks",
      icon: "ni ni-archive-2 text-primary",
      component: Tasks,
      layout: "/app",
    },
    {
        path: "/tasks",
        name: "Tasks",
        icon: "ni ni-circle-08 text-pink",
        component: Tasks,
        layout: "/app",
      },

      {
        path: "/revenue/:id",
        name: "Project Expenses",
        icon: "ni ni-circle-08 text-pink",
        component: Expenses,
        layout: "/app",
      },
      
      {
        path: "/revenue",
        name: "Expenses",
        icon: "ni ni-circle-08 text-pink",
        component: Expenses,
        layout: "/app",
      },
      
      {
        path: "/profile",
        name: "Profile",
        icon: "ni ni-circle-08 text-pink",
        component: Profile,
        layout: "/app",
      },

      {
        path: "/icons",
        name: "Icons",
        icon: "ni ni-planet text-blue",
        component: Icons,
        layout: "/app",
      },
      {
        path: "/workflow/:id",
        name: "Workflow-detail",
        icon: "ni ni-tv-2 text-primary",
        component: WorkflowDetail,
        layout: "/app",
      },

      {
        path: "/settings/assets/",
        name: "Assets",
        component: Assets,
        layout: "/app",
        
      },
      {
        path: "/settings/workflow",
        name: "Workflow",
        icon: "ni ni-tv-2 text-primary",
        component: Automation,
        layout: "/app",
      },
      {
        path: "/settings/tax",
        name: "Tax",
        icon: "ni ni-circle-08 text-pink",
        component: Tax,
        layout: "/app",
      },
      {
        path: "/settings/designation",
        name: "Designation",
        icon: "ni ni-tv-2 text-primary",
        component: Designation,
        layout: "/app",
      },
      {
        path: "/settings/packages",
        name: "Packages",
        icon: "ni ni-tv-2 text-primary",
        component: Packages,
        layout: "/app",
      },
      {
        path: "/settings/references",
        name: "References",
        icon: "ni ni-tv-2 text-primary",
        component: References,
        layout: "/app",
      },
      
      {
        path: "/settings/mail-templates/create",
        name: "Create Template",
        component: EditTemplate,
        layout: "/app",
      },
      {
        path: "/settings/mail-templates/update/:id",
        name: "Update Template",
        component: EditTemplate,
        layout: "/app",
      },
      {
        path: "/settings/mail-templates",
        name: "EmailTemplate",
        component: EmailTemplate,
        layout: "/app",
      },
      {
        path: "/settings/mail-setup/",
        name: "EmailSettings",
        component: EmailSettings,
        layout: "/app",
        
      },
      {
        path: "/settings/data/",
        name: "DataManager",
        component: DataManager,
        layout: "/app",
        
      },
      {
        path: "/settings/",
        name: "Settings",
        component: SettingsList,
        layout: "/app",
        
      },
      
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

export default appRoutes;