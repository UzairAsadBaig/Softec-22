import {
  Routes,
  Route,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Sidenavbar from "./components/Sidenavbar";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import ProtectedRoute from './components/ProtectedRoute';
import UserState from "./context/users/UserState";
import AppState from "./context/appState/AppState";


function App() {
  return (
    <>
      <UserState>
        <AppState>
          <Routes>
            <Route exact path="login" element={<Signin />} />
            <Route exact path="signup" element={<Signup />} />


        <Route
          path="/"
          element={
            <ProtectedRoute redirectPath="/login" >
              <Home />
            </ProtectedRoute>

          }


        />



            {/* <Route exact path="login" element=""> */}

          </Routes>

        </AppState>

      </UserState>




      {/* <Routes>
     <Route exact path="/"/>

   </Routes> */}


    </>
  );
}

export default App;