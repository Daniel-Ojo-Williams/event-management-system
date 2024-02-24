const express = require('express');
const router = express.Router();
const { register, getAllAttendees } = require('./controller');

router.route('/attendees/:event_id').get(getAllAttendees);
router.route('/register').post(register);

module.exports = router;