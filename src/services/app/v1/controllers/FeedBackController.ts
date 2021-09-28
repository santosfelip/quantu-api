import admin from 'firebase-admin';
import { Response, Request } from 'express';
import ProductController from './ProductController';
import RouterResponse from '../../../../libraries/RouterResponse';


export default class FeedBackController {

    public async add(req: Request, res: Response): Promise<void> {
        try {
            const { userId, productId, action } = req.body;

            const feedBackSaved = await FeedBackController.getById(productId);

            const ref = admin.firestore().collection('feedback').doc(productId);
            const increment = action === 'add' ? 1 : -1;
            
            if(feedBackSaved) {
                const NUMBER_MAX_FEEDBACKS = 4;
                if(feedBackSaved?.feedbacks === NUMBER_MAX_FEEDBACKS && increment === 1) {
                    // Remove o Produto
                    await ProductController.removeById(productId);
                } else {
                    const operator = increment === 1 ?
                        admin.firestore.FieldValue.arrayUnion(userId)
                        : admin.firestore.FieldValue.arrayRemove(userId)

                    await ref.update({
                        usersId: operator,
                        feedbacks: admin.firestore.FieldValue.increment(increment) 
                    });
                }
            } else {
                await ref.set({
                    usersId: [userId],
                    productId,
                    feedbacks: 1 
                });
            }

            RouterResponse.success({}, res);
        } catch (error) {
            RouterResponse.error(error, res);
        }
    }

    public async getProductsId(req: Request, res: Response): Promise<void> {
        try {
            const dataResponse = [];

            const feedbacks = await admin.firestore().collection('feedback')
                                .where('usersId', 'array-contains', req.params.id).get();

            feedbacks.docs
                .forEach(doc => dataResponse.push(doc.data().productId));

            RouterResponse.success(dataResponse, res);
        } catch (error) {
            RouterResponse.error(error, res);
        }
    }

    public static async getById(productId: string): Promise<any> {
        try {
            const feedBackSaved = await admin.firestore().collection('feedback')
                .doc(productId).get();

            return feedBackSaved?.data();
        } catch (err) {
            throw new Error(err);
        }
    }

    public static async deleteById(productId: string): Promise<void> {
        try {
            await admin.firestore().collection('feedback')
                .doc(productId).delete();
        } catch (err) {
            throw new Error(err);
        }
    }
}