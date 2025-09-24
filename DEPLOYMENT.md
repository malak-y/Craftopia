# Craftopia - Vercel Deployment Guide

This guide will help you deploy your Craftopia application to Vercel using GitHub Actions.

## Prerequisites

1. A GitHub repository containing your Craftopia project
2. A Vercel account
3. Node.js 18.x or higher

## Setup Instructions

### 1. Vercel Setup

1. **Sign up/Login to Vercel**: Go to [vercel.com](https://vercel.com) and create an account or log in
2. **Create Projects**:
   - Create a new project for the Frontend
   - Create another project for the Backend
   - Note down the Project IDs from the project settings

3. **Get Vercel Tokens**:
   - Go to Vercel Dashboard → Settings → Tokens
   - Create a new token and copy it
   - Go to Account Settings to get your Organization ID

### 2. GitHub Secrets Configuration

In your GitHub repository, go to Settings → Secrets and Variables → Actions, and add the following secrets:

#### Required Secrets:
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_organization_id
VERCEL_PROJECT_ID=your_frontend_project_id
VERCEL_BACKEND_PROJECT_ID=your_backend_project_id
```

#### Environment Variables (Backend):
```
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASS=npg_VFtd46acKfJL
DB_HOST=ep-super-resonance-a907tk1s-pooler.gwc.azure.neon.tech
JWT_SECRET=0af946f8f623eb1f25fdbaa4032a856381842b8092ff4a13d3e9386c8ff0879e50d3a6e57434d597cf923d8a755e4b6b
FIREBASE_DATABASE_URL=https://craftopia-b79f8-default-rtdb.europe-west1.firebasedatabase.app/
FIREBASE_PROJECT_ID=craftopia-b79f8
FIREBASE_PRIVATE_KEY_ID=c474e658ad4f5163102780036341bede35577a81
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHVQud5LIjnZbc..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@craftopia-b79f8.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=115853900944670716353
CLOUDINARY_CLOUD_NAME=dulfpugu8
CLOUDINARY_API_KEY=366182191772117
CLOUDINARY_API_SECRET=Rxpmc8IHWcb7Oq5lb3NukOvyFdc
EMAIL_USER=carftopia10@gmail.com
EMAIL_PASSWORD=qvel uoyu xfsg llgs
```

### 3. Project Structure

Your project now includes:
- `Frontend/vercel.json` - Vercel configuration for the React frontend
- `Backend/vercel.json` - Vercel configuration for the Node.js backend
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automated deployment
- `.env.example` - Template for environment variables

### 4. Deployment Process

1. **Push to GitHub**: Push your code to the main/master branch
2. **Automatic Deployment**: GitHub Actions will automatically:
   - Install dependencies for both frontend and backend
   - Build the frontend
   - Deploy both frontend and backend to Vercel

### 5. Manual Deployment (Alternative)

If you prefer manual deployment:

#### Frontend:
```bash
cd Frontend
npm install
npm run build
vercel --prod
```

#### Backend:
```bash
cd Backend
npm install
vercel --prod
```

## Important Notes

- **Environment Variables**: Make sure all required environment variables are set in GitHub Secrets
- **Database**: Ensure your database (Neon) allows connections from Vercel's IP ranges
- **CORS**: The backend should be configured to allow requests from your frontend domain
- **API URLs**: Update your frontend to use the deployed backend URL instead of localhost

## Troubleshooting

1. **Build Failures**: Check the GitHub Actions logs for detailed error messages
2. **Environment Variables**: Verify all secrets are properly set in GitHub
3. **Database Connections**: Ensure your database accepts connections from Vercel
4. **CORS Issues**: Update CORS settings in your backend to allow your frontend domain

## URLs After Deployment

After successful deployment, you'll get:
- Frontend: `https://your-frontend-project.vercel.app`
- Backend: `https://your-backend-project.vercel.app`

Remember to update your frontend to use the backend URL instead of localhost!