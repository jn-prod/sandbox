// import { get } from 'lodash'
import LoginService from "@/services/login.service";
import AuthService from "@/services/utils/auth";
import UserService from '@/services/user.service'
import ActivityService from '@/services/activity.service'

const authService = new AuthService();
const loginService = new LoginService(authService);
const userService = new UserService();
const activityService = new ActivityService();

const routes = [
  {
    name: "index",
    path: "/",
    component: () => import("@/views/pages/Index.vue"),
    meta: {},
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login/Login/Login.vue"),
    props: (route) => {
      const { query, params } = route;
      return { code: query.code, error: params.error, loginService, authService };
    },
  },
  {
    name: "logout",
    path: "/logout",
    component: () => import("@/views/Login/Logout/Logout.vue"),
    props: { authService },
  },
  {
    name: "user",
    path: "/user/:userId",
    component: () => import("@/views/RouterChildView.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "dashboard",
        path: "dashboard",
        component: () => import("@/views/User/Dashboard/Dashboard.vue"),
        meta: { requiresAuth: true },
        props: (route) => {
          return { user: authService.getUser() || {} }
        }
      },
      {
        name: "profil",
        path: "profil",
        component: () => import("@/views/User/Profil/MainProfil/MainProfil.vue"),
        props: (route) => {
          const { params } = route;
          return { userId: params.userId, userService };
        },
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    name: "activities",
    path: "/user/activities",
    component: () => import("@/views/RouterChildView.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "editActivity",
        path: "edit",
        component: () => import("@/views/Activity/Edit/EditProfil.vue"),
        props: (route) => {
          const { params } = route;
          return { userId: params.userId, activityService };
        },
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    name: "mentionsLegales",
    path: "/mentions-legales",
    component: () => import("@/views/pages/MentionsLegales.vue"),
    meta: {},
  },
];

export default routes;
