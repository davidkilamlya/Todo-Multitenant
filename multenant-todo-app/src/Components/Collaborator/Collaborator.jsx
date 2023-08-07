import React, { useState } from "react";
import { BsPersonCircle, BsTrash } from "react-icons/bs";
import { CiSaveDown2 } from "react-icons/ci";
import "./Collaborator.scss";

function Collaborator({
  collaboratorName,
  collaboratorId,
  role,
  img,
  updateCollaborator,
  handleDeleteCollaborator,
}) {
  const [isChanged, setIsChanged] = useState(false);
  const [collaboratorRole, setCollaboratorRole] = useState(role);

  // const [prevCollaboratorRole, setprevCollaboratorRole] = useState();

  //handle collaborator change
  const handleCollaboratorRoleChange = (e) => {
    setCollaboratorRole(e.target.value);
    setIsChanged(true);
    console.log(collaboratorRole);
  };

  //update collaborator role
 
  return (
    <div className="collaborator">
      <div className="collaborator-container">
        <div className="collaborator-image-container">
          {img ? (
            <img src={img} alt={img} className="todo-item-checkbox" />
          ) : (
            <BsPersonCircle />
          )}
        </div>
        <div className="collaborator-name-container">
          <p className="collaborator-name">{collaboratorName}</p>
        </div>
        <div className="collaborate-role-container">
          <select
            name="priority"
            value={collaboratorRole}
            className="collaborator-role-input"
            onChange={(e) => handleCollaboratorRoleChange(e)}
          >
            <option value="editor">editor</option>
            <option value="viewer">viewer</option>
            <option value="owner">owner</option>
          </select>
        </div>

        <div className="update-container">
          {isChanged && (
            <div className="update-pen-container" onClick={()=>{
              updateCollaborator(collaboratorId,collaboratorRole,setIsChanged)
            }}>
              <div className="collaborator-update">
                <CiSaveDown2 />
              </div>
            </div>
          )}
          <div
            className="collaborator-remove-container"
            onClick={() => handleDeleteCollaborator(collaboratorId)}
          >
            <BsTrash className="collaborator-remove" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborator;
