const express = require("express");
const jwtService = require("../services/JwtService");
const {
  getCollaborators,
  addCollaborator,
  updateCollaborator,
  deleteCollaborator,
  deleteAllCollaborators,
} = require("../controllers/collaborators");

const router = express.Router();

// Route: get a collaborator to a specific todo list
router.get("/:listId/collaborators/", jwtService.verifyToken, getCollaborators);

// Route: Add a collaborator to a specific todo list
router.post("/:listId/collaborators/", jwtService.verifyToken, addCollaborator);

// Route: Update the role of a collaborator within a specific todo list
router.put(
  "/:listId/collaborators/:collaboratorId",
  jwtService.verifyToken,
  updateCollaborator
);

// Route: Remove a collaborator from a specific todo list
router.delete(
  "/:listId/collaborators/:collaboratorId",
  jwtService.verifyToken,
  deleteCollaborator
);

//Route: delete all collaborators
router.delete(
  "/:listId/deleteAllCollaborators/",
  jwtService.verifyToken,
  deleteAllCollaborators
);
module.exports = router;
