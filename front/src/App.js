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


function App() {
  return (
    <>

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


      </Routes>




      {/* <Routes>
     <Route exact path="/"/>

   </Routes> */}


    </>
  );
}

export default App;