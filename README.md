# ArtCart

### Project Description

ArtCart is an art supply inventory web application that can help users categorize and keep track of various art supplies that they have or would like to have in the future. Three distinct functions include the inventory (for art supplies users already have) and the wishlist (for art supplies they want to have in the future), and the gallery (for storing images of art/swatches/etc.).

### Technologies Used

**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Supabase

**Development:**
- Claude Code

### Architecture Overview

**Frontend:**
- Single-page application with multiple HTML files (login, signup, supplies inventory, wishlist, and gallery)
- Vanilla JavaScript handles user interactions, form submissions, and real-time data synchronization
- Styling managed through a centralized CSS file for consistent design across all pages

**Backend & Database:**
- Supabase provides the backend infrastructure with:
  - **Authentication:** User sign-up and login via Supabase Auth
  - **Database:** PostgreSQL database storing supplies, wishlist items, and gallery metadata
  - **Storage:** Cloud storage for user-uploaded gallery images
- JavaScript client communicates directly with Supabase via REST API calls

**Data Structure:**
- **Supplies table:** Tracks art inventory (name, category, quantity, brand, origin, dimensions, notes, tags)
- **Wishlist table:** Stores items users want to purchase (similar structure to supplies)
- **Gallery table:** Stores image metadata and links to cloud storage
- **Auth system:** Manages user sessions and permissions

### Setup Instructions

Visit the deployed application at: https://artcart-midterm-complete.netlify.app/

The app runs directly in your browser—no installation needed!

### Known Bugs or Limitations

- **Gallery limitation:** Users can only post one image at a time.
- **Wishlist duplication:** The wishlist allows duplicate items to be added to the inventory, with relatively limited data entry fields.

### What I Learned

In this project, I learned a lot about how I can keep my workflow organized. This involved creating categorized, detailed prompts, working on the web app feature by feature, and systematically debugging. I also hadn't realized that AI can be a helpful tool for planning a course of action and debugging as opposed to only helping generate code.
