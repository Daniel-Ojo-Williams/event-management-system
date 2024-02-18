const express = require("express");
const {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("./controllers");

const router = express.Router();

router.route("/new").post(createEvent);
router.route("/:event_id").get(getEvent).patch(updateEvent).delete(deleteEvent);
router.route("/").get(getAllEvents);

module.exports = router;
