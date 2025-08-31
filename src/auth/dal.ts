// Data Access Layer
import "server-only"
// ⚠️ Este módulo se marca como "server-only" porque:
// 1. Solo se ejecuta en el servidor (usa `cookies()` y `redirect()` que no existen en el cliente).
// 2. Nunca debe importarse en un Client Component, para evitar errores en build o runtime.
// 3. No es un Server Action (`use server`) porque no se llama desde el cliente; solo lo usan Server Components.
// En resumen: "server-only" protege el módulo entero, asegurando que Next.js lo trate como código exclusivo de servidor.

import { cache } from 'react';
import { redirect } from 'next/navigation';
import { UserSchema } from '../schemas';
import getToken from './token';

/**
 * verifySession: Función que verifica la sesión del usuario leyendo la cookie JWT
 * y haciendo fetch a la API para obtener los datos del usuario.
 * 
 * Usamos `cache` de React para que el resultado de esta función se memorice
 * en el servidor. Esto significa que si varios Server Components llaman a
 * verifySession, no se repetirá el fetch ni la validación mientras la cache
 * siga vigente, mejorando la performance.
 * 
 * Nota: La cache no se invalida automáticamente si la cookie cambia o el
 * usuario se desloguea. Hay que manejar revalidación si se necesita.
 */
export const verifySession = cache( async () => {

    const token = await getToken()
    if(!token) {
        redirect('/auth/login')
    }

    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url, {

        headers: {
           Authorization : `Bearer ${token}` 
        }
    })

    const session = await req.json()
    const result = UserSchema.safeParse(session)

    if(!result.success){
        redirect('/auth/login')
    }

    return {
        user: result.data,
        isAuth: true
    }
})