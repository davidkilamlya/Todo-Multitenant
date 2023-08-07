import { useRef } from "react";
import "./FilterChamber.scss";

function FilterChamber({
  activeTab,
  setActiveTab,
  activeAdded,
  setActiveAdded,
  completedAdded,
  setCompletedAdded,
}) {
  const activeRef = useRef();
  const completedRef = useRef();

  //handle active tab
  const handleActiveChange = () => {
    activeRef.current.className = "filter-completed-container active";
    completedRef.current.className = "filter-completed-container";
    setActiveAdded(0);
    setActiveTab(true);
  };

  const handleCompletedChange = () => {
    activeRef.current.className = "filter-completed-container";
    completedRef.current.className = "filter-completed-container active";
    setCompletedAdded(0);
    setActiveTab(false);
  };

  return (
    <div className="filter-item-chamber-container">
      <div className="filter-completed-div-container">
        <div
          className="filter-completed-container active"
          ref={activeRef}
          onClick={() => handleActiveChange()}
        >
          <p className="filter-completed">Active</p>
          {!activeTab &&
            activeAdded !==
              0 && (
                <div className="active-alert-container">
                  <span className="active-alert">+{activeAdded}</span>
                </div>
              )}
        </div>
        <div
          className="filter-completed-container"
          ref={completedRef}
          onClick={() => handleCompletedChange()}
        >
          <p className="filter-completed">Completed</p>
          {activeTab &&
            completedAdded !==
              0 && (
                <div className="active-alert-container">
                  <span className="active-alert">+{completedAdded}</span>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}

export default FilterChamber;
