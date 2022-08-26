import './dashboard.css';
import {
  useState,
  useEffect,
} from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
} from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import Noticias from './components/noticias/noticias';
import Balancetes from './components/balancetes/balancetes';
import Usuarios from './components/usuarios/usuarios';

function Dashboard() {

  const [carregarToken, setCarregarToken] = useState(true);
  const [token, setToken] = useState(true);

  useEffect(() => {

    function obterToken(){
        setToken(sessionStorage.getItem('token'));
    }

    if(carregarToken){
        obterToken();
        setCarregarToken(false);
    }
  }, [carregarToken]);

  if(!token) {
    return <Login setCarregarToken={setCarregarToken} />
  }

  return (
    <BrowserRouter basename="/dashboard">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/noticias" element={<Noticias />} exact />
        <Route path="/balancetes" element={<Balancetes />} exact />
        <Route path="/usuarios" element={<Usuarios />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default Dashboard;
