import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';
import express from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';

enum EUserPlans {
    INICIANTE = 'iniciante',
    PROFISSIONAL = 'profissional',
    MESTRE = 'mestre',
    SENIOR = 'senior'
}
export default class UserController {

    //Cria um novo usuario na base de dados
    public async add(req: express.Request, res: express.Response) {
        
        const data: userInterface = req.body;
        try {
            // Busca no banco se já existe o email cadastrado
            const result = await admin.firestore().collection('user')
                .where('email', '==', req.body.email).get();

            if(result.size) {
               return RouterResponse.error('Email já cadastrado', res);
            }

            const salt = bcrypt.genSaltSync(10);
            const password = bcrypt.hashSync(data.password, salt);

            // exclue a senha salva sem o hash
            delete data.password;

            const uid =  await admin.firestore().collection('user').doc().id
            const newUser = {
                ...data,
                password,
                points: 0,
                plan: EUserPlans.INICIANTE,
                purchaseList: [],//Lista de ids de Produtos curtidas
                uid
            }

            // Salva o novo usuário no BD
            await admin.firestore().collection('user')
                .doc(uid).create(newUser);

            RouterResponse.success(newUser, res);
        } catch (error) {
            RouterResponse.error('Erro ao criar usuário', res);
        }
    }

    public async getUser(req: express.Request, res: express.Response) {
        let dataResponse:any = {};
        
        try {
            const result = await admin.firestore().collection('user')
                .where('uid', '==', req.params.id).get();
                
            if(result.size) {
                dataResponse = result.docs[0].data();
                delete dataResponse.password;
            }

            RouterResponse.success(dataResponse, res);
        } catch(err) {  
            RouterResponse.error(err, res);
        }
    }

    public async getUsersCity(req: express.Request, res: express.Response) {
        let user:any = {};
        const usersDataResponse = [];

        try {
            const result = await admin.firestore().collection('user')
                .where('uid', '==', req.params.id).get();
                
            if(!result.size) {
                return RouterResponse.error('Id não encontrado', res);
            }

            user = result.docs[0].data();

            const allUsersInCity = await admin.firestore().collection('user')
                    .where('stateCode', '==', user.stateCode)
                    .where('city', '==', user.city).get();
            
            if(allUsersInCity.size) {
                allUsersInCity.docs.forEach(user => 
                    usersDataResponse.push({ 
                        name: user.data().name, 
                        points: user.data().points 
                    })
                );
            }

            RouterResponse.success(usersDataResponse, res);
        } catch(err) {  
            RouterResponse.error(err, res);
        }
    }

    public async edit(req: express.Request, res: express.Response) {
        const data: any = req.body;
        const userId = req.params.id;

        try {
            const userSaved = await admin.firestore().collection('user')
            .where('uid', '==', userId).get();

            // Busca no banco se já existe o email cadastrado
            const result = await admin.firestore().collection('user')
                .where('email', '==', data?.email || '').get();

            if(result.size > 1 || result.size == 1 && result?.docs[0]?.data().uid !==  userId) {
                return RouterResponse.error('Email já cadastrado', res);
            }

            const salt = bcrypt.genSaltSync(10);
            const password = data?.password ? 
                bcrypt.hashSync(data?.password, salt) : userSaved.docs[0]?.data().password;

            const newPlan = data?.points ? 
                UserController.upatePlan(data?.points) : userSaved.docs[0]?.data().plan;

            const newUser = {
                name: data?.name || userSaved.docs[0]?.data().name,
                email: data?.email || userSaved.docs[0]?.data().email,
                city: data?.city || userSaved.docs[0]?.data().city,
                stateCode: data?.stateCode || userSaved.docs[0]?.data().stateCode,
                points:  data?.points || userSaved.docs[0]?.data()?.points || 0,
                plan: newPlan,
                password,
                purchaseList: data?.purchaseList || userSaved.docs[0]?.data()?.purchaseList || [],
                uid: userId
            };

            await admin.firestore().collection(`user`)
                .doc(newUser.uid).update(newUser);

            // Remove a senha para não enviá-la ao cliente
            delete newUser.password;
    
            RouterResponse.success(newUser, res);
        } catch (error) {
            RouterResponse.error('Erro ao editar usuário', res);
        }
    }

    public static upatePlan(numberAllPoints: number): String {
        let plan = EUserPlans.INICIANTE;
        
        if(numberAllPoints >= 1500) {
            plan = EUserPlans.SENIOR;
        } else if(numberAllPoints >= 800 && numberAllPoints < 1500) {
            plan = EUserPlans.MESTRE;
        } else if(numberAllPoints >= 300 && numberAllPoints < 800) {
            plan = EUserPlans.PROFISSIONAL;
        }

        return plan;
    }
}

interface userInterface {
    name: string,
    email: string,
    password: string,
    city: string,
    plan: string,
    stateCode: string,
    purchaseList?: string[],
    points?: number
};