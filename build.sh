#!/bin/bash
set -e

echo "Building C++ Platform..."
cd cpp/c-units-cpp
npm install
npm run build
cd ../..

echo "Building DSA Platform..."
cd dsa/dsa-cpp
npm install
npm run build
cd ../..

echo "Building Java Platform..."
cd java/java-units-java
npm install
npm run build
cd ../..

echo "Assembling global distribution..."
rm -rf dist
mkdir -p dist/cpp
mkdir -p dist/dsa
mkdir -p dist/java

cp -r cpp/c-units-cpp/out/* dist/cpp/
cp -r dsa/dsa-cpp/out/* dist/dsa/
cp -r java/java-units-java/out/* dist/java/

echo '<meta http-equiv="refresh" content="0; url=/dsa">' > dist/index.html

echo "Build complete. Artifacts are in the /dist folder."
