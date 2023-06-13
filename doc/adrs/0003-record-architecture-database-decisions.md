# 1. Record architecture decisions

Utilização do PostgreSQL para o desenvolvimento do banco do sistema Agendify
Date: 2023-05-15

## Status

Accepted

## Context

Nossa equipe deve desenvolver um sistema de agendamento de serviços que permita aos usuários agendar e gerenciar compromissos de maneira fácil e intuitiva. Tendo em vista a necessidade de ter o back-end flexível e de fácil modularização, decidimos avaliar as opções disponíveis e escolher um framework para NodeJs que nos permita alcançar nossos objetivos.

## Alternatives

Tecnologias de banco de dados de dados relacional:
 - MySQL
 - MariaDB
 - PostgreSQL

## Decision

Decidimos utilizar o PostgreSQL como banco de dados da aplicação pois:
 - Performance: O PostgreSQL é conhecido por oferecer alta performance em transações e consultas complexas, o que é essencial para uma aplicação de agendamento de serviços com múltiplos usuários e demandas crescentes;
 - Escalabilidade: O PostgreSQL é capaz de lidar com grande quantidade de dados e usuários simultaneamente, sendo uma opção adequada para a escalabilidade da aplicação à medida que o número de usuários e prestadores de serviços aumenta;
 - Segurança: Com recursos avançados de segurança, como controle de acesso, autenticação e criptografia, o PostgreSQL protege os dados e informações sensíveis da aplicação, garantindo a privacidade dos usuários e prestadores de serviços;
 - Licença de código aberto: O PostgreSQL possui licença de código aberto (PostgreSQL License), permitindo seu uso, modificação e distribuição de forma gratuita. Isso reduz os custos de desenvolvimento e manutenção da aplicação;
 - Compatibilidade e integração: O PostgreSQL é compatível com diversas linguagens de programação, frameworks e ferramentas, facilitando a integração com outras tecnologias usadas no desenvolvimento da aplicação de agendamento de serviços;
 - Suporte à geolocalização: A aplicação pode se beneficiar do suporte nativo a dados geoespaciais do PostgreSQL (PostGIS), permitindo consultas e análises geográficas mais eficientes para recomendar prestadores de serviços próximos aos clientes;
 - Comunidade ativa e suporte: O PostgreSQL tem uma comunidade ativa e uma base sólida de documentação e recursos, proporcionando suporte e atualizações constantes para a aplicação.

## Argument

Examinamos várias alternativas de banco de dados relacional, incluindo MySQL, MariaDB, SQLite, Oracle Database e SQL Server. Cada um desses sistemas tem suas próprias vantagens e desvantagens, mas precisávamos escolher um que atendesse às necessidades específicas de nossa aplicação de agendamento de serviços. O PostgreSQL foi escolhido como o banco de dados relacional para a aplicação de agendamento de serviços devido à sua capacidade de alto desempenho e escalabilidade, essencial para gerenciar um grande volume de transações e consultas simultâneas. Os recursos avançados de segurança do PostgreSQL garantem a proteção adequada dos dados. Sua licença de código aberto fornece flexibilidade e economia em termos de custos operacionais. 

## Consequences

A escolha do PostgreSQL como banco de dados relacional da aplicação de agendamento de serviços proporcionará uma base sólida para o desenvolvimento e crescimento do sistema, garantindo performance, escalabilidade e segurança.

Positivas:
 - O PostgreSQL oferece alta performance e escalabilidade, sendo capaz de lidar com um grande número de transações simultâneas e crescimento contínuo de dados;
 - Os recursos avançados de segurança, como controle de acesso e autenticação, garantem a proteção dos dados e informações sensíveis da aplicação;
 - O PostgreSQL é compatível com diversas linguagens de programação, frameworks e ferramentas, facilitando a integração com outras tecnologias utilizadas no desenvolvimento da aplicação.

Negativas:
 - Em algumas situações, outros sistemas de banco de dados podem oferecer melhor desempenho para casos de uso específicos, como leituras intensivas ou trabalho com dados não relacionais;
 - Embora o PostgreSQL seja uma solução robusta e popular, alguns concorrentes, como MySQL e SQL Server, possuem maior adoção no mercado, o que pode influenciar a percepção de clientes e parceiros.
 - Se a equipe de desenvolvimento não estiver familiarizada com o PostgreSQL, pode haver uma curva de aprendizado inicial para se adaptar ao novo sistema de banco de dados.


Assinado por: André Marcos Ferreira
