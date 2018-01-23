import React,{Component} from 'react';

export default class AddFormJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameJob : '',
      statusJob : 0
    }
  }
  onCloseForm = ()=>{
    this.props.onCloseForm();
  }
  onHandleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] :  value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.onAddJob(this.state);
  }
  render(){
    return(
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Add Job New!</h3>
            </div>
            <form onSubmit={this.onSubmit}>
            <div className="panel-body">
              <div className="form-group">
                <label>Name Job :</label>
                <input type="text" name="nameJob" value={this.state.nameJob} onChange={this.onHandleChange} className="form-control" id="" placeholder="" />
              </div>
              <label>Status :</label>
              <select className="form-control" name="statusJob" value={this.state.statusJob} onChange={this.onHandleChange}>
                <option value={0}>Starting</option>
                <option value={1}>Doing</option>
                <option value={2}>Finished</option>
              </select>
            </div>
            <div className="panel-footer">
              <div className="text-center">
                <button type="submit" className="btn btn-success">Save</button>&nbsp;
                <button type="button" className="btn btn-primary" onClick={this.onCloseForm}>Cancel</button>
              </div>
            </div>
            </form>
          </div>
    )
  }
}
