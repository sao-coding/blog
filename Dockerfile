FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnmp-lock.yaml
COPY package.json .
COPY pnpm-lock.yaml .

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile

# Copy the app source code to the container
COPY . .

# Build the Next.js app
RUN pnpm build

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]