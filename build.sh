set -e
mkdir -p public/assets
cat src/p1.html src/p2.html src/x1.html src/p3.html src/p4.html src/p5.html src/x2.html src/p6.html > public/index.html
META="$(cat src/meta.html)"
sed -i "s#<meta name=\"twitter:card\" content=\"summary\">#$META#" public/index.html
grep -q 'og-v2.png' public/index.html
cp favicon.svg public/favicon.svg
cp assets/logo-email.png assets/og-v2.png public/assets/
cp assets/og-v2.png public/assets/og.png
