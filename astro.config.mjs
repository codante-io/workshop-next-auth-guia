import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
		locales: {
			root: {
				label: 'Português',
				lang: 'pt-BR'
			}
		},
		title: 'Typescript no React',
    social: {
			github: 'https://github.com/robertotcestari',
      'x.com': 'https://x.com/robertotcestari',
      linkedin: 'https://www.linkedin.com/in/robertotcestari/',
      email: 'mailto:robertotcestari@gmail.com'
    },
		customCss: ['./src/tailwind.css'],
    sidebar: [{
      label: 'Intro ao Workshop',
      autogenerate: {
        directory: 'intro'
      }
    }, {
      label: 'Tópicos',
      autogenerate: {
        directory: 'reference'
      }
    }]
  }), tailwind(
		{applyBaseStyles: false}
	)]
});