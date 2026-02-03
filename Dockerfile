FROM node:20-alpine

RUN corepack && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

# Expose PORT
EXPOSE 5173

CMD ["pnpm", "run", "dev"]