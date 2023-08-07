import { useState } from "react";
import "./InviteCollaboratorsModal.scss";
import { useParams } from "react-router";
import { baseUrl } from "../../constants/baseUrl";
import axios from "axios";
import { config } from "../../util/axiosInstance";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

function InviteCollaboratorsModal({ handleDisplayCollaboratorInput, invite }) {
  const { listId } = useParams();

  //state variables
  const [emailValue, setEmailValue] = useState("");
  const [isLoading, setIsLoading] = useState();

  const [statusColor, setStatusColor] = useState();
  const [inviteRole, setInviteRole] = useState("viewer");

  //Handle email value
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  //Handle Invite role value
  const handleInviteRoleChange = (e) => {
    setInviteRole(e.target.value);
  };

  return (
    <div className="invite-collaborator-modal-container">
      <div className=" invite-collaborator-modal-container-fields">
        <input
          type="text"
          name="collaboratorEmail"
          value={emailValue}
          placeholder="Collaborator email"
          className="collaborator-email-input"
          onChange={(e) => handleEmailChange(e)}
        />
        <select
          name="priority"
          value={inviteRole}
          className="collaborator-role-input"
          onChange={(e) => handleInviteRoleChange(e)}
        >
          <option value="editor">editor</option>
          <option value="viewer">viewer</option>
          <option value="owner">owner</option>
        </select>
      </div>
      <div className="collaborator-list-invite-button-container">
        <button
          className="collaborator-list-invite-button"
          onClick={() => invite(emailValue, listId, inviteRole)}
        >
          Invite
        </button>
      </div>
    </div>
  );
}

export default InviteCollaboratorsModal;
