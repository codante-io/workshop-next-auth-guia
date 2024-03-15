---
title: Adicionando usuários Reais
---

Ok, até agora a gente estava "brincando" com o NextAuth. Fizemos um usuário falso e tudo mais...
Mas e se a gente quiser um usuário real?

:::caution[Atenção]
O NextAuth apenas lida com criação/cadastro/registro de usuários com providers de OAuth2 tais como Github, Facebook, etc. Quando usamos email e senha nós mesmos teremos que construir a lógica.
:::

#### Um wrapper para o Prisma

É uma boa prática instanciarmos o _PrismaClient_ apenas uma vez especialmente como estamos lidando com hot reloading no React.

Vamos criar então um arquivo `lib/db.ts`.

```ts title="lib/db.ts"
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Se `prisma` não existe em `globalThis` (ou seja, é undefined), crie um novo PrismaClient
// Caso contrário, use o `prisma` existente em `globalThis`
// Isso garante que apenas uma instância do PrismaClient seja criada
const db = globalThis.prisma || new PrismaClient();

// Se não estivermos no ambiente de produção, atribua a instância do PrismaClient a `globalThis.prisma`
// Isso é útil para desenvolvimento e testes, mas não é necessário em produção
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

// Exporte a instância do PrismaClient para uso em outros arquivos
export default db;
```

#### A rota - e uma Server Action - de cadastro

Talvez você não tenha percebido, mas já deixamos um formulário pronto de cadastro na rota `/register`.
Por enquanto ele não faz absolutamente nada.

Vamos então criar uma action de cadastro. 

Vamos utilizar uma lib chamada `bcrypt-ts`. Instale ela primeiro. 

```ts title="app/(auth)/register/_actions/register.ts"
'use server';

import db from '@/lib/db';
import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';

export default async function register(formData: FormData) {
  const entries = Array.from(formData.entries());
  const { name, email, password } = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  // Verifique se algum campo está vazio
  if (!name || !email || !password) {
    throw new Error('Preencha todos os campos');
  }

  // Verifique se o usuário já existe
  const userExists = await db.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error('Usuário já existe');
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  redirect('/');
}
```

Agora precisamos fazer o link entre a nossa action e o form:

```tsx title="app/(auth)/register/_components/register-form.tsx ins={1,15}
import register from '../_actions/register';

export default function RegisterForm() {
  return (
    <>
      <Card className="mx-auto max-w-96">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <UserIcon className="w-6 h-6" />
            Cadastre-se
          </CardTitle>
          <CardDescription>Crie uma conta gratuitamente</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={register} className="text-left ">
            <div className="space-y-6">
```

#### Lidando com erros

Veja que estamos lançando todo e qualquer erro da nossa aplicação. Vamos usar a página `error.tsx` do _Next.js_ para mostrarmos o erro na tela.

Vamos fazer 2 componentes:

1. `error.tsx`
2. `_components/error-card.tsx` onde vamos deixar o layout do card de erro.

Vamos criar a página de erro:

```tsx title="app/(auth)/register/error.tsx"
'use client';

import ErrorCard from './_components/error-card';

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

E agora o componente para deixar o nosso erro agradável visualmente:

```tsx title="app/(auth)/register/_components/error-card.tsx"
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';

export default function ErrorCard({
  errorMessage,
  reset,
}: {
  errorMessage: string;
  reset: () => void;
}) {
  return (
    <>
      <Card className="mx-auto max-w-96 border-red-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-red-300">
            <CircleX />
            Ops...
          </CardTitle>
          <CardDescription>Ocorreu um erro</CardDescription>
        </CardHeader>
        <CardContent className="underline">{errorMessage}</CardContent>
        <CardFooter className="flex justify-center">
          <Button variant={'outline'} onClick={reset}>
            Tentar novamente
          </Button>
        </CardFooter>
      </Card>
      <Link
        className={cn(buttonVariants({ variant: 'link' }), 'mt-8')}
        href="/"
      >
        Voltar para Home
      </Link>
    </>
  );
}
```

Agora, como último passo, precisamos proteger a rota de cadastro. Isso é, ninguém que está logado poderá acessá-la.

#### Protegendo a rota `/register` de usuários logados

Agora a mágica do NextAuth começa a acontecer. Veja como é simples sabermos em qualquer rota se o usuário está logado ou não. 

Vamos proteger a rota `/register` para permitir apenas usuários *deslogados*: 

```tsx title="app/(auth)/register/page.tsx" ins={1, 3, 6-7}
import { auth } from '@/auth';
import RegisterForm from './_components/register-form';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect('/');

  return <RegisterForm />;
}
```

Duas linhas de código e... voilá!

Tente logar novamente (`/api/auth/signin` -> clicando no botão) e depois tente acessar a rota de cadastro: você deverá ser redirecionado para a home!

Ok, mas ainda assim não temos um sistema de login "vida real", porque basta clicar no botão para logarmos. Precisamos de um sistema que realmente faça a comparação de *email* e *senha*