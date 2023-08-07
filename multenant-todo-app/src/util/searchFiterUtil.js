//handle search filter
exports.handleTodoListSearchFilter = (
  e,
  todoListData,
  setIsFiltering,
  setSearchField,
  fetchTodoListData,
  setTodoListData
) => {
  setIsFiltering(true);
  setSearchField(e.target.value);
  let filteredTodoListData = todoListData.filter((data) =>
    data.todoListTitle.includes(e.target.value.toLocaleLowerCase())
  );
  if (e.target.value === "") {
    fetchTodoListData();
  }
  setTodoListData(filteredTodoListData);
};

exports.handleTodoListItemSearchFilter = (
  e,
  listData,
  //   setIsFiltering,
  setSearchField,
  //   fetchTodoListData,
  setListData,
  //original todo items
  todoListItem
) => {
  //request new active list item list
  let newListItem = todoListItem.filter((item) => {
    return !item.completed;
  });
  //   setIsFiltering(true);
  setSearchField(e.target.value);
  let filteredItemData = listData.filter((data) =>
    data.title.includes(e.target.value.toLocaleLowerCase())
  );
  setListData(filteredItemData);

  //if input is empty return original list
  if (e.target.value === "") {
    setListData(newListItem);
  }
};
