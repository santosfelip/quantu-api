/**
 * @api {post} /product 1. Cadastro de produto
 * @apiVersion 0.1.0
 * @apiName productRegister
 * @apiGroup Product
 *
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * @apiParam {String} uid ID do usuário que está cadastrando o produto
 * @apiParam {String} title Título do Produto
 * @apiParam {String} marketName Nome do Mercado
 * @apiParam {String} brand Marca do Produto
 * @apiParam {Float} price Preço do produto
 * @apiParam {Boolean} isPromotional Se o produto está em promoção ou não
 * @apiParam {String} stateCode Código do estado do Produto
 * @apiParam {String} city Cidade do Produto
 * @apiParam {String} category Categoria do Produto
 *
 * @apiSuccess {String} uid ID do usuário que está cadastrando o produto
 * @apiSuccess {String} title Título do Produto
 * @apiSuccess {String} marketName Nome do Mercado
 * @apiSuccess {String} brand Marca do Produto
 * @apiSuccess {Float} price Preço do produto
 * @apiSuccess {Boolean} isPromotional Se o produto está em promoção ou não
 * @apiSuccess {String} stateCode Código do estado do Produto
 * @apiSuccess {String} city Cidade do Produto
 * @apiSuccess {String} category Categoria do Produto
 * @apiSuccess {String} productId ID do Produto gerado
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "uid": "UrR7pUPsgxHw2NNrAyWD",
 *       "title": "Arroz 5Kg",
 *       "marketName": "Comper",
 *       "brand": "Tio João",
 *       "price": 28,
 *       "isPromotional": "false",
 *       "stateCode": "MS",
 *       "city": "Campo Grande",
 *       "category": "Alimento"
 *     }
 */

/**
 * @api {get} /products/:userId 2. Lista Produtos localizados na Cidade do usuário
 * @apiVersion 0.1.0
 * @apiName getProducts
 * @apiGroup Product
 *
 * @apiParam {String} userId ID do Usuário
 * @apiParam {String[]} categories Categorias que deseja filtrar ['Produtos Recomendados', Alimentos', 'Bebidas', Higiene', 'Limpeza']
 *
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *          "uid": "UrR7pUPsgxHw2NNrAyWD",
 *          "title": "Arroz 5Kg",
 *          "marketName": "Comper",
 *          "brand": "Tio João",
 *          "price": 28,
 *          "isPromotional": "false",
 *          "stateCode": "MS",
 *          "city": "Campo Grande",
 *          "category": "Alimento",
 *          "creat_at": {
 *               "_seconds": 1629498328,
 *              "_nanoseconds": 665000000
 *           }
 *      },
 *       {
 *          "uid": "kjsghfgjsehfekdkejk",
 *          "title": "Pasta de Dente 2Kg",
 *          "marketName": "Extra",
 *          "brand": "Colgate",
 *          "price": 5,
 *          "isPromotional": "false",
 *          "stateCode": "MS",
 *          "city": "Campo Grande",
 *          "category": "Higiene",
 *          "creat_at": {
 *               "_seconds": 1629498328,
 *              "_nanoseconds": 665000000
 *           }
 *      },
 * 
 *     ]
 */

 /**
 * @api {get}  /product/:id 3. Lista todos os Produtos do usuário
 * @apiVersion 0.1.0
 * @apiName getProductUser
 * @apiGroup Product
 *
 * @apiParam {String} id ID do Usuário
 *
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 [
 *       {
 *          "uid": "UrR7pUPsgxHw2NNrAyWD",
 *          "title": "Arroz 5Kg",
 *          "marketName": "Comper",
 *          "brand": "Tio João",
 *          "price": 28,
 *          "isPromotional": "false",
 *          "stateCode": "MS",
 *          "city": "Campo Grande",
 *          "category": "Alimento",
 *          "creat_at": {
 *               "_seconds": 1629498328,
 *              "_nanoseconds": 665000000
 *           }
 *      },
 *       {
 *          "uid": "kjsghfgjsehfekdkejk",
 *          "title": "Pasta de Dente 2Kg",
 *          "marketName": "Extra",
 *          "brand": "Colgate",
 *          "price": 5,
 *          "isPromotional": "false",
 *          "stateCode": "MS",
 *          "city": "Campo Grande",
 *          "category": "Higiene",
 *          "creat_at": {
 *               "_seconds": 1629498328,
 *              "_nanoseconds": 665000000
 *           }
 *      },
 * 
 *     ]
 */

/**
 * @api {delete} /product/id 4. Exclui Produto pelo ID
 * @apiVersion 0.1.0
 * @apiName deleteProduct
 * @apiGroup Product
 *
 * @apiParam {String} id ID do Produto
 *
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *          "data": "success"
 *       }
 */