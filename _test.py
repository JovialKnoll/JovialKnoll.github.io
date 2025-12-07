#!/usr/bin/env python3

import os
import shutil
import fnmatch
import re
import webbrowser
import sys

_location = '.'
if __file__:
    _location = __file__
SRC_DIR = os.path.dirname(_location)
BUILD_DIR = os.path.join(SRC_DIR, 'build')
TOPNAV_FILE = os.path.join(BUILD_DIR, 'top-nav.js')
INDEX_FILE = os.path.join(BUILD_DIR, 'index.html')

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
            text = re.sub(r'a href="./(.+)"', r'a href="./\1.html"', text)
            with open(filepath, 'w') as f:
                f.write(text)
    with open(TOPNAV_FILE, 'r') as f:
        text = f.read()
    text = text.replace("pageLink: '/'", "pageLink: '/index'")
    text = text.replace("pageLink: '/", "pageLink: './")
    text = text.replace("', pageText:", ".html', pageText:")
    with open(TOPNAV_FILE, 'w') as f:
        f.write(text)
    webbrowser.open('file:///' + INDEX_FILE)

if __name__ == '__main__':
    main()

sys.exit()
