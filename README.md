# SEO Content Writer

An AI-powered content writer prototype that generates SEO-optimized content through a multi-step workflow.

## Project Structure

```
├── seo-content-writer/     # React frontend
├── backend/                # Node.js API server
├── llm-service/           # Python LLM service
└── vercel.json            # Deployment configuration
```

## Features

- **Keyword Research**: Generate related keywords from a seed keyword
- **Title Generation**: Create SEO-optimized titles
- **Topic Selection**: Generate content outlines and structures
- **Content Creation**: Generate final SEO-optimized content
- **SEO Analysis**: Real-time SEO scoring and recommendations
- **User Authentication**: Firebase-based authentication
- **Export Options**: Copy to clipboard or download as text

## Tech Stack

- **Frontend**: React.js, Material-UI, Firebase Auth
- **Backend**: Node.js, Express.js
- **LLM Service**: Python, Flask, OpenAI API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- OpenAI API key (optional, will use mock data without it)

### Installation

1. **Clone the repository**
   ```bash
   cd e:\QED42\seo
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd seo-content-writer
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Install Python Dependencies**
   ```bash
   cd ../llm-service
   pip install -r requirements.txt
   ```

5. **Configure Environment Variables**
   
   **Frontend (.env)**:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_FIREBASE_API_KEY=your-firebase-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project
   ```     **Backend (.env)**:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   LLM_SERVICE_URL=http://localhost:5001
   CORS_ORIGIN=http://localhost:3000
   ```
   
   **LLM Service (.env)**:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   FLASK_ENV=development
   ```

### Running the Application

1. **Start the LLM Service** (Terminal 1):
   ```bash
   cd llm-service
   python app.py
   ```

2. **Start the Backend API** (Terminal 2):
   ```bash
   cd backend
   npm run dev
   ```

3. **Start the Frontend** (Terminal 3):
   ```bash
   cd seo-content-writer
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- LLM Service: http://localhost:5001

## Usage

1. **Register/Login**: Create an account or sign in
2. **Keyword Research**: Enter a seed keyword to generate related keywords
3. **Select Keyword**: Choose from the suggested keywords
4. **Generate Titles**: Get SEO-optimized title suggestions
5. **Select Title**: Choose your preferred title
6. **Topic Selection**: Review and select a content outline
7. **Content Creation**: Generate your final content with SEO scoring
8. **Export**: Copy to clipboard or download the content

## API Endpoints

### Backend API (Node.js)
- `POST /api/keywords/research` - Generate keywords
- `POST /api/titles/generate` - Generate titles
- `POST /api/topics/generate` - Generate topic outlines
- `POST /api/content/generate` - Generate content
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### LLM Service (Python)
- `POST /generate-keywords` - LLM keyword generation
- `POST /generate-titles` - LLM title generation
- `POST /generate-topics` - LLM topic generation
- `POST /generate-content` - LLM content generation
- `POST /analyze-seo` - SEO analysis

## Deployment

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add REACT_APP_FIREBASE_API_KEY
   # ... other environment variables
   ```

## Development Notes

- The application works with mock data when OpenAI API key is not provided
- Firebase authentication can be replaced with mock auth for development
- All data is stored in session/localStorage (no persistent database)
- SEO scoring provides real-time feedback on content quality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
# -AI_Content_Writer_Prototype
# -AI_Content_Writer_Prototype
# -AI_Content_Writer_Prototype
# AI_Content_Writer_Prototype
