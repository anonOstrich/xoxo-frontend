# For now let's keep the served files extremely readable :)
if [ -d dist ]; then
  rm -r dist
fi
mkdir dist
cp src/* dist