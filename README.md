# 🧿 Fastify JWT API

> RESTful API built using Fastify, TypeScript, and Prisma, with PostgreSQL as the database. The API supports user authentication with JWT tokens and includes a private route that allows users to post only if they are authenticated.

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

1. If you want, pull the images

    ```bash
    docker pull gabrielsousadeveloper/fastify-blog-api:1.0.0
    docker pull gabrielsousadeveloper/postgres-blog-database:1.0.0

    ```

2. Create a directory and set up your docker-compose.yml

    ```bash
    service:
        postgres:
            image: gabrielsousadeveloper/postgres-blog-database:1.0.0
        environment:
            POSTGRES_USER: YOUR-USER
            POSTGRES_PASSWORD: YOUR-PASSWORD
            POSTGRES_DB: YOUR-DATABASE-NAME
        ports:
            - 5432:5432

        app:
            image: gabrielsousadeveloper/fastify-blog-api:1.0.0
            ports:
                - '3000:3000'
            environment:
                FASTIFY_DATABASE_URL: 'postgresql://YOUR-USER:YOUR-PASSWORD@postgres:5432/YOUR-DATABASE-NAME?schema=public'
                FASTIFY_PORT: YOUR-PORT * Recommend 3000 port
                FASTIFY_JWT_SECRET: 'YOUR-CLIENT-SECRET' * Bang your head on keyboard =)
            command: sh -c 'npx prisma generate && npx prisma migrate dev --name init && npm run start'
            depends_on:
                - postgres

    ```

3. Set up environment variables:

-   Run docker

    ```bash
    docker-compose up

    ```

## 🤝 **How to contribute?**

1. Fork the project
2. Create a new branch: git checkout -b my-new-feature
3. Make your changes and commit: git commit -m 'Add new feature'
4. Push to the main branch: git push origin my-new-feature
5. Open a Pull Request

Developed with ❤️ Gabriel
