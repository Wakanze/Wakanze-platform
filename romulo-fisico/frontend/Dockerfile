# Frontend dev image (docker-compose). Production serves the static `dist/` build
# from the hosting platform / CDN — chosen later (Category B decision).
FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
