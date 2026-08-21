# 🛡️ DevVault: Architecture & System Design 

**DevVault** is a full-stack version control and repository management platform. Based on the project structure, it provides Git-like operations (init, add, commit, push, pull), issue tracking, and developer profiles with contribution heatmaps .

---

## 🏗️ Overall System Architecture (HLD)
DevVault utilizes a modern decoupled Client-Server architecture.
*   **Client (Frontend):** A Single Page Application (SPA) built with React and Vite .
*   **API (Backend):** A Node.js RESTful API handling business logic, authentication, and version control (VCS) operations .
*   **Storage & Cloud:** Employs a database (likely MongoDB via Mongoose) for application data (users, repos, issues) and AWS (via `aws-config.js`) for object/repository storage .

---

## ⚙️ Backend System Design

### 📦 Backend Dependencies
| Category | Likely Technologies (Inferred) |
| :--- | :--- |
| **Runtime & Framework** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose models) |
| **Cloud Provider** | AWS SDK (`aws-config.js`)  |
| **Security** | JWT, bcrypt (Auth middlewares) |

### 🗺️ Backend High-Level Design (HLD)
The backend acts as an API Gateway that routes incoming HTTP requests through security middlewares before passing them to specific controllers. 
1.  **User & Auth Module:** Manages registration, login, and access control.
2.  **Repository Module:** Manages metadata for user repositories.
3.  **VCS Engine:** Handles the heavy lifting of core version control commands (add, commit, push, pull, revert) .
4.  **Issue Tracker:** Manages creation and state of repository issues .

### 🔬 Backend Low-Level Design (LLD)
The backend follows a strict Model-View-Controller (MVC) directory pattern :

*   **1. Routing (`/backend/routes/`)** 
    *   `main.router.js`: Central router orchestrating traffic.
    *   `user.router.js`, `repo.router.js`, `issue.router.js`: Domain-specific API endpoints.
*   **2. Middleware (`/backend/middleware/`)** 
    *   `authMiddleware.js`: Verifies user sessions/tokens.
    *   `authorizeMiddleware.js`: Handles Role-Based Access Control (RBAC) or repo ownership verification.
*   **3. Controllers (`/backend/controllers/`)** 
    *   *App Controllers:* `userController.js`, `repoController.js`, `issueController.js` (Handle CRUD operations).
    *   *VCS Controllers:* Isolated business logic for Git-like operations: `init.js`, `add.js`, `commit.js`, `push.js`, `pull.js`, `revert.js`.
*   **4. Data Models (`/backend/models/`)** 
    *   `userModel.js`: Schema for user credentials and profile data.
    *   `repoModel.js`: Schema for repository metadata (name, owner, visibility).
    *   `issueModel.js`: Schema for bug tracking and tasks linked to repos.
*   **5. Configuration (`/backend/config/`)** 
    *   `aws-config.js`: AWS credentials and S3 bucket configurations for storing repository blobs/trees.

---

## 💻 Frontend Design

### 📦 Frontend Dependencies
| Category | Technologies (Inferred) |
| :--- | :--- |
| **Framework** | React, Vite  |
| **Routing** | React Router (`Routes.jsx`)  |
| **State Management**| React Context API (`authContext.jsx`)  |
| **Styling** | Vanilla CSS (`.css` files per component)  |

 
### 🔬 Design 
The frontend is structured by feature components :

*   **1. Core Application (`/frontend/src/`)** 
    *   `main.jsx` & `App.jsx`: Application entry points, injecting global providers.
    *   `Routes.jsx`: Defines the navigational map (e.g., mapping URLs to `Login`, `Dashboard`, etc.).
    *   `authContext.jsx`: A React Context provider that wraps the app to provide global access to the user's authentication status and token.
*   **2. Components (`/frontend/src/components/`)** 
    *   **Auth Module:** `Login.jsx` and `Signup.jsx` (Form handling, API calls for token retrieval).
    *   **User Module:** 
        *   `Profile.jsx`: Displays user metadata and repository lists.
        *   `HeatMap.jsx`: A visual component rendering user contribution activity (similar to GitHub's commit graph).
    *   **Dashboard Module:** `Dashboard.jsx` (The central hub for users to view recent activity, issues, and repositories).
    *   **Shared:** `Navbar.jsx` (Global navigation header).
*   **3. Assets (`/frontend/src/assets/`)** 
    *   Contains static resources like `github-mark-white.svg` and `react.svg`.


###

## 🚀 Getting Started (Initialization)

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd DevVault
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and start the server .
```bash
cd backend
npm install
# Start the development server (e.g., using nodemon or standard node)
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the Vite development server .
```bash
cd ../frontend
npm install
# Start the Vite React development server
npm run dev
```

---

## 🔐 Environment Variables (.env)

The backend requires a `.env` file to securely store database credentials, API keys, and secrets . 

Create a `.env` file in the `backend/` directory (`DevVault/backend/.env`) and populate it with the following configuration variables :

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (MongoDB)
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devvault

# Security / Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# AWS Configuration (for aws-config.js)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name
```
*(Note: Do not commit your actual `.env` file to version control. It should be ignored via `.gitignore`.)*


--- 

## 📄 License

This project is licensed under the MIT License.
