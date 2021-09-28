import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';
import { ACCESS_TOKEN_SECRET, EXPIRE_TOKEN } from '../../../../config/environment';

export default class AuthController {

    public async getAccessToken(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            // Busca o usuário no banco pelo email cadastrado
            const result = await admin.firestore().collection('user')
                .where('email', "==", email).get();
            
            if(!result.size) {
                return RouterResponse.error('Credenciais não encontradas', res);
            }

            // Compare o hash com o password enviado
            const match = await bcrypt.compare(password, result.docs[0].data().password);
           
            if(!match) {
                return RouterResponse.error('Credenciais não encontradas', res);
            }

            // Objeto com os dados do usuário não confidenciais
            const dataResponse = {
                ...result.docs[0].data()
            };

            delete dataResponse.password;

            const accessToken = jwt.sign(dataResponse, ACCESS_TOKEN_SECRET, {
                subject: String(result.docs[0].data().uid),
                expiresIn: EXPIRE_TOKEN
            });

            RouterResponse.success({ accessToken }, res);
        } catch(err) {
            RouterResponse.error(err, res);
        }
    }
}