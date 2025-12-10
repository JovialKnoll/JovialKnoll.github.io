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
BUILD_DIR_WRITE = BUILD_DIR.replace('\\', '/')
INDEX_FILE_OPEN = os.path.join(BUILD_DIR, 'index.html').replace('\\', '/')

def main():
    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR)
    shutil.copytree(SRC_DIR, BUILD_DIR, ignore=shutil.ignore_patterns('.git*', '_*', 'CNAME'))
    for dirpath, dirnames, filenames in os.walk(BUILD_DIR):
        dirpath_write = dirpath.replace('\\', '/')
        for filename in fnmatch.filter(filenames, '*.html') + fnmatch.filter(filenames, '*.js'):
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r') as f:
                text = f.read()
            text = text.replace('"/"', '"/index"')
            text = text.replace('"/', '"file:///' + BUILD_DIR_WRITE + '/')
            text = text.replace('"./', '"file:///' + dirpath_write + '/')
            text = re.sub(r'a href="file(.+)"', r'a href="file\1.html"', text)
            text = re.sub(r'pageLink: "file(.+)", pageText', r'pageLink: "file\1.html", pageText', text)
            with open(filepath, 'w') as f:
                f.write(text)
    webbrowser.open('file:///' + INDEX_FILE_OPEN)

if __name__ == '__main__':
    main()

sys.exit()
