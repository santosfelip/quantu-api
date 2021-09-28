import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class UserValidator {

    public static addUser() {
        const schema: Record<string, ParamSchema> = {
            name: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            email: {
                in: 'body',
                isEmail: true,
                isEmpty: {
                    negated: true
                }
            },
            password: {
                in: 'body',
                isString: true,
                notEmpty: true,
                isLength: {
                    options: { min: 6 },
                }
            },
            city: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            stateCode: {
                in: 'body',
                isString: true,
                notEmpty: true
            }
        };

        return RouterRequest.checkSchema(schema, false);
    }

    public static getUser() {
        const schema: Record<string, ParamSchema> = {
            id: {
                in: 'params',
                isString: true,
                notEmpty: true
            }
        };

        return RouterRequest.checkSchema(schema);
    }

}