
# Use Node.js 20 with Alpine for a lightweight base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app-doc-build

# Copy package.json and package-lock.json first (to leverage Docker's caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 

# Copy Prisma schema and initialize the Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the app's source code
COPY . .

# Build the Remix app
RUN npm run build

# Set the environment to production
ENV NODE_ENV=production

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
