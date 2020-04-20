import { db } from '../../lib/db'
import admin from 'firebase-admin'
import auth0 from '../../lib/auth0'

const saveStatus = async (request, response) => {
    const session = await auth0.getSession(request)
    if(session) {
        const dados = request.body
        await db
        .collection('test')
        .add({
            status: dados.status,
            user: session.user.sub,
            coordinates: new admin.firestore.GeoPoint(dados.coords.lat, dados.coords.long)
        })
    }
}

export default saveStatus