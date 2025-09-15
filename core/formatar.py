import json

classes = {}
especialidades = {}
habilidades = {}

with open("classes.txt", "r", encoding="utf-8") as file:
    text = file.read()
    classesList = text.split("\n\n")
    
    for classe in classesList:
        nome = classe.split("\n")[0]
        descricaoClasse = classe.removeprefix(f"{nome}\n")
        classes[nome] = descricaoClasse

with open("especialidades.txt", "r", encoding="utf-8") as file:
    text = file.read()
    especialiClasse = text.split("\n\n")

    for especi in especialiClasse:
        especialidadeTotal = especi.split("\n")
        classeEspeci = especialidadeTotal[0]
        especialidadeTotal.pop(0)

        dictEspecialidade = {}

        for especialidade in especialidadeTotal:
            nome, corpo = especialidade.split(": ", 1)
            dictEspecialidade[nome] = corpo.strip()

        especialidades[classeEspeci] = dictEspecialidade

with open("habilidades.txt", "r", encoding="utf-8") as file:
    texto = file.read()
    habilidadeTotal = texto.split("\n\n")

    for habili in habilidadeTotal:
        nomeHabilidade = habili.split("\n")[0]
        descricaoHabilidade = habili.split("\n")[1]

        habilidades[nomeHabilidade] = descricaoHabilidade

adicionais = {
    "classes": classes,
    "especialidades": especialidades,
    "habilidades": habilidades
}

with open("../site/src/adicionais.json", "w", encoding="utf-8") as file:
    json.dump(adicionais, file, indent=2, ensure_ascii=False)