import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Si no está autenticado, redirigir a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizar los componentes hijos
  return <Outlet />;
}
