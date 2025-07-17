/*
  # User Paintings Database Schema

  1. New Tables
    - `user_paintings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `original_image_url` (text)
      - `processed_image_url` (text)
      - `painting_data` (jsonb) - stores regions, colors, progress
      - `completion_percentage` (integer)
      - `is_completed` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_paintings` table
    - Add policies for authenticated users to manage their own paintings
*/

CREATE TABLE IF NOT EXISTS user_paintings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'Untitled Painting',
  original_image_url text NOT NULL,
  processed_image_url text,
  painting_data jsonb NOT NULL DEFAULT '{}',
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  is_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_paintings ENABLE ROW LEVEL SECURITY;

-- Users can read their own paintings
CREATE POLICY "Users can read own paintings"
  ON user_paintings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own paintings
CREATE POLICY "Users can create own paintings"
  ON user_paintings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own paintings
CREATE POLICY "Users can update own paintings"
  ON user_paintings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own paintings
CREATE POLICY "Users can delete own paintings"
  ON user_paintings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_paintings_user_id ON user_paintings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_paintings_created_at ON user_paintings(created_at DESC);