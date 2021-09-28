import admin from 'firebase-admin';
import { Request, Response } from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';

export default class CommentController {
   
    public async addCommentsProduct(req: Request, res: Response): Promise<void> {
        try {
            await admin.firestore().collection('comment')
                .doc(`${req.body.uid}${req.body.productId}`)
                .set(req.body, { merge: true });
    
            RouterResponse.success(req.body, res);
        } catch (error) {
            RouterResponse.error('Erro ao adicionar comentário no produto', res);
        }
    }

    public async getCommentsProduct(req: Request, res: Response): Promise<void> {
        try {
            const dataResponse: any = [];

            const result = await admin.firestore().collection('comment')
                .where('productId', '==', req.params.productId).get();
            
            result?.docs.forEach(comment => {
                dataResponse.push(comment.data());
            });
    
            RouterResponse.success(dataResponse, res);
        } catch (error) {
            RouterResponse.error('Erro ao buscar os comentários do produto', res);
        }
    }

    public async deleteCommentsProduct(req: Request, res: Response): Promise<void> {
        try {
            await admin.firestore().collection('comment')
                .doc(`${req.params.uid}${req.params.productId}`).delete();

            RouterResponse.success('Success', res);
        } catch (error) {
            RouterResponse.error('Erro ao deletar comentário', res);
        }
    }
}