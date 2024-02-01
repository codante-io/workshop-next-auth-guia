---
title: Configurando o Formulário
---

Agora que sabemos que está tudo certo com o provider de email, vamos configurar nosso formulário customizado para implementar o Magic Link. 

De novo, aqui vamos basicamente copiar tudo que fizemos nas outras opções de login

1. `page.tsx`
2. `layout.tsx`
3. `error.tsx`
4. `_components/login-form.tsx`
5. `_actions/email-login.tsx`

### Criando a action

Nossa action vai ser bastante simples:

```ts title="app/(auth)/login-email/_actions/email-login.ts"
'use server';

import { signIn } from '@/auth';

export async function emailLogin(formData: FormData) {
  const email = formData.get('email') as string;

  try {
    await signIn('nodemailer', {
      email,
    });
  } catch (error) {
    throw error;
  }
}

```

Maravilha, agora vamos fazer o link entre o formulário e a action.

### Todos os arquivos

A página nada mais é do que um "encapsulamento" do nosso formulário de login:

```tsx title="app/(auth)/login-email/page.tsx"
import LoginForm from './_components/login-form';

export default async function LoginPage() {
  return <LoginForm />;
}
```

#### O Componente de Formulário

```tsx title="app/(auth)/login-email/_components/login-form.tsx"
'use client';

import { emailLogin } from '../_actions/email-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Entre com seu Email</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={emailLogin} className="text-left ">
          <div className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" id="email" placeholder="Email" />
            </div>
          </div>
          <Button size={'lg'} type="submit" className=" w-full mt-10">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

```

#### O Layout

```tsx title="app/(auth)/login-email/layout.tsx" 
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

#### A Página de Erro


```tsx title="app/(auth)/login-email/error.tsx"
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
