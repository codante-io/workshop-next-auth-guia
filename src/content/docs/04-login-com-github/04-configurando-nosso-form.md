---
title: Configurando a rota e o formulário
---

Ao clicar no botão de autenticar com Github, vamos para a rota `login-github`. Vamos então configurá-la nos passos a seguir:

### Criando a página, layout e componente

De novo, aqui vamos basicamente copiar tudo que fizemos nas outras opções de login

1. `page.tsx`
2. `layout.tsx`
3. `error.tsx`
4. `_components/login-form.tsx`
5. `_actions/github-login.ts`

### Criando a action

Nossa action vai ser bastante simples:

```ts title="app/(auth)/login-github/_actions/github-login.ts
'use server';

import { signIn } from '@/auth';

export default async function githubLogin() {
  try {
    await signIn('github', {
      redirectTo: '/dashboard',
    });
  } catch (e) {
    throw e;
  }
}
```

Maravilha, agora vamos fazer o link entre o formulário e a action.

### Todos os arquivos

A página nada mais é do que um "encapsulamento" do nosso formulário de login:

```tsx title="app/(auth)/login-github/page.tsx"
import LoginForm from './_components/login-form';

export default async function LoginPage() {
  return <LoginForm />;
}
```

Agora, o componente de formulário:

```tsx title="app/(auth)/login-github/_components/login-form.tsx"
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import githubLogin from '../_actions/github-login';
import { SiGithub } from '@icons-pack/react-simple-icons';

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Entre com seu Github</CardDescription>
      </CardHeader>
      <CardContent>
        {' '}
        <form className="text-left " action={githubLogin}>
          <Button
            size={'lg'}
            type="submit"
            className="w-full mt-10 flex items-center gap-3"
          >
            <SiGithub className="w-4 h-4" />
            Login com Github
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

```tsx title="app/(auth)/login-github/layout.tsx" 
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

```tsx title="app/(auth)/login-github/error.tsx"
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