[![Frontend Masters](https://static.frontendmasters.com/assets/brand/logos/full.png)](https://frontendmasters.com/courses/server-graphql-nextjs/)

This repo is a companion to the [Server-Side GraphQL in Next.js course](https://frontendmasters.com/courses/server-graphql-nextjs/) on Frontend Masters.

Here's a link to the [Course Notes](https://clumsy-humor-894.notion.site/Server-side-GraphQL-55308b7315644a858dd6ccf0201ff13c)

## Getting Started

This course repository requires Node version 20+ and a [TursoDB account](https://turso.tech/). More details can be found in [the course notes](https://clumsy-humor-894.notion.site/Server-side-GraphQL-55308b7315644a858dd6ccf0201ff13c).

1. Fork/Clone [the repo](https://github.com/Hendrixer/clientside-gql)
2. Checkout the `server/demo` branch
3. Install the Dependencies with `npm install`
4. Create a [Turso](https://turso.tech/) DB account (free)
   - Follow the instructions to make a new DB (you don’t need a replica)
   - Follow instructions to download the CLI and authenticate
   - Using the CLI, generate a token for your db with this command `turso db tokens create [your db name]`
5. Create a `.env` file on the root and add these environment variables:

```bash
TURSO_CONNECTION_URL="your turso db url"
TURSO_AUTH_TOKEN="your db token"
```

5. Push the schema to your Turso DB with this command `npm run db:push`
