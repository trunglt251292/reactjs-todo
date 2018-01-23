import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import FormAddJob from './components/content/formAddJob';
import TableJob from './components/content/tableJob';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDisplayFormAdd : false,
      jobs:[],
      indexjob:'',
    }
  }
  componentWillMount(){
    if(localStorage && localStorage.getItem('jobs')){
      var jobs = JSON.parse(localStorage.getItem('jobs'));
      this.setState({
        jobs:jobs
      })
    }
  }
  makeid = ()=> {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  onCloseForm = () =>{
    this.setState({
      isDisplayFormAdd:false
    })
  }
  onUpdate = (data) =>{
    this.setState({
      indexjob:data,
    })
  }
  onShowForm = ()=>{
    this.setState({
      isDisplayFormAdd:!this.state.isDisplayFormAdd
    })
  }
  onAddJob = (data) =>{
    let jobs = this.state.jobs;
    data.id = this.makeid();
    let date = new Date();
    data.dateStart = date.getDate()+' - '+(date.getMonth()+1)+ ' - ' + date.getFullYear();
    if(parseInt(data.statusJob,10)===2){
      data.dateFinish = date.getDate()+' - '+(date.getMonth()+1)+ ' - ' + date.getFullYear();
    }else {
      data.dateFinish = '';
    }
    jobs.push(data);
    this.setState({
      jobs : jobs
    })
    localStorage.setItem('jobs',JSON.stringify(jobs));
    //console.log(jobs);
  }
  onClear = ()=>{
    localStorage.removeItem('jobs');
    this.setState({
      jobs:[]
    })
    localStorage.setItem('jobs',[]);
  }
  onOk = (data) => {
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    let index = parseInt(data.stt,10);
    jobs[index].nameJob = data.nameJob;
    jobs[index].statusJob = data.statusJob;
    let date = new Date();
    if(parseInt(data.statusJob,10)===2){
      jobs[index].dateFinish = date.getDate()+' - '+(date.getMonth()+1)+ ' - ' + date.getFullYear();
    }else {
      jobs[index].dateFinish = '';
    }
    this.setState({
      jobs:jobs
    })
    localStorage.setItem('jobs',JSON.stringify(jobs));
  }
  onRemoveItem = (data)=>{
    //console.log(data);
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    jobs.splice(data,1);
    //console.log(jobs);
    this.setState({
      jobs : jobs
    })
    localStorage.setItem('jobs',JSON.stringify(jobs));
  }
  onSortStatus = async (data) =>{
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    if(data.statusJob==='-1'){
      this.setState({
        jobs:jobs
      })
    }else {
      let Sort = [];
      await jobs.map((i)=>{
        (typeof i.statusJob !== 'string') ? i.statusJob = i.statusJob.toString() : i.statusJob=i.statusJob;
        if(i.statusJob===data.statusJob){
          Sort.push(i);
          return true;
        }
        return false;
      })
      this.setState({
        jobs:Sort
      })
    }
  }
  onSortName = (data) =>{
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    let Sort = [];
    if(data.nameJob){
      Sort = jobs.filter((i)=>{
        return i.nameJob.toLowerCase().indexOf(data.nameJob.toLowerCase())!== -1;
      })
      this.setState({
        jobs:Sort
      })
    }else {
      this.setState({
        jobs:jobs
      })
    }
  }
  render() {
    let jobs = this.state.jobs;
    let isDisplayFormAdd = this.state.isDisplayFormAdd;
    let elements = isDisplayFormAdd ? <FormAddJob onCloseForm={this.onCloseForm} onAddJob={this.onAddJob}/> : "";
    return (
      <div>
        <Header onShowForm={this.onShowForm} onClear = {this.onClear} onSortStatus = {this.onSortStatus} onSortName={this.onSortName}/>
        <div className="text-center">
          <h1>Job Of You </h1>
          <p>Hello Trung! Welcome you come back!! ahihi stupid</p>
          <hr />
        </div>
        <div id='content'>
        <div className="row">
          <div className={isDisplayFormAdd ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            { elements }
          </div>
          <div className={isDisplayFormAdd ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <TableJob
              onRemoveItem = {this.onRemoveItem}
              jobs = {jobs}
              onOk = {this.onOk}
              onUpdate = {this.onUpdate}
              indexjob = {this.state.indexjob}
            />
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
