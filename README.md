# Test Ant Design project

This repository to test [Ant Design](https://ant.design/).

## Prerequisites

Before getting started, ensure the following tools are installed:

- [Node.js](https://nodejs.org/uk) (version 18.0.0 or higher)
- [pnpm](https://pnpm.io/) (recommended package manager)
- [Git](https://git-scm.com/) (for version control)
- A modern code editor like [VS Code](https://code.visualstudio.com/)

### Optional but recommended:

- [TypeScript](https://www.typescriptlang.org/) knowledge
- Basic understanding of [React](https://react.dev/)
- Familiarity with [Ant Design](https://ant.design/) components

---

## 1. Clone the repository:

```bash
git clone https://github.com/vdyshlevyi/test-ant-components
cd test-ant-components
```

## 2. Install dependencies:

```bash
pnpm install
```

## 3. Start development server:

```bash
pnpm dev
```

## 4. Open in browser:

Navigate to `http://localhost:5173/` (or the port shown in terminal)

### 5. Available Scripts:

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

---

## Docker Setup

This project includes a full-stack Docker setup with PostgreSQL database, Python backend API, and React frontend.

### Prerequisites for Docker:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Start all services:

```bash
docker compose up -d
```

This will start:

- **Database**: PostgreSQL on `http://localhost:9900`
- **Backend API**: Python FastAPI on `http://localhost:9901`
- **Frontend**: React app on `http://localhost:9902`

### 2. Create admin user:

After the containers are running, create an admin user for the backend:

```bash
docker compose exec api python -m scripts.create_admin_user
```

This creates an admin user with credentials:

- **Email**: `admin@example.com`
- **Password**: `123456`

### 3. Access the application:

- **Frontend**: [http://localhost:9902](http://localhost:9902)
- **API Documentation**: [http://localhost:9901/docs](http://localhost:9901/docs)

### 4. Stop all services:

```bash
docker compose down
```

---

### 6. Technologies Used:

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Ant Design 5** - UI component library
- **pnpm** - Package manager
