# Live Stream Management System

## Overview
A comprehensive YouTube live stream management system has been added to your Metaverse Admin Dashboard. This allows administrators to store, manage, and serve YouTube video URLs to metaverse clients.

## What's Been Implemented

### 🗄️ Database Layer
- **New Table**: `t_live_streams` with the following fields:
  - `id` - Primary key
  - `title` - Stream title (required)
  - `youtube_url` - YouTube URL with validation (required)
  - `description` - Optional description
  - `is_active` - Boolean flag (only one stream can be active at a time)
  - `created_by` - Foreign key to users table
  - `view_count` - Track how many times stream was accessed
  - `created_at` / `updated_at` - Timestamps

- **Migration File**: `live_stream_migration.sql` ready to execute

### 🔧 Backend API
- **Model**: `LiveStream.js` with Sequelize ORM integration
- **Controller**: `LiveStreamController.js` with full CRUD operations
- **Routes**: Added to `routes/web.js`

#### API Endpoints:
```
Admin Routes (require authentication):
- GET    /api/admin/livestreams          - List all streams (with pagination/search)
- GET    /api/admin/livestreams/stats    - Get stream statistics  
- GET    /api/admin/livestreams/:id      - Get single stream
- POST   /api/admin/livestreams          - Create new stream
- PUT    /api/admin/livestreams/:id      - Update stream
- DELETE /api/admin/livestreams/:id      - Delete stream
- PATCH  /api/admin/livestreams/:id/toggle - Toggle active status

Public Route (for metaverse client):
- GET    /api/livestream/active          - Get currently active stream
```

### 🎨 Frontend Dashboard
- **New Page**: `client/src/pages/dashboard/livestream.tsx`
- **Sidebar Menu**: Added "Live Stream" with video icon
- **Route**: `/dashboard/livestream`

#### Features:
- ✅ Create/Edit/Delete streams
- ✅ Toggle active status (only one stream active at a time)
- ✅ Search and pagination
- ✅ Statistics dashboard
- ✅ YouTube URL validation
- ✅ Thumbnail preview
- ✅ View counter
- ✅ Responsive design

## Setup Instructions

### 1. Run Database Migration
```sql
-- Execute the migration file
mysql -u your_username -p your_database < live_stream_migration.sql

-- OR run the SQL directly in your database:
-- (See content in live_stream_migration.sql)
```

### 2. Restart Your Backend
```bash
cd D:\metaverseDashboard\metaverseDashboard
npm start
# or node index.js
```

### 3. Install Frontend Dependencies (if needed)
```bash
cd client
npm install
npm run dev
```

### 4. Access the Feature
- Navigate to your admin dashboard
- Click "Live Stream" in the sidebar
- Start adding YouTube URLs!

## Usage Guide

### For Admins:
1. **Add a Stream**: Click "Add Stream" button
2. **Fill Form**:
   - Title: Give your stream a descriptive name
   - YouTube URL: Paste the full YouTube URL
   - Description: Optional details
   - Active Status: Toggle if this should be the active stream
3. **Manage Streams**: Edit, delete, or toggle status of existing streams

### For Metaverse Clients:
```javascript
// Example client-side code to fetch active stream
fetch('/api/livestream/active')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const streamUrl = data.data.youtube_url;
      // Use streamUrl in your metaverse application
      console.log('Active stream:', data.data);
    }
  });
```

## Features Explained

### 🎯 Active Stream Logic
- Only **one stream can be active** at a time
- When setting a stream as active, all others automatically become inactive
- The `/api/livestream/active` endpoint always returns the most recent active stream

### 📊 Statistics Dashboard
- **Total Streams**: Count of all streams
- **Active Streams**: Currently active streams
- **Total Views**: Cumulative view count
- **Recent Activity**: Latest streams added

### 🔍 Search & Filter
- Search by title, description, or creator username
- Real-time filtering
- Pagination for large datasets

### ✅ URL Validation
- Server-side YouTube URL validation
- Supports both youtube.com and youtu.be formats
- Client-side form validation

### 🖼️ Visual Features
- YouTube thumbnail previews
- Status badges (Active/Inactive)
- Creator information display
- Responsive card layout

## Security Features
- ✅ Admin authentication required
- ✅ CSRF protection on non-API routes
- ✅ Input validation and sanitization
- ✅ Foreign key constraints

## Next Steps
1. **Run the migration** to create the database table
2. **Test the functionality** in your admin dashboard
3. **Integrate with your metaverse client** using the public API endpoint
4. **Customize styling** if needed to match your brand

## API Response Examples

### Get Active Stream Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Metaverse Live Event",
    "youtube_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "description": "Join us for an amazing virtual experience!",
    "view_count": 42,
    "created_at": "2024-11-11T19:36:00.000Z"
  }
}
```

### Create Stream Request:
```json
{
  "title": "Weekly Metaverse Meetup",
  "youtube_url": "https://www.youtube.com/watch?v=example123",
  "description": "Weekly community gathering in our virtual world",
  "is_active": true
}
```

## Troubleshooting

### Common Issues:
1. **"Table doesn't exist"** → Run the migration SQL
2. **"Unauthorized"** → Ensure admin is logged in
3. **"Invalid YouTube URL"** → Check URL format
4. **Frontend not loading** → Check if client dependencies are installed

Your Live Stream management system is now ready to use! 🚀
