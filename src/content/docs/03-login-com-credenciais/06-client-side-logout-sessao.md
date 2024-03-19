---
title: Client Side - Logout e Sessão
---

Da mesma forma que usamos a função `signIn` diretamente do pacote `nextauth/react`, se quisermos fazer Logout e acessar a sessão em *client components*, devemos usar respectivamente as funções `signOut` e `useSession` (esse último é um hook) desse mesmo pacote. 

Para ver mais infos sobre o `next-auth/react`, dá uma olhada [nessa página da documentação](https://authjs.dev/reference/nextjs/react). 