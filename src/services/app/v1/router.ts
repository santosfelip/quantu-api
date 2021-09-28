import UserValidator from './validators/UserValidator';
import AuthValidator from './validators/AuthValidator';
import ProductsValidator from './validators/ProductsValidator';
import EventValidator from './validators/EventValidator';
import FeedBackValidator from './validators/FeedBackValidator';
import CommentValidator from './validators/CommentValidator';

export const routes = {
    
    // Rota de Autenticação
    'POST /auth': {
        path: 'AuthController.getAccessToken',
        middlewares: AuthValidator.getAccessToken()
    },

    // Rotas de usuario
    'POST /user/register': {
        path: 'UserController.add',
        middlewares: UserValidator.addUser()
    },
    'GET /user/:id': {
        path: 'UserController.getUser',
        middlewares: UserValidator.getUser()
    },
    'GET /users/:id': {
        path: 'UserController.getUsersCity',
        middlewares: UserValidator.getUser()
    },
    'PATCH /user/:id': {
        path: 'UserController.edit',
        middlewares: UserValidator.getUser()
    },

    // Rota de produtos
    'POST /product': {
        path: 'ProductController.add',
        middlewares: ProductsValidator.addProduct()
    },

    'DELETE /product/:productId': {
        path: 'ProductController.delete',
        middlewares: ProductsValidator.getProductById()
    },

    'GET /products/:userId': {
        path: 'ProductController.getProducts',
        middlewares: ProductsValidator.getProducts()
    },

    'GET /products/purchase-list/:userId': {
        path: 'ProductController.getPurchaseListProducts',
        middlewares: ProductsValidator.getProducts()
    },


    'GET /product/:productId': {
        path: 'ProductController.getProductByProductId',
        middlewares: ProductsValidator.getProductById()
    },

    'GET /products/user/:userId': {
        path: 'ProductController.getProductsOfUser',
        middlewares: ProductsValidator.getProducts()
    },

    // Rotas de Evento
    'POST /event': {
        path: 'EventController.add',
        middlewares: EventValidator.addEvent()
    },

    'GET /likes/:userId': {
        path: 'EventController.getProductsLikes',
        middlewares: ProductsValidator.getProducts()
    },

    // Rotas de FeedBack
    'POST /feedback': {
        path: 'FeedBackController.add',
        middlewares: FeedBackValidator.add()
    },

    'GET /feedbacks/:id': {
        path: 'FeedBackController.getProductsId',
        middlewares: FeedBackValidator.get()
    },

    // Rotas de Comentários do Produto
    'POST /comment': {
        path: 'CommentController.addCommentsProduct',
        middlewares: CommentValidator.addCommentsProduct()
    },
    'GET /comment/:productId': {
        path: 'CommentController.getCommentsProduct',
        middlewares: CommentValidator.getCommentsProduct()
    },
    'DELETE /comment/:productId/:uid': {
        path: 'CommentController.deleteCommentsProduct',
        middlewares: CommentValidator.deleteCommentsProduct()
    }
}