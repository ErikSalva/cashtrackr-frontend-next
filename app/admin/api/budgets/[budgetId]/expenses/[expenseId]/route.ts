import { verifySession } from '@/src/auth/dal'
import getToken from '@/src/auth/token'


export async function GET(request: Request,  {params }: {params: Promise<{ budgetId: string, expenseId: string}> }) {

    await verifySession() // porque la proteccion que hicimos en el layout de admin no aplica a este tipo de archivos

    const token = await getToken()

    const {budgetId, expenseId} = await params
    
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`

    const req = await fetch(url, {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()

    if (!req.ok) {
        return Response.json(json.error, {status: 403})
    }

    
    return Response.json(json)
}

