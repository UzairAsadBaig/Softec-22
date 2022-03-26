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
import DocProfile from "./components/Dashboard/DocProfile";
import Booking from "./components/Dashboard/Booking";
import Clinic from "./components/Dashboard/Clinic";
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

        <Route exact path="dashboard" element={<Sidenavbar />}>
              <Route exact path="" element={<DocProfile />} />
              <Route exact path="profile" element={<DocProfile />} />
              <Route exact path="clinic" element={<Clinic />} />
              <Route exact path="booking" element={<Booking />} />
              
         </Route>


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