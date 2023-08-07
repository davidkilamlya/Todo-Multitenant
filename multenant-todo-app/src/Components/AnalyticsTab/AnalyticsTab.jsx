import "./AnalyticsTab.scss"

function AnalyticsTab() {
  const analyticsData = ["High", "Medium", "Low"];
  return (
    <div className="analytics-tab">
      <div className="analytics-tab-container">
         {analyticsData.map((item, index) => {
        return (
          <div className="analytics-tab-container-item" key={index}>
            <div className={item}></div>
            <span className="todo-item-priority">{item}</span>
          </div>
        );
      })}
      </div>
     
    </div>
  );
}

export default AnalyticsTab;
