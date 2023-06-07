import axios from 'axios'

// const API = axios.create({baseURL : "http://localhost:5000"})
const API = axios.create({baseURL: "http://64.227.146.174:5000" })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        
    }
    return req
})




export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts',newPost)
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

//Auth
export const signin = (formData) => API.post('/user/signin',formData);
export const signup = (formData) => API.post('/user/signup',formData);
export const forgotPass = (formData) => API.post('/user/forgot-password',formData);
export const resetPass = (formData,resetToken) => API.post(`/user/reset-password/${resetToken}`,formData);


//Projects
export const fetchProjects = (page) => API.get(`/projects?page=${page}`);
export const fetchUpcomingEvents = () => API.get(`/projects/upcoming`);
export const createProject = (newProject) => API.post('/projects',newProject);
export const updateProject = (id,updatedProject) => API.patch(`/projects/${id}`,updatedProject);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const fetchSingleProject = (id) => API.get(`/projects/detail/${id}`);
export const pushPipeline = (id) => API.get(`/projects/pushPipeline/${id}`);

//Workforce
export const fetchWorkforce = (page) => API.get(`/workforce?page=${page}`);
export const fetchAllWorkforces = () => API.get("/workforce/all");
export const createWorkforce = (newEmployee) => API.post('/workforce',newEmployee);
export const updateWorkforce = (id,updatedEmployee) => API.patch(`/workforce/${id}`,updatedEmployee);
export const deleteWorkforce = (id) => API.delete(`/workforce/${id}`);


//Tasks
export const fetchTasks = (id) => API.get(`/wf/tasks/${id}`)
export const createTask = (newTask) => API.post('/wf/tasks/create',newTask);
export const updateTask = (id,updatedTask) => API.patch(`/wf/tasks/update/${id}`,updatedTask);
export const deleteTask = (id) => API.delete(`/wf/tasks/delete/${id}`);
export const fetchTasksByWf = (wfid) => API.get(`/wf/tasks/user/${wfid}`);
export const handleProgress = (id) => API.get(`wf/tasks/progress/${id}`);


//Desgination
export const fetchDesignation = (page) => API.get(`/wf/designation?page=${page}`)
export const fetchDesignationDD = () => API.get("/wf/designation/all")
export const createDesignation = (newDesignation) => API.post('/wf/designation/create',newDesignation);
export const updateDesignation = (id,updatedDesignation) => API.patch(`/wf/designation/update/${id}`,updatedDesignation);
export const deleteDesignation = (id) => API.delete(`/wf/designation/delete/${id}`);


//Email Template
export const fetchTemplate = (page) => API.get(`/settings/mail/template?page=${page}`)
export const fetchTemplateDD = () => API.get("/settings/mail/template/all")
export const fetchSingleTemplate = (id) => API.get(`/settings/mail/template/single/${id}`)
export const createTemplate = (newTemplate) => API.post('/settings/mail/template/create',newTemplate);
export const updateTemplate = (id,updatedTemplate) => API.patch(`/settings/mail/template/update/${id}`,updatedTemplate);
export const deleteTemplate = (id) => API.delete(`/settings/mail/template/delete/${id}`);

//Email Settings
export const fetchMailSettings = () => API.get(`/settings/mail`)
export const updateMailSettings = (data) => API.patch(`/settings/mail/`,data)


//Packages
export const fetchPackages = (page) => API.get(`/project/package?page=${page}`);
export const fetchAllPackages = () => API.get("/project/package/all");
export const createPackage = (newPackage) => API.post('/project/package/create',newPackage);
export const updatePackage = (id,updatedPackage) => API.patch(`/project/package/update/${id}`,updatedPackage);
export const deletePackage = (id) => API.delete(`/project/package/delete/${id}`);

//References
export const fetchReferences = (page) => API.get(`/project/reference?page=${page}`)
export const fetchAllReferences = () => API.get("/project/reference/all");
export const createReference = (newRef) => API.post('/project/reference/create',newRef);
export const updateReference = (id,updatedRef) => API.patch(`/project/reference/update/${id}`,updatedRef);
export const deleteReference = (id) => API.delete(`/project/reference/delete/${id}`);


//Workflow
export const fetchWorkflow = (page) => API.get(`/workflow?page=${page}`);
export const createWorkflow = (newWorkflow) => API.post('/workflow',newWorkflow);
export const updateWorkflow = (id,updatedWorkflow) => API.patch(`/workflow/${id}`,updatedWorkflow);
export const deleteWorkflow = (id) => API.delete(`/workflow/${id}`);
export const fetchSingleWorkflow = (id) => API.get(`/workflow/detail/${id}`);


//Expenses
export const fetchExpenses = (page) => API.get(`/revenue/expenses/general/?page=${page}`)
export const createExpense = (newExpense) => API.post('/revenue/expenses/create',newExpense);
export const updateExpense = (id,updatedExpense) => API.patch(`/revenue/expenses/${id}`,updatedExpense);
export const deleteExpense = (id) => API.delete(`/revenue/expenses/${id}`);
export const fetchExpenseByProject = (id,page) => API.get(`/revenue/expenses/project/${id}?page=${page}`)


//Tax
export const fetchTax = (page) => API.get(`/revenue/tax?page=${page}`)
export const createTax = (newTax) => API.post('/revenue/tax/create',newTax);
export const updateTax = (id,updatedTax) => API.patch(`/revenue/tax/update/${id}`,updatedTax);
export const deleteTax = (id) => API.delete(`/revenue/tax/delete/${id}`);


//Dashboard
export const fetchAnalytics = () => API.get("/dashboard/analytics")
export const dashboardData = () => API.get("/dashboard")


//Profile
export const fetchProfileData = () => API.get("/dashboard/profile")
export const updateProfile = (data) => API.post("/dashboard/profile/update",data)


//subscription
export const subscribe = () => API.post("/subscription/subscribe")
export const verifySub = (rpData) => API.post("/subscription/verify",rpData)
export const fetchSub = () => API.get("/subscription/get")

//Assets
export const fetchAssets = (page) => API.get(`/assets?page=${page}`);
export const createAsset = (newAsset) => API.post('/assets/create',newAsset);
export const updateAsset = (id,updatedAsset) => API.patch(`/assets/update/${id}`,updatedAsset);
export const deleteAsset = (id) => API.delete(`/assets/delete/${id}`);

//WorkflowEvents
export const fetchWorkflowEvents = () => API.get('/events/')

//Data
export const downloadProjects = (data) => API.post('/download/projects',data)
export const downloadTasks = (data) => API.post('/download/tasks',data)
export const downloadExpenses = (data) => API.post('/download/expenses',data)
export const downloadTasksByProject = (id) => API.get(`/download/task/${id}`)
export const downloadExpensesByProject = (id) => API.get(`/download/expense/${id}`)


