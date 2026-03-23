-- Row Level Security (RLS) policies for ArtCart
-- Each user can only SELECT, INSERT, UPDATE, DELETE their own rows.
-- Run this in the Supabase SQL Editor.

-- ===== SUPPLIES =====
ALTER TABLE supplies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own supplies"
  ON supplies FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own supplies"
  ON supplies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own supplies"
  ON supplies FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own supplies"
  ON supplies FOR DELETE
  USING (auth.uid() = user_id);

-- ===== WISHLIST =====
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wishlist"
  ON wishlist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wishlist"
  ON wishlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlist"
  ON wishlist FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlist"
  ON wishlist FOR DELETE
  USING (auth.uid() = user_id);

-- ===== GALLERY =====
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own gallery"
  ON gallery FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gallery"
  ON gallery FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gallery"
  ON gallery FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own gallery"
  ON gallery FOR DELETE
  USING (auth.uid() = user_id);
