import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductosProvider } from './context/ProductosContext';
import { CarritoProvider } from './context/CarritoContext';

import Login from './pages/Login';
import MenuPrincipal from './pages/MenuPrincipal';
import Productos from './pages/Productos';
import Categorias from './pages/Categorias';
import ProductoDetalle from './pages/ProductoDetalle';
import AdminProductos from './pages/AdminProductos';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import Resultado from './pages/Resultado';

import './App.css';

function App() {
  return (
    <ProductosProvider>
      <CarritoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<MenuPrincipal />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/resultado/:id" element={<Resultado />} />
            <Route path="/admin/productos" element={<AdminProductos />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </CarritoProvider>
    </ProductosProvider>
  );
}

export default App;