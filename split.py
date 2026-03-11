import codecs
import re

with codecs.open('index.html', 'r', 'utf-8') as f:
    c = f.read()

style_m = re.search(r'\n\s*<style>(.*?)</style>', c, re.DOTALL)
if style_m:
    with codecs.open('style.css', 'w', 'utf-8') as f:
        f.write(style_m.group(1).lstrip('\r\n').rstrip() + '\n')
    c = c[:style_m.start()] + '\n    <link rel="stylesheet" href="style.css" />' + c[style_m.end():]

script_m = re.search(r'\n\s*<script>(.*?)</script>', c, re.DOTALL)
if script_m:
    with codecs.open('script.js', 'w', 'utf-8') as f:
        f.write(script_m.group(1).lstrip('\r\n').rstrip() + '\n')
    c = c[:script_m.start()] + '\n    <script src="script.js"></script>' + c[script_m.end():]

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(c)

print("Extraction completed successfully.")
