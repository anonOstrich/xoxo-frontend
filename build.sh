# For now let's keep the served files extremely readable :)
if [ -d dist ]; then
  rm -r dist
fi
mkdir dist
cp -R src/index.html src/css src/js src/html dist