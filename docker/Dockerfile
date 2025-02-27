# Stage 1: Build the project
FROM node:18 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml or package-lock.json (if using npm) to the working directory
COPY ../package.json ../pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy project files into the docker image
COPY ../ .

# Build the project
RUN pnpm run build

# Stage 2: Serve the app using a lightweight node image
FROM node:16-alpine

# Install a simple http server
RUN npm install -g serve

# Set the working directory to /app
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/dist /app

# Expose port 5000 for the server
EXPOSE 5000

# Start the server using the `serve` package
CMD ["serve", "-s", ".", "-l", "5000"]
