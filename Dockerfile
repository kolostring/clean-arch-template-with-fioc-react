# Etapa 1: Construcción
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar solo package.json y package-lock.json (o pnpm/yarn)
COPY package*.json ./

# Instalar dependencias
RUN npm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Construir la app Next.js
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar dependencias necesarias (node_modules)
COPY --from=builder /app/node_modules ./node_modules

# Copiar el build de Next.js
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar
CMD ["npm", "start"]