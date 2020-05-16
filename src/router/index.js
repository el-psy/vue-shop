import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/users.vue'
import Rights from '../components/power/rights.vue'
import Roles from '../components/power/roles.vue'
import Cate from '../components/goods/cate.vue'
import Params from '../components/goods/params.vue'
import GoodsList from '../components/goods/list.vue'
import Add from '../components/goods/add.vue'
import Order from '../components/order/order.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/login', component: Login },
	{ path: '/', redirect: '/login' },
	{
		path: '/home',
		component: Home,
		redirect: '/welcome',
		children: [
			{ path: '/welcome', component: Welcome },
			{ path: '/users', component: Users },
			{ path: '/rights', component: Rights },
			{ path: '/roles', component: Roles },
			{ path: '/categories', component: Cate },
			{ path: '/params', component: Params },
			{ path: '/goods', component: GoodsList },
			{ path: '/goods/add', component: Add },
			{path:'/orders', component:Order}
		]
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	if (to.path === '/login') return next();
	const tokenStr = window.sessionStorage.getItem('token');
	if (!tokenStr) return next('/login');
	next();
})

export default router
