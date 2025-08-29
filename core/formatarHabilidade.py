import json

habilidades = {}

with open("habilidades.txt", "r", encoding="utf-8") as file:
    texto = file.read()
    linhas = texto.split("\n")

    atributo = {"aparencia": 0, "sabedoria": 0, "tamanho": 0}
    pericia = {"destreza": 0, "forca": 0, "intelecto": 0, "labia": 0, "percepcao": 0, "poder": 0, "precisao": 0, "psicologia": 0, "tecnica": 0, "vigor": 0, "sorte": 0}
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
            habilidades[nomeHabilidade] = [descricaoHabilidade, atributo.copy(), pericia.copy()]
            count += 1

formatado = "habilidades = {\n"
for habilidade in habilidades:
    formatado += f"    '{habilidade}': [\n        '{habilidades[habilidade][0]}', \n        {habilidades[habilidade][1]}, \n        {habilidades[habilidade][2]},\n    ], \n"
formatado += "}"
with open("habilidades.py", "w", encoding="utf-8") as file:
    file.write(formatado)

json_formatado = json.dumps(habilidades, indent=2, ensure_ascii=False)
with open("../site/src/habilidades.json", "w", encoding="utf-8") as file:
    file.write(json_formatado)