import CollaboratorsList from "./Components/CollaboratorsList/CollaboratorsList";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/Register";
import Home from "./Container/Home/Home";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import AcceptInvite from "./Components/AcceptInvite/AcceptInvite";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route
            path="/:listId/collaborators"
            element={<CollaboratorsList />}
          />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/accept-invite/:inviteToken" element={<AcceptInvite />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
