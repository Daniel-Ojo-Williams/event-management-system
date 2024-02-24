const express = require("express");
const { createEvent, getEvent, getAllEvents, updateEvent, deleteEvent, generateShortLink } = require("./controllers");

const router = express.Router();

router.route("/new").post(createEvent);
router.route("/:event_id").get(getEvent).patch(updateEvent).delete(deleteEvent);
router.route("/").get(getAllEvents);
router.route("/formlink/:event_id").get(generateShortLink);

module.exports = router;
