let { Component }  = React;
let { render } = ReactDOM;
let { Router,Route,IndexRoute} = ReactRouter;
class Util extends Component{
  ajax(url,fn){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          fn(JSON.parse(xhr.responseText))
        }
      }
    }
    xhr.open('GET', url, true);
    // 发送数据
    xhr.send(null)
  }
   objToQuery(obj){
     let query = "";
     for(let key in obj){
       query += "&"+key +"="+obj[key]
     }
     return query.replace("&","?")
   }

}
class App extends Component{
  constructor(props){
    super(props)
  }
  render(){
    //props.children is Symbol(react.element
    return (
      <div>
        <div>header</div>
        {this.props.children}
      </div>
      )
  }
}
class Comment extends Util{
  constructor(props){
    super(props)
    this.state = {
      list:[],
      id:""
    }
  }
  createList(){
    return this.state.list.map((obj,index)=>{
      return (
        <li key={index}>
  				<h3>{obj.user}</h3>
  				<p>{obj.content}</p>
  				<span>{obj.time}</span>
  			</li>
        )
      })
  }
  submitComment(){
    let value = this.refs.commentContent.value;
    //不容许提交空格，
    if(/^\s*$/.test(value)){
      alert("请输入内容")
      return
    }
    //获取时间
    let date  = new Date();
    let time = date.getHours() + ":" + date.getMinutes() + ":"+date.getSeconds();
    let data = {
      user:"AJ",
      content:value,
      time:time
    }
    let query = this.objToQuery(data);
    this.ajax("data/addComment.json"+query,(res)=>{
        let list = this.state.list;
        if(res && res.errno == 0){
        list.unshift(data);
        this.setState({  list:list  })
        }
      })
    this.refs.commentContent.value = "";

  }
  render(){
    console.log(this)
    let data = this.state.data
    return (
      <div className="commnets">
				<div className="box">
					<textarea ref= "commentContent" placeholder="文明上网，理性发言"></textarea>
				</div>
				<div className="submit-btn">
					<span onClick = {this.submitComment.bind(this)}>提交</span>
				</div>
				<ul>{this.createList()}</ul>
			</div>
      )
  }
  componentDidMount(){
    this.ajax("data/comment.json",(res)=>{
      if(res && res.errno == 0){
        this.setState({list:res.data.list,id:res.data.id})
      }
      })
  }
}

class Detail extends Util{
  constructor(props){
    super(props)
    this.state = {
      data:{}
    }
  }
  render(){
    let data = this.state.data;
    let content = {
      __html:data.content
    }
    return (
      <div className="detail">
        <h1>{data.title}</h1>
        <p><span className="time">{data.time}</span><span className="state">{'评论:' + data.comment}</span></p>
        <img src={data.img} alt="" />
        <p className="content" dangerouslySetInnerHTML={content}></p>
        <div className="btn">查看更多评论</div>
      </div>
      )
  }
  componentDidMount(){
    this.ajax("data/detail.json",(res)=>{
      if(res && res.errno == 0){
        this.setState({data:res.data})
      }
      })
  }
}
class Home extends Util{
  constructor(props){
    super(props)
    this.state = {
      list:[]
    }
  }
  createList(){
    return this.state.list.map((obj,index)=>{
      return (
        <li key={index}>
					<img src={obj.img} alt="" />
					<div className="content">
						<h3>{obj.title}</h3>
						<p><span>{obj.content}</span><span className="home-comment">{'评论：' + obj.comment}</span></p>
					</div>
				</li>
        )
      })
  }
  render(){
    console.log(this)
    return (
      <div className = "home">
      {this.createList()}
      </div>
      )
  }
  componentDidMount(){
    this.ajax("data/list.json",(res)=>{
      if(res && res.errno === 0){
        this.setState({
          list:res.data
          })
      }
      })
  }
}
let routes = (
  <Router>
    <Route path = "/" component = {App}>
      <IndexRoute component = {Home}></IndexRoute>
      <Route path = "comment/:id" component = {Comment}></Route>
      <Route path = "detail/:id" component = {Detail}></Route>
    </Route>
  </Router>
  )
/*render(<App/>,app)*/

//路由组件，页面组件，渲染组件，功能组件。复用性。
render(routes,app2)
