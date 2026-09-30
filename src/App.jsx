import { useState } from 'react';
import Login from './pages/Login';
import MenuPrincipal from './pages/MenuPrincipal';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (correo) => {
    // Al presionar Iniciar Sesión nos cambia de vista
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <MenuPrincipal onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;