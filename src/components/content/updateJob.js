import React,{Component} from 'react';

export default class UpdateJob extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameJob:'',
      statusJob:'',
      dateStart: 'dd - MM - yyyy',
      dateFinish: 'dd - MM - yyyy',
      showbtn:false
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.indexjob!==''){
      let index = parseInt(nextProps.indexjob,10);
      let jobs = JSON.parse(localStorage.getItem('jobs'));
      if(jobs.length===0){
        this.setState = {
          stt:'',
          nameJob:'',
          statusJob:'',
          dateStart: 'dd - MM - yyyy',
          dateFinish: 'dd - MM - yyyy',
          showbtn:false
        }
      }else {
        this.setState({
          stt:index,
          nameJob:jobs[index].nameJob,
          statusJob:parseInt(jobs[index].statusJob,10),
          dateStart: jobs[index].dateStart,
          dateFinish: jobs[index].dateFinish,
          showbtn:true
        })
      }
    }
  }
  onOk = async () => {
    await this.props.onOk(this.state);
    this.setState({
      stt:'',
      nameJob:'',
      statusJob:'',
      dateStart: 'dd - MM - yyyy',
      dateFinish: 'dd - MM - yyyy',
      showbtn:false
    })
  }
  onCancel = () => {
    this.setState({
      stt:'',
      nameJob:'',
      statusJob:'',
      dateStart: 'dd - MM - yyyy',
      dateFinish: 'dd - MM - yyyy',
      showbtn:false
    })
  }
  onShowBtn = ()=>{
    let btn = this.state.showbtn;
    if(btn===true){
      return (<div className='text-center'>
        <button type="button" className="btn btn-warning" onClick={this.onOk}>Ok</button>&nbsp;
        <button type="button" className="btn btn-primary" onClick={this.onCancel}>Cancel</button>
      </div>)
    }
  }
  onHandleChange = async (event) =>{
    let target = event.target;
    let name = target.name;
    let value = target.value;
    await this.setState({
      [name]:value
    })
  }
  render(){
    // let styles = {
    //   backgroundColor:'green'
    // }
    return(
      <tr>
      <td></td>
      <td>
        <input
          type="text"
          className="form-control"
          name="nameJob"
          value = {this.state.nameJob}
          onChange = {this.onHandleChange}
          placeholder='Name Job'
        />
      </td>
      <td>
        <select className="form-control" name="statusJob" value = {this.state.statusJob} onChange={this.onHandleChange}>
          <option value={0}>Starting</option>
          <option value={1}>Doing</option>
          <option value={2}>Finished</option>
        </select>
      </td>
      <td className="text-center">{this.state.dateStart}</td>
      <td className="text-center">{this.state.dateFinish}</td>
      <td>{this.onShowBtn()}</td>
      </tr>
    )
  }
}
