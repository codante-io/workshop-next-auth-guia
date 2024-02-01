---
title: Protegendo as rotas (dashboard e login)
---

Queremos o seguinte comportamento para as rotas de _dashboard_ e de _login_:

1. Há um usuário logado:
   1. Ele não poderá acessar a tela de login;
   2. Ele poderá acessar a tela de dashboard;
2. Não há um usuário logado:
   1. Ele poderá acessar a tela de login;
   2. Ele não poderá acessar a tela de dashboard;

### Protegendo o Dashboard

```tsx title="app/dashboard/page.tsx" ins={14-16}
import { auth } from '@/auth';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User } from 'next-auth';
import Link from 'next/link';
import logout from '../(auth)/_actions/logout';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  let user = undefined;
  const session = await auth();
  if (session) {
    user = session.user;
  } else {
    return redirect('/login')
  }

  return (
// ...
```

Pronto, com esse _else_, essa rota não será acessível quando não houver sessão.

### Protegendo as rotas de login

Para cada uma das rotas de login, podemos adicionar o seguinte código:

```tsx ins={1,3,6-9}
import { auth } from '@/auth';
import LoginForm from './_components/login-form';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    return redirect('/dashboard');
  }

  return <LoginForm />;
}
```
