# 1. Record architecture decisions

Utilização do NestJS para o desenvolvimento do back-end do sistema Agendify
Date: 2023-05-15

## Status

Accepted

## Context

Nossa equipe deve desenvolver um sistema de agendamento de serviços que permita aos usuários agendar e gerenciar compromissos de maneira fácil e intuitiva. Tendo em vista a necessidade de ter o back-end flexível e de fácil modularização, decidimos avaliar as opções disponíveis e escolher um framework para NodeJs que nos permita alcançar nossos objetivos.

## Alternatives

Desenvolvimento back-end node e seus frameworks
 - ExpressJs;
 - AdonisJS;
 - NestJS.

## Decision

Decidimos utilizar o NestJS como framework para o desenvolvimento do back-end. Nossa decisão foi baseada nas seguintes considerações:
 - Arquitetura baseada em módulos: O NestJS adota uma arquitetura modular, inspirada no Angular, o que permite organizar o código de forma estruturada e reutilizável. Com o uso de módulos, é possível separar as funcionalidades da aplicação em partes distintas, tornando o desenvolvimento mais organizado e escalável;
 - Suporte robusto para TypeScript: O NestJS é construído com base no TypeScript, uma linguagem de programação fortemente tipada que adiciona recursos adicionais ao JavaScript. O uso do TypeScript também facilita a manutenção do código e reduz a probabilidade de erros;
 - Integração com bibliotecas e ferramentas populares: O NestJS é compatível com várias bibliotecas e ferramentas populares do ecossistema Node.js. Ele possui suporte nativo para a biblioteca de ORM (Object-Relational Mapping) Prisma, o que simplifica a comunicação com bancos de dados relacionais. Além disso, o NestJS é compatível com várias outras bibliotecas e ferramentas, permitindo uma ampla gama de opções para expandir a funcionalidade da aplicação;
 - Decorators e injeção de dependência: O NestJS utiliza decorators para definir rotas, controladores, serviços e outros elementos da aplicação. Esses decorators fornecem uma maneira elegante e intuitiva de configurar a estrutura da aplicação, facilitando o desenvolvimento e a manutenção do código. Além disso, o NestJS oferece um sistema de injeção de dependência incorporado, o que facilita a criação e o gerenciamento de dependências entre os diferentes componentes da aplicação;
 - Comunidade ativa e suporte: O NestJS possui uma comunidade ativa de desenvolvedores, o que significa que você pode encontrar muitos recursos, tutoriais e pacotes adicionais para estender as funcionalidades do framework. Além disso, o NestJS é mantido por uma equipe dedicada e recebe atualizações regulares, o que garante que o framework esteja em constante evolução e ofereça suporte aprimorado ao longo do tempo.

## Argument

Ao analisar as demais opções é possível concluir que devido às requisições do sistema em questão o NestJS é que mais se aplica, sua modularização é fundamental para a integração necessária com o front-end e sua organização segmentada facilita muito o entendimento e a manutenção do código, os outros frameworks citados são menos estruturados e portanto menos escolhidos para se trabalhar, o Express geralmente é utilizado para fins educacionais e é menos seguro que o NestJS. O AdonisJs por outro lado é um framework muito denso e de difícil aprendizado.

## Consequences

Positivas:
 - Facilidade de integração de front-end:como estamos desenvolvendo uma aplicação com front-end separado, o NestJS se integra bem com frameworks populares do lado do cliente, como Angular e React, no nosso caso o React/React Native;
 - Recursos de teste robustos: O NestJS fornece um conjunto abrangente de recursos de teste, incluindo suporte para testes unitários, testes de integração e testes de ponta a ponta i.e Jest.

Negativas:
 - Maior quantidade de código gerado: Devido à abordagem baseada em decorators e à estrutura modular, o NestJS tende a gerar mais código em comparação com outros frameworks Node.js mais minimalistas. Embora isso possa resultar em uma estrutura mais organizada, também pode levar a um aumento no tamanho do código e exigir um tempo adicional para escrevê-lo e mantê-lo;
 - Dependência de bibliotecas e ferramentas específicas: Embora o NestJS tenha suporte para várias bibliotecas e ferramentas populares, ele pode impor certas dependências em termos de escolha de bibliotecas específicas para determinadas funcionalidades. Isso pode limitar a flexibilidade e a liberdade de escolha de tecnologias para determinados casos de uso, o que pode ser considerado uma desvantagem para alguns desenvolvedores ou projetos específicos.


Assinado por: Diego Germiniani, Matheus Menezes, Renan Vítor
