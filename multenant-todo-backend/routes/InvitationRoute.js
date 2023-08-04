const express = require("express");

const jwtService = require("../services/JwtService");

const { inviteCollaborator } = require("../controllers/inviteController");

const router = express.Router();

// Route: Invite a collaborator to a specific todo list
router.post(
  "/:listId/collaborators/invite",
  jwtService.verifyToken,
  inviteCollaborator
);

module.exports = router;
