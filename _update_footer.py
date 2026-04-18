import os, glob, re

NEW_INNER = '''
  <div class="fm-frame">
    <p class="fm-tagline">
      <strong>We help local businesses harness the power of AI</strong> to automate workflows, capture every lead,
      and fill their calendars on autopilot.
    </p>

    <p class="fm-cta-label">BOOK A CALL AND LET\u2019S SEE WHAT WE CAN DO.</p>
    <a href="contact.html" class="fm-cta-btn">
      <span>Book a discovery call</span>
      <span class="fm-cta-arrow"><i class="fa-solid fa-arrow-up-right"></i></span>
    </a>

    <div class="fm-links-grid">
      <div class="fm-links-col">
        <span class="footer-label">MAIN LINKS</span>
        <ul>
          <li><a href="index.html">Home <i class="fa-solid fa-arrow-up-right fm-link-icon"></i></a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="contact.html">Contact us</a></li>
          <li><a href="blog.html">Blog</a></li>
        </ul>
      </div>
      <div class="fm-links-col">
        <span class="footer-label">INDUSTRIES</span>
        <ul>
          <li><a href="industries.html">Overview</a></li>
          <li><a href="industry-clinics.html">Clinics</a></li>
          <li><a href="industry-salons.html">Salons</a></li>
          <li><a href="industry-services.html">Home Services</a></li>
          <li><a href="404.html">404 Page</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="fm-info-block">
    <span class="footer-label">CONTACT</span>
    <a href="tel:+14035550167" class="fm-info-line">+1 (403) 555-0167</a>
    <a href="mailto:info@innovaition.ca" class="fm-info-line">INFO@INNOVAITION.CA</a>
  </div>

  <div class="fm-info-block">
    <span class="footer-label">ADDRESS</span>
    <p class="fm-info-title">Innovaition Agency</p>
    <p class="fm-info-text">Proudly based in Calgary, Alberta.<br>Serving businesses across North America.</p>
  </div>

  <div class="fm-info-block">
    <span class="footer-label">SOCIAL</span>
    <div class="fm-socials">
      <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
      <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
      <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
    </div>
  </div>

  <div class="fm-info-block fm-legal-block">
    <span class="footer-label">LEGAL</span>
    <p class="fm-copyright">\u00a9 2026 Innovaition Agency</p>
    <p class="fm-credit">All rights reserved.</p>
  </div>
'''

# Regex matches the entire footer-column-stack block (opening div through closing div),
# capturing the indent of the opening tag so we can re-indent the new content to match.
PATTERN = re.compile(
    r'(?P<indent>[ \t]*)<div class="footer-column-stack">.*?All rights reserved\.</p>\s*</div>\s*</div>',
    re.DOTALL,
)

# Marker to detect already-updated files
NEW_MARKER = 'class="fm-frame"'


def build_replacement(indent):
    # Re-indent NEW_INNER lines so they sit at indent+2 spaces relative to the file.
    lines = NEW_INNER.strip('\n').split('\n')
    reindented = []
    for line in lines:
        if line.strip() == '':
            reindented.append('')
        else:
            # NEW_INNER lines start with 2 spaces of base indent; replace with file indent + '  '
            stripped = line[2:] if line.startswith('  ') else line
            reindented.append(indent + '  ' + stripped)
    body = '\n'.join(reindented)
    return f'{indent}<div class="footer-column-stack">\n\n{body}\n\n{indent}</div>'


root = os.path.dirname(os.path.abspath(__file__))
files = sorted(glob.glob(os.path.join(root, '*.html')))

updated, skipped, missing = [], [], []
for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    if NEW_MARKER in text:
        skipped.append(os.path.basename(path))
        continue
    m = PATTERN.search(text)
    if not m:
        missing.append(os.path.basename(path))
        continue
    new_block = build_replacement(m.group('indent'))
    text = text[:m.start()] + new_block + text[m.end():]
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)
    updated.append(os.path.basename(path))

print('UPDATED:', updated)
print('ALREADY NEW:', skipped)
print('NO MATCH:', missing)
