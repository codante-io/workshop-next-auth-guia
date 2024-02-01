---
title: Eventos
---

Os eventos são muito parecidos com os callbacks. Mas eles são assíncronos, então não são recomendados para alterar algum fluxo da autenticação mas principalmente para registro/log. Se quisermos alterar o fluxo devemos utilizar as *callbacks*. 

#### Eventos existentes

- signIn
- signOut
- createUser
- updateUser
- linkAccount
- session

Cada um desses eventos trará dados diferentes que você poderá usar. Por exemplo, no caso do evento de `signIn`, você receberár um objeto que conterá o `user`, `account`, `profile` e `isNewUser`. 

No caso de `createUser`, você receberá apenas o `user`.

Se quiser saber mais sobre eventos, dá uma olhada na [documentação](https://authjs.dev/guides/basics/events). 