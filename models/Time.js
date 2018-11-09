var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var timesheetSchema = new Schema({
  userDetail: { type: String ,    Required:  'User details cannot be left blank'},
  EmpId: { type: String, Required:  'EmpId cannot be left blank.' },
  ResourceOwner: { type: Number, Required:  'Org cannot be left blank.' },
  ResourceName:  { type: String,     Required:  'Name cannot be left blank.'},
  ProjectID: { type: Number ,    Required:  'Proj id cannot be left blank'},
  ProjectName: { type: String ,    Required:  'Proj name cannot be left blank'},
  Phase: { type: String ,    Required:  'Phase cannot be left blank'},
  Notes: { type: String ,    Required:  'Notes cannot be left blank'},
  Weeks: { type: String ,    Required:  'Weeks cannot be left blank'},
  Hours: {type:Number, Required:  'Hours cannot be left blank'},
  Rate: { type: Number ,    Required:  'Rate cannot be left blank'}
},
{
    timestamps: true
});

module.exports = mongoose.model('Timesheets', timesheetSchema);