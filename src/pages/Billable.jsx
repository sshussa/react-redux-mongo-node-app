import React, { Component } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from 'react-loading';
import axios from 'axios';
import './Timesheet.css';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;


//const billables = [];
const empName = [];
empName[0]=localStorage.getItem('jwtUser');
const userName=localStorage.getItem('jwtUser');

function onInsertRow(row) {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  
    row.userDetail=localStorage.getItem('jwtUser');
    axios.post('/billable/billables', {row})
    .then(res => res.json(),console.log('I was triggered during componentDidMount'))
	.catch(function (error) {
          this.props.history.push("/login");
	});
    }

function onDeleteRow(rowKeys) {
	alert('You deleted: ' + rowKeys);
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/billable/billableDelete', rowKeys)
    .then(res => res.json(),console.log('I was triggered during componentDidMount'))
	.catch(function (error) {
          this.props.history.push("/login");
	});
    }


function onAfterSaveCell(row, cellName, cellValue) {
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/billable/billableUpdate', {row})
    .then(res => res.json(),console.log('I was triggered during componentDidMount'))
	.catch(function (error) {
          this.props.history.push("/login");
	});
    }

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};
const createCustomToolBar = props => {
    return (
      <div style={ { margin: '15px' } }>
        { props.components.btnGroup }
        <div className='col-xs-8 col-sm-4 col-md-4 col-lg-2'>
          { props.components.searchPanel }
        </div>
      </div>
    );
  }
  function priceFormatter(cell, row) {
  return `<FontAwesomeIcon icon="dollar-sign" />$ ${cell}`;
}

class Billable extends React.Component {
   state = {billables: []}

   componentDidMount() {
     axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
     console.log(localStorage.getItem('jwtUser'));
    axios.get('/billable/billables')
      .then(res => {
        this.setState({ billables: res.data });
        console.log(this.state.billables);
      })
      .catch((error) => {
          this.props.history.push("/login");
      });
   }

   createCustomModalHeader(onClose, onSave) {
    const headerStyle = {
      fontWeight: 'bold',
      fontSize: 'large',
      textAlign: 'center',
      backgroundColor: '#eeeeee'
    };
    return (
      <div className='modal-header' style={ headerStyle }>
        <h3>Add Billable Details</h3>
        <button className='btn btn-info' onClick={ onClose }>Close it!</button>
      </div>
    );
  }
   
  render() {
   const selectRowProp = {
      mode: 'checkbox',
      showOnlySelected: true,
      clickToSelect: true,
      unselectable: [ 1, 3 ] ,
      bgColor: function(row, isSelect) {
        if (isSelect) {
          const { empId } = row;
          if (empId < 2) return 'blue';
          else if (empId < 4) return 'red';
          else return 'yellow';
        }
        return null;
      }
    };
    const options = {
      toolBar: this.createCustomToolBar,
      afterInsertRow: onInsertRow,
      afterDeleteRow: onDeleteRow,
      insertModalHeader: this.createCustomModalHeader,
      clearSearch: true
    };
    return (
     <div>
        <div id="navigation">
        <Navbar />
        </div>
        <div className="conFluid1 container-fluid">
        <div className="mrgn-dwn">Billable Page <span className="titleSty">Hello, {empName} </span></div>
      <BootstrapTable data={ this.state.billables } cellEdit={ cellEditProp } insertRow={ true }
        insertRow={true}
        deleteRow={true}
        selectRow={selectRowProp}
        options={options}
        exportCSV
        striped
        hover
        condensed
        search
        pagination
          tableHeaderClass='my-header-class'
          tableBodyClass='my-body-class'
          containerClass='my-container-class'
          tableContainerClass='my-table-container-class'
          headerContainerClass='my-header-container-class'
          bodyContainerClass='my-body-container-class'>

        <TableHeaderColumn dataField='ResID' isKey={ true } autoValue={ true } hidden>Emp Id</TableHeaderColumn>

        <TableHeaderColumn dataField='ESAProject' editable={{ type: 'text'}} width='90' columnTitle tdStyle={ { whiteSpace: 'normal' } }>ESA Project</TableHeaderColumn>
         
         <TableHeaderColumn dataField='Name' editable={ { type: 'select', options: { values: empName } } } width='200' columnTitle thStyle={ { 'fontWeight': 'bold' } } filter={ { type: 'TextFilter', defaultValue: userName } } >Resource Name</TableHeaderColumn>
        
        <TableHeaderColumn dataField='BillableHour' editable={{ type: 'number'}} width='90'>Billable Hour</TableHeaderColumn>
      
        <TableHeaderColumn dataField='LeaveVacationHour' editable={{ type: 'number'}} width='90'>Leave/Vacation Hour</TableHeaderColumn>
        
        <TableHeaderColumn dataField='HolidayHour' editable={{ type: 'number'}} width='90'>Holiday Hour</TableHeaderColumn>
        
        <TableHeaderColumn dataField='TotalHour' editable={{ type: 'number'}} width='90'>Total Hour</TableHeaderColumn>
          
      </BootstrapTable>

      </div>
      <Footer />
      </div>
    );
  }
}
export default Billable;
