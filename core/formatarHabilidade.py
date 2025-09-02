import json

habilidades = {}

with open("habilidades.txt", "r", encoding="utf-8") as file:
    texto = file.read()
    linhas = texto.split("\n")

    nomeHabilidade = ""
    descricaoHabilidade = ""

    count = 0
    for linha in linhas:
        if linha == "":
            continue
        if count % 2 == 0:
            nomeHabilidade = linha
            count += 1
        elif count % 2 == 1:
            descricaoHabilidade = linha
            habilidades[nomeHabilidade] = [descricaoHabilidade]
            count += 1

formatado = "habilidades = {\n"
for habilidade in habilidades:
    formatado += f"    '{habilidade}': [\n        '{habilidades[habilidade][0]}',\n    ], \n"
formatado += "}"
with open("habilidades.py", "w", encoding="utf-8") as file:
    file.write(formatado)

json_formatado = json.dumps(habilidades, indent=2, ensure_ascii=False)
with open("../site/src/habilidades.json", "w", encoding="utf-8") as file:
    file.write(json_formatado)