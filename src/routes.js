
import Dashboard from "layouts/dashboard";

import Notifications from "layouts/notifications";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import AddUser from "layouts/user-profile";
import UserManagement from "layouts/user-management";
import UserProfile from "layouts/user-management/user-profile";
import UpdateUserProfile from "layouts/user-management/update-profile";
import StoreManagement from "layouts/store-management";
import UpdateStore from "layouts/store-management/update-store"
import ProjectManagement from "layouts/project-management";
import TaskManagement from "layouts/task-management";
import TaskSubmission from "layouts/task-submission/add-task-submission";
import ViewSubmission from "layouts/task-submission/view-submission";
import SubmittedTasks from "layouts/submitted-tasks";
import ViewTaskSubmissionPopup from "layouts/views-task";

import StoreProfile from "layouts/store-management/store-profile";
import AddStore from "layouts/store-management/add-store";
import AddProject from "layouts/project-management/add-project";
import UpdateProject from "layouts/project-management/update-project";
import ProjectProfile from "layouts/project-management/project-profile";
import AddTask from "layouts/task-management/add-task";
import UpdateTask from "layouts/task-management/update-task"
import TaskProfile from "layouts/task-management/task-profile";
import Permissions from "layouts/permissions/add-permission";
import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";
import DashboardTasks from "layouts/dashboard/components/Tasks/dashboardTasks";

// @mui icons
import Icon from "@mui/material/Icon";



const routes = [
  {
    type: "examples",
    name: "主界面",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "examples",
    name: "儀表板",
    key: "dashboard_tasks",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/dashboard/tasks",
    component: <DashboardTasks />,
  },
  
  {
    type: "example",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "example",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    
    name: "Add User",
    key: "add_user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user-profile",
    component: <AddUser />,
   
  },
  {
   
    name: "User Profile",
    key: "change_user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user-management/user-profile",
    component: <UserProfile />,
   
  },
  {
    type: "examples",
    name: "任务管理 ",
    key: "view_task",
    icon: <Icon fontSize="small">task</Icon>,
    route: "/task-management",
    component: <TaskManagement/>,
   
  },
  {
   
    name: "Submitted Tasks",
    key: "view_tasksubmission",
    icon: <Icon fontSize="small">task</Icon>,
    route: "/submitted-tasks",
    component: <SubmittedTasks />,
  },
  {
  
    name: "Task Submission",
    key: "add_tasksubmission",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/task-submission/add-task-submission/:task_id",
    component: <TaskSubmission />,
  },

  {
   
    name: "View Submission",
    key: "view_submission",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/task-submission/view-submission/:task_id",
    component: <ViewSubmission />,
  }
  ,
  {
    type: "examples",
    name: "用户管理",
    key: "view_user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user-management",
    component: <UserManagement />,
  },
  
  {
    type: "examples",
    name: "店铺管理",
    key: "view_store",
    icon: <Icon fontSize="small">store</Icon>,
    route: "/store-management",
    component: <StoreManagement/>,
  },
  {
    type: "examples",
    name: "项目管理",
    key: "view_project",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/project-management",
    component: <ProjectManagement />,
  },
  
  {
    type: "examples",
    name: "权限管理",
    key: "assign_permission",
    icon: <Icon fontSize="small">assignment_ind</Icon>,
    route: "/permissions",
    component: <Permissions/>,
  },
  
  {
    type: "project-profile",
    name: "Project Management",
    key: "view_project",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/project-management/project-profile/:project_id",
    component: <ProjectProfile />,
  },

  {
    type: "example",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "auth",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
  {
    type: "auth",
    name: "Register",
    key: "register",
    icon: <Icon fontSize="small">reigster</Icon>,
    route: "/auth/register",
    component: <Register />,
  },
  {
    type: "auth",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "auth",
    name: "Reset Password",
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/reset-password",
    component: <ResetPassword />,
  },
  {
   
    name: "store-profile",
    key: "store-profile",
    icon: <Icon fontSize="small">Store Profile</Icon>,
    route: "/store-management/store-profile/:store_id",
    component: <StoreProfile />,
  },
  {
   
    name: "add-store",
    key: "add-store",
    icon: <Icon fontSize="small">Add Store</Icon>,
    route: "/store-management/add-store",
    component: <AddStore />,
  },
  {
   
    name: "update-store",
    key: "add-store",
    icon: <Icon fontSize="small">Update Store</Icon>,
    route: "/store-management/update-store/:store_id",
    component: <UpdateStore />,
  },
  {
   
    name: "view_tasksubmission",
    key: "view_task",
    route: "/task-mangement/view-submission",
    component: <ViewTaskSubmissionPopup/>,
  },
  {
   
    name: "task_profile",
    key: "task_profile",
    route: "/task-mangement/task_profile/:task_id",
    component: <TaskProfile/>,
  },
 
  {
   
    name: "add-project",
    key: "add_project",
    icon: <Icon fontSize="small">Add Store</Icon>,
    route: "/project-management/add-project",
    component: <AddProject />,
  },
  {
   
    name: "update-project",
    key: "update_project",
    route: "/project-management/update-project/:project_id",
    component: <UpdateProject />,
  },

  {
   
    name: "add-task",
    key: "add_task",
    icon: <Icon fontSize="small">Add Task</Icon>,
    route: "/task-management/add-task",
    component: <AddTask />,
  },
  {
   
    name: "update-task",
    key: "update_task",
    icon: <Icon fontSize="small">Update Task</Icon>,
    route: "/task-management/update-task/:task_id",
    component: <UpdateTask />,
  },
  {
    
    name: "Update User Profile",
    key: "update_profile",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/user-management/update-profile/:user_id",
    component: <UpdateUserProfile />,
  },
];

export default routes;
