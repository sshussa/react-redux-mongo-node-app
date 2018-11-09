var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var billableSchema = new Schema({
  ESAProject : { type: String , Required:  'ESA project details cannot be left blank'},
  ResID: { type: String, Required:  'Res ID cannot be left blank.' },
  Name: { type: String, Required:  'Name cannot be left blank.' },
  BillableHour:  { type: Number,     Required:  'Billable cannot be left blank.'},
  LeaveVacationHour: { type: Number ,    Required:  'Leave cannot be left blank'},
  HolidayHour: { type: Number ,    Required:  'Holiday cannot be left blank'},
  TotalHour: { type: Number ,    Required:  'Total cannot be left blank'}
},
{
    timestamps: true
});

module.exports = mongoose.model('Billables', billableSchema);