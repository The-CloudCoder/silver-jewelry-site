#!/usr/bin/env bash
set -e
mkdir -p public/images
echo "Downloading Unsplash images into public/images/ ..."
curl -L "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1600&auto=format&fit=crop" -o public/images/ring.jpg
curl -L "https://images.unsplash.com/photo-1531925470850-3a6f6f0f5f78?w=1600&auto=format&fit=crop" -o public/images/necklace.jpg
curl -L "https://images.unsplash.com/photo-1600180758890-2f8a5f0f7f3e?w=1600&auto=format&fit=crop" -o public/images/bracelet.jpg
curl -L "https://images.unsplash.com/photo-1518544801173-6f9f3b1b6f64?w=1600&auto=format&fit=crop" -o public/images/earrings.jpg
curl -L "https://images.unsplash.com/photo-1520975919390-6b8b1f9c7c7f?w=1600&auto=format&fit=crop" -o public/images/pendant.jpg
curl -L "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600&auto=format&fit=crop" -o public/images/chain.jpg
echo "Done. Images saved to public/images/"
