
# Clock-In

## Tecnologias Utilizadas
- Express
- Jest
- Prisma
- Docker

## Como Rodar os Testes com Jest
Para rodar os testes utilizando Jest, execute o seguinte comando:
```bash
npm test
```

## Como Rodar o Prisma
Para rodar o Prisma, utilize os seguintes comandos:
1. Para aplicar as migrações:
    ```bash
    npx prisma migrate dev
    ```
2. Para abrir o Studio do Prisma:
    ```bash
    npx prisma studio
    ```

## Como Rodar Usando Docker
Para rodar a aplicação utilizando Docker, siga os passos abaixo:
1. Construa a imagem Docker:
    ```bash
    docker-compose up -d
    ```

Certifique-se de que o Docker está instalado e em execução no seu sistema antes de executar os comandos acima.

## Como Rodar em Ambiente de Desenvolvimento
Para rodar a aplicação em ambiente de desenvolvimento, utilize o seguinte comando:
```bash
yarn dev
```

## Deploy
O deploy da aplicação foi realizado no Render.

