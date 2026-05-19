# Dockerfile for CricketMind Monorepo - Next.js Web App Deployment
# Multi-stage build optimized for space and execution speed on Google Cloud Run

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm && corepack prepare pnpm@latest-8 --activate

# Stage 1: Dependency Installation
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/docs/package.json ./apps/docs/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json
RUN pnpm install --frozen-lockfile

# Stage 2: Code Compilation
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter=web build

# Stage 3: Runner Environment
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy runner dependencies
COPY --from=builder /app /app

EXPOSE 3000
CMD ["pnpm", "--filter=web", "start"]
