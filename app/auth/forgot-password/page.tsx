import type { Metadata } from 'next'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import Link from 'next/link'

export const metadata : Metadata= {
    title: 'CashTrackr - Olvidé mi Password',
    description: 'CashTrackr - Olvidé mi Password',
}
export default function ForgotPasswordPage() {
    return (
        <>
            <h1 className='font-black text-6xl text-purple-950'>¿Olvidaste tu Contraseña?</h1>
            <p className='text-3xl font-bold'>Aquí puedes <span className='text-amber-500'>Reestablecerla</span></p>
            <ForgotPasswordForm/>

            <nav className='mt-10 flex flex-col space-y-4'>
                <Link
                    href='/auth/login'
                    className='text-center text-gray-500'
                >   
                    ¿Ya tenés una cuenta? Iniciar Sesión 
                </Link>
                
                <Link
                    href='/auth/register'
                    className='text-center text-gray-500'
                >   
                    ¿No tenés una cuenta? Crea una
                </Link>
            </nav>
        </>
    )
}
