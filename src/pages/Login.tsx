import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí iría la lógica de autenticación real
    // Por ahora, usaremos credenciales de prueba
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border border-border/50">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-foreground">
              Acceso al Panel de Administración
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive-foreground px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="block text-sm font-medium text-foreground mb-1">
                  Usuario
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                  placeholder="Ingresa tu usuario"
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" size="lg">
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Button>
            </div>
          </form>

          <div className="text-center text-sm text-muted-foreground mt-6">
            <p>¿No tienes acceso? Contacta al administrador del sistema.</p>
          </div>
        </div>
      </main>
      
    </div>
  );
}
