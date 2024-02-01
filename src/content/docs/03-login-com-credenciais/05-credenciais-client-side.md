---
title: Client Side
---

Recomendo que você use server actions com o NextAuth. Mas se isso não for possível (ou se você estiver utilizando um SPA), precisaremos de uma solução _client-side_.

### Preparando a Rota

Veja que o botão `Login - Client Components` nos leva à rota `/login-client`. Vamos criar uma página ali então. Só que dessa vez iremos utilizar a diretiva `'use client'` na nossa página.

Vamos copiar basicamente tudo do `login` (não vamos nos preocupar com repetição de código). A `page`, o `layout` e o `login-form`. A diferença aqui é que vamos apagar a action do login form e vamos criar um `handleSubmit`.

### A `page.tsx` e `layout.tsx`

Vamos ver como ficaram esses arquivos:

**page.tsx**

```tsx title="app/(auth)/login-client/page.tsx"
'use client';

import LoginForm from './_components/login-form';

export default function LoginClientPage() {
  return <LoginForm />;
}
```

**layout.tsx**

```tsx title="app/(auth)/login-client/layout.tsx"
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container p-20 mx-auto text-center">
      {children}
      <Link
        className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'mt-8')}
        href="/"
      >
        Voltar para Home
      </Link>
    </main>
  );
}
```

### O componente `login-form`

**login-form.tsx**

```tsx title="app/(auth)/login-client/_components/login-form.tsx"
'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Entre com email e senha</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="text-left ">
          <div className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                name="password"
                type="password"
                id="password"
                placeholder="password"
              />
            </div>
          </div>
          <Button size={'lg'} type="submit" className="w-full mt-10 ">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Link
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm' }),
            'mt-2 mx-auto'
          )}
          href="/register"
        >
          Não possui conta?
        </Link>
      </CardFooter>
    </Card>
  );
}
```

### Criando o `handleSubmit` no `login-form` e lidando com erros

Agora, vamos adicionar a funcionalidade. Veja que agora, a função `signIn` não mais virá do nosso arquivo `auth.ts`, mas sim do pacote `next/react`. Essa função é específica para client-components e deverá ser utilizada. Passamos mais dois argumentos ao objeto de opções da função `signIn`: A `callbackUrl`, que é a página para onde queremos redirecionar quando o login é feito com sucesso; e o `redirect: false` para não haja redirecionamento no caso de erros: queremos lidar com eles no próprio formulário. 

Para lidar com os erros, vamos criar um estado `error` que irá exibir a mensagem de erro quando necessário. De novo mapeamos o erro `CredentialsSignin` para a string `Credenciais Inválidas`.

O arquivo completo está abaixo:

```tsx title="app/(auth)/login-client/_components/login-form.tsx" ins={16,17,20,22-39, 48, 64-66}
'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
      redirect: false,
    }).then((res) => {
      if (res && res.error === 'CredentialsSignin') {
        setError('Credenciais Inválidas');
      }
    });
  }

  return (
    <Card className="mx-auto max-w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Entre com email e senha</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="text-left ">
          <div className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                name="password"
                type="password"
                id="password"
                placeholder="password"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-8 text-center">{error}</p>
          )}
          <Button size={'lg'} type="submit" className="w-full mt-10 ">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Link
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm' }),
            'mt-2 mx-auto'
          )}
          href="/register"
        >
          Não possui conta?
        </Link>
      </CardFooter>
    </Card>
  );
}
```
