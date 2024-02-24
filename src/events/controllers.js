const { Events } = require("../../models");
const { asyncWrapper } = require("../../utils");
const axios = require("axios");
require("dotenv").config();

// create an event
const createEvent = asyncWrapper(async (req, res) => {
  let { name, description, date, time, location } = req.body;
  let user = req.user;
  let organizer_id = user.user_id;
  let event = Events.build({
    name,
    description,
    date, // format: YYYY-MM-DD
    time,
    location,
    organizer_id,
  });
  // --| generate unique url for each event for users to register for that particular event
  
  await event.save();
  return res.status(201).json({error: false, message: event });
});

const getEvent = asyncWrapper(async (req, res) => {
  let { event_id } = req.params;

  let event = await Events.findByPk(event_id);

  if (!event) throw new Error(`No resource found`);

  return res.status(200).json({error: false, event });
});

const getAllEvents = asyncWrapper(async (req, res) => {
  let user = req.user;
  let organizer_id = user.user_id;

  let events = await Events.findAll({ where: { organizer_id } });

  if (events.length === 0)
    return res.status(200).json({error: false, message: "No events found" });

  return res.status(200).json({error: false, events });
});

const updateEvent = asyncWrapper(async (req, res) => {
  let { event_id } = req.params;

  if (!event_id) throw new Error("Please provide event id to update");

  let props = ({ name, description, date, time, location } = req.body);

  let updated = await Events.update(
    { ...props },
    {
      where: {
        event_id,
      },
    }
  );

  if (updated[0] !== 1) throw new Error("No resource found");
  res.status(200).json({ error: false, message: "Event updated successfully" });
});

const deleteEvent = asyncWrapper(async (req, res) => {
  let { event_id } = req.params;

  if (!event_id) throw new Error("Please provide event id to update");

  let deleted = await Events.destroy({
    where: {
      event_id,
    },
  });

  if(deleted !== 1) throw new Error("No resource found");

  res.status(200).json({ error: false, message: "Event deleted successfully" });
});

// generate short link for event attendance
const generateShortLink = asyncWrapper(async(req, res) => {
  // --| get event id from the request parameters
  let { event_id } = req.params;

  if (!event_id) throw new Error("Please provide event id to update");
  // --| append the event id to the base url
  // --| when the bitly link is access it redirects the user to registration form endpoint
  let longUrl = `${process.env.BASE_URL}/registrationform/${event_id}`;

  const response = await axios({
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.BITLY_ACCESS_KEY}`,
      "Content-Type": "application/json",
    },
    url: "https://api-ssl.bitly.com/v4/shorten",
    data: { long_url: `${longUrl}`, domain: "bit.ly" },
  });

  console.log(response.data);
});

module.exports = {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  generateShortLink
};
