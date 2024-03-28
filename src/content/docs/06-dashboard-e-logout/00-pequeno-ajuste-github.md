---
title: Antes, resolvendo bugs
---

Antes de adentrarmos no dashboard, logout e proteção de rotas, precisamos ajustar algumas coisas no _login com Github_. Se você tentar fazer o login da forma como fizemos, provavelmente você terá alguns erros.

1. O primeiro erro é porque não criamos, no prisma, o schema `Account` - e estamos agora usando o *Prisma Adapter*.
2. O segundo é que, se você cadastrou algum email antes, por padrão (e por razão de segurança) o NextAuth não deixa autenticar em outros provedores diferentes (como Github).

#### Criando o schema `Account`.

Para isso, basta adicionarmos, no `schema.prisma` o seguinte código:

```prisma title="prisma/schema.prisma"
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

Depois, é só rodar o `npx prisma db push` e verificar que a tabela já está na DB.

#### Permitindo logins concomitantes entre credenciais e OAuth providers

O Prisma, por padrão, não permite que façamos o login com Github com o mesmo email que usamos nas credenciais. Vamos desabilitar esse comportamento.

Para isso, basta passar para o `GithubProvider` em nosso `auth.ts` essa propriedade:

```ts title="auth.ts"
// ...
GithubProvider({ allowDangerousEmailAccountLinking: true }),
// ...
```

Maravilha, agora está tudo funcionando como antes! 