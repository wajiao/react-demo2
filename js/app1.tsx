// 解构React
// let { Component, PropTypes } = React;
let { Component } = React;
let { render } = ReactDOM;
// 解构路由
let { Router, Route, IndexRoute } = ReactRouter;


// 首页
// 第二步 继承混合类
class Home extends Component {
	// 渲染列表

	render() {
		return (
			<div className="home">
			home
			</div>
		)
	}
}
// 详情页
class Detail extends Component {
	render() {
		return <h1>detail</h1>
	}
}
// 评论页
class Comments extends Component {
	render() {
		return <h1>comments</h1>
	}
}


// 定义组件
class App extends Component {
	// 构造函数
	constructor(props) {
		// 继承属性
		super(props);
		// 初始化属性
		// this.state = {
		// 	appColor: props.color
		// }
	}
	// 渲染组件
	render() {
		return (
			<div>
				<h1>App</h1>
				{this.props.children}
			</div>
		)
	}
}
// 定义默认属性
// App.defaultProps = {
// 	color: 'red'
// }
// // 定义属性约束
// App.propTypes = {
// 	color: PropTypes.string
// }

// 第二步 定义路由规则
let routes = (
	<Router>
		<Route path="/" component={App}>
		</Route>
	</Router>
)

// 渲染路由规则
render(routes, document.getElementById('app'))
