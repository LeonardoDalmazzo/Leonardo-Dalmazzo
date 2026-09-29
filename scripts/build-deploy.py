"""Empacota os arquivos públicos para extração na raiz do site na HostGator."""

import argparse
import hashlib
from pathlib import Path
import re
import zipfile


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("version", help="Versão de release, por exemplo: 1.2.0")
    args = parser.parse_args()
    if not re.fullmatch(r"(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)", args.version):
        parser.error("Informe MAJOR.MINOR.PATCH sem prefixo v.")

    root = Path(__file__).resolve().parents[1]
    files = list(root.glob("*.html"))
    files.extend(root / name for name in ("robots.txt", "sitemap.xml"))
    directories = [root / name for name in ("assets", "components", "css", "js")]
    directories.extend(
        folder for folder in root.iterdir()
        if folder.is_dir() and not folder.name.startswith(".")
        and (folder / "index.html").is_file()
    )
    for directory in directories:
        if not directory.is_dir():
            raise FileNotFoundError(directory)
        files.extend(file for file in directory.rglob("*") if file.is_file())

    files = sorted(set(files))
    for file in files:
        if not file.is_file():
            raise FileNotFoundError(file)

    output = root / "deploy" / f"leonardo-dalmazzo-v{args.version}-hostgator.zip"
    output.parent.mkdir(exist_ok=True)
    # Não sobrescreve um pacote de release já existente.
    with zipfile.ZipFile(output, "x", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for file in files:
            archive.write(file, file.relative_to(root).as_posix())

    with zipfile.ZipFile(output) as archive:
        if archive.testzip() is not None:
            raise RuntimeError("Falha na verificação de integridade do pacote.")
        for file in files:
            if archive.read(file.relative_to(root).as_posix()) != file.read_bytes():
                raise RuntimeError(f"Conteúdo divergente no pacote: {file}")

    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    output.with_suffix(".zip.sha256").write_text(f"{digest}  {output.name}\n", encoding="utf-8")
    print(f"Pacote: {output.name}")
    print(f"Arquivos: {len(files)} | Tamanho: {output.stat().st_size} bytes")
    print(f"SHA-256: {digest}")


if __name__ == "__main__":
    main()
