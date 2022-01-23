import Index from '../pages/index/index';
import Detail from '../pages/detail';
import NotFound from '../pages/notFound'
import UseState from '../pages/useState/index';
import UseContext from '../pages/useContext/index';
import UseReducer from '../pages/useReducer';
import UseCallback from '../pages/useCallback';
import UseMemo from '../pages/useMemo';
import UseCallback2 from '../pages/useCallback2';
import UseRef from '../pages/useRef';
import UseLayoutEffect from '../pages/useLayoutEffect';
import ZidingyiHook from '../pages/zidingyiHook';
import ZoomImgTest from '../pages/zoomImgTest';
import AntdesignTest from '../pages/antdesignTest';
import Optimize_meno from '../pages/optimize_meno';
import VideoTest from '../pages/videoTest';
import {
	Switch,
	Route,
	withRouter,
	HashRouter,
	Redirect
} from 'react-router-dom';

	const routesConfig = [
		//组件优化start
		{
			path: '/optimize_meno',
			component: Optimize_meno,
			exact: true,
		},
		//组件优化end
		{
			path: '/',
			component: Index,
			exact: true,
		},
		{
			path: '/detail',
			component: Detail,
		},
		{
			path: '/useState',
			component: UseState,
		},
		{
			path: '/useContext',
			component: UseContext,
		},
		{
			path: '/useReducer',
			component: UseReducer,
		},
		{
			path: '/useCallback',
			component: UseCallback,
		},
		{
			path: '/useMemo',
			component: UseMemo,
		},
		{
			path: '/useCallback2',
			component: UseCallback2,
		},
		{
			path: '/useRef',
			component: UseRef,
		},
		{
			path: '/useLayoutEffect',
			component: UseLayoutEffect,
		},
		{
			path: '/zidingyiHook',
			component: ZidingyiHook,
		},
		{
			path: '/ZoomImgTest',
			component: ZoomImgTest,
		},
		{
			path: '/antdesignTest',
			component: AntdesignTest,
		},
		{
			path: '/videoTest',
			component: VideoTest,
		},
	]
/*
静态路由：
const Routes = withRouter(({ location, history }) => {
return (
	<HashRouter>
		<Switch>
			<Route exact path="/" component={Index}></Route>
			<Route path="/detail" component={Detail}></Route>
		</Switch>
	</HashRouter>
)
});
*/

const Routes = withRouter(() => {
		//2.根据条件生成相应的组件
		const RouteWithSubRoutes = (route:any) => {
			// console.log("2.根据条件生成相应的组件", route)
			// if (!route.path) return <Route component={NotFound} />
			return (
				<Route
				exact strict
				path={route.path}
				render={props => (
					route.redirect ?
						<Redirect push to={route.redirect} from={route.path}></Redirect> :
						<route.component {...props} routes={route.routes} />
				)}
			/>)
		}


	// console.log("1.动态生成路由", location, history)
	return (
		<HashRouter>
			<Switch>
				{routesConfig.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
				<Route component={NotFound} />
			</Switch>
		</HashRouter>
	)
});

export default Routes;