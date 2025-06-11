# Mubwiza Garden - Netlify Deployment Guide

## Prerequisites
1. A Netlify account (free at https://netlify.com)
2. Your project built successfully

## Step 1: Build Your Project
1. Open a terminal in your project directory
2. Navigate to the frontend folder:
   ```bash
   cd frontend_garden
   ```
3. Install dependencies (if not already done):
   ```bash
   npm install
   ```
4. Create a production build:
   ```bash
   npm run build
   ```
   This will create a `build` folder with your optimized website.

## Step 2: Deploy to Netlify

### Option A: Drag and Drop (Easiest)
1. Go to https://netlify.com and sign up/log in
2. On your dashboard, look for the "Deploy manually" section
3. Drag and drop the entire `frontend_garden/build` folder onto the deployment area
4. Netlify will automatically deploy your site and give you a URL

### Option B: Git Integration (Recommended for updates)
1. Push your code to GitHub, GitLab, or Bitbucket
2. In Netlify, click "New site from Git"
3. Connect your repository
4. Set build settings:
   - **Base directory**: `frontend_garden`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend_garden/build`
5. Click "Deploy site"

## Step 3: Configure Custom Domain
1. In your Netlify site dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. For a free subdomain, you can use: `mubwiza-garden.netlify.app`
4. Or register a custom domain like `mubwizagarden.com`

## Step 4: Environment Variables (if needed)
If your app uses environment variables:
1. Go to Site settings > Environment variables
2. Add any required variables (like API URLs)

## Step 5: Enable HTTPS
Netlify automatically provides HTTPS for all sites, including custom domains.

## Suggested Domain Names (Free .netlify.app subdomains)
- `mubwiza-garden.netlify.app`
- `mubwizagarden.netlify.app`
- `fresh-mubwiza.netlify.app`
- `mubwiza-organic.netlify.app`

## Build Configuration File
Create a `netlify.toml` file in your project root for advanced configuration:

```toml
[build]
  base = "frontend_garden"
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## Troubleshooting
1. **Build fails**: Check that all dependencies are in package.json
2. **404 errors**: Make sure the publish directory is set to `frontend_garden/build`
3. **Routing issues**: Add the redirects rule in netlify.toml (shown above)

## Automatic Deployments
Once connected to Git, Netlify will automatically redeploy when you push changes to your main branch.

Your site will be live at: `https://your-site-name.netlify.app`
