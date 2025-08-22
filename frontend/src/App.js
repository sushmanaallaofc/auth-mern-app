import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import { AuthProvider, AuthContext } from './contexts/AuthContext'; 
import { useContext } from 'react';

function App() {
  const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;