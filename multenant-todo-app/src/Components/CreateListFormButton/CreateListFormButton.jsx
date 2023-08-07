import "./CreateListFormButton.scss";

import React from "react";

function CreateListFormButton({
  displayCreateListForm,
  buttonText,
  activeNav,
}) {
  return (
    <div className="create-list-form-container">
      <button
        className={
          activeNav !== "collaborated" ? "create-list-form-button" : "disabled"
        }
        onClick={() => displayCreateListForm()}
        disabled={activeNav === "collaborated"}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default CreateListFormButton;
