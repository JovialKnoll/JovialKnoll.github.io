#!/usr/bin/env python3

import os
import shutil
import fnmatch
import sys

_location = '.'
if __file__:
    _location = __file__
SRC_DIR = os.path.dirname(_location)
BUILD_DIR = os.path.join(SRC_DIR, 'build')

def main():
    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR)
    shutil.copytree(SRC_DIR, BUILD_DIR, ignore=shutil.ignore_patterns('.git*', '_*', 'CNAME'))
    for dirpath, dirnames, filenames in os.walk(BUILD_DIR):
        for filename in fnmatch.filter(filenames, '*.html') + fnmatch.filter(filenames, '*.js'):
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r') as f:
                text = f.read()
            text = text.replace('="/', '="./')
            with open(filepath, 'w') as f:
                f.write(text)

if __name__ == '__main__':
    main()

sys.exit()
