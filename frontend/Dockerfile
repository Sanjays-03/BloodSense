# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy frontend files
COPY . .

# Install dependencies
RUN npm install && npm run build

# Expose Next.js port
EXPOSE 3000

# Start the frontend
CMD ["npm", "run", "dev"]
