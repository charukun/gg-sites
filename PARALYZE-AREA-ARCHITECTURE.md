# PARALYZE AREA Museum Architecture

## UX
- Three.js / React Three Fiber museum corridor.
- Page scroll is camera travel: no room-by-room page snapping.
- Products are unmistakably purchasable: full mockup + product name + JPY price + BUY/COMING SOON on each showcase.
- Product detail remains DOM UI for legibility and checkout conversion.
- Mobile-first DPR cap and only active ±2 exhibits mount their image textures.

## Data separation
Supabase project `paralyze-area-museum` owns catalog data independently of the museum renderer.
Tables: `products`, `drops`, `exhibitions`, `assets`, `product_assets`, `orders`, `integration_jobs`.
Storage bucket: `product-media`.

The renderer consumes data. Adding products does not require edits to Three.js code.

## Director workflow
`/paralyze-area/admin`
1. Magic-link login.
2. Pick/upload image. Browser converts it to WebP and produces full, thumbnail and social variants before upload.
3. Enter product name + price + DROP + AREA + publish/sale times.
4. Save.
5. Museum reads the new product and creates its exhibit automatically.

Product operations: edit, duplicate, publish/unpublish, delete, move up/down.
DROP and AREA can be created from the same mobile form.

## Future AI endpoint
AI automation can call the same catalog boundary used by the admin UI. Intended pipeline:
upload -> enrich metadata -> generate mockups -> POD create -> product insert -> exhibition assignment -> publish schedule.
`integration_jobs` is intentionally generic so provider-specific workflows stay outside catalog records.

## Commerce boundary
`payment_provider`, `payment_product_id`, `payment_price_id`, `purchase_url`, `pod_provider`, `pod_product_id` are provider adapters, not rendering concerns.
Orders and fulfillment jobs are separate tables, ready for Stripe + POD webhooks/functions.
