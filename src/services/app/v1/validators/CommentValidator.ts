import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class CommentValidator {

    public static addCommentsProduct() {
        const schema: Record<string, ParamSchema> = {
            uid: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            userName: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            productId: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            message: {
                in: 'body',
                isString: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema, false);
    }

    public static getCommentsProduct() {
        const schema: Record<string, ParamSchema> = {
            productId: {
                in: 'params',
                isString: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema, false);
    }

    public static deleteCommentsProduct() {
        const schema: Record<string, ParamSchema> = {
            uid: {
                in: 'params',
                isString: true,
                notEmpty: true
            },
            productId: {
                in: 'params',
                isString: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema, false);
    }

}