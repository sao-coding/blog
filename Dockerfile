FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm i -g pnpm
RUN pnpm i

# Copy the app source code to the container
COPY . .

# Build the Next.js app
RUN pnpm build

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]