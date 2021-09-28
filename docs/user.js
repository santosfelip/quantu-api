/**
 * @api {post} /user/register 1. Cadastro de usuário
 * @apiVersion 0.1.0
 * @apiName register
 * @apiGroup User
 * 
 * @apiParam {String} name Nome Completo do Usuário
 * @apiParam {String} email E-mail do Usuário
 * @apiParam {String} password Senha do Usuário
 * @apiParam {String} city Cidade do Usuário
 * @apiParam {String} stateCode Sigla do Estado do Usuário
 *
 * @apiSuccess {String} name Nome Completo do Usuário
 * @apiSuccess {String} email E-mail do Usuário
 * @apiSuccess {String} password Senha do Usuário
 * @apiSuccess {String} city Cidade do Usuário
 * @apiSuccess {String} stateCode Sigla do Estado do Usuário
 * @apiSuccess {String} uid ID do Usuário Criado
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "name": "Felipe Nascimento Santos",
 *        "email": "felipe@gmail.com",
 *        "city": "Campo Grande",
 *        "stateCode": "MS",
 *        "password": "$2a$10$x73IuyJSoE74yIQK3ck7Lu7LDexBWK3VUl723CEGwV66jL5b2um/2",
 *        "uid": "UrR7pUPsgxHw2NNrAyWD"
 *     }
 */

/**
 * @api {get} /user/:id 2. Lista de usuário
 * @apiVersion 0.1.0
 * @apiName getUsers
 * @apiGroup User
 * 
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * 
 * @apiParam {String} id ID do Usuário
 *
 * @apiParam {String} name Nome Completo do Usuário
 * @apiParam {String} email E-mail do Usuário
 * @apiParam {String} city Cidade do Usuário
 * @apiParam {String} stateCode Sigla do Estado do Usuário
 * @apiSuccess {String} uid ID do Usuário Criado
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "name": "Felipe Nascimento Santos",
 *        "email": "felipe@gmail.com",
 *        "city": "Campo Grande",
 *        "stateCode": "MS",
 *        "uid": "UrR7pUPsgxHw2NNrAyWD"
 *     }
 */

/**
 * @api {patch} /user/:id 3. Atualização de usuário
 * @apiVersion 0.1.0
 * @apiName updateUser
 * @apiGroup User
 *
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * 
 * @apiParam {String} name Nome Completo do Usuário
 * @apiParam {String} email E-mail do Usuário
 * @apiParam {String} password Senha do Usuário
 * @apiParam {String} city Cidade do Usuário
 * @apiParam {String} stateCode Sigla do Estado do Usuário
 * @apiParam {String} id ID do Usuário Criado
 *
 * @apiSuccess {String} name Nome Completo do Usuário
 * @apiSuccess {String} email E-mail do Usuário
 * @apiSuccess {String} password Senha do Usuário
 * @apiSuccess {String} city Cidade do Usuário
 * @apiSuccess {String} stateCode Sigla do Estado do Usuário
 * @apiSuccess {String} uid ID do Usuário Criado
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "name": "Felipe Nascimento Santos",
 *        "email": "felipe@gmail.com",
 *        "city": "Campo Grande",
 *        "stateCode": "MS",
 *        "uid": "UrR7pUPsgxHw2NNrAyWD"
 *     }
 */