# Development Scripts

## Frontend Development
```bash
cd seo-content-writer
npm start
```

## Backend Development
```bash
cd backend
npm run dev
```

## LLM Service Development
```bash
cd llm-service
python app.py
```

## Testing

### Frontend Tests
```bash
cd seo-content-writer
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

## Building for Production

### Frontend Build
```bash
cd seo-content-writer
npm run build
```

## Environment Setup

1. Copy `.env.example` files to `.env` in each directory
2. Fill in your OpenAI API key and configuration
3. For development without API keys, the app will use mock data

## Common Issues

### CORS Errors
- Ensure CORS_ORIGIN in backend .env matches your frontend URL
- Check that all services are running on correct ports

### API Key Issues
- Verify OpenAI API key is correctly set
- Check API key has sufficient credits
- App will fallback to mock data if keys are missing

### Port Conflicts
- Frontend: 3000
- Backend: 5000
- LLM Service: 5001
- Change ports in .env files if needed
