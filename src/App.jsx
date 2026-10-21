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
import AdminDashboard from './pages/AdminDashboard';
import AdminProductos from './pages/AdminProductos';
import AdminCategorias from './pages/AdminCategorias';
import AdminCriticos from './pages/AdminCriticos';
import AdminSolicitudes from './pages/AdminSolicitudes';
import AdminSolicitudDetalle from './pages/AdminSolicitudDetalle';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminHistorial from './pages/AdminHistorial';
import AdminReportes from './pages/AdminReportes';
import AdminPerfil from './pages/AdminPerfil';

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

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/productos" element={<AdminProductos />} />
            <Route path="/admin/categorias" element={<AdminCategorias />} />
            <Route path="/admin/criticos" element={<AdminCriticos />} />
            <Route path="/admin/solicitudes" element={<AdminSolicitudes />} />
            <Route path="/admin/solicitudes/:id" element={<AdminSolicitudDetalle />} />
            <Route path="/admin/usuarios" element={<AdminUsuarios />} />
            <Route path="/admin/usuarios/:id/historial" element={<AdminHistorial />} />
            <Route path="/admin/reportes" element={<AdminReportes />} />
            <Route path="/admin/perfil" element={<AdminPerfil />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CarritoProvider>
    </ProductosProvider>
  );
}

export default App;