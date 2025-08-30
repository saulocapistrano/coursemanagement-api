# 📚 Course Management API

API RESTful para gerenciamento de cursos, turmas, usuários e matrículas — desenvolvida com Node.js, Express e Prisma ORM.  


---

## 🚀 Tecnologias Utilizadas

- **Node.js** — ambiente de execução
- **Express** — framework web minimalista
- **TypeScript** — tipagem estática
- **Prisma ORM** — acesso ao banco de dados
- **PostgreSQL** — banco relacional
- **Docker + Docker Compose** — conteinerização
- **ts-node-dev** — recarregamento automático no desenvolvimento

---

## 📦 Estrutura Inicial

```

api/
├── src/
│   ├── app.ts               # Configuração do app Express
│   ├── server.ts            # Ponto de entrada do servidor
│   ├── routes/              # Definição das rotas
│   ├── config/              # Configurações da aplicação
│   ├── core/                # Middlewares, helpers, erros
│   ├── database/
│   │   └── client.ts        # Instância do Prisma
│   └── modules/             # Módulos de domínio (Course, Class, etc.)
├── prisma/
│   ├── schema.prisma        # Definição dos modelos de dados
│   └── migrations/          # Histórico de migrations
├── .env                     # Variáveis de ambiente
├── Dockerfile               # Configuração da imagem Docker
├── docker-compose.yml       # Orquestração dos serviços
├── package.json             # Dependências e scripts
└── tsconfig.json            # Configuração do TypeScript

````

---

## 🐳 Como rodar com Docker

### Pré-requisitos:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Executar o projeto:

```bash
# Acesse a pasta da API
cd api/

# Suba os containers
docker-compose up --build
````

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

### 🔐 Credenciais do Banco (Docker)

| Variável | Valor                    |
| -------- | ------------------------ |
| Host     | `db` (interno no Docker) |
| Porta    | `5432`                   |
| Usuário  | `postgres`               |
| Senha    | `postgres`               |
| Banco    | `course_management`      |

---
