import React,{Component} from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusJob:-1,
      nameJob:''
    }
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleOnchange = this.onHandleOnchange.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
  }
  onHandleClick(){
    this.props.onShowForm();
  }
  onHandleSubmit(e){
    e.preventDefault();
    console.log(this.state);
  }
  onHandleOnchange(e){
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] : value
    })
  }
  onClear = () =>{
    this.props.onClear();
  }
  onHandleChange = async (e) =>{
    let target = e.target;
    let name = target.name;
    let value = target.value;
    await this.setState({
      [name]:value
    })
    this.props.onSortStatus(this.state);
  }
  onHandleChangeNameJob = async (e) =>{
    let target = e.target;
    let name = target.name;
    let value = target.value;
    await this.setState({
      [name]:value
    })
    this.props.onSortName(this.state);
  }
  render(){
    let styles = {
      marginTop:'7px'
    }
    return(
      <div className="header">
      <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="nav navbar-nav">
            <li className="active"><a href="">Home</a></li>
            <li><a onClick={this.onHandleClick}>Add Job</a></li>
            <li><a onClick={this.onClear}>Clear All Job</a></li>
            <li className="dropdown">
              <a href="" className="dropdown-toggle" data-toggle="dropdown">Sort Job <b className="caret"></b></a>
              <ul className="dropdown-menu">
                <li className="text-center"><a href="">Name Job A->Z</a></li>
                <li className="text-center"><a href="">Name Job Z->A</a></li>
              </ul>
            </li>
            <li>
            <select className="form-control" style={styles} name="statusJob" value={this.state.statusJob} onChange={this.onHandleChange}>
              <option value={-1}>Sort by Status</option>
              <option value={0}>Starting</option>
              <option value={1}>Doing</option>
              <option value={2}>Finished</option>
            </select>
            </li>
          </ul>
          <form className="navbar-form navbar-left" onSubmit = { this.onHandleSubmit }>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name='nameJob'
                value={this.state.nameJob}
                onChange = {this.onHandleChangeNameJob}
                placeholder="Search Job"
              />
            </div>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="">Contact</a></li>

          </ul>
        </div>
      </div>
    </nav>
      </div>
    )
  }
}
