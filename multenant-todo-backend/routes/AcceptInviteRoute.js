const express = require("express");


const {
  acceptInvitation,
} = require("../controllers/acceptCollaboratorController");
const router = express.Router();

// Route: Accept a todo list collaboration invitation
router.all("/:token", acceptInvitation);

module.exports = router;
