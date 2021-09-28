/**
 * @api {post} /auth 1. Autenticação de usuário
 * @apiVersion 0.1.0
 * @apiName getAccessToken
 * @apiGroup Auth
 *
 * @apiDescription Após a autenticação a API retorna um TOKEN com os dados do usuário: UID, NAME, CITY e STATECODE
 * 
 * @apiParam {String} email E-mail do Usuário
 * @apiParam {String} password Senha do Usuário
 *
 * @apiSuccess {String} accessToken Token de acesso para utilizar as rotas privadas da API.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accessToken": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     }
 */