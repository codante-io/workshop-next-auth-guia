---
title: Callbacks
---

Os callbacks nada mais são do que funções que são executadas em determinados pontos do fluxo de autenticação. Eles permitem que você personalize o comportamento do NextAuth.js em diferentes momentos do processo de autenticação.

#### Callbacks existentes

Existem vários tipos de callbacks disponíveis no NextAuth.js:

- **signIn**: Executado após um usuário fazer login com sucesso.
- **signOut**: Executado após um usuário fazer logout.
- **session**: Executado sempre que uma nova sessão é criada ou quando uma sessão é renovada (por exemplo, após a renovação de um token de acesso).
- **jwt**: Executado quando o JWT (JSON Web Token) é gerado para uma sessão.
- **redirect**: Executado quando o usuário é redirecionado para uma nova página (por exemplo, após o login ou logout).
- **error**: Executado quando ocorre um erro durante o processo de autenticação.

Esses callbacks permitem que você realize diversas tarefas personalizadas, como armazenar informações adicionais no token de autenticação, enviar eventos de registro para um sistema de análise, redirecionar usuários para páginas específicas após o login ou logout, entre outras ações.

Ao definir esses callbacks em sua configuração do NextAuth.js, você pode adaptar o comportamento da autenticação de acordo com as necessidades específicas do seu aplicativo. Isso oferece uma grande flexibilidade e controle sobre o fluxo de autenticação.