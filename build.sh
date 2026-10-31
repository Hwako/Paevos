set -e
mkdir -p public/assets
cp src/index.html public/index.html
META="$(cat src/meta.html)"
sed -i "s#<meta name=\"twitter:card\" content=\"summary\">#$META#" public/index.html
grep -q 'og-v3.png' public/index.html
cp favicon.svg favicon.ico apple-touch-icon.png public/
cp assets/logo-email.png assets/og-v3.png public/assets/
cp assets/og-v3.png public/assets/og.png
cp assets/og-v3.png public/assets/og-v2.png
