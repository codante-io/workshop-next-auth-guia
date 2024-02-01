---
title: Lidando com erros de login
---

Vamos fazer exatamente a mesma coisa que fizemos na rota de cadastro. Vamos criar uma página `error.tsx` e lidar com os erros ali. Só que, dessa vez, vou extrair o nosso componente `error-card` para uma pasta hierarquicamente superior, já que vamos utilizá-lo agora em dois lugares difrerentes.

#### Criando o `error.tsx`

Vamos criar, conforme a documentação do Next.js a nossa página `error.tsx`

```tsx title="app/(auth)/login/error.tsx
'use client';

import ErrorCard from '../_components/error-card';

export default function RegisterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorCard errorMessage={error.message} reset={reset} />;
}
```

#### Usando o Componente `error-card.tsx`

Vamos usar exatamente o mesmo componente que usamos no formulário de *register*. Vou criar uma pasta `app/(auth)/_components` e colocá-lo ali. A razão para isso é que esse componente será reaproveitado em vários lugares da nossa autenticação. De novo, é questão de padrão e gosto onde colocar seus componentes. Vou usar a heurística de colocar os componentes que são acoplados com alguma rota junto delas. Como esse `error-card` vou usar apenas em rotas de autenticação, vou colocar em uma pasta `_components` dentro da pasta `(auth)`. 

Depois, basta atualizar as importações e voilá! Nosso sistema de login está funcionando!