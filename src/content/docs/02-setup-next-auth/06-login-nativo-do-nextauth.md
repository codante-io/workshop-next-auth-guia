---
title: Login Nativo do Next Auth
---

Ao entrarmos na rota `api/auth/signin` podemos perceber que não existe nenhum campo para informar email e senha. E até agora o comportamento é "clicou - logou", mesmo sem escrever nenhuma informação como email e senha.

É claro que esse sistema nunca seria implementado, então vamos fazer algo mais "vida-real". Vamos transformar esse login sem inputs em um login aceitável para uma aplicação.

#### Adicionando inputs no login

Para que a gente deixe com o NextAuth todas as telas de autenticação com credenciais, _precisamos informá-lo quais credenciais nós vamos precisar_. Nem sempre é email e senha: poderia ser _username_ e senha, ou _cpf_ e senha. Por isso precisamos alterar as configurações no nosso arquivo `auth.ts`:

```ts title="auth.ts" ins={10-14}
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@exemplo.com.br',
        },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize() {
        return { id: '1', name: 'Fulano de Tal', email: 'lala@lala.com' };
      },
    }),
  ],
});
```

Nesse caso nosso queremos usar para login apenas email e senha. Veja que, a partir de agora, os inputs irão aparecer na nossa rota de login. Maravilha!

Mas ainda tem um problema: independente de qual informação é inserida, o login é sempre feito.

Precisamos então alterar a função `authorize`.

#### Adicionando a lógica do login

Vamos alterar a lógica de nosso login para que:

1. Apenas usuários cadastrados possam logar
2. A senha tem que "bater" com a senha do cadastro

Para isso, vamos mudar a função `authorize` dentro do nosso arquivo `auth.ts`.

```ts title="auth.ts"
// ...
async authorize(credentials) {

  const email = credentials.email as string;
  const password = credentials.password as string;

  if(!email || !password) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    }
  })

  if(!user) {
    return null;
  }

  const passwordMatch = compareSync(password, user.password ?? '');
  if (!passwordMatch) {
    return null;
  }

  return user;
},

// ...

```

Logicamente que poderíamos ser mais estritos na validação dos dados (usando uma biblioteca como **zod**, por exemplo). Mas como o objetivo aqui é apenas exemplificar o NextAuth, penso que essa validação está, para fins didáticos, de bom tamanho. 

Uma outra modificação que devemos fazer é alterar no nosso esquema do user (`schema.prisma`) para que o id do usuário seja string e não numérico (para facilitar com a tipagem mais para frente). Se quiser saber mais sobre isso, dá uma [olhada aqui](https://github.com/nextauthjs/next-auth/discussions/9776). 

```prisma ins={2}
model User {
  id       String  @id @default(cuid())
  name     String?
  email    String  @unique
  password String?
}
```

Pronto! 

*Temos um pequeno sistema de login, usando NextAuth, Prisma e SQLite!*