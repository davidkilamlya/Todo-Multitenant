import { MdRestore } from "react-icons/md";
import "./TodoItem.scss";

import { AiOutlineDelete } from "react-icons/ai";

function TodoItem({
  title,
  priority,
  status,
  key,
  itemId,
  listId,
  deleteItem,
  completed,
  handleCompleted,
  activeTab,
  itemRef,
}) {
  return (
    <div className="todo-item">
      <div className="todo-item-container">
        {activeTab ? (
          <div className="todo-item-checkbox-container" ref={itemRef}>
            <input
              type="checkbox"
              name="todoItem"
              className="todo-item-checkbox"
              onChange={(e) => handleCompleted(e, listId, itemId)}
            />
          </div>
        ) : (
          <div
            className="restore-item-container"
            onClick={(e) => handleCompleted(e, listId, itemId)}
          >
            <MdRestore className="restore-item" />
          </div>
        )}
        <div className="todo-item-title-description-container">
          <p className="todo-item-title">{title}</p>
        </div>
        <div className="todo-item-priority-container">
          <div
            className="delete-item-container"
            onClick={() => deleteItem(listId, itemId)}
          >
            <AiOutlineDelete className="delete-item" />
          </div>
          <div className={priority} title={priority}></div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
