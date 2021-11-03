## Checkout transparente

### Aplicação feita durante o curso Formação Node.js do guia do programador, disponível na Udemy.

Aplicação para teste no sandbox do mercado pago, disponivel em http://64.227.11.28/payment porém tem apenas a rota "/payment" com dados fixos para geração de pagamento via cartão. A aplicação aceita apenas pagamentos com cartões fake disponíveis na [documentação](https://www.mercadopago.com.br/developers/pt/guides/online-payments/checkout-api/testing).

A aplicação não guarda dados no banco ou recebe produtos, porem com algumas simples implementações é possível utilizar essa base. 

OBS: para conseguir receber a notificação do mercado pago, é necessário ter a aplicação em um servidor e, que este seja um servidor https.

### Projeto

- Para rodar o projeto é necessário apenas clonar a pasta e rodar os comandos yarn ou npm install
- O servidor está com todas as rotas e servidor num arquivo único, o index.js e, para rodar a aplicação é só utlizar o comando node index.js

OBS's: Caso for rodar localmente, troque a porta no "app.listen". As rotas são basicamente '/' que não conetem nada, mas seria a home do projeto, a rota '/payment', cujo os dados, estão fixos e, é simples trocá-los por variáveis que pegam dados do front ou do banco de dados. Por fim, temos a rota '/notification' que só funciona com a aplicação rodando num servidor HTTPS (requerimento do mercado pago) e, que busca se existe o pagamente e, se sim, retorna com a referencia externa e status do pagamento.

