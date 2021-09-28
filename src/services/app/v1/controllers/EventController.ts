import admin from 'firebase-admin';
import { Response, Request } from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';
import { CollaborativeFilter } from '../../../../libraries/CollaborativeFilter';

export default class EventController {
    public async add(req: Request, res: Response) {
        try{

            // A biblioteca de Filtragem Colaborativa requer uma validade no Evento
            // Então coloquei de 1 ano
            const data = new Date(new Date().setFullYear(new Date().getFullYear() + 1))    
            const expires_at = data.toISOString().split('T')[0];

            let newEvent = {
                ...req.body,
                expires_at,
                namespace: 'products'
            };

            const eventId = `${newEvent.person}${newEvent.thing}`;

            // Referencia ao documento no DB
            const ref = admin.firestore().collection('events').doc(eventId);
            // Incremento
            let increment = 1;
            if(req.body.action === 'likes') {
                await ref.set(newEvent);
            } else {
                // O evento é de dislike, então o incremento é negativo
                increment = -1;
                await ref.delete();
            }

            // Atualiza o campo relacionado ao número de likes no Produto
            await admin.firestore().collection('product').doc(newEvent.thing)
                .update({ likes: admin.firestore.FieldValue.increment(increment) });
    
            RouterResponse.success(req.body, res);
        } catch(err) {
            RouterResponse.error(err, res);
        }
    }


    public async getProductsLikes(req: Request, res: Response) {
        let dataResponse: any = [];

        try{
            const result = await admin.firestore().collection('events')
                .where('action', '==', 'likes')
                .where('person', '==', req.params.userId).get();

            result.docs.forEach(event => {
                dataResponse.push(event.data().thing);
            });

            RouterResponse.success(dataResponse, res);
        } catch(err) {
            RouterResponse.error(err, res);
        }
    }

    /**
     * Método responsável em excluir todos os Eventos
     * relacionados a um Produto que foi excluído do DB
     * 
     * @param productId 
     */
    public static async deleteEventByThing(productId: string): Promise<void> {
        try{
            // Busca todos os eventos com o id do produto
            const result = await admin.firestore().collection('events')
                .where('thing', '==', productId).get();

            const promises = [];
            if(result.size) { 
                result.docs.forEach(event => {
                    promises.push(
                        admin.firestore().collection('events')
                            .doc(`${event.data().person}${event.data().thing}`).delete()
                    );
                });
            }

            await Promise.all(promises);
        } catch(err) {
            throw Error(err);
        }
    }
}