# MOOD APP


## Integrantes:

- Gustavo da Silva Novais - SP3119459
- João Vitor Leal de Castro - SP3122972
- Pedro Barros Zich - SP3120236
- Sthefany Cristovam da Silva - SP3121658


## Como Rodar o Projeto

### Requisitos

Certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org) (recomenda-se a versão LTS)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) para gerenciar pacotes

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd mood
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute o servidor:

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```


## 🌍 Variáveis de Ambiente

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_NODE_ENV=development
VITE_ANALYTICS_ID=your_analytics_id
VITE_SENTRY_DSN=your_sentry_dsn
