import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class ProductsValidator {

    public static addProduct() {
        const schema: Record<string, ParamSchema> = {
            uid: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            title: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            marketName: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            brand: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            price: {
                in: 'body',
                isFloat: true,
                toFloat: true
            },
            isPromotional: {
                in: 'body',
                isBoolean: true
            },
            stateCode: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            city: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            category: {
                in: 'body',
                isString: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static getProducts() {
        const schema: Record<string, ParamSchema> = {
            userId: {
                in: 'params',
                isString: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static getProductById() {
        const schema: Record<string, ParamSchema> = {
            productId: {
                in: 'params',
                isString: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static getRecommendationsById() {
        const schema: Record<string, ParamSchema> = {
            userId: {
                in: 'params',
                isString: true,
                notEmpty: true
            }
        }
        //TODO: SÒ PARA TESTE
        return RouterRequest.checkSchema(schema, false);
    }
}