import './App.css';
import Login from './AppComps/Login';
import Home from './AppComps/Home';
import SignUp from './AppComps/Signup';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
function App() {
  const {currentUser}=useContext(AuthContext);
  const protectedRoute=({children})=>{
    if(!currentUser){
      return (<Navigate to="/login"/>);
    }
    return children;
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={
            <protectedRoute>
              <Home />
            </protectedRoute>}
            />
            <Route path='login' element={<Login />}/>
            <Route path='signup' element={<SignUp />}/>
          </Route>
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
