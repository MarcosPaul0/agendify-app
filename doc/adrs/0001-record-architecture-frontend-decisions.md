# 1. Record architecture decisions

Utilização do React Native para o desenvolvimento do aplicativo Agendify
Date: 2023-05-15

## Status

Accepted

## Context

Nossa equipe foi encarregada de desenvolver um aplicativo de agendamento de serviços que permita aos usuários agendar e gerenciar compromissos de maneira fácil e intuitiva. Tendo em vista a necessidade de ter o aplicativo disponível tanto para iOS quanto para Android, decidimos avaliar as opções disponíveis e escolher um framework de desenvolvimento que nos permita alcançar nossos objetivos.

## Alternatives

Desenvolvimento nativo separado para cada plataforma (iOS e Android)
 - Ionic Framework;
 - Flutter;
 - React Native.

## Decision

Decidimos utilizar o React Native como framework para o desenvolvimento do aplicativo. Nossa decisão foi baseada nas seguintes considerações:
 - Cross-platform: O React Native permite que desenvolvamos um aplicativo para iOS e Android usando uma única base de código, economizando tempo e recursos em comparação com o desenvolvimento nativo separado para cada plataforma;
 - Desenvolvimento ágil: O React Native tem um ciclo de desenvolvimento mais rápido do que outras opções disponíveis. Isso se deve em parte à capacidade de atualizar o aplicativo em tempo real sem a necessidade de compilação e instalação no dispositivo;
 - Comunidade ativa e suporte: O React Native tem uma comunidade ativa de desenvolvedores e uma grande quantidade de recursos online, incluindo documentação e bibliotecas de código aberto;
 - Reaproveitamento de componentes: O React Native permite o reaproveitamento de componentes de interface do usuário, o que pode economizar tempo e garantir a consistência visual em todo o aplicativo;
 - Experiência da equipe: Nossa equipe já tem experiência prévia com o React Native e se sente confortável trabalhando com ele. Isso nos permite trabalhar de forma mais eficiente e com maior qualidade.

## Argument

O desenvolvimento nativo separado para cada plataforma foi descartado, pois aumentaria significativamente o tempo e o esforço necessários para desenvolver o aplicativo para ambas as plataformas. A opção do Ionic Framework também foi considerada, mas o React Native foi escolhido devido à sua maior popularidade, número de bibliotecas disponíveis e facilidade de aprendizado. A opção do Flutter foi descartada devido à falta de experiência da equipe com a tecnologia e à preferência por uma tecnologia de código aberto.

## Consequences

Positivas:
 - Desenvolvimento mais rápido e eficiente com uma única base de código para ambas as plataformas;
 - Maior facilidade de manutenção devido ao reaproveitamento de componentes de interface do usuário;
 - Menor curva de aprendizado para a equipe devido à sua experiência prévia com o React Native.

Negativas:
 - A necessidade de acompanhar as atualizações da tecnologia e suas bibliotecas para manter o aplicativo atualizado e compatível com as últimas versões do sistema operacional;
 - Algumas funcionalidades nativas específicas de cada plataforma podem ser mais difíceis de implementar no React Native, exigindo soluções personalizadas.


Assinado por: Marcos Paulo Pereira