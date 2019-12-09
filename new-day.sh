#!/bin/bash

if [ "$2" = "b" ]
then
  touch day$1/day$1b.js
  touch day$1/day$1b.spec.js
else
  mkdir day$1
  touch day$1/day$1a.js
  touch day$1/day$1a.spec.js
  touch day$1/input.txt
fi
