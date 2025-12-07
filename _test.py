#!/usr/bin/env python3

import os
import shutil
import sys

_location = '.'
if __file__:
    _location = __file__
SRC_DIR = os.path.dirname(_location)
BUILD_DIR = os.path.join(SRC_DIR, 'build')

def main():
    if not os.path.exists(BUILD_DIR):
        os.makedirs(BUILD_DIR)

if __name__ == '__main__':
    main()

sys.exit()
