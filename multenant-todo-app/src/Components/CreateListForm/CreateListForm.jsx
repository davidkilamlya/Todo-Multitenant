import React, { useEffect, useState } from "react";
import "./CreateListForm.scss";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

function CreateListForm({ createList, errorMessage, isErrorMessage}) {
  const [listTitle, setListTitle] = useState();
  const [listDueDate, setListDueDate] = useState();
  const [listDescription, setListDescription] = useState();

  const handleListTitleChange = (e) => {
    setListTitle(e.target.value);
  };
  const handleListDescriptionChange = (e) => {
    setListDescription(e.target.value);
  };
  const handleListDueDateChange = (e) => {
    setListDueDate(e.target.value);
  };
  

  return (
    <div className="create-list">
      {isErrorMessage && <ErrorBoundary message={errorMessage} />}
      <div className="create-list-container">
        <div className="create-list-heading-div">
          <span className="create-list-heading">Create list</span>
        </div>
        <div className="create-list-separator"></div>
        <div className="create-list-container-fields">
          <div className="create-list-input-container">
            <div className="create-list-input-label">
              <span className="label">Title</span>
            </div>
            <input
              type="text"
              name="listTaskTitle"
              value={listTitle}
              placeholder="Title"
              className="create-list-title-input create-list-input"
              onChange={(e) => handleListTitleChange(e)}
            />
          </div>

          <div className="create-list-input-container">
            <div className="create-list-input-label">
              <span className="label">deadline</span>
            </div>
            <input
              type="date"
              name="date"
              value={listDueDate}
              placeholder="due date"
              className="create-list-date-input create-list-input"
              onChange={(e) => handleListDueDateChange(e)}
            />
          </div>
          <div className="create-list-input-container">
            <div className="create-list-input-label">
              <span className="label">Description</span>
            </div>
            <input
              type="text"
              name="listDescription"
              value={listDescription}
              placeholder="description"
              className="create-list-description-input create-list-input"
              onChange={(e) => handleListDescriptionChange(e)}
            />
          </div>
          <div className="create-list-input-container">
            <button
              className="todo-list-container-button create-list-button"
              onClick={() =>
                createList(listTitle, listDescription, listDueDate,setListTitle,setListDescription,setListDueDate)
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateListForm;
