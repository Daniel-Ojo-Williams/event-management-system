const { EventAttendance } = require("../../models");
const { asyncWrapper } = require("../../utils");
require("dotenv").config();

// --| event attendees can register for the event here
const register = asyncWrapper(async (req, res) => {
    let {event_id} = req.params;
    // --| get attendee details from the request body
    let { first_name, last_name, email, phone } = req.body;

    if(!first_name || !last_name || !email || !phone){
      return res.status(400).json({error: true, message: "One or more fields incomplete, please try again."});
    }
    let name = `${last_name} ${first_name}`
    let attendance = await EventAttendance.build({name, email, phone, event_id});

    await attendance.save();
    return res.status(200).json({error: false, message: "Event registered successfully, check email for details."});
});

const getAllAttendees = asyncWrapper(async(req, res) => {
  let {event_id} = req.params;

  if(!event_id) return res.status(404).json({error: true, message: "Please enter a valid event id"});

  let attendees = await EventAttendance.findAll({where:{event_id}});

  return res.status(200).json({error: false, message: attendees});
  
});


module.exports = {
  register,
  getAllAttendees
}