import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './routes/home/Home';
import Cadastro from './routes/cadastro/Cadastro';
import Login from './routes/login/Login';
import App from './routes/app/App';
import User from './routes/user/User';

const PrivateRoute = ({ children, redirectTo }) => {
  let isAutenticated = localStorage.getItem("key");
  return isAutenticated ? children : <Navigate to={redirectTo}/>;
}

export default () => {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="/app" element={
        <PrivateRoute redirectTo="/login">
          <App/>
        </PrivateRoute>
      }/>
      <Route path="/app/user" element={
        <PrivateRoute redirectTo="/login">
          <User/>
        </PrivateRoute>
      }/>
    </Routes>
  );
}