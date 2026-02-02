import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dahboard';
import Perfil from './pages/Perfil';

// componentes globais
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  // lista de rotas onde a Navbar/Footer NÃO devem aparecer (telas limpas)
  const rotasEscondidas = ['/login', '/cadastro'];
  const deveMostrarLayout = !rotasEscondidas.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen"> 

      {deveMostrarLayout && <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
      
      {deveMostrarLayout && <Footer />}
      
      <ToastContainer autoClose={3000} position="top-right" theme="colored" />
    </div>
  );
}

export default App;