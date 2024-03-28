import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      favicon: '/favicon.ico',
      locales: {
        root: {
          label: 'Português',
          lang: 'pt-BR',
        },
      },
      title: 'Next Auth',
      editLink: {
        baseUrl:
          'https://github.com/codante-io/workshop-next-auth-guia/edit/main/',
      },
      social: {
        github: 'https://github.com/robertotcestari',
        'x.com': 'https://x.com/robertotcestari',
        linkedin: 'https://www.linkedin.com/in/robertotcestari/',
        email: 'mailto:robertotcestari@gmail.com',
      },
      customCss: ['./src/tailwind.css'],
      sidebar: [
        {
          label: 'Intro ao Workshop',
          autogenerate: {
            directory: '00-intro',
          },
        },

        {
          label: 'Intro ao NextAuth',
          autogenerate: {
            directory: '01-intro-nextauth',
          },
        },
        {
          label: '1. Setup do NextAuth na Aplicação',
          autogenerate: {
            directory: '02-setup-next-auth',
          },
        },

        {
          label: '2. Login com Credenciais',
          autogenerate: {
            directory: '03-login-com-credenciais',
          },
        },
        {
          label: '3. Login com Github',
          autogenerate: {
            directory: '04-login-com-github',
          },
        },
        {
          label: '4. Login com Magic Link',
          autogenerate: {
            directory: '05-login-com-magic-link',
          },
        },
        {
          label: '5. Dashboard e Logout',
          autogenerate: {
            directory: '06-dashboard-e-logout',
          },
        },
        {
          label: '6. Callbacks: mais dados na sessão',
          autogenerate: {
            directory: '07-mais-dados-na-sessao-callbacks',
          },
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
