## Assignment-4: Enhanced User Authentication and Authorization System
To run the application locally follow the instruction:

*Live Server Link*

https://dark-puce-harp-seal-toga.cyclic.app/

*Documentation Link*
https://documenter.getpostman.com/view/31300739/2s9YsDjZiR

User Login:

{
    "username": "hrshihab",
    "password": "12345"
}

Admin Login:

{
    "username": "mezbaul_abedin",
    "password": "123456"
}

## Prerequisites


Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (if your project uses MongoDB)

## Getting Started

1. **Clone the repository:**
   ```
   `git clone https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-hrshihab.git`
   
2. **Navigate to the project directory:**
    - `cd your-repo`

3. **Install dependencies:**
    - "@types/bcrypt": "^5.0.2",
    - "@types/node": "^20.10.0",
    - "cors": "^2.8.5",
    - "dotenv": "^16.3.1",
    - "express": "^4.18.2",
    - "mongodb": "^6.3.0",
    - "mongoose": "^8.0.1",
    - "nodemon": "^3.0.1",
    - "ts-node-dev": "^2.0.0",
    - "zod": "^3.22.4"
 5. **devDependencies:**
    - "@types/cors": "^2.8.17",
    - "@types/express": "^4.17.21",
    - "@typescript-eslint/eslint-plugin": "^6.13.1",
    - "@typescript-eslint/parser": "^6.13.1",
    - "eslint": "^8.54.0",
    - "prettier": "^3.1.0",
    - "typescript": "^5.3.2"
  

4. **Set up environment variables:**
  - Create a .env file in the root of the project.
  - Define environment variables in the .env file (e.g., PORT, MONGODB_URI, etc.).

## Running the Application
1. Start the development server:
  - `npm run start:dev`
2. Open your web browser and go to http://localhost:5000 (or the specified port).

## Available Scripts

- Build: `npm run build` - Transpile TypeScript files to JavaScript.
- Lint: `npm run lint` - Check for linting errors.
- Lint & Fix: `npm run lint:fix` - Check and fix linting errors.
- Prettier: `npm run prettier` - Format code using Prettier.
- Prettier & Fix: `npm run prettier:fix` - Format and fix code using Prettier.
- Run Tests: `npm test` - Run your test suite.

### Contributing
- Fork the project.
- Create a feature branch.
- Commit changes.
- Push to your branch.
- Open a pull request.
