# DevVault

DevVault is a developer collaboration platform that enables users to manage versioned code assets, store files securely in the cloud, and collaborate through social and repository-level features. The project focuses on building core systems behind code management, authentication, and scalable file handling using a modern MERN stack.

---

## 🚀 Features

* **Versioned Code Management**
  Manage repositories with support for add, commit, revert, push, and pull operations, along with structured commit history.

* **Cloud-based File Storage**
  Repository files and versions are stored securely in **AWS S3**, while metadata and relationships are maintained in MongoDB.

* **Authentication & Security**
  Multi-provider authentication using **GitHub OAuth**, **Google OAuth**, and **email/password login**, secured with JWT-based session management.

* **Developer Collaboration**
  Social features including stars, followers/following, folder & file uploads, and activity feeds for repository interaction.

* **Deployment & Hosting**
  Frontend deployed on **Vercel**, backend hosted on cloud infrastructure with environment-based configuration.

---

## 🛠 Tech Stack

### Frontend

* React.js
* Redux / Context API
* Axios
* Tailwind CSS / CSS Modules

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Cloud & Services

* AWS S3 (file storage)
* OAuth (GitHub & Google)
* Vercel (frontend deployment)

---

## 🧩 System Overview

* **Metadata Layer**: Repository data, commit history, user relationships, and access control stored in MongoDB.
* **Object Storage Layer**: Large files and versioned assets stored in AWS S3 to ensure scalability.
* **API Layer**: RESTful services built with Express to handle repository actions, authentication, and collaboration.

---

## 🔗 Dependency Graph

The following diagram represents the high-level dependency and interaction flow between major components of DevVault:

```
[ Client (React) ]
        |
        |  HTTPS (REST APIs)
        v
[ API Gateway (Express.js) ]
        |
        |-- Auth & User Service
        |       |- OAuth (GitHub / Google)
        |       |- JWT Issuance & Validation
        |
        |-- Repository & Commit Service
        |       |- Commit Metadata
        |       |- Version History
        |       |- Access Control
        |
        |-- File Upload Service
        |       |- Presigned URLs
        |       |- Multipart Uploads
        |
        v
[ MongoDB ]  <---- Metadata, Users, Commits, Relations

        |
        v
[ AWS S3 ]   <---- Versioned Files & Repository Objects

[ Vercel ]  <---- Frontend Deployment (CI/CD)
```

**Key Design Notes**

* Application logic is centralized in stateless Express services to allow horizontal scaling.
* Large binary assets are decoupled from application storage and handled by AWS S3.
* MongoDB stores only lightweight, query-optimized metadata and relationships.
* Authentication is isolated from core repository logic to keep services modular.

---

## 🔐 Authentication Flow

1. User signs up via GitHub, Google, or email/password.
2. Backend validates credentials and issues a JWT.
3. JWT is used to authorize protected API routes.
4. Secure file uploads are handled via signed requests to S3.

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/prash08484/DevVault.git
cd DevVault

# Install dependencies
npm install

# Start backend
npm run server

# Start frontend
npm run client
```

Create a `.env` file with the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name
GITHUB_CLIENT_ID=your_github_client_id
GOOGLE_CLIENT_ID=your_google_client_id
```

---

## ✨ Design Highlights & Interesting Bits

* **Metadata vs Object Storage Split**
  DevVault intentionally separates lightweight metadata (users, repos, commits, relations) from heavy binary assets. MongoDB handles fast queries and relationships, while AWS S3 stores versioned file objects for durability and scale.

* **Commit as a First-Class Entity**
  Each commit is treated as an immutable record with parent references, enabling clean history traversal, revert operations, and future extensibility (branches, tags).

* **Secure-by-Design Uploads**
  File uploads never pass through the backend server directly. Instead, presigned URLs are used to upload straight to S3, reducing server load and improving security.

* **Stateless API Architecture**
  All backend services are stateless, relying on JWTs for authentication. This enables easy horizontal scaling and smooth cloud deployment.

* **Deployment-Aware Development**
  The project is built with production deployment in mind from day one, using environment-based configuration and CI-connected frontend deployments.

---

## 📈 Learning Outcomes

* Designing RESTful APIs with clean data models
* Handling large file uploads using cloud object storage
* Implementing OAuth and JWT-based authentication
* Structuring scalable full-stack applications

--- 

## 📄 License

This project is licensed under the MIT License.
