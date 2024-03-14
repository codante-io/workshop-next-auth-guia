---
title: Entendendo o fluxo de Login
---

A partir de agora, para todos os exemplos subsequentes, vamos utilizar nosso **gerador de frases motivacionais**. Ah, ok, tudo bem... eu sei que o exemplo não é dos mais criativos, mas ele é um bom ponto de partida para analisarmos vários conceitos interessantes de TS em uma aplicação react.

Você pode encontrar o repositório com o ponto de partida [aqui nesse link](https://github.com/robertotcestari/codante-ts-no-react-exercicio):

- [https://github.com/robertotcestari/codante-ts-no-react-exercicio](https://github.com/robertotcestari/codante-ts-no-react-exercicio)

Faça o clone e acompanhe o workshop!

## A aplicação

A nossa aplicação, **que já é Typescript**, é bastante simples e é composta de:

- Header - com o título do app + um botão para gerar frases motivacionais
- Card com a frase motivacional gerada.
- Funcionalidade de trocar a cor de fundo quando uma nova frase é gerada.


### Dados usados na aplicação

- Os dados de **cores** e **frases** estão na pasta `/data`
- As funções de *fetch* tanto das cores aleatórias como frases aleatórias estão no arquivo `/src/lib/services.ts`
