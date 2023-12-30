# Build an Ecommerce Website with Shopify ,Next.js 14, Prisma, MySQL, Shadcn/ui, NextAuth 

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/nvtai040502/ecommerce
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
SHOPIFY_STOREFRONT_ACCESS_TOKEN=""
SHOPIFY_STORE_DOMAIN=""
GITHUB_ACCESS_TOKEN = ""
SHOPIFY_REVALIDATION_SECRET=""
DATABASE_URL=''

NEXTAUTH_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000/"
```

### Setup Prisma

Add Plannet Scale Database

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```