---
title: Refatorando Tudo
---

Deu pra perceber que acabamos repetindo muito os arquivos `layout.tsx` e `error.tsx`. Vamos aproveitar a funcionalidade do Next.js de *layouts aninhados / nested layouts* para evitar repetição de código?

1. Vamos passar o `error.tsx` e o `layout.tsx` para um nível acima (dentro da pasta `app/(auth)`);
2. Podemos agora apagar todos os outros arquivos `error` e `layout`. 