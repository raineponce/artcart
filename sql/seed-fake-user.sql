-- Seed script: insert default supplies and wishlist items for the fake user
-- User: art@block.com / @rtist
-- Run this in the Supabase SQL Editor AFTER signing up the user via the app

-- Get the fake user's ID
DO $$
DECLARE
  fake_uid uuid;
BEGIN
  SELECT id INTO fake_uid FROM auth.users WHERE email = 'art@block.com';

  IF fake_uid IS NULL THEN
    RAISE EXCEPTION 'User art@block.com not found. Sign up first via the app.';
  END IF;

  -- ===== SUPPLIES (14 items) =====
  INSERT INTO supplies (user_id, name, category, quantity, brand, origin, dimensions, notes, tags) VALUES
    (fake_uid, 'Colored Pencils',     'drawing',     72, 'Prismacolor',      'Blick Art Materials', '8 x 8.25 in',     'Premier soft core set. Great for blending and layering.',             ARRAY['dry','drawing','blendable','colored']),
    (fake_uid, 'Graphite Pencils',    'drawing',     12, 'Royal Langnickel',  'Amazon',             '5.5 x 10 in',     'Sketching set ranging from 6H to 8B.',                               ARRAY['dry','drawing','sketching','graphite']),
    (fake_uid, 'Vine Charcoal',       'drawing',     36, 'Jack Richeson',     'Jerry''s Artarama',  '2 x 7 in',        'Soft grade, good for gesture drawings and large studies.',            ARRAY['dry','drawing','sketching','charcoal']),
    (fake_uid, 'Acrylic Paint',       'painting',     4, 'Liquitex',          'Blick Art Materials', 'N/A',             'Heavy body basics set — titanium white, mars black, cad yellow, ultramarine blue.', ARRAY['wet','painting','acrylic','colored']),
    (fake_uid, 'Watercolor Set',      'painting',    12, 'Winsor & Newton',   'Michaels',           '5.5 x 10 in',     'Cotman half-pan travel set with built-in mixing palette.',            ARRAY['wet','painting','watercolor','portable']),
    (fake_uid, 'Face Paint',          'painting',    12, 'TAG Face Paint',    'Amazon',             '10 x 5 in',       'Skin-safe, water-activated split cakes for events.',                  ARRAY['wet','painting','skin-safe','portable']),
    (fake_uid, 'Stretched Canvas',    'surfaces',     6, 'Arteza',            'Arteza.com',         '16 x 20 in',      'Pre-primed cotton canvases, gallery-wrapped.',                        ARRAY['surfaces','canvas','primed','painting']),
    (fake_uid, 'Watercolor Paper Pad','surfaces',     2, 'Canson',            'Blick Art Materials', '9 x 12 in',      '140 lb cold press, 30 sheets per pad.',                               ARRAY['surfaces','paper','watercolor','portable']),
    (fake_uid, 'Palette Knives',      'tools',        5, 'Conda',             'Amazon',             'Assorted',         'Stainless steel set for mixing and impasto technique.',               ARRAY['tools','mixing','painting','metal']),
    (fake_uid, 'Craft Scissors',      'tools',        3, 'Fiskars',           'Michaels',           '8 in',            'Precision-tip, great for detailed paper cutting.',                     ARRAY['tools','cutting','paper','metal']),
    (fake_uid, 'Gesso',               'chemicals',    1, 'Liquitex',          'Blick Art Materials', '16 oz',           'White acrylic gesso for priming surfaces before painting.',           ARRAY['wet','chemicals','primer','painting']),
    (fake_uid, 'Brush Cleaner',       'chemicals',    2, 'General Pencil',    'Jerry''s Artarama',  '4 oz',            'The Masters brush cleaner and preserver.',                             ARRAY['chemicals','cleaning','painting','maintenance']),
    (fake_uid, 'Art Supply Bag',      'accessories',  1, 'Nicpro',            'Amazon',             '14 x 10 x 4 in', 'Zippered organizer with compartments for pencils and brushes.',        ARRAY['accessories','storage','portable','organization']),
    (fake_uid, 'Tabletop Easel',      'accessories',  1, 'US Art Supply',     'Amazon',             '18 in',           'Portable beechwood easel, adjustable angle.',                          ARRAY['accessories','easel','portable','wood']);

  -- ===== WISHLIST (3 items) =====
  INSERT INTO wishlist (user_id, name, category, quantity, brand, store) VALUES
    (fake_uid, 'Colored Pencils', 'drawing', 72, 'Prismacolor', 'Sam Flax'),
    (fake_uid, 'Tombow Erasers',  'drawing',  8, 'Tombow',      'Amazon'),
    (fake_uid, 'Gel Pens',        'drawing',  2, 'Gelly Roll',  'Sam Flax');

END $$;
