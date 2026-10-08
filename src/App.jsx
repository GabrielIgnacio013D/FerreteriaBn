import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductosProvider } from './context/ProductosContext';

import Login from './pages/Login';
import MenuPrincipal from './pages/MenuPrincipal';
import Productos from './pages/Productos';
import Categorias from './pages/Categorias';
import ProductoDetalle from './pages/ProductoDetalle';

import './App.css';

function App() {
  return (
    <ProductosProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<MenuPrincipal />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ProductosProvider>
  );
}

export default App;