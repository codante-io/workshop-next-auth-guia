---
title: Sessões (Sessions)
---

### O que são sessões?

Sessões são a forma de nossa aplicação _saber que estamos logados_. Se não houvesse uma sessão em nosso app, a cada página que visitássemos precisaríamos fazer o login novamente. 😓

No Auth.js, podemos usar duas estratégias de sessões: **JWT** ou **Database**.

Isso significa que as informações de que há um usuário logado podem ser salvas tanto em uma base de dados centralizada (database), ou apenas no browser do usuário, em um cookie que usa o protocolo JWT (Json Web Token).

> Note que ambas as estratégias usam **cookies** para autenticação. Acontece que no caso do JWT, o cookie salva todas as informações de sessão. Na estratégia de database, o cookie salva apenas o session ID. As informações adicionais da sessão depois são trazidas da base de dados.

### JWT ou Database? Qual escolher?

Como já foi dito, o _auth.js_ nos fornece duas estratégias para salvarmos nossas sessões. A estratégia de (i.) JWT; e a (ii.) database.

#### Se seu login usa credenciais, use JWT

Se você está usando o provider de credenciais (credenciais significa login com email e senha - e que é desencorajado pela equipe do auth.js), a única forma de armazenar a sessão é através do JWT.

> Tecnicamente é possível usar sessões na DB quando utilizar credenciais. Mas você precisará implementar "na mão".

#### Se você quer menos trabalho, mais velocidade e escalabilidade ou quer usar o _edge_, opte por JWT

Com o JWT, você não precisa de um query de database para cada vez que 

#### Se você quer controlar a sessão com seu backend use database.

Se você armazena as sessões na base de dados, você pode, por exemplo, facilmente desconectar um usuário X de todos os dispositivos conectados - basta excluir as sessões da base de dados ⚡

#### Se você não sabe exatamente o que quer, use JWT como heurística.

Talvez o mais importante é não perder muito tempo com decisões que provavelmente não serão tão importantes em 80% dos casos (o mesmo debate em escolher _types_ ou _interface_ no TypeScript). Então escolha uma e siga em frente.
