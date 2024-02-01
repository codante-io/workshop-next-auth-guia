---
title: Criando um App Oauth2 no Github
---

O primeiro passo para fazer

Vamos ver como é fácil fazer integração do Github para fazer login em nossa aplicação.

Criar um aplicativo OAuth2 no GitHub para integrar o login na sua aplicação é um processo direto. Aqui está um guia passo a passo para ajudá-lo no processo:

### 1. Crie uma conta no GitHub

Antes de tudo, obviamente, é preciso ter uma conta GitHub. Se já possuir uma, faça login. Caso contrário, crie uma em [github.com](https://github.com/).

### 2. Registre um novo aplicativo OAuth

1. **Acesse as configurações de desenvolvedor**: No canto superior direito, clique no seu avatar e vá em `Settings`. Na barra lateral, procure por `Developer settings`.
2. **Aplicativos OAuth**: Na seção `Developer settings`, selecione `OAuth Apps` em `Developer settings`.

3. **Novo aplicativo OAuth**: Clique no botão `New OAuth App`.

### 3. Configure seu aplicativo

Preencha o formulário com as seguintes informações:

- **Application name**: Insira o nome de exibição do seu aplicativo.
- **Homepage URL**: A URL da página inicial do seu aplicativo. Este link deve levar para o seu site ou a página de destino do aplicativo.
- **Application description** (Opcional): Uma breve descrição do seu aplicativo.
- **Authorization callback URL**: A URL para a qual o GitHub redirecionará após a autorização. Esta URL deve ser uma rota na sua aplicação que esteja preparada para receber o código de autorização.

Depois de preencher tudo, clique em `Register application`.

### 4. Anote as credenciais do seu aplicativo

Após o registro, você será direcionado para a página do seu aplicativo. Aqui, você encontrará o `Client ID` e, após clicar em `Generate a new client secret`, receberá o `Client Secret`. **Guarde-os** pois serão necessários para configurar a integração OAuth2 na sua aplicação.

### 5. Próximos Passos

A partir de agora, vamos usar o `Client ID` e o `Client Secret` diretamente no NextAuth. Pra isso, vamos adicioná-las ao nosso `.env.`. Se usarmos as chaves `AUTH_GITHUB_ID` e `AUTH_GITHUB_SECRET`, elas serão inferidas diretamente nas configurações do NextAuth.
