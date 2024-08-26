# 🧿 Fastify JWT API

> This is a RESTful API built using Fastify, TypeScript, and Prisma, with PostgreSQL as the database. The API supports user authentication with JWT tokens and includes a private route that allows users to post only if they are authenticated.

## ⚙️ Features

-   **Fastify:** Next-generation web framework for Node. js that prioritizes speed, efficiency, and developer experience.
-   **User authentication:** Sign up and log in users using JWT tokens.
-   **Prisma ORM:** Database interaction with Prisma, supporting PostgreSQL.
-   **TypeScript:** Type-safe API development.
-   **Docker:** Containerized environment for the application and database.
-   **Private routes:** Secure endpoints that require authentication.

## 🛠️ Technologies

-   NodeJS, TypeScript, Fastify, Prisma, Docker, dotenv, bcrypt

## 📦 How to Run the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/gablsl/fastify-jwt-api.git

    ```

2. Install dependencies using npm

    ```bash
    npm install

    ```

3. Set up environment variables:

-   Create a .env file in the root of the project and add the necessary environment variables.

    ```bash
    FASTIFY_DATABASE_URL="YOUR_DATABASE_URL"
    FASTIFY_JWT_SECRET="YOUR_CLIENT_SECRET"
    FASTIFY_PORT="YOUR_PORT"

    ```

4. Start the development server
    ```bash
    npm run dev
    ```

## 🤝 **How to contribute?**

1. Fork the project
2. Create a new branch: git checkout -b my-new-feature
3. Make your changes and commit: git commit -m 'Add new feature'
4. Push to the main branch: git push origin my-new-feature
5. Open a Pull Request

Developed with ❤️ Gabriel

```

```
