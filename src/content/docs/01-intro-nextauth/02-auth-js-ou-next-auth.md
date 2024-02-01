---
title: NextAuth ou Auth.js?
---

Pode parecer confuso, mas estamos exatamente em um momento de transição do NextAuth. A biblioteca que iremos estudar sempre se chamou NextAuth, mas ela foi expandida para ser _agnóstica de framework_, isto é, agora será possível utilizar essa _lib_ não apenas no Next.js mas também em outros frameworks (como svelte, por exemplo).

Em linhas simples, **a biblioteca se chama NextAuth até a v4**. E, **a partir da v5, passa a se chamar Auth.js.**

Importante notar que, neste workshop vamos utilizar a versão 5. Até o momento da realização desse workshop a versão está em beta.

#### Upgrade guide

Se você já usou alguma vez o NextAuth, recomendo fortemente ler esta página de [upgrade-guide](https://authjs.dev/guides/upgrade-to-v5). Lá você vai encontrar tanto as principais mudanças (e foram algumas relevantes) como, de certo modo, uma parte da documentação. 

#### Auth.js v5 está em beta, não é melhor usar a v4?

Se você planeja utilizar Server Components, eu recomendo fortemente usar a v5 porque as APIs dessa nova versão já estão escritas com Server Components em mente. Então eu usaria a v5 para praticar e para side-projects, mesmo que em beta.

Claro, cuidado extra se for utilizar em algum app em produção.

#### Nesse Workshop vamos utilizar indistintamente NextAuth e Auth.js

Um combinado aqui: quando eu falar sobre Auth.js ou NextAuth, estou falando da mesma coisa, ok?