from os import system
from pyperclip import copy
from math import floor as arredondaMenorInt
import random

def buff(pericia):
    global calc; calc = 0
    sair = False
    while sair == False:
        tem_buff = input("Buff = 1 /// Debuff = 2 \n")
        if tem_buff == "1":
            qtd = int(input("Qual o buff: +"))
            calc += qtd
            pericia = f"{pericia}+{qtd}"

            tem_mais = input("Tem mais? (S ou 1) \n").lower()
            if tem_mais != "s" and tem_mais != "1":
                sair = True
                system("cls")

        elif tem_buff == "2":
            qtd = int(input("Qual o debuff: -"))
            calc -= qtd
            pericia = f"{pericia}-{qtd}"

            tem_mais = input("Tem mais? (S ou 1) \n").lower()
            if tem_mais != "s" and tem_mais != "1":
                sair = True
                system("cls")

        else:
            sair = True

    system("cls")
    return pericia

def vant(pericia):
    van = 0
    des = 0

    sair = False
    while sair == False:
        tem_van = input("Vantagem = 1 /// Desvantagem = 2 \n")
        if tem_van == "1":
            van += 1

            tem_mais = input("Tem mais? (S ou 1) \n").lower()
            if tem_mais != "s" and tem_mais != "1":
                sair = True
                system("cls")

        elif tem_van == "2":
            des += 1

            tem_mais = input("Tem mais? (S ou 1) \n").lower()
            if tem_mais != "s" and tem_mais != "1":
                sair = True
                system("cls")

        else:
            sair = True

    system("cls")
    if van - des > 0:
        return f"{pericia} ({van-des} vantagem)"
    elif van - des < 0:
        return f"{pericia} ({des-van} desvantagem)"
    else:
        return pericia
    
def pen(acao):
    penal = input(f"{acao} Continua com penalidade? (S/N ou 1/2) \n").lower()
    system("cls")
    if penal == "n" or penal == "2":
        return ""
    else:
        return "°"

system("cls")
input('''SEPARAR:
ATRIBUTOS: buffs
PERICIAS: buffs e vantagens
penalidade de cada acao
      
BOTAR DEPOIS BUFFS E VANTAGENS DE PV, SM , MOV, BOLSA, ACOES ETC
(enter para confirmar)''')
system("cls")

while True:
    system("cls")
    print("Atributos \n")
    aparencia = int(input("Aparência: ")); aparenciaf = f"{buff(aparencia)}"; aparencia += calc
    sabedoria = int(input("Sabedoria: ")); sabedoriaf = f"{buff(sabedoria)}"; sabedoria += calc
    tamanho = int(input("Tamanho: ")); tamanhof = f"{buff(tamanho)}"; tamanho += calc
    system("cls")

    confirmacao = input(f'''Aparência: {aparenciaf} = {aparencia}
Sabedoria: {sabedoriaf} = {sabedoria}
Tamanho: {tamanhof} = {tamanho}
(enter para confirmar)''')
    
    if confirmacao == "":
        system("cls")
        break
    else: system("cls")

while True:
    print("Perícias \n")
    destreza = int(input("Destreza: ")); destrezaf = f"{buff(destreza)}"; destreza += calc; destrezaf = f"{vant(destrezaf)}"
    forca = int(input("Força: ")); forcaf = f"{buff(forca)}"; forca += calc; forcaf = f"{vant(forcaf)}"
    intelecto = int(input("Intelecto: ")); intelectof = f"{buff(intelecto)}"; intelecto += calc; intelectof = f"{vant(intelectof)}"
    labia = int(input("Lábia: ")); labiaf = f"{buff(labia)}"; labia += calc; labiaf = f"{vant(labiaf)}"
    percepcao = int(input("Percepção: ")); percepcaof = f"{buff(percepcao)}"; percepcao += calc; percepcaof = f"{vant(percepcaof)}"
    poder = int(input("Poder: ")); poderf = f"{buff(poder)}"; poder += calc; poderf = f"{vant(poderf)}"
    precisao = int(input("Precisão: ")); precisaof = f"{buff(precisao)}"; precisao += calc; precisaof = f"{vant(precisaof)}"
    psicologia = int(input("Psicologia: ")); psicologiaf = f"{buff(psicologia)}"; psicologia += calc; psicologiaf = f"{vant(psicologiaf)}"
    tecnica = int(input("Técnica: ")); tecnicaf = f"{buff(tecnica)}"; tecnica += calc; tecnicaf = f"{vant(tecnicaf)}"
    vigor = int(input("Vigor: ")); vigorf = f"{buff(vigor)}"; vigor += calc; vigorf = f"{vant(vigorf)}"
    sorte = sum([random.randint(1, 4) for i in range(3)], 2); print(f"Sorte: {sorte}"); sortef = f"{buff(sorte)}"; sorte += calc; sortef = f"{vant(sortef)}"
    system("cls")

    confirmacao = input(f'''Destreza: {destrezaf} = {destreza}
Força: {forcaf} = {forca}
Intelecto: {intelectof} = {intelecto}
Lábia: {labiaf} = {labia}
Percepção: {percepcaof} = {percepcao}
Poder: {poderf} = {poder}
Precisão: {precisaof} = {precisao}
Psicologia: {psicologiaf} = {psicologia}
Técnica: {tecnicaf} = {tecnica}
Vigor: {vigorf} = {vigor}
Sorte: {sortef} = {sorte}
Total: {sum([destreza, forca, intelecto, labia, percepcao, poder, precisao, psicologia, tecnica, vigor])} + {sorte}
(enter para confirmar)''')
    
    if confirmacao == "":
        system("cls")
        break
    else: system("cls")

ficha = f'''\
Nome: {input("Nome: ")}
Idade: {input("Idade: ")}
Nascimento: {input("Nascimento: ")}
História: {input("História: ")}

ATRIBUTOS
Aparência: {aparenciaf}
Sabedoria: {sabedoriaf}
Tamanho: {tamanhof} - 1d{4 + 2 * tamanho}

Habilidade: 
{input("Habilidade: ")}

Vida: {arredondaMenorInt((vigor + tamanho + 20) * 1.5)}/{arredondaMenorInt((vigor + tamanho + 20) * 1.5)}
Saúde Mental: {arredondaMenorInt((poder + sabedoria) * 2 + (psicologia / 3) + 15)}/{arredondaMenorInt((poder + sabedoria) * 2 + (psicologia / 3) + 15)}

Movimentação: {arredondaMenorInt((destreza + tamanho + 3) / 2)}m

Bolsa 0/{arredondaMenorInt(vigor + tamanho + (forca / 2))}:

Munição: {input("Munição: ")}

Dinheiro: {input("Dinheiro: ")}

PERÍCIAS
Destreza: {destrezaf}
Força: {forcaf}
Intelecto: {intelectof}
Lábia: {labiaf}
Percepção: {percepcaof}
Poder: {poderf}
Precisão: {precisaof}
Psicologia: {psicologiaf}
Técnica: {tecnicaf}
Vigor: {vigorf}
Sorte: {sortef}
Total: {sum([destreza, forca, intelecto, labia, percepcao, poder, precisao, psicologia, tecnica, vigor])} + {sorte}

AÇÕES

Destreza
Acrobacia: {arredondaMenorInt((destreza + precisao) / 2)}
Correr: {arredondaMenorInt((destreza + vigor) / 2)}
Escalar{pen("escalar")}: {arredondaMenorInt((destreza + forca) / 2 - tamanho)}
Esquivar: {arredondaMenorInt((destreza + percepcao) / 2)}
Furtividade: {arredondaMenorInt((destreza + intelecto) / 2)}
Reflexos: {arredondaMenorInt((destreza + intelecto + percepcao) / 3 + sabedoria)}

Força
Agarrar: {arredondaMenorInt((forca + vigor + destreza) / 3)}
Bloquear: {arredondaMenorInt((forca + vigor + poder) / 3 - 2)}
Contra-atacar: {arredondaMenorInt((forca + destreza) / 2 - 1)}
Cortar: {arredondaMenorInt((forca + destreza + precisao) / 3 + tamanho)}
Derrubar: {arredondaMenorInt((forca + vigor + poder) / 3 + tamanho)}
Lutar: {arredondaMenorInt(((2 * forca) + vigor) / 3 + tamanho)}

Intelecto
Artes{pen("artes")}: {arredondaMenorInt((intelecto + destreza + psicologia + poder) / 4 + aparencia + sabedoria)}
Atualidades: {arredondaMenorInt((intelecto + sorte) / 2 + sabedoria)}
Bibliotecas: {arredondaMenorInt((intelecto + percepcao) / 2)}
Drogas{pen("drogas")}: {arredondaMenorInt((intelecto + poder + percepcao) / 3 + sabedoria)}
História{pen("historia")}: {arredondaMenorInt(intelecto + sabedoria)}
Medicina{pen("medicina")}: {arredondaMenorInt(((4 * intelecto) + precisao) / 5 + sabedoria)}
Natureza{pen("natureza")}: {arredondaMenorInt(((3 * intelecto) + poder) / 4)}

Percepção
Encontrar: {arredondaMenorInt((percepcao + intelecto) / 2 + sabedoria)}
Investigar: {arredondaMenorInt((percepcao + intelecto + poder + precisao) / 4)}
Ouvir/Sentir: {arredondaMenorInt(((3 * percepcao) + intelecto) / 4)}

Precisão
Arremessar: {arredondaMenorInt((precisao + forca) / 2)}
Atirar{pen("atirar")}: {arredondaMenorInt(((2 * precisao) + percepcao) / 3)}
Dirigir{pen("direcao")}: {arredondaMenorInt((precisao + destreza) / 2 + sabedoria)}
Equilibrar: {arredondaMenorInt((precisao + destreza + vigor + poder + sorte) / 5 - tamanho)}
Ilusão{pen("ilusao")}: {arredondaMenorInt((precisao + destreza + poder) / 3 + aparencia)}
Mirar: {arredondaMenorInt(((3 * precisao) + destreza + percepcao) / 5 + sabedoria)}

Psicologia
Acalmar: {arredondaMenorInt(((3 * psicologia) + intelecto) / 4 + sabedoria)}
Charme: {arredondaMenorInt((psicologia + labia) / 2 + 2 * aparencia)}
Intimidar: {arredondaMenorInt((psicologia + poder + vigor) / 3 + tamanho)}
Intuição: {arredondaMenorInt((psicologia + sorte + intelecto) / 3 + sabedoria)}
Mentir: {arredondaMenorInt((psicologia + labia) / 3 + sabedoria + aparencia)}
Persuadir: {arredondaMenorInt((psicologia + labia) / 2 + aparencia)}

Técnica
Buscar{pen("busca")}: {arredondaMenorInt((2 * tecnica + intelecto) / 3)}
Hacker{pen("hacker")}: {arredondaMenorInt((4 * tecnica + intelecto + destreza) / 8 + sabedoria/2)}
Montar{pen("montar")}: {arredondaMenorInt((3 * tecnica + precisao) / 4 + sabedoria)}
'''

print(ficha)
copy(ficha)