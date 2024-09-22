# Step 1: Use an official Node.js runtime as the base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --only=production

# Step 5: Copy the rest of the application files to the container
COPY . .

# Step 6: Expose the port your app runs on
EXPOSE 3000

# Step 7: Command to run your application
CMD ["node", "app.js"]
