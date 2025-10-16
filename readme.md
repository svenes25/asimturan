Bu proje, **FastAPI + React.JS + PostgreSQL** kullanılarak geliştirilmiş bir e-ticaret sitesi uygulamasıdır. Giriş/Kayıt, Anasayfa, Ürünler, İletişim, Profil, Admin Paneli Ürün Yönetimi, Sipariş Yönetimi, Kampanya Yönetimi, Ürün Yorumları gibi temel işlevleri destekler. Proje, **Docker** ile kolayca ayağa kaldırılabilir.

---

## Teknolojiler

- **Backend:** Python 3.12, FastAPI
- **Frontend:** React 
- **Veritabanı:** PostgreSQL
- **ORM:** SQLAlchemy
- **Docker:** Backend, Frontend  ve PostgreSQL konteynerleri



---

## Özellikler

- Kullanıcı kayıt, giriş ve güncelleme
- Şifre değiştirme ve yetkilendirme
- Ürün listeleme, filtreleme, detay ve yorumlar
- Sipariş yönetimi ve sipariş detaylarını görüntüleme
- Puanlama ve yorum yapma
- Docker ile kolay kurulum ve dağıtım

---

## Proje Yapısı

```
asimturan
├──backend/
│  ├── app/
│  │   ├── api/
│  │   │   ├── endpoints/   
│  │   │   ├── models/          
│  │   │   └── schemas/         
│  │   └── main.py          
│  ├── Dockerfile
│  └── requirements.txt
├──frontend/
│  └──src/
│     ├──app/
│     ├──components/
│     └──lib/
└── docker-compose.yml
```

---

## Kurulum ve Çalıştırma

### 1. Repo'yu klonla

```bash
git clone <repo-url>
```

### 2. Docker ile çalıştır

```bash
docker-compose up --build
```

Docker Compose, aşağıdaki servisleri ayağa kaldırır:

- `db` → PostgreSQL (port: 5432)
- `backend` → FastAPI uygulaması (port: 8000)
- `frontend` → React uygulaması (port: 3000)

### 3. API Dokümantasyonu

Backend çalıştıktan sonra Swagger UI’a erişmek için:

```
http://localhost:8000/docs
```

---

---

## Docker Compose Örnek Yapısı

```yaml
version: "3.9"

services:
  backend:
    build: ./backend
    container_name: fastapi_app
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql+psycopg2://postgres:password@db:5432/mydb
    depends_on:
      - db

  frontend:
    build: ./frontend
    container_name: react_app
    ports:
      - "3000:3000"
    stdin_open: true
    tty: true
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
      - REACT_APP_API_URL=http://localhost:8000
    depends_on:
      - backend

  db:
    image: postgres:16
    container_name: postgres_container
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=asimturan
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:


```

---

---

