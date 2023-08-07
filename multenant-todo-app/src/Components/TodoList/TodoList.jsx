import "./TodoList.scss";
import TodoItem from "../TodoItem/TodoItem";
import { useEffect, useRef, useState } from "react";
import { BsFilter, BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "../../util/axiosInstance";
import SearchFilter from "../SearchFilter/SearchFilter";
import { handleTodoListItemSearchFilter } from "../../util/searchFiterUtil";
import FilterChamber from "../FilterChamber/FilterChamber";

function TodoList({
  date,
  todoListTitle,
  setIsLoading,
  todoListId,
  todoListItem,
  description,
  setTodoPageStatus,
  setStatusColor,
  deleteList,
}) {
  //make new list item for active Tab
  let newListItem = todoListItem.filter((item) => {
    return !item.completed;
  });
  //make new completed list
  let newCompletedListItem = todoListItem.filter((item) => {
    return item.completed;
  });

  //ref variables
  const actionsContainerRef = useRef(null);
  const itemRef = useRef();
  //states variables
  const [titleValue, setTitleValue] = useState("");
  const [todoButton, setTodoButton] = useState("Add Todo");
  const [filterState, setFilterState] = useState("filterHigh");
  const [priorityValue, setPriorityValue] = useState("High");
  const [status, setStatus] = useState(false);
  const [priorityId, setPriorityId] = useState(3);
  const [displayInputs, setDisplayInputs] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [displayCollaboratorInput, setDisplayCollaboratorInput] =
    useState(false);
  const [displayTaskEditor, setDisplayTaskEditor] = useState(false);
  const [listTaskTitle, setListTaskTitle] = useState(todoListTitle);
  const [prevListTaskTitle, setPrevListTaskTitle] = useState(listTaskTitle);
  const [listTaskDate, setListTaskDate] = useState(date);
  const [prevListTaskDate, setPrevListTaskDate] = useState(listTaskDate);
  const [emailValue, setEmailValue] = useState("");
  const [inviteRole, setInviteRole] = useState("viewer");
  const [listData, setListData] = useState(newListItem);
  const [completedListData, setCompletedListData] =
    useState(newCompletedListItem);
  const [listTaskDescription, setListTaskDescription] = useState(description);
  const [searchField, setSearchField] = useState();
  const [userExistMessage, setUserExistMessage] = useState();
  const [activeTab, setActiveTab] = useState(true);
  const [activeAdded, setActiveAdded] = useState(0);
  const [completedAdded, setCompletedAdded] = useState(0);

  //Add todo task in todo list-item
  const addTodo = async (listId) => {
    const listItemData = {
      title: titleValue,
      priority: priorityValue,
      priorityId: priorityId,
    };
    setIsLoading(true);
    axiosInstance
      .post(`todo-lists/${listId}/todo-items/`, listItemData)
      .then((response) => {
        let updatedTodoItem = response.data.newTodoListItems.todoItems.filter(
          (item) => {
            return !item.completed;
          }
        );
        setListData(updatedTodoItem.reverse());
        setIsLoading(false);
        console.log("list data is", response.data);
        setTodoPageStatus(response.data.message);
        setStatusColor("green");
      })
      .then(() => {
        setTitleValue("");
        setDisplayInputs(false);
        setTodoButton("Add Todo");
      })
      .catch((err) => {
        setTodoPageStatus("failed to create Item");
        console.log(err);
        setStatusColor("red");
        setIsLoading(false);
      });
  };

  //handle title value of todo task
  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  //handle priority value and its priorityId of todo task
  const handlePriorityChange = (e) => {
    setPriorityValue(e.target.value);
    if (e.target.value === "Low") {
      setPriorityId(1);
    }
    if (e.target.value === "Medium") {
      setPriorityId(2);
    }
    if (e.target.value === "High") {
      setPriorityId(3);
    }
  };

  //Display the inputs for filling the todo task values
  const displayInputsForm = () => {
    setActionsVisible(false);
    if (displayInputs) {
      setDisplayInputs(false);
      setTodoButton("Add Todo");
    } else {
      setDisplayInputs(true);
      setTodoButton("Cancel");
      setDisplayCollaboratorInput(false);
      setDisplayTaskEditor(false);
    }
  };

  //method for sorting priority
  const sortTodoListByPriority = (order) => {
    listData.sort((a, b) => {
      if (order === "high") {
        return b.priorityId - a.priorityId;
      } else {
        return a.priorityId - b.priorityId;
      }
    });
    return listData;
  };

  //handle filter state
  const handleFilterState = () => {
    if (filterState === "filterLow") {
      setFilterState("filterHigh");
      sortTodoListByPriority("high");
    } else {
      setFilterState("filterLow");
      sortTodoListByPriority("low");
    }
  };

  //handle show actions method
  const showActions = () => {
    if (actionsVisible) {
      setPrevListTaskTitle(listTaskTitle);
      setPrevListTaskDate(date);
      console.log(prevListTaskTitle);
      setActionsVisible(false);
    } else {
      setActionsVisible(true);
      setDisplayCollaboratorInput(false);
      console.log(prevListTaskTitle);

      setDisplayTaskEditor(false);
      if (prevListTaskDate && prevListTaskTitle) {
        setListTaskTitle(prevListTaskTitle);
        setListTaskDate(prevListTaskDate);
      }
    }
  };

  //Handle display collaborator input
  const handleDisplayCollaboratorInput = () => {
    if (displayCollaboratorInput) {
      setDisplayCollaboratorInput(false);
      setActionsVisible(false);
    } else {
      setDisplayCollaboratorInput(true);
      setActionsVisible(false);
      setDisplayInputs(false);
      setDisplayTaskEditor(false);
      setTodoButton("Add Todo");
    }
  };

  //Handle display title editor
  const handleDisplayTaskEditor = () => {
    if (displayTaskEditor) {
      setDisplayTaskEditor(false);
      setActionsVisible(false);
    } else {
      setDisplayTaskEditor(true);
      setDisplayCollaboratorInput(false);
      setActionsVisible(false);
      setDisplayInputs(false);
      setTodoButton("Add Todo");
    }
  };
  //Handle email value
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  //Handle date of the task
  const handleListTaskDateChange = (e) => {
    setListTaskDate(e.target.value);
  };

  //Handle list task title
  const handleListTaskTitleChange = (e) => {
    setListTaskTitle(e.target.value);
  };

  //handle description change
  const handleDescriptionChange = (e) => {
    setListTaskDescription(e.target.value);
  };

  //handle task status change
  const handleTaskStatusChange = (e) => {
    setStatus(e.target.value);
  };

  //Handle collaborator role
  const handleInviteRoleChange = (e) => {
    setInviteRole(e.target.value);
  };

  //handle invite action
  const invite = async (email, taskId) => {
    setIsLoading(true);

    await axiosInstance
      .post(`user`, { email })
      .then((response) => {
        let firstName = response.data.firstName;
        console.log(email, inviteRole, response.data);
        if (response.data.email === email) {
          axiosInstance
            .post(`todo-lists/${taskId}/collaborators/invite`, {
              collaboratorEmail: email,
              name: firstName,
              role: inviteRole,
              userId: response.data._id,
            })
            .then((response) => {
              setEmailValue("");
              setDisplayCollaboratorInput(false);
              setIsLoading(false);

              setTodoPageStatus(response.data.message);
              setStatusColor("green");
            })
            .catch((err) => {
              console.log(err.response.data.message);
              setIsLoading(false);
              if (err.response.data.message) {
                setTodoPageStatus(err.response.data.message);
              } else {
                setTodoPageStatus("something went wrong");
              }

              setStatusColor("red");
            });
        } else {
          setUserExistMessage("user is not registered");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setUserExistMessage("user is not registered");

        setIsLoading(false);
      });
  };

  const handleCompleted = async (e, listId, itemId, title, priority) => {
    setIsLoading(true);
    let completed;
    if (activeTab) {
      completed = true;
    }
    if (!activeTab) {
      completed = false;
    }

    let data = {
      title,
      priority,
      completed: completed,
    };

    console.log(data);
    await axiosInstance
      .put(`todo-lists/${listId}/todo-items/${itemId}`, data)
      .then((response) => {
        setIsLoading(false);
        setStatus("success");
        if (activeTab) {
          let newItemData = response.data.up.todoItems.filter((item) => {
            return item._id !== itemId && !item.completed;
          });
          setListData(newItemData);
          setCompletedAdded((prev) => (prev += 1));
          //setCompleted data from the response
          let newCompletedData = response.data.up.todoItems.filter((item) => {
            return item.completed;
          });
          setCompletedListData(newCompletedData);
        }

        if (!activeTab) {
          let newCompletedItemsData = response.data.up.todoItems.filter(
            (item) => {
              return item.completed;
            }
          );

          setCompletedListData(newCompletedItemsData);
          setActiveAdded((prev) => (prev += 1));
          //reload the active todo items
          let newActiveData = response.data.up.todoItems.filter((item) => {
            return !item.completed;
          });
          setListData(newActiveData);
        }
        setStatusColor("green");
      })
      .catch((err) => {
        setStatus("failed to update the list");
        setStatusColor("red");
        setIsLoading(false);
      });
  };

  //delete Item
  const deleteItem = async (listId, itemId) => {
    setIsLoading(true);
    await axiosInstance
      .delete(`todo-lists/${listId}/todo-items/${itemId}`)
      .then(() => {
        setStatus("success");
        setStatusColor("green");
        if (activeTab) {
          let newItemData = listData.filter((item) => {
            return item._id !== itemId;
          });
          setListData(newItemData);
        }
        if (!activeTab) {
          let newItemData = completedListData.filter((item) => {
            return item._id !== itemId;
          });
          setCompletedListData(newItemData);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setStatus("failed to delete Item");
        setStatusColor("red");
        console.log(err);
        setIsLoading(false);
      });
  };

  //Handle update todo list title and date
  const updateToDoList = async (todoListId) => {
    const listUpdateData = {
      todoListTitle: listTaskTitle,
      todoListDescription: listTaskDescription,
      archieved: status,
      deadlineDate: listTaskDate,
    };
    setIsLoading(true);

    if (listTaskTitle && listTaskDescription && status && listTaskDate) {
     axiosInstance
       .put(`todo-lists/${todoListId}`, listUpdateData)
       .then((response) => {
         console.log("update response", response);
         setListTaskTitle(listTaskTitle);
         setListTaskDescription(listTaskDescription);
         let updatedListDate = new Date(listTaskDate).toDateString();
         setListTaskDate(updatedListDate);
         setDisplayTaskEditor(false);
         setPrevListTaskTitle(listTaskTitle);
         setPrevListTaskDate(listTaskDate);

         console.log(
           todoListId,
           listTaskTitle,
           listTaskDescription,
           status,
           listTaskDate
         );
         setIsLoading(false);

         setTodoPageStatus(response.data.message);
         setStatusColor("green");
       })
       .catch((err) => {
         setIsLoading(true);

         console.log("update error occurred", err);
         setTodoPageStatus("failed to update List");
         setStatusColor("red");
       });
    } else {
      setTodoPageStatus("Please fill all fields");
      setStatusColor("red");
    }
  };

  // Handle clicks outside the actions container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionsContainerRef.current &&
        !actionsContainerRef.current.contains(event.target)
      ) {
        setActionsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="TodoList" key={todoListId}>
      <div className="todo-list-container">
        <div className="todo-list-header-title-container">
          <span className="todo-list-header-title">{listTaskTitle}</span>
        </div>
        <div className="search-item-container">
          <SearchFilter
            searchField={searchField}
            handleSearchFilter={(e) =>
              handleTodoListItemSearchFilter(
                e,
                listData,
                setSearchField,
                setListData,
                todoListItem
              )
            }
          />
        </div>
        <div className="todo-list-header-container">
          <div className="todo-list-header">
            <div className="todo-list-header-day-container">
              <span className="todo-list-header-day">{listTaskDate}</span>
            </div>

            <div className="todo-list-header-button-container">
              <div
                className={`todo-list-filter-container ${filterState}`}
                onClick={() => handleFilterState()}
                title="arrange priority"
              >
                <BsFilter className="todo-list-filter" />
              </div>
              <button
                className={activeTab ? "todo-list-header-button" : ""}
                onClick={() => displayInputsForm()}
                disabled={activeTab ? false : true}
              >
                {todoButton}
              </button>
              <div
                className="todo-list-more-action-container"
                ref={actionsContainerRef}
              >
                <div className="todo-list-more-action-icon-container">
                  <BsThreeDotsVertical
                    className="todo-list-more-action-icon"
                    title="actions"
                    onClick={() => showActions()}
                  />
                </div>

                {actionsVisible && (
                  <div className="todo-list-actions">
                    <button
                      className="invite-action action"
                      onClick={() => handleDisplayCollaboratorInput()}
                    >
                      Invite collaborator
                    </button>
                    <button
                      className="edit-action action"
                      onClick={() => handleDisplayTaskEditor()}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-action action"
                      onClick={() => deleteList(todoListId, listTaskTitle)}
                    >
                      Delete Task
                    </button>
                    <a
                      href={`${todoListId}/collaborators`}
                      className="manage-collaborators-action action"
                    >
                      Manage team
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* display Task title and date editor */}
        {displayTaskEditor && (
          <div className="todo-list-editor-container-inputs-button">
            <div className="todo-list-editor-container-fields">
              <div className="list-task-input-container">
                <div className="title-label-container">
                  <span className="title-label">Title</span>
                </div>
                <input
                  type="text"
                  name="listTaskTitle"
                  value={listTaskTitle}
                  autoFocus
                  placeholder="Task Title"
                  className="task-editor-input"
                  onChange={(e) => handleListTaskTitleChange(e)}
                />
              </div>
              <div className="list-task-input-container">
                <div className="title-label-container">
                  <span className="title-label">Description</span>
                </div>
                <input
                  type="text"
                  name="listTaskTitle"
                  value={listTaskDescription}
                  placeholder="Task Title"
                  className=" task-editor-input"
                  onChange={(e) => handleDescriptionChange(e)}
                />
              </div>
              <div className="list-task-input-container">
                <div className="title-label-container">
                  <span className="title-label">Date</span>
                </div>
                <input
                  type="date"
                  name="date"
                  required
                  value={listTaskDate}
                  className="task-editor-input"
                  onChange={(e) => handleListTaskDateChange(e)}
                />
              </div>
              <div className="list-task-input-container">
                <div className="title-label-container">
                  <span className="title-label">completed</span>
                </div>

                <div className="completed-inputs">
                  <div className="completed-select">
                    <input
                      type="radio"
                      name="completed"
                      id=""
                      value={true}
                      onChange={(e) => handleTaskStatusChange(e)}
                    />
                    <span className="yes">Yes</span>
                  </div>

                  <div className="completed-select">
                    <input
                      type="radio"
                      name="completed"
                      id=""
                      value={false}
                      onChange={(e) => handleTaskStatusChange(e)}
                    />
                    <span className="no">No</span>
                  </div>
                </div>
              </div>
              <div className="task-editor-button">
                <button
                  className="todo-list-editor-container-button"
                  onClick={() => updateToDoList(todoListId)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {/* display collaborator editor */}
        {displayCollaboratorInput && (
          <>
            {userExistMessage && (
              <p style={{ color: "red" }}>{userExistMessage}</p>
            )}
            <div className="todo-list-container-inputs-button">
              <div className="todo-list-container-fields">
                <input
                  type="email"
                  name="collaboratorEmail"
                  required
                  value={emailValue}
                  placeholder="Collaborator email"
                  className="todo-list-title-input collaborator-email-input"
                  onChange={(e) => handleEmailChange(e)}
                />
                <select
                  name="priority"
                  value={inviteRole}
                  className="todo-list-title-select collaborator-role-input"
                  onChange={(e) => handleInviteRoleChange(e)}
                >
                  <option value="editor">editor</option>
                  <option value="viewer">viewer</option>
                  <option value="owner">owner</option>
                </select>
              </div>

              <button
                className="todo-list-container-button invite-button"
                onClick={() => invite(emailValue, todoListId)}
              >
                Invite
              </button>
            </div>
          </>
        )}
        {displayInputs && (
          <div className="todo-list-container-inputs-button">
            <div className="todo-list-container-fields">
              <input
                type="text"
                name="title"
                placeholder="Todo title"
                value={titleValue}
                className="todo-list-title-input title-input"
                onChange={(e) => handleTitleChange(e)}
              />
              <select
                name="priority"
                value={priorityValue}
                className="todo-list-title-select priority-input"
                onChange={(e) => handlePriorityChange(e)}
              >
                <option value="High">High</option>
                <option value="Medium">Mid</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <button
              className="todo-list-container-button add-todo"
              onClick={() => addTodo(todoListId)}
            >
              Save
            </button>
          </div>
        )}

        <FilterChamber
          listData={listData}
          setListData={setListData}
          todoListItem={todoListItem}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCompletedItem={setCompletedListData}
          completedListItem={completedListData}
          activeAdded={activeAdded}
          completedAdded={completedAdded}
          setCompletedAdded={setCompletedAdded}
          setActiveAdded={setActiveAdded}
        />

        <div className="todo-list-separator"></div>

        <div className="todo-list-container-todo-item">
          {listData && activeTab ? (
            listData.length !== 0 ? (
              listData.map((toDo, index) => {
                return (
                  <TodoItem
                    title={toDo.title}
                    key={toDo._id}
                    priority={toDo.priority}
                    status={toDo.status}
                    completed={toDo.completed}
                    itemId={toDo._id}
                    listId={todoListId}
                    activeTab={activeTab}
                    itemRef={itemRef}
                    handleCompleted={(e) =>
                      handleCompleted(
                        e,
                        todoListId,
                        toDo._id,
                        toDo.title,
                        toDo.priority
                      )
                    }
                    deleteItem={() => deleteItem(todoListId, toDo._id)}
                  />
                );
              })
            ) : (
              <div className="no-data-container">
                <h3>Oops! No data to display.</h3>
              </div>
            )
          ) : completedListData && !activeTab ? (
            completedListData.length !== 0 ? (
              completedListData.map((toDo, index) => {
                return (
                  <TodoItem
                    title={toDo.title}
                    key={toDo._id}
                    priority={toDo.priority}
                    status={toDo.status}
                    completed={toDo.completed}
                    itemId={toDo._id}
                    listId={todoListId}
                    activeTab={activeTab}
                    itemRef={itemRef}
                    handleCompleted={(e) =>
                      handleCompleted(
                        e,
                        todoListId,
                        toDo._id,
                        toDo.title,
                        toDo.priority
                      )
                    }
                    deleteItem={() => deleteItem(todoListId, toDo._id)}
                  />
                );
              })
            ) : (
              <div className="no-data-container">
                <h3>Oops! No data to display.</h3>
              </div>
            )
          ) : (
            <h4>Loading...</h4>
          )}
        </div>
        <div className="todo-list-footer"></div>
      </div>
    </div>
  );
}

export default TodoList;
