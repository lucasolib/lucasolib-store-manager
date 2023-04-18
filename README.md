
# Store Manager

Store Manager é um projeto da Trybe que visa desenvolver uma API em Back-End para administrar uma loja.


## Autores

- [@lucasolib](https://www.github.com/lucasolib)


## Aprendizados

Este projeto se mostrou desafiador por ser um projeto em que desenvolvi dois CRUD's para uma aplicação além de realizar eles via TDD (Test Driven Development), fazendo uma aplicação RESTful no modelo MSC (Model, Service e Controller).


## Stack utilizada

**Back-end:** Node, Express, MySQL


## Funcionalidades

- CRUD produtos
- CRUD vendas



## Instalação

Verifique a funcionalidade do código, rodando o mesmo na sua máquina, copiando este repositório,instale as dependências, rodando o back-end e o banco de dados na sua máquina.

```bash
  git clone git@github.com:lucasolib/lucasolib-store-manager.git
  cd lucasolib-store-manager
  npm install
  npm start

```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as variáveis de ambiente no seu .env para o Back-End entrar em contato com o banco de dados.


## Documentação da API

#### Retorna todos os produtos

```http
  GET /products
```

#### Retorna um produto

```http
  GET /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto que você quer |

#### Retorna um produto por Query

```http
  GET /search
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `query`      | `string` | **Obrigatório**. Os produtos que você quer baseado em uma string |

#### Cadastra um produto no banco de dados

```http
  POST /products
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `produto`      | `object` | **Obrigatório**. O produto que você quer criar |

#### Atualiza um produto no banco de dados

```http
  PUT /products/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `produto`      | `object` | **Obrigatório**. O produto que você quer atualizar |
| `id`      | `string` | **Obrigatório**. O ID do produto que você quer atualizar |

#### Deleta um produto no banco de dados

```http
  DELETE /products/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto que você quer deletar |

#### Retorna todas as vendas

```http
  GET /sales
```


#### Retorna uma venda por ID

```http
  GET /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda que você quer |

#### Cadastra uma venda no banco de dados

```http
  POST /sales
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `venda`      | `object` | **Obrigatório**. A venda que você quer criar |

#### Atualiza uma venda no banco de dados

```http
  PUT /sales/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `venda`      | `object` | **Obrigatório**. A venda que você quer atualizar |
| `id`      | `string` | **Obrigatório**. O ID da venda que você quer atualizar |

#### Deleta uma venda no banco de dados

```http
  DELETE /sales/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda que você quer deletar |

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Referência

 - Trybe -> Todos os arquivos que não estão nas pastas Src, tests ou o arquivo Readme.md foram gerados pela Trybe, organização que me proporcionou este estudo.

