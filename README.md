# FoodPhoto Studio

Plataforma para gerar fotos profissionais de comida para delivery e redes sociais.

## Stack
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: Node.js + Express + TypeScript
- Auth/DB/Storage: Supabase
- IA: Gemini Image (Nano Banana)

## Requisitos
- Node.js 18+
- Conta no Supabase com buckets `originals` e `generated`

## Configuracao

### Backend
Crie o arquivo `backend/.env`:

```
PORT=5009
SUPABASE_URL=https://amduqqsryozypoapfrgy.supabase.co
SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_IMAGE_MODEL=gemini-3-pro-image-preview
SUPABASE_STORAGE_ORIGINALS=originals
SUPABASE_STORAGE_GENERATED=generated
```

### Frontend
Crie o arquivo `frontend/.env`:

```
VITE_API_URL=http://localhost:5009
```

## Rodar local (porta unica 5009)

Use o script que builda tudo e sobe em uma unica porta:

```
./scripts/start.sh
```

Acesse: `http://localhost:5009`

Para parar:
```
./scripts/stop.sh
```

## Scripts

### Frontend
- `npm run dev`
- `npm run build`
- `npm run preview`

### Backend
- `npm run dev`
- `npm run build`
- `npm start`

## Observacoes
- Os schemas do banco estao em `backend/sql/schema.sql` e `backend/sql/seed.sql`.
- Rode o SQL no Supabase antes do primeiro uso.
