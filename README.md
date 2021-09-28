# Quantu-API
Backend da Aplicação Desenvolvida para o TCC

## Como rodar o projeto

Requisitos:
  - npm
  - Banco de dados firebase

Instale as dependências: 
  ```bash
    npm i
  ```

Altere o arquivo ./src/config/cert-dev.json com as suas credenciais do [Firebase](https://firebase.google.com/docs/build?hl=pt-br):
  ```json
{
    "type": "",
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": ""
}
```

Para rodar a API em modo de desenvolvimento:
```bash
npm run dev
```

Para rodar a api em modo de produção:
```bash
npm run prod
```
Urls de acesso:
  - Documentação da API: http://localhost:9000/doc
  - URL da API: http://localhost:9000/app/v1

Documentação da API em desenvolvimento: http://safe-headland-61171.herokuapp.com/doc/








