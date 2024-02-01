---
title: Criando a server action
---

Vamos criar nossa action de login. Vou, por discricionariedade adicioná-la à pasta `app/(auth)/login/_actions`, mas você pode escolher a estrutura de pastas que preferir.

### Exportando a função `signIn`

A primeira coisa que você vai se deparar ao tentar criar essa action é: _como é que eu chamo o sign-in com credenciais?_

Pra isso, vamos voltar no nosso arquivo `auth.ts` e veja que a função `NextAuth` retorna também uma função `signIn`. Vamos exportá-la então:

```ts title="auth.ts" ins={8}
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compareSync } from "bcrypt-ts";
import db from './lib/db';

export const {
  handlers: { GET, POST },
  signIn,
  auth,
} = NextAuth({
  providers: [

// ...
```

### Criando a Action

Como já colocamos a lógica de autenticação na função `authorize()` do arquivo `auth.ts`, não precisamos, nesse caso, repeti-la aqui.

```ts title="app/(auth)/login/_actions"
'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function login(formData: FormData) {
  const entries = Array.from(formData.entries());
  const { email, password } = Object.fromEntries(entries) as {
    email: string;
    password: string;
  };

  try {
    await signIn('credentials', {
      email,
      password,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      if (e.type === 'CredentialsSignin') {
        throw new Error('Credenciais inválidas');
      }
    }
  }

  redirect('/');
}
```

### Fazendo o link da Action com nosso formulário

Agora, basta ir no nosso login form e instruirmos o nosso formulário a chamar nossa _action_:

```tsx title="app/(auth)/login/_components/login-form.tsx" ins={16,27}
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
import login from '../_actions/login';

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Entre com email e senha</CardDescription>
      </CardHeader>
      <CardContent>
        {' '}
        <form className="text-left " action={login}>
          <div className="space-y-6">
```

Algumas coisas a notar nesse arquivo:

1. A função `signIn` é async, então precisamos aguardá-la
2. Precisamos **sempre** passar para a função `signIn` qual é o método de autenticação que estamos usando. Nesse caso, credenciais.
3. Quando o login é mal sucedido, um erro é lançado. Vamos relançar esse mesmo erro, mudando a mensagem (para depois exibi-la no nosso front)
