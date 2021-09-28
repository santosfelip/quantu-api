import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class EventValidator {
    public static addEvent() {
        const schema: Record<string, ParamSchema> = {
            action: {
                in: 'body',
                isString: true,
                notEmpty: true,
                isIn: {
                    options: [['likes','dislikes']]
                }
            },
            person: {
                in: 'body',
                isString: true,
                notEmpty: true
            },
            thing: {
                in: 'body',
                isString: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

}