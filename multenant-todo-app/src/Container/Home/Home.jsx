import Header from "../../Components/Header/Header";

import TodoPage from "../TodoPage/TodoPage";

import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <Header />
      <TodoPage />
    </div>
  );
}

export default Home;
