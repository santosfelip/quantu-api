/**
 * @api {post} / 1. Cadastro de feedback
 * @apiVersion 0.1.0
 * @apiName addFeedBack
 * @apiGroup Feedback
 * 
 * @apiDescription Esta rota é responsável em salvar um FeedBack do usuário, o feedback é relacionado a opção de "Não Encontrei nenhum produto", depois de 5 feedback no produto, ele é removido da Base de Dados
 * 
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * 
 * @apiParam {String} action Ação do usuário: 'add' ou 'remove'
 * @apiParam {String} userId ID do Usuário
 * @apiParam {String} productId ID do Produto que sofreu a ação
 *
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "action": "add",
 *       "userId": "UrR7pUPsgxHw2NNrAyWD",
 *       "productId": "PD1sNTUyGSgKNmFkh5P3"
 *   }   
 */

/**
 * @api {get} /feedbacks/:id 2. Lista de feedbacks do usuário
 * @apiVersion 0.1.0
 * @apiName getFeedBack
 * @apiGroup Feedback
 * 
 * 
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * 
 * @apiParam {String} id ID do usuário
 *
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  [PD1sNTUyGSgKNmFkh5P3] 
 */