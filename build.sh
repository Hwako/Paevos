set -e
mkdir -p public/assets
cp src/index.html public/index.html
META="$(cat src/meta.html)"
sed -i "s#<meta name=\"twitter:card\" content=\"summary\">#$META#" public/index.html
grep -q 'og-v2.png' public/index.html
cp favicon.svg public/favicon.svg
cp assets/logo-email.png assets/og-v2.png public/assets/
cp assets/og-v2.png public/assets/og.png
