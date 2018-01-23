import React,{Component} from 'react';

export default class TableItem extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     nameJob: '',
  //     statusJob: '',
  //   }
  // }
  // componentWillMount(
  //   this.setState({
  //     nameJob:this.props.nameJob,
  //     statusJob:this.props.statusJob
  //   });
  // )
  onUpdate = () =>{
    //console.log(this.props.stt);
    this.props.onUpdate(this.props.stt);
  }
  onRemoveItem = () =>{
    this.props.onRemoveItem(this.props.stt);
  }
  showStatus=()=>{
    let v = this.props.statusJob;
    let status = parseInt(v,10);
    if(status === 0){
      return <span className="label label-warning">Starting</span>
    }else if(status === 1){
      return <span className="label label-primary">Doing</span>
    }else{
      return <span className="label label-success">Finished</span>;
    }
  }
  render(){
    // let elements =
    //   if(status == 1){
    //     return <span className="label label-warning">Starting</span>;
    //   }
    //   if (status == 2) {
    //     return <span className="label label-primary">Doing</span>;
    //   }
    //   if (status == 3) {
    //     return <span className="label label-success">Finished</span>;
    //   }

    return(
      <tr>
        <td>{this.props.stt + 1}</td>
        <td>{this.props.nameJob}</td>
        <td className="text-center">
        {this.showStatus()}
        </td>
        <td className="text-center">
        {this.props.dateStart}
        </td>
        <td className="text-center">
        {this.props.dateFinish}
        </td>
        <td>
          <div className="text-center">
          <button type="button" className="btn btn-warning" onClick= {this.onUpdate}>Edit</button>&nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onRemoveItem}>Delete</button>
          </div>
        </td>
      </tr>
    )
  }
}
