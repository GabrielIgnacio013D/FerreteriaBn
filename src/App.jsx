import { useState } from 'react';
import { ProductosProvider } from './context/ProductosContext';
import Login from './pages/Login';
import MenuPrincipal from './pages/MenuPrincipal';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ProductosProvider>
      {isAuthenticated ? (
        <MenuPrincipal onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </ProductosProvider>
  );
}

export default App;