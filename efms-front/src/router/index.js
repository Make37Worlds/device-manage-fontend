import Vue from "vue";
import store from "../store"
import Router from "vue-router";
import Index from "../views/index";
import Login from "../views/login";
import UpdatePassword from "../views/updatePassword";
import NoAuthority from "../views/wrong/NoAuthority"
import VueRouter from "vue-router";
Vue.use(Router);

export const menuRoute = [{
        path: "/home",
        name: "home",
        meta: {
            title: "首页",
            needLogin: true,
        },
        component: () =>
            import ("../views/index/Home/Home")
    },
    {
        path: "/declare",
        name: "declare",
        meta: {
            title: "维修申报"
        },
        component: () =>
            import ("../views/index/Declare/Declare")
    },
    {
        path: "/dispatch",
        name: "dispatch",
        meta: {
            title: "人员派遣"
        },
        component: () =>
            import ("../views/index/Dispatch/Dispatch")
    },
    {
        path: "/adddeclaration",
        name: "adddec",
        meta: {
            title: "追加申报查看"
        },
        component: () =>
            import ("../views/index/AddDeclaration/AddDeclaration")
    },
    {
        path: "/approve",
        name: "approve",
        meta: {
            title: "追加申报审批"
        },
        component: () =>
            import ("../views/index/Approve/Approve")
    },
    {
        path: "/resultreport",
        name: "report",
        meta: {
            title: "成果上报查看"
        },
        component: () =>
            import ("../views/index/ResultReport/ResultReport")
    },
    {
        path: "/resultreview",
        name: "review",
        meta: {
            title: "成果上报审核"
        },
        component: () =>
            import ("../views/index/ResultReview/ResultReview")
    },
    {
        path: "/empmanage",
        name: "emp",
        meta: {
            title: "人员管理"
        },
        component: () =>
            import ("../views/index/EmpManage/EmpManage")
    },
    {
        path: "/eqmmanage",
        name: "eqm",
        meta: {
            title: "设施管理"
        },
        component: () =>
            import ("../views/index/EqmManage/EqmManage")
    },
    {
        path: "/rolemanage",
        name: "role",
        meta: {
            title: "角色管理"
        },
        component: () =>
            import ("../views/index/RoleManage/RoleManage")
    },

];
const routes = [{
        path: "/",
        name: "index",
        component: Index,
        meta: {
            needLogin: true // 添加该字段，表示进入这个路由是需要登录的
        },
        children: []
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        meta: {
            needLogin: true // 添加该字段，表示进入这个路由是需要登录的
        },
        path: "/updatePassword",
        name: "updatePassword",
        component: UpdatePassword
    },
    {
        path: "/noAuthority",
        name: "noAuthority",
        component: NoAuthority,
    }
];
const router = new VueRouter({
    routes
});

// 解决报错
const originalPush = VueRouter.prototype.push
    // push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
var paths = menuRoute.map(item => item.path);

//全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.path == from.path && to.path != '/') { //不需要跳转
        return;
    }
    if (store.state.token) { //已登录
        if (store.state.isBuild == false && store.state.path.length != 0) { //刷新后动态路由丢失
            store.commit('buildDynamicRoute', store.state.path);
            router.replace({...to });
        } else {
            if (paths.indexOf(to.path) !== -1 && store.state.path.indexOf(to.path) === -1) { //进入无权限路由
                next({
                    name: 'noAuthority',
                    params: { "path": from.path },
                    replace: true,
                });
            } else {
                if (to.path == '/') { //重定向至首页
                    next({ name: 'home' });
                } else {
                    next();
                }
            }
        }
    } else { //未登录
        if (paths.indexOf(to.path) !== -1 || to.matched.some(route => route.meta.needLogin)) { //需要登录
            next({ name: 'login' });
        } else {
            next();
        }
    }

})
export default router;