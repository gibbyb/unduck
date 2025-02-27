# Stage 1: Build the project
FROM node:18 AS builder
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy project files into the docker image
COPY . .

# Build the project
RUN pnpm run build

# Stage 2: Serve the app using the same version of Node
FROM node:18-alpine
WORKDIR /app

# Install a simple http server
RUN npm install -g serve

# Copy built assets from the builder stage
COPY --from=builder /app/dist ./

# Expose port 5000 for the server
EXPOSE 5000

# Start the server using the `serve` package
CMD ["serve", "-s", ".", "-l", "5000"]
