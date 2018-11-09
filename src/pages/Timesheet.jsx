import React, { Component } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from 'react-loading';
import axios from 'axios';
import './Timesheet.css';
//import './react-bootstrap-table.css';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;


//const timesheets = [];
const userName = [];
userName[0]=localStorage.getItem('jwtUser');
var rateVal;

function onInsertRow(row) {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  console.log(row);
    row.userDetail=localStorage.getItem('jwtUser');
    axios.post('/time/timesheets', {row})
    .then(res => res.json(),console.log('I was triggered during componentDidMount'))
	.catch(function (error) {
          this.props.history.push("/login");
	});
    }

function onDeleteRow(rowKeys) {
	alert('You deleted: ' + rowKeys);
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/time/timeDelete', rowKeys)
    .then(res => res.json(),console.log('I was triggered during componentDidMount'))
	.catch(function (error) {
          this.props.history.push("/login");
	});
    }


function onAfterSaveCell(row, cellName, cellValue) {
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/time/timeUpdate', {row})
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
rateVal=localStorage.getItem('jwtRate');
  return `$ ${cell*rateVal}`;
}

class Timesheet extends React.Component {
   state = {timesheets: []}

   componentDidMount() {
   const ntokenVal=localStorage.getItem('jwtToken');
     axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    console.log(typeof(JSON.parse(JSON.stringify(ntokenVal))));
     console.log(localStorage.getItem('jwtUser'));
     console.log(localStorage.getItem('jwtRate'));
    axios.get('/time/timesheets')
      .then(res => {
        this.setState({ timesheets: res.data });
        console.log(this.state.timesheets);
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
        <h3>Add Timesheet Details</h3>
        <button className='btn btn-info' onClick={ onClose }>Close it!</button>
      </div>
    );
  }
   
  render() {
   const selectRowProp = {
      mode: 'checkbox',
      showOnlySelected: true,
      clickToSelect: true,
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
        <div className="mrgn-dwn">Timesheet Page <span className="titleSty">Hello, {userName}  </span></div>
      <BootstrapTable data={ this.state.timesheets } cellEdit={ cellEditProp } insertRow={ true }
        insertRow={true}
        deleteRow={true}
        selectRow={selectRowProp}
        options={options}
        striped
        hover
        condensed
        exportCSV
        search
        pagination
          tableHeaderClass='my-header-class'
          tableBodyClass='my-body-class'
          containerClass='my-container-class'
          tableContainerClass='my-table-container-class'
          headerContainerClass='my-header-container-class'
          bodyContainerClass='my-body-container-class' version='4'>
          
          <TableHeaderColumn dataField='EmpId' isKey={ true } autoValue={ true } hidden>Resource Id</TableHeaderColumn>
          
          <TableHeaderColumn dataField='ResourceOwner' editable={{ type: 'text'}} width='90' columnTitle tdStyle={ { whiteSpace: 'normal' } }>Resource Org Owner</TableHeaderColumn>
          
          <TableHeaderColumn dataField='ResourceName' editable={ { type: 'select', options: { values: userName } } } width='200' columnTitle thStyle={ { 'fontWeight': 'bold' } } filter={ { type: 'TextFilter', defaultValue: userName } } >Resource Name</TableHeaderColumn>
          
          <TableHeaderColumn dataField='ProjectID' editable={{ type: 'number'}} width='90'>B Project ID / AFE</TableHeaderColumn>
          
          <TableHeaderColumn dataField='ProjectName' editable={{ type: 'text'}} width='150'>B Project Name</TableHeaderColumn>
          
          <TableHeaderColumn dataField='Phase' editable={{ type: 'text'}} width='90'>Phase</TableHeaderColumn>
          
          <TableHeaderColumn dataField='Notes' editable={ { type: 'textarea'}}>Notes</TableHeaderColumn>
          
          <TableHeaderColumn dataField='Weeks' filter={ { 
            type: 'DateFilter', 
            delay: 1000, 
            numberComparators: [ '=', '>', '<=' ] 
          } }>Week of (Week Start Date)</TableHeaderColumn>
          
          <TableHeaderColumn dataField='Hours' editable={ { type: 'number'}} width='90'>Hours per week</TableHeaderColumn>
          
          <TableHeaderColumn dataField='Rate' editable={ { type: 'number'}} width='90' dataFormat={ priceFormatter }>$Rate</TableHeaderColumn>
      </BootstrapTable>

      </div>
      <Footer />
      </div>
    );
  }
}
export default Timesheet;
