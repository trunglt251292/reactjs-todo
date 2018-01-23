import React,{Component} from 'react';
import TableItem from './tableItem';
import UpdateJob from './updateJob';
export default class TableJob extends Component {
  constructor(props){
    super(props);
    this.state={
      indexjob:''
    }
  }
  async componentWillReceiveProps(nextProps){
    //console.log(nextProps);
    await this.setState({
      indexjob:nextProps.indexjob
    })
    //console.log(this.state.indexjob);
  }
  onOk = (data) =>{
    this.props.onOk(data);
  }
  onUpdate=(data)=>{
    //console.log(data);
    this.props.onUpdate(data);
  }
  onRemoveItem=(data)=>{
    //console.log(data);
    this.props.onRemoveItem(data);
  }
  render(){
    let jobs = this.props.jobs;
    //console.log(jobs);
    let elements = jobs.map((i,index)=>{
      //console.log(i.id);
      return <TableItem id={i.id} stt={index} key={index} nameJob = {i.nameJob} dateStart={i.dateStart} dateFinish={i.dateFinish} statusJob = {i.statusJob}
                onUpdate = {this.onUpdate} onRemoveItem={this.onRemoveItem}/>
    })
    return(
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Name Job</th>
              <th className="text-center">Status Job</th>
              <th className="text-center">Date Start</th>
              <th className="text-center">Date Finish</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <UpdateJob indexjob= {this.state.indexjob} onOk = {this.onOk}/>
            { elements }
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}
