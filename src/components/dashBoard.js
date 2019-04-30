import React, {Component} from 'react';
import UserTable from './UserTable';
import Button from './Button';
import $ from "jquery";

var editRowData=null;

class dashBoard extends Component{
  constructor(){
    super();
    this.state={
      content:[],
      contentTargetTable:[]
    }
  }

  componentDidMount(){
    $.ajax({
      url:this.props.url,
      success:(data,status)=>{
        if(status == 'success' && typeof data === 'object' && Array.isArray(data)){
          this.setState({content:data})
        }
      },
      error:(err)=>{console.log(err, 'error while fetching data in componentDidMount')}
    });
  }

  onTransferClick=(event)=>{
    $.ajax({
      url:this.props.url,
      success:(data,status)=>{
        if(status == 'success' && typeof data === 'object' && Array.isArray(data)){
          data.map((array,index)=>{
            for(var item in array){
              array[item] = (array[item] == null || array[item] == "") ? 'UnKnown': array[item];
            }
            return array;
          })
          this.setState({contentTargetTable:data})
        }
      },
      error:(err)=>{console.log(err, 'error while fetching data migration')}
    });
  }

  onSaveClick=(event)=>{
    if(editRowData != null){
      let allRowIds=[]
      this.state.content.map((item,index)=>{
        allRowIds.push(item.id)
      })

      if(allRowIds.includes(editRowData.id)){
        $.ajax({ url:(editRowData) ? (this.props.url+editRowData.id) : this.props.url, type:"PUT", data:editRowData, dataType:'json',
          success:(data,status)=>{

          },
          error:(err)=>{ console.log(err, 'error while date updation') }
        });
      }
      else{
        $.ajax({ url:this.props.url, type:"POST", data:editRowData, dataType:'json',
          success:(data,status)=>{
                if(status == "success"){
                  let temp = this.state.content
                  temp.push(data);
                  this.setState({content:temp})
                }
          },
          error:(err)=>{ console.log(err, 'error while posting data') }
        });
      }
    }
  }

  render(){

    return(
      <div>
        <UserTable heading={this.props.sourceTableHeading} tableData={this.state.content} addRow={!this.props.addRow} rowSelectionProp={selectRowProp} cellUpdateProp={cellEditProp}  onAfterInsertRow={ options }/>

        <span style={buttonContainerstyle}><Button buttonName={this.props.saveButton} onSubmitClick={this.onSaveClick}/></span>

        <UserTable heading={this.props.destinationTableHeading} tableData={this.state.contentTargetTable} addRow={this.props.addRow}  rowSelectionProp={selectRowProp} cellUpdateProp={{}}/>

        <span style={buttonContainerstyle}><Button buttonName={this.props.migrateDataButton} onSubmitClick={this.onTransferClick}/></span>
      </div>
    )
  }
}

function onAfterSaveCell(row, cellName, cellValue){
  editRowData = row;
}

function onAfterInsertRow(row) {
  editRowData = row;
}

const options = {
  afterInsertRow: onAfterInsertRow
};

const selectRowProp = {
  
  clickToEdit: true,
  bgColor: 'lightblue'
};
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};
dashBoard.defaultProps={
  sourceTableHeading:'Souce Table',
  destinationTableHeading:'Target Table',
  migrateDataButton:"Migrate Data",
  saveButton:"Save",
  addRow:false,
  url:"http://localhost:3000/employees/"
}
const buttonContainerstyle={
  display:'inline',
  width:'10%',
  marginLeft:'45px'
};
export default dashBoard;
