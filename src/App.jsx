import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductosProvider } from './context/ProductosContext';
import { CarritoProvider } from './context/CarritoContext';

import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';
import MenuPrincipal from './pages/MenuPrincipal';
import Productos from './pages/Productos';
import Categorias from './pages/Categorias';
import ProductoDetalle from './pages/ProductoDetalle';
import Ofertas from './pages/Ofertas';
import Blog from './pages/Blog';
import BlogDetalle from './pages/BlogDetalle';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import Resultado from './pages/Resultado';
import AdminProductos from './pages/AdminProductos';

import './App.css';

function App() {
  return (
    <ProductosProvider>
      <CarritoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/menu" element={<MenuPrincipal />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetalle />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/resultado/:id" element={<Resultado />} />
            <Route path="/admin/productos" element={<AdminProductos />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CarritoProvider>
    </ProductosProvider>
  );
}

export default App;