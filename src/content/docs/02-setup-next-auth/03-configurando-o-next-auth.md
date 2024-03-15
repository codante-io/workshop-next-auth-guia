---
title: Configurando o NextAuth
---

Vamos começar a "brincar" com o NextAuth e fazer um "login de mentirinha".

Pra começar, vamos usar esse botão "Login Simples" e tentar fazer um fluxo de login, mesmo sem email e senha, apenas para vermos como é que podemos configurar o next-auth.

Mas antes, precisamos fazer as primeiras configurações básicas do NextAuth.

### Vamos configurar o NextAuth

A documentação - no momento da escrita deste guia - não é das melhores. Algumas coisas você deve pinçar da página antiga (https://next-auth.js.org), outras da página nova (https://authjs.dev).

De qualquer forma, existem alguns passos para configurarmos a biblioteca. Vamos seguir eles, portanto.

#### 1. O arquivo `auth.ts`

Esse é o arquivo mais importante. Ele deve estar na raiz da aplicação e irá conter todas as nossas configurações.

```typescript title="auth.ts"
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [Credentials],
});
```

Estamos exportanto os `handlers` (que servirão para mais tarde, você verá) e uma função chamada `auth`. Essa função é a principal função do nextAuth e servirá para fazermos a interface da nossa aplicação com nosso serviço de autenticação.

Esse arquivo está configurado da forma mais simples possível. Vamos incrementá-lo aos poucos durante o Workshop.

Por enquanto, vamos usar o _provider_ de _Credentials_ (email e senha).

#### 2. Route Handlers

Route handlers no Next.js, em linhas simples, são as rotas "api". Como estamos usando a pasta `app` do Next, vamos defini-los em um arquivo `route.tsx`.

No caso específico do NextAuth, vamos seguir esse [guia](https://authjs.dev/reference/nextjs#environment-variable-inference).

A primeira coisa é criarmos um arquivo no caminho `/app/api/auth/[...nextauth]/route.ts`

E esse arquivo vai ficar bem simples também:

```typescript title="app/api/auth/[...nextauth]/route.ts"
export { handlers as GET, handlers as POST };
```

Aqui simplesmente pegamos os handlers que exportamos do nosso arquivo de configuração e jogamos para essa rota _catch-all_ do NextAuth.

#### 3. Arquivo `.env` (ou `.env.local`)

Agora, adicione a seguinte chave no `.env`:

```env title=".env"
AUTH_SECRET="qualquer-coisa-aqui"
```

## Vamos testar tudo?

#### Rotas do NextAuth

Veja que automaticamente o _NextAuth_ cria para nós algumas **páginas** pré-prontas:

- **signIn**: '/api/auth/signin'
- **signOut**: '/api/auth/signout'
- **error**: '/api/auth/error'
- **verifyRequest**: '/api/auth/verify-request'
- **newUser**: '/api/auth/new-user'

E também algumas **rotas de _api_**:

- **/api/auth/signin**: Usada para iniciar uma sessão de login.
- **/api/auth/signout**: Usada para encerrar uma sessão de login.
- **/api/auth/session**: Usada para obter a sessão do usuário atual.
- **/api/auth/providers**: Usada para obter a lista de provedores de autenticação disponíveis.
- **/api/auth/callback**: Usada para lidar com callbacks de provedores de autenticação.
- **/api/auth/csrf**: Usada para obter o token CSRF.
- **/api/auth/verify**-request: Usada para enviar um email de verificação.
- **/api/auth/error**: Usada para lidar com erros de autenticação

#### Testando com algumas rotas

Dá uma olhada nas seguintes páginas:

- `localhost:3000/api/auth/providers`.
- `localhost:3000/api/auth/signin`.

Se você conseguiu ver essas duas páginas sem nenhum erro, significa que tudo está funcionando!
