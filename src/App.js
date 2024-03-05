import * as React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Employees from "./pages/Employees";
import Detail from "./pages/Detail";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route element={<Employees/>} path="/employees" exact/>
          <Route element={<Detail/>} path="/employees/:id"/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
