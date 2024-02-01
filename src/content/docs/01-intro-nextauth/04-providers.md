---
title: Providers
---

Você já deve ter percebido que há várias formas de se autenticar em uma aplicação. 

Você pode, por exemplo, fazer login pelo Google, Facebook ou Github. Também provavelmente já entrou em alguma aplicação com email e senha. E eventualmente já recebeu um "*magic link*", que é um email com um botão que, magicamente, ao clicá-lo você já entra logado na aplicação. 

Cada uma dessas "estratégias de autenticação" exige uma lógica diferente. Por exemplo, no caso do login com o Facebook, é utilizado um padrão/protocolo chamado *OAuth2*. No caso do email e senha, o usuário é cadastrado na base de dados com uma senha criptografada (geralmente com *bcrypt*) e, ao tentar logar, faz-se uma comparação entre a senha informado e a senha criptografada salva na base de dados. Por fim, no caso do *magic link*, é necessário salvar na base de dados um código único que será colocado no link dentro do email enviado para o usuário - e quando ele clica no link, faz-se a comparação entre os códigos. 

#### Qual estratégia usar? 

Com o NextAuth a gente pode usar todas! Essa é uma das grandes vantagens (se não a principal) dessa biblioteca: conseguimos implementar as estratégias de forma simples. 

Nesse workshop vamos implementar as 3:

- Credentials (email e senha)
- OAuth2 com Github
- Email (magic link)

### Ok, mas o que é um Provider? 

No NextAuth, um "provider" é um provedor de autenticação que permite a integração com esses serviços/estratégias de autenticação.

Quando você configura o NextAuth.js para autenticação em seu aplicativo, você pode escolher quais provedores deseja usar e configurá-los de acordo com as instruções do NextAuth.js. Cada provedor tem suas próprias configurações específicas, como chaves de API, segredos, URLs de redirecionamento, etc. 

Mas no fim, o NextAuth.js simplifica essa integração porque ele fornece uma API unificada para autenticação em seu aplicativo (por exemplo, um único método `signIn()`), independentemente do provedor que você escolher. 




