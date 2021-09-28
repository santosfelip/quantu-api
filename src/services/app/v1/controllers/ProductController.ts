import { Response, Request } from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';
import admin from 'firebase-admin';
import { CollaborativeFilter } from '../../../../libraries/CollaborativeFilter';
import EventControler from './EventController';
import FeedBackController from './FeedBackController';

export default class ProductController {

    public async add(req: Request, res: Response) {
        try{    
            const productId = await admin.firestore().collection('product').doc().id;
            
            await admin.firestore().collection('product')
                .doc(productId).create({
                    ...req.body,
                    price: req.body.price.toFixed(2),
                    productId,
                    likes: 0,
                    creat_at: admin.firestore.Timestamp.fromDate(new Date())
                });

            RouterResponse.success(req.body, res);
        } catch(err) {
            RouterResponse.error(err, res);
        }
    }

    public async delete(req: Request, res: Response) {
        try{
            await ProductController.removeById(req.params.productId);

            RouterResponse.success('success', res);
        } catch(err) {
            RouterResponse.error(err, res);
        }
    }

    public static async removeById(id: string): Promise<void> {
        try{
            // Remove os Eventos relacionados a esse produto
            await EventControler.deleteEventByThing(id);
            
            // Remove os FeedBacks relacionas a esse produto
            await FeedBackController.deleteById(id);

            // Remove o Produto 
            await admin.firestore()
                .collection('product')
                .doc(id).delete();
            
        } catch(err) {
            throw new Error(err);
        }
    }

    public async getPurchaseListProducts(req: Request, res: Response) {
        try{
            const result = await admin.firestore().collection('user')
                .where('uid', '==', req.params.userId).get();
                
            if(!result.size) {
                return RouterResponse.error('Usuário não encontrado!', res);
            };

            const ref = admin.firestore().collection('product');

            const dataResponse:any = [];
            const promises: any = [];
            result.docs[0].data()?.purchaseList?.forEach((productId) => {
                promises.push(ref.where('productId', '==', `${productId}`).get());
            });

            const products: any = await Promise.all(promises);

            products?.forEach(product => {
                dataResponse.push(product?.docs[0].data());
            });
 
            RouterResponse.success(dataResponse, res);
        } catch(err) {
            RouterResponse.error(err, res);
        }
    }

    public async getProducts(req: Request, res: Response) {
        let dataResponse:any = [];
        try{
            const result = await admin.firestore().collection('user')
                .where('uid', '==', req.params.userId).get();
                
            if(!result.size) {
                return RouterResponse.error('Usuário não encontrado!', res);
            };

            const userSaved = result.docs[0].data();

            const products = await ProductController.getFilterProducts(userSaved, req.query.categories);
            products?.docs?.forEach(element => { 
                dataResponse.push(element.data());
            });

            RouterResponse.success(dataResponse, res);
        } catch(err) {
            RouterResponse.error(err, res);
        }
    }

    public static async getFilterProducts(userSaved, categories) {
        try {
            if(!categories?.length) {
                return await admin.firestore().collection('product')
                    .where('stateCode', '==', userSaved.stateCode || '')
                    .where('city', '==', userSaved.city || '').get();
            }

            if(categories.includes('Produtos Recomendados')) {
                return await ProductController.getRecommendation(userSaved, categories);
            } else {
                return await admin.firestore().collection('product')
                    .where('stateCode', '==', userSaved.stateCode || '')
                    .where('city', '==', userSaved.city || '')
                    .where('category', 'in', categories).get();
            }
        } catch (error) {
            return error;
        }
    }

    public async getProductsOfUser(req: Request, res: Response) {
        let dataResponse:any = [];

        try {
            const result = await admin.firestore().collection('product')
                .where('uid', '==', req.params.userId).get();
                
            if(result.size) {
                result.docs.forEach(product => dataResponse.push(product.data()));
            }

            RouterResponse.success(dataResponse, res);
        } catch(err) {  
            RouterResponse.error(err, res);
        }
    }

    public async getProductByProductId(req: Request, res: Response) {
        try {
            const result = await admin.firestore().collection('product')
                .where('productId', '==', req.params.productId).get();
                
            let dataResponse = {};
            if(result.size) {
                dataResponse = result.docs[0].data();
            }

            RouterResponse.success(dataResponse, res);
        } catch(err) {  
            RouterResponse.error(err, res);
        }
    }

    public static async getRecommendation(userSaved, categories) {
        try {
            let dataResponse: any = [];
            const result = await new CollaborativeFilter().getRecommendations(userSaved.uid);

            const ref = await admin.firestore().collection('product');
            for(const product of result.recommendations) {
                let documentSaved = null;

                if(categories.length === 1 && categories[0] === 'Produtos Recomendados') {
                    documentSaved = await ref.where('productId', '==', `${product.thing}`)
                    .where('stateCode', '==', userSaved.stateCode)
                    .where('city', '==', userSaved.city).get();
                } else {
                    documentSaved = await ref.where('productId', '==', `${product.thing}`)
                        .where('stateCode', '==', userSaved.stateCode)
                        .where('city', '==', userSaved.city)
                        .where('category', 'in', categories).get();
                }
                
                if(documentSaved?.size) {
                    dataResponse.push(documentSaved.docs[0]);
                }
            };

            return { docs: dataResponse };
        } catch (error) {
            return error;
        }
    }
}