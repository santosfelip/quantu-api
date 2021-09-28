/**
 * @api {post} /event 1. Cadastro de Eventos do Usuário
 * @apiVersion 0.1.0
 * @apiName addEvent
 * @apiGroup Event
 * 
 * @apiDescription Esta rota é responsável em salvar um evento do usuário, o evento pode ser um 'like' ou um 'dislike'
 * 
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * 
 * @apiParam {String} action Ação do usuário: 'likes' ou 'dislikes'
 * @apiParam {String} person ID do Usuário
 * @apiParam {String} thing ID do Produto que sofreu a ação
 *
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "action": "likes",
 *      "person": "UrR7pUPsgxHw2NNrAyWD",
 *       "thing": "PD1sNTUyGSgKNmFkh5P3"
 *   }   
 */

/**
 * @api {get} /likes/:userId 2. Lista os IDs dos produtos curtidos pelo usuário
 * @apiVersion 0.1.0
 * @apiName getLikes
 * @apiGroup Event
 * 
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * } 
 * 
 * @apiParam {String} userID ID do Usuário
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [PD1sNTUyGSgKNmFkh5P3, UrR7pUPsgxHw2NNrAyWD]
 */