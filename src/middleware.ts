import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Definimos qué rutas queremos proteger
  const protectedPaths = ['/admin'];
  
  // Verificamos si la URL actual empieza con alguna de las rutas protegidas
  const isProtected = protectedPaths.some((path) => 
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected) {
    // 2. Pedimos la autenticación básica (aparece ventanita del navegador)
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      // Decodificamos el usuario y contraseña que escribió la persona
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // 3. Verificamos si coinciden con las del archivo .env
      if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASSWORD) {
        return NextResponse.next(); // ¡Pase usted!
      }
    }

    // Si no puso contraseña o es incorrecta, le denegamos el acceso
    return new NextResponse('Autenticación requerida', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Zona Segura de Admin"',
      },
    });
  }

  return NextResponse.next();
}

// Configuración: En qué rutas se debe activar este archivo
export const config = {
  matcher: ['/admin/:path*', '/nuevo-evento/:path*'],
};