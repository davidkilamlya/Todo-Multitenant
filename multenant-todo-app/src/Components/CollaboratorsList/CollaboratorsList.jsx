import { useEffect, useState } from "react";
import InviteCollaboratorsModal from "../InviteCollaboratorsModal/InviteCollaboratorsModal";
import "./CollaboratorsList.scss";
import Collaborator from "../Collaborator/Collaborator";
import Header from "../Header/Header";
import { useParams } from "react-router";
import axiosInstance from "../../util/axiosInstance";
import { baseUrl } from "../../constants/baseUrl";
import { config } from "../../util/axiosInstance";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import AcceptInvite from "../AcceptInvite/AcceptInvite";

function CollaboratorsList() {
  //state variables
  const [displayCollaboratorInput, setDisplayCollaboratorInput] =
    useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [todoListTitle, setTodoListTitle] = useState();
  const [pageStatus, setPageStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userExistMessage, setUserExistMessage] = useState();

  const [collaboratorStatus, setCollaboratorStatus] = useState();

  const [statusColor, setStatusColor] = useState();

  //extract listId from the url
  let { listId } = useParams();

  const fetchCollaborators = async () => {
    setIsLoading(true);
   axiosInstance
     .get(`todo-lists/${listId}/collaborators/`)
     .then((response) => {
       setCollaborators(response.data);
       setIsLoading(false);
     })
     .catch((err) => {
       setCollaboratorStatus("failed to get the list");
       setStatusColor("red");
       setIsLoading(false);
     });
  };
  const fetchList = async () => {
    setIsLoading(true);
    await axiosInstance
      .get(`todo-lists/${listId}`)
      .then((response) => {
        console.log(response.data);
        setTodoListTitle(response.data.todoListTitle);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setCollaboratorStatus("failed to get the list");
        setStatusColor("red");
      });
  };

  //delete collaborator
  const collaboratorDelete = async (collaboratorId) => {
    setIsLoading(true);
    await axiosInstance
      .delete(
        `todo-lists/${listId}/collaborators/${collaboratorId}`
      )
      .then(() => {
        setCollaboratorStatus("success");
        setStatusColor("green");
        setIsLoading(false);
        fetchCollaborators();
      })
      .catch((err) => {
        setIsLoading(false);
        setCollaboratorStatus("delete operation failed");
        setStatusColor("red");
      });
  };

  //delete all collaborators
  const deleteAllCollaborators = async () => {
    setIsLoading(true);
   axiosInstance
     .delete(`todo-lists/${listId}/deleteAllCollaborators/`)
     .then((response) => {
       setCollaboratorStatus("success");
       setStatusColor("green");
       fetchCollaborators();
       setIsLoading(false);
     })
     .catch((err) => {
       setCollaboratorStatus("delete operation failed");
       setStatusColor("red");
       console.log(err);
       setIsLoading(false);
     });
  };

  //update collaborators
  const updateCollaborator = async (
    collaboratorId,
    collaboratorRole,
    setIsChanged
  ) => {
    const data = {
      role: collaboratorRole,
    };
    await axiosInstance
      .put(
        `todo-lists/${listId}/collaborators/${collaboratorId}`,
        data
      )
      .then((response) => {
        setCollaboratorStatus("success");
        setStatusColor("green");
        setIsChanged(false);
      })
      .catch((err) => {
        setCollaboratorStatus("update operation failed");
        setStatusColor("red");
      });
  };

  //handle invite action
  const invite = async (email, taskId, inviteRole) => {
    setIsLoading(true);

    await axiosInstance
      .post(`user`, { email })
      .then((response) => {
        let firstName = response.data.firstName;

        if (response.data.email === email) {
          axiosInstance
            .post(
              `todo-lists/${taskId}/collaborators/invite`,
              {
                collaboratorEmail: email,
                name: firstName,
                role: inviteRole,
                userId: response.data._id,
              },
            
            )
            .then((response) => {
              // setDisplayCollaboratorInput(false);
              setIsLoading(false);

              setCollaboratorStatus(response.data.message);
              setStatusColor("green");
            })
            .catch((err) => {
              setIsLoading(false);

              setCollaboratorStatus("something went wrong");
              setStatusColor("red");
            });
        } else {
          setCollaboratorStatus("user is not registered");
          setStatusColor("red");

          setIsLoading(false);
        }
      })
      .catch((err) => {
        setCollaboratorStatus("user is not registered");
        setStatusColor("red");
        setIsLoading(false);
      });
    handleDisplayCollaboratorInput();
  };

  useEffect(() => {
    fetchCollaborators();
    fetchList();
  }, []);

  //remove the toast after 10s
  useEffect(() => {
    if (collaboratorStatus) {
      setTimeout(() => {
        setCollaboratorStatus("");
      }, 10000);
    }
  });

  //Handle display collaborator input
  const handleDisplayCollaboratorInput = () => {
    if (displayCollaboratorInput) {
      setDisplayCollaboratorInput(false);
    } else {
      setDisplayCollaboratorInput(true);
    }
  };
  return (
    <>
      <Header />

      {collaboratorStatus && (
        <div className="status-message">
          <ErrorBoundary color={statusColor} message={collaboratorStatus} />
        </div>
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="collaborator-list">
          <div className="collaborator-list-container">
            <div className="collaborator-list-header-container">
              <div className="collaborator-list-header-title-container">
                <span className="collaborator-list-header-title">
                  {todoListTitle}
                </span>
              </div>
              <div className="collaborator-list-header-manager-container">
                <div className="collaborator-list-manager-list-title">
                  Collaborators
                </div>
                <div className="collaborator-list-header-manager-button-container">
                  <button
                    className="collaborator-list-header-manager-add-button collaborator-list-button"
                    onClick={() => handleDisplayCollaboratorInput()}
                  >
                    Invite Member
                  </button>
                  <button
                    className="collaborator-list-header-manager-remove-button collaborator-list-button"
                    onClick={() => deleteAllCollaborators()}
                  >
                    Remove all
                  </button>
                </div>
              </div>
              {displayCollaboratorInput && (
                <InviteCollaboratorsModal
                  handleDisplayCollaboratorInput={
                    handleDisplayCollaboratorInput
                  }
                  invite={invite}
                />
              )}
            </div>
            <div className="collaborator-list-separator"></div>
            <div className="collaborator-list-item-container">
              {collaborators ? (
                collaborators.map((collaborator, index) => {
                  return (
                    <Collaborator
                      collaboratorName={collaborator.name}
                      key={index}
                      role={collaborator.role}
                      collaboratorId={collaborator._id}
                      handleDeleteCollaborator={collaboratorDelete}
                      updateCollaborator={updateCollaborator}
                    />
                  );
                })
              ) : (
                <span>Loading...</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CollaboratorsList;
