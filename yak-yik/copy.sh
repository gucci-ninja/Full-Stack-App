#!/bin/bash

webpack
echo ran webpack

rm -r public/build/
echo removed previous build

mv dist/public/* public/
echo moved new bundle

