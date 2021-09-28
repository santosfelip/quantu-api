import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class FeedBackValidator {
    public static add() {
        const schema: Record<string, ParamSchema> = {
            action: {
                in: 'body',
                isString: true,
                notEmpty: true,
                isIn: {
                    options: [['add','remove']]
                }
            },
            userId: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            productId: {
                in: 'body',
                isString: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static get() {
        const schema: Record<string, ParamSchema> = {
            id: {
                in: 'params',
                isString: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema);
    }
}