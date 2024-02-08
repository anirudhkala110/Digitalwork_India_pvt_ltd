import './App.css';
import CL from './Components/CreatingLicence/CL';
import Home from './Components/Home/Home';
import Login from './Auth/LoginRegister/Login';
import Register from './Auth/LoginRegister/Register';
import Test from './Components/Test/Test';
import Navbar from './Utils/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from '../src/Auth/Context/AuthProvider';

function App() {
  const { login } = useAuth();
  return (
    <AuthProvider>
      <div style={{ minHeight: "100vh",minWidth:"560px" }}>
        <Navbar />
        <div>
          <Router>
            <Routes>
              <Route exact path='/' element={!login ? <Login /> : <Home />} />
              <Route exact path='/login' element={!login ? <Login /> : <Home />} />
              <Route exact path='/home' element={!login ? <Login /> : <Home />} />
              <Route exact path='/sign-up' element={<Register />} />
              <Route exact path='/test' element={!login ? <Login /> : <Test />} />
              <Route exact path='/create-license' element={!login ? <Login /> : <CL />} />
            </Routes>
          </Router>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;

