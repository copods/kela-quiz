FROM node:20-alpine

# Set working directory
WORKDIR /usr/server/app

# Copy package.json and package-lock.json first
COPY ./package.json ./
RUN npm install

# Copy the rest of the app
COPY ./ ./

# Build the Remix app
RUN npm run build

# Set production environment
ENV NODE_ENV=production

# Start the app
CMD ["npm", "run", "start"]