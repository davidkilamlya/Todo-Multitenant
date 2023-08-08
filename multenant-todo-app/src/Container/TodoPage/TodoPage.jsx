import React, { useEffect, useState } from "react";
import TodoList from "../../Components/TodoList/TodoList";
import "./TodoPage.scss";
import axios from "axios";
import AnalyticsTab from "../../Components/AnalyticsTab/AnalyticsTab";
import { baseUrl } from "../../constants/baseUrl";
import CreateListFormButton from "../../Components/CreateListFormButton/CreateListFormButton";
import CreateListForm from "../../Components/CreateListForm/CreateListForm";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import { handleTodoListSearchFilter } from "../../util/searchFiterUtil";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import TopFilterNav from "../../Components/TopFilterNav/TopFilterNav";

function TodoPage() {
  //todo list Data state variables
  const [activeNav, setActiveNav] = useState("all");

  const [todoListData, setTodoListData] = useState([]);
  const [createListFormVisible, setCreateListFormVisible] = useState(false);
  const [createListFormButton, setCreateListFormButton] = useState("New list");
  const [errorMessage, setErrorMessage] = useState();
  const [todoPageStatus, setTodoPageStatus] = useState();
  const [statusColor, setStatusColor] = useState();
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [searchField, setSearchField] = useState();
  const [isFiltering, setIsFiltering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //get all todo list data
  const fetchTodoListData = async () => {
    
    try {
      setIsLoading(true);

      await axios
        .get(`${baseUrl}todo-lists/`, { withCredentials: true })
        .then((response) => {
          const data = () => {
            if (activeNav === "all") {
              return response.data.data;
            } else if (activeNav === "owned") {
              return response.data.ownedLists;
            } else {
              return response.data.collaboratedList;
            }
          };
        
          setIsLoading(false);

          setTodoListData(data());
        })
        .catch((err) => {
          setIsLoading(false);

          console.log(err);
        });
    } catch (err) {
      setIsLoading(false);

      console.log(err);
    }
  };

  // create todo list
  const createList = async (
    listTitle,
    listDescription,
    listDueDate,
    setListTitle,
    setListDescription,
    setListDueDate
  ) => {
    if (listTitle && listDescription && listDueDate) {
      setIsLoading(true);
      const listData = {
        todoListTitle: listTitle,
        todoListDescription: listDescription,
        deadlineDate: listDueDate,
      };
      const token = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await axios
        .post(`${baseUrl}todo-lists/`, listData, {withCredentials:true})
        .then((response) => {
          setTodoListData((prev) => [...prev, response.data.data]);

          setTodoPageStatus(response.data.message);
          setIsLoading(false);
          setStatusColor("green");
          //clear inputs
          setListDescription("");
          setListDueDate("");
          setListTitle("");
          setCreateListFormVisible(false);
          setCreateListFormButton("New list");
        })
        .catch((err) => {
          setIsLoading(false);

          setTodoPageStatus(
            "error: failed to save list, Please refresh your page."
          );
          setStatusColor("red");
          console.log(err);
        });

      setIsErrorMessage(false);
      console.log(listData);
    } else {
      setErrorMessage("Sorry can't save empty field");
      setIsErrorMessage(true);
    }
  };

  //delete whole todo list
  const deleteList = async (id, title) => {
    setIsLoading(true);

    let newData = todoListData.filter((data) => data._id !== id);

    axios
      .delete(`${baseUrl}todo-lists/${id}`, { withCredentials: true })
      .then((response) => {
        // fetchTodoListData();
        setTodoListData(newData);
        setIsLoading(false);
        setTodoPageStatus(`${title} deleted successfully`);
        setStatusColor("green");
      })
      .catch((err) => {
        setIsLoading(false);
        setTodoPageStatus(
          "Failed to delete a data, Please try again or Refresh page."
        );
        setStatusColor("red");
      });
  };

  let dateRegex = /(03:00:00)/gi;

  //Display create list form component
  const displayCreateListForm = () => {
    if (createListFormVisible) {
      setCreateListFormButton("New list");
      setCreateListFormVisible(false);
    } else {
      setCreateListFormVisible(true);
      setCreateListFormButton("Cancel");
    }
  };

  useState(() => {
    fetchTodoListData();
    if (todoPageStatus) {
      setTimeout(() => {
        setTodoPageStatus("");
      }, 10000);
    }
  }, [todoPageStatus]);

  useEffect(() => {
    fetchTodoListData();
    if (todoPageStatus) {
      setTimeout(() => {
        setTodoPageStatus("");
      }, 10000);
    }
  }, [activeNav]);
  return (
    <div className="todo-page">
      {isLoading && <LoadingSpinner />}
      <div className="view-create-form-container">
        <CreateListFormButton
          activeNav={activeNav}
          displayCreateListForm={displayCreateListForm}
          buttonText={createListFormButton}
        />
      </div>
      <SearchFilter
        searchField={searchField}
        handleSearchFilter={(e) =>
          handleTodoListSearchFilter(
            e,
            todoListData,
            setIsFiltering,
            setSearchField,
            fetchTodoListData,
            setTodoListData
          )
        }
      />
      <div className="filter-nav">
        <TopFilterNav activeNav={activeNav} setActiveNav={setActiveNav} />
      </div>

      {todoPageStatus && (
        <div className="message-status">
          <ErrorBoundary message={todoPageStatus} color={statusColor} />
        </div>
      )}
      {createListFormVisible && (
        <CreateListForm
          createList={createList}
          errorMessage={errorMessage}
          isErrorMessage={isErrorMessage}
        />
      )}
      <AnalyticsTab />
      <div className="todo-page-container">
        {todoListData.length !== 0 ? (
          todoListData.map((data, index) => {
            return (
              <TodoList
                // deadlineDate

                date={() => {
                  if (data.deadlineDate) {
                    let newDate = data.deadlineDate.split(dateRegex, 2)[0];
                    return newDate;
                  } else {
                    return data.deadlineDate;
                  }
                }}
                // collaborators
                collaborators={data.collaborators}
                // todoListData
                todoListData={todoListData}
                // _id
                todoListId={data._id}
                // todoItems

                todoListItem={data.todoItems}
                // archived
                todoListStatus={data.archived}
                // todoListTitle
                todoListTitle={data.todoListTitle}
                //delete the list
                deleteList={deleteList}
                //update status message
                setTodoPageStatus={setTodoPageStatus}
                setStatusColor={setStatusColor}
                //loading update
                setIsLoading={setIsLoading}
                //fetch todo list after make completed or updated task
                fetchData={() => fetchTodoListData()}
                key={data._id}
              />
            );
          })
        ) : !isFiltering ? (
          <div className="no-data">
            <h3>You have empty todo list, Please create one to remove this</h3>
            <CreateListFormButton
              displayCreateListForm={displayCreateListForm}
              activeNav={activeNav}
              buttonText={createListFormButton}
            />
          </div>
        ) : (
          <span className="no-result-find">
            <h3 className="searched-data">{searchField}</h3> is not in your list
          </span>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
