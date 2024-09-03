# 🧿 Fastify JWT API

> Robust REST API using Fastify, NodeJS and TypeScript, with Prisma as ORM, to manage a complete blog. The project includes the implementation of a CRUD for categories, users and posts, ensuring that only users authenticated by JWT can create posts, increasing the security and integrity of the system. Dotenv was used to manage environment variables and bcrypt to ensure the protection of users' sensitive data. The API was containerized with Docker and is available on Docker Hub, facilitating its distribution and deployment in different environments. This API is scalable, secure and ready to be integrated into any front-end or mobile application.

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

1. Create a directory and set up your docker-compose.yml

    ```bash
    version: '3.0'

    services:
        postgres:
            image: gabrielsousadeveloper/postgres-blog-database:1.0.0
            environment:
                POSTGRES_USER: YOUR-USER
                POSTGRES_PASSWORD: YOUR-PASSWORD
                POSTGRES_DB: YOUR-DATABASE
            volumes:
                - postgres_data:/var/lib/postgresql/data
            ports:
                - '5432:5432'

        app:
            image: gabrielsousadeveloper/fastify-blog-api:1.0.0
            ports:
                - '3000:3000'
            environment:
                FASTIFY_DATABASE_URL: 'postgresql://YOUR-USER:YOUR-PASSWORD@postgres:5432/YOUR-DATABASE?schema=public'
                FASTIFY_PORT: 3000
                FASTIFY_JWT_SECRET: 'YOUR-CLIENT-SECRET' * Bang your head on keyboard =)
            command: sh -c 'npx prisma generate && npx prisma migrate dev --name init && npm run start'
            depends_on:
                - postgres
    ```

2. Run docker:

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
