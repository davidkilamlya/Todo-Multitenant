import { useRef } from "react";
import "./TopFilterNav.scss";

function TopFilterNav({ activeNav, setActiveNav }) {
  const allRef = useRef();
  const ownedRef = useRef();
  const collaboratedRef = useRef();

  const makeAllActive = () => {
    setActiveNav("all");
    allRef.current.className = "all-nav-container active-tab";
    ownedRef.current.className = "all-nav-container";
    collaboratedRef.current.className = "all-nav-container";
  };
  const makeOwnedActive = () => {
    setActiveNav("owned");
    ownedRef.current.className = "all-nav-container active-tab";
    allRef.current.className = "all-nav-container";
    collaboratedRef.current.className = "all-nav-container";
  };
  const makeCollaboratedActive = () => {
    setActiveNav("collaborated");
    collaboratedRef.current.className = "all-nav-container active-tab";
    ownedRef.current.className = "all-nav-container";
    allRef.current.className = "all-nav-container";
  };

  return (
    <div className="top-filter-nav-container">
      <div className="filter-nav-container-div">
        <div
          className="all-nav-container active-tab"
          onClick={() => makeAllActive()}
          ref={allRef}
        >
          <span className="all ">All</span>
        </div>
        <div
          className="all-nav-container"
          onClick={() => makeOwnedActive()}
          ref={ownedRef}
        >
          <span className="all">My List</span>
        </div>
        <div
          className="all-nav-container"
          onClick={() => makeCollaboratedActive()}
          ref={collaboratedRef}
        >
          <span className="all">collaboration</span>
        </div>
      </div>
    </div>
  );
}

export default TopFilterNav;
