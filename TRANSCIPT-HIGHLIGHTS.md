## Transcript Highlights

### 1. Planning the supplies inventory page (Early development)
#### 1-crud-supplies.txt
I worked with Claude to create a detailed prompt that outlined the styling and layout for the supplies.html page, covering CRUD operations for art supplies. This upfront planning ensured the page was built with clear structure and visual hierarchy from the start.

### 2. Debugging data duplication in Supabase (Mid-development)
#### 7a-seed-duplicate-debug.txt
When seeding the database, I encountered duplicate records being created across multiple queries. Claude helped me trace the issue to query logic and implement proper constraints to prevent duplicates.

### 3. Fixing data persistence with Netlify pretty URLs (Late-stage debugging)
#### 9-data-persistence-debug.txt
The app was losing data on page refresh due to Netlify's pretty URL feature not preserving certain state. I worked with Claude to refactor how the app handles URL routing and session persistence, ensuring data remained intact across navigation.
