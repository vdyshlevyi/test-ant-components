# Docker Compose Setup

## 🐳 Full Stack Setup (Frontend + Backend + PostgreSQL)

Цей проект підтримує запуск повного стеку через Docker Compose.

### Компоненти:

- **Database**: PostgreSQL (порт 9900)
- **Frontend**: React + TypeScript + Vite (порт 9901)
- **Backend**: Python API (порт 9902)

### Запуск:

```bash
# Запуск всього стеку
docker compose up -d

# Запуск з пересборкою
docker compose up --build

# Зупинка
docker compose down

# Зупинка з видаленням volumes
docker compose down -v
```

### Доступ:

- **PostgreSQL**: localhost:9900
- **Backend API**: http://localhost:9901
- **Frontend**: http://localhost:9902

### Environment Variables:

Frontend використовує:

- `VITE_BACKEND_URL` - URL backend API

Backend використовує:

- `DATABASE_URI` - підключення до PostgreSQL
- `SECRET_KEY` - ключ для токенів
- `DEBUG` - режим відладки

### Логи:

```bash
# Переглянути логи всіх сервісів
docker compose logs

# Логи конкретного сервісу
docker compose logs frontend
docker compose logs api
docker compose logs db
```

### Розробка:

Для development рекомендується:

1. Запустити тільки DB через Docker: `docker compose up db`
2. Backend та Frontend запускати локально
3. Використовувати `.env.development` для налаштувань
