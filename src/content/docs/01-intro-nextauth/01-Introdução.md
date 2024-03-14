---
title: Por que NextAuth?
---

Provavelmente a maioria dos exemplos de autenticação presentes na Web usando apps Javascript usam serviços de autenticação de terceiros. Lembram quando a febre era usar a autenticação do Firebase? Depois do Auth0? Agora, a moda parece ser o Clerk. 

Todas essas plataformas são ótimas e facilitam o processo de prototipação e de autenticação. O grande problema aqui chama-se *[vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in)*. Recentemente uma das principais plataformas (Auth0) [aumentou o preço em 300%](https://www.reddit.com/r/webdev/comments/18d6hcd/auth0_increases_price_by_300/#:~:text=Auth0%20just%20increased%20the%20price,using%20for%20user%20identity%2Fauth%3F). E quando sua aplicação já é grande suficiente, o custo em migrar seus usuários para outra estratégia pode ser muito alto e você acaba "refém" da sua escolha inicial. 

Com uma biblioteca como a **NextAuth** você é dono do seu sistema de autenticação. Você é dono dos dados (que ficarão na sua base de dados). E o melhor de tudo - não pagará nenhum centavo se sua aplicação aumentar significativamente o número de usuários. 