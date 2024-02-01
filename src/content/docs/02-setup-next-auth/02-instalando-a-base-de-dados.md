---
title: Instalando nossa Base de Dados
---

Como vamos registrar usuários precisamos de uma **base de dados** para persistir essas informações no servidor. 

O céu é o limite para escolher a base de dados, mas para esse Workhop vamos usar o [SQLite](https://www.sqlite.org/) em comunhão com o [Prisma](https://www.prisma.io/).


### Instalando o Prisma 

Vamos seguir a [página da documentação do Prisma](https://www.prisma.io/docs/getting-started/quickstart) para instalarmos o Prisma com SQLite.

Vamos rodar o primeiro comando 

```bash
npm install prisma --save-dev 
```

Depois vamos iniciar o projeto com SQLite: 

```bash
npx prisma init --datasource-provider sqlite 
```

A partir desse momento: 

1. Foi criado o arquivo `schema.prisma`
2. O `.env` foi alterado. 

O SQLite é uma base de dados baseada em um arquivo, então podemos colocar esse arquivo onde quisermos. O Prisma já gera o arquivo para nós, então não precisamos fazer nada aqui.  

#### Criando o primeiro Schema

Vamos criar uma tabela `user` só para termos certeza de que tudo está funcionando corretamente. No arquivo `schema.prisma`, vamos adicionar um model `User`: 

```prisma title="prisma/schema.prisma"
model User {
  id    Int     @id @default(autoincrement())
  name  String?
  email String  @unique
  password String?
}
```

Para rodarmos isso: 

```bash
npx prisma db push
```

Veja que foi criada a *base de dados* em `prisma/dev.db`. 

#### Acessando a database

Se quisermos ver o que tem dentro da nossa database, você pode rodar o `npx prisma studio`, que abre um GUI para gerenciar a base de dados, ou, alternativamente você pode conectar essa base de dados ao seu gerenciador de base dados favorito, como *dbeaver*, *tableplus*, etc. 