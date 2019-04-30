import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class UserTable extends Component{
  constructor(){
    super();
  }

  render(){

    return(
      <div style={{margin:45}}>
       <b>{this.props.heading}</b>

        <BootstrapTable data={this.props.tableData} height={this.props.tableData.length>0 ? '280' : '85'} striped hover selectRow={this.props.rowSelectionProp} cellEdit={this.props.cellUpdateProp} insertRow={this.props.addRow} scrollTop={'Top'} options={this.props.onAfterInsertRow}>

          <TableHeaderColumn isKey dataField='id' {...columnHeaderStyle} width="50" tdStyle={{backgroundColor: 'green'}}>{this.props.headerID}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataFirstField} {...columnHeaderStyle}>{this.props.headerFirstName}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataSecondField} {...columnHeaderStyle}>{this.props.headerSecondName}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataDobField} {...columnHeaderStyle}>{this.props.headerDob}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataJoinDateField} {...columnHeaderStyle}>{this.props.headerJoinDate}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataQualField} {...columnHeaderStyle}>{this.props.headerQual}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataRoleField} {...columnHeaderStyle}>{this.props.headerRole}</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

const columnHeaderStyle={
  dataAlign:'center',
  headerAlign:'center',
  width:"20%"
}
UserTable.defaultProps={
  headerID:"ID",
  headerFirstName:"First Name",
  headerSecondName:"Last Name",
  headerDob:"Date of birth",
  headerJoinDate:"Joining Date",
  headerQual:"Qualification",
  headerRole:"Role",

  dataFirstField:'first_name',
  dataSecondField:'last_name',
  dataDobField:'dateOfBirth',
  dataJoinDateField:'joinDate',
  dataQualField:'qualification',
  dataRoleField:'role'
}

export default UserTable;
