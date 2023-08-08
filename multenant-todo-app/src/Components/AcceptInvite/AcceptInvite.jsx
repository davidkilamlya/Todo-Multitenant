import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./AcceptInvite.scss";
import { FcApproval } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import { useParams } from "react-router";

function AcceptInvite() {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState();
  const [successIcon, setSuccessIcon] = useState();
  let { inviteToken } = useParams();

  useEffect(() => {
    console.log(inviteToken);
    axios
      .post(`${baseUrl}accept-invite/${inviteToken}`)
      .then((response) => {
        setIsLoading(false);
        setSuccessIcon(true);
        setStatus(response.data.message);
        console.log(response.data);
      })
      .catch((err) => {
        if (err.response.data.message) {
          setStatus(err.response.data.message);
        } else {
          setStatus("can't verify invitation");
        }
        setSuccessIcon(false);
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="accept-invite">
          <div className="accept-invite-icon-container">
            {successIcon ? (
              <FcApproval className="success" />
            ) : (
              <TiDelete className="failed" />
            )}
          </div>
          <h2 className="message">{status}</h2>
          <div className="home-link-container">
            <a href="/" className="home-link">
              Home
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default AcceptInvite;
