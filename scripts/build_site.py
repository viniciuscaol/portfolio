"""Confere referências locais e prepara somente arquivos públicos do site."""
from html.parser import HTMLParser
from pathlib import Path
import shutil
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / '_site'


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.references = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                raise ValueError('ID duplicado: ' + attrs['id'])
            self.ids.add(attrs['id'])
        for name in ('href', 'src'):
            if attrs.get(name):
                self.references.append(attrs[name])


def build():
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    page = References()
    page.feed(html)
    for ref in page.references:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        if not url.path and url.fragment:
            if unquote(url.fragment) not in page.ids:
                raise ValueError('Âncora inexistente: ' + ref)
        elif url.path:
            target = (ROOT / unquote(url.path).lstrip('/')).resolve()
            if not target.is_relative_to(ROOT) or not target.is_file():
                raise ValueError('Arquivo local inexistente ou fora do site: ' + ref)
            relative = target.relative_to(ROOT)
            if relative.parts[0] != 'assets' and relative != Path('index.html'):
                raise ValueError('Referência fora dos arquivos públicos: ' + ref)
    for asset in (ROOT / 'assets').rglob('*'):
        if asset.is_symlink() or asset.name.startswith('.') or asset.name.endswith('.map'):
            raise ValueError('Arquivo não permitido nos assets públicos: ' + str(asset.relative_to(ROOT)))
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    shutil.copyfile(ROOT / 'index.html', OUTPUT / 'index.html')
    shutil.copytree(ROOT / 'assets', OUTPUT / 'assets')
    print('Referências locais conferidas; site preparado em _site/.')


if __name__ == '__main__':
    build()
