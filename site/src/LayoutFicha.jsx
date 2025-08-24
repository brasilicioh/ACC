import { useState } from "react"

function AcaoPenalidade({ label, valor }) {
    const [penalidade, setPenalidade] = useState(true)
    
    return (
        <p><span onClick={() => setPenalidade(e => !e)} style={{ cursor: "pointer" }}>{label}{penalidade ? "°" : ""}</span>: {valor} <Vantagem /></p>
    )
}

function Vantagem() {
    const [vant, setVant] = useState(0)
    
    return (
        <>
            {vant === 0 ? "(0)" : vant > 0 ? `(${vant} vantagem)` : `(${vant*-1} desvantagem)`} 
            <span onClick={() => setVant(v => v + 1)} style={{ cursor: "pointer" }}>  +  </span>
            <span onClick={() => setVant(v => v - 1)} style={{ cursor: "pointer" }}>-</span>
        </>
    )
}

export default function Ficha({ info, atributos, pericias, buffs, tipo }) {
    let somaPericias = 0
    let somaBuffs = 0
    for (const chave in pericias) {
        somaPericias += pericias[chave]
        somaBuffs += buffs[chave] || 0
    }

    const aparencia = atributos.aparencia + buffs.aparencia
    const sabedoria = atributos.sabedoria + buffs.sabedoria
    const tamanho = atributos.tamanho + buffs.tamanho
    const destreza = pericias.destreza + buffs.destreza
    const forca = pericias.forca + buffs.forca
    const intelecto = pericias.intelecto + buffs.intelecto
    const labia = pericias.labia + buffs.labia
    const percepcao = pericias.percepcao + buffs.percepcao
    const poder = pericias.poder + buffs.poder
    const precisao = pericias.precisao + buffs.precisao
    const psicologia = pericias.psicologia + buffs.psicologia
    const tecnica = pericias.tecnica + buffs.tecnica
    const vigor = pericias.vigor + buffs.vigor
    const sorte = pericias.sorte + buffs.sorte

    return (
        <>
            <p>Nome: {info.nome}</p>
            <p>Idade: {info.idade}</p>
            {tipo === "player" ? <>
                <p>Nascimento: {info.nascimento}</p>
                <p>História: {info.historia}</p>
            </> : null}
            <br />
            <p>ATRIBUTOS</p>
            <p>Aparência: {atributos.aparencia}{buffs.aparencia != 0 ? "+" + buffs.aparencia : ""}</p>
            <p>Sabedoria: {atributos.sabedoria}{buffs.sabedoria != 0 ? "+" + buffs.sabedoria : ""}</p>
            <p>Tamanho: {atributos.tamanho}{buffs.tamanho != 0 ? "+" + buffs.tamanho : ""} -- 1d{4+2*(atributos.tamanho+buffs.tamanho)}</p>
            <br />
            <p>Habilidade:</p>
            <p>tem que fazer</p>
            {tipo === "player" ? <>
                <p>Classe: tem que fazer</p>
                <p>Especialidade: tem que fazer</p>
            </> : null}
            <br />
            <p>Vida: {Math.floor((vigor + tamanho + 20) * 1.5)}/{Math.floor((vigor + tamanho + 20) * 1.5)}</p>
            <p>Saúde Mental: {Math.floor((poder + sabedoria) * 2 + (psicologia / 3) + 15)}/{Math.floor((poder + sabedoria) * 2 + (psicologia / 3) + 15)}</p>
            <br />
            <p>Movimentação: {Math.floor((destreza + tamanho + 3) / 2)}m</p>
            <br />
            <p>Bolsa 0/{Math.floor(vigor + tamanho + (forca / 2))}:</p>
            <br />
            <p>Munição:</p>
            <br />
            <p>Dinheiro:</p>
            <br />
            <p>PERÍCIAS</p>
            <p>Detreza: {pericias.destreza}{buffs.destreza != 0 ? "+" + buffs.destreza : ""} <Vantagem /></p>
            <p>Força: {pericias.forca}{buffs.forca != 0 ? "+" + buffs.forca : ""} <Vantagem /></p>
            <p>Intelecto: {pericias.intelecto}{buffs.intelecto != 0 ? "+" + buffs.intelecto : ""} <Vantagem /></p>
            <p>Lábia: {pericias.labia}{buffs.labia != 0 ? "+" + buffs.labia : ""} <Vantagem /></p>
            <p>Percepção: {pericias.percepcao}{buffs.percepcao != 0 ? "+" + buffs.percepcao : ""} <Vantagem /></p>
            <p>Poder: {pericias.poder}{buffs.poder != 0 ? "+" + buffs.poder : ""} <Vantagem /></p>
            <p>Precisão: {pericias.precisao}{buffs.precisao != 0 ? "+" + buffs.precisao : ""} <Vantagem /></p>
            <p>Psicologia: {pericias.psicologia}{buffs.psicologia != 0 ? "+" + buffs.psicologia : ""} <Vantagem /></p>
            <p>Técnica: {pericias.tecnica}{buffs.tecnica != 0 ? "+" + buffs.tecnica : ""} <Vantagem /></p>
            <p>Vigor: {pericias.vigor}{buffs.vigor != 0 ? "+" + buffs.vigor : ""} <Vantagem /></p>
            <p>Sorte: {pericias.sorte}{buffs.sorte != 0 ? "+" + buffs.sorte : ""} <Vantagem /></p>
            <p>Total: {somaPericias}+{somaBuffs}</p>
            <br />
            <p>AÇÕES</p>
            <br />
            <p>Destreza</p>
            <p>Acrobacia: {Math.floor((destreza + precisao) / 2)} <Vantagem /></p>
            <p>Correr: {Math.floor((destreza + vigor) / 2)} <Vantagem /></p>
            <AcaoPenalidade label={"Escalar"} valor={Math.floor((destreza + forca) / 2 - tamanho)} />
            <p>Esquivar: {Math.floor((destreza + percepcao) / 2)} <Vantagem /></p>
            <p>Furtividade: {Math.floor((destreza + intelecto) / 2)} <Vantagem /></p>
            <p>Reflexos: {Math.floor((destreza + intelecto + percepcao) / 3 + sabedoria)} <Vantagem /></p>
            <br />
            <p>Força</p>
            <p>Agarrar: {Math.floor((forca + vigor + destreza) / 3)} <Vantagem /></p>
            <p>Bloquear: {Math.floor((forca + vigor + poder) / 3 - 2)} <Vantagem /></p>
            <p>Contra-atacar: {Math.floor((forca + destreza) / 2 - 1)} <Vantagem /></p>
            <p>Cortar: {Math.floor((forca + destreza + precisao) / 3 + tamanho)} <Vantagem /></p>
            <p>Derrubar: {Math.floor((forca + vigor + poder) / 3 + tamanho)} <Vantagem /></p>
            <p>Lutar: {Math.floor((forca + vigor) / 2 + tamanho)} <Vantagem /></p>
            <br />
            <p>Intelecto</p>
            <AcaoPenalidade label={"Artes"} valor={Math.floor((intelecto + destreza + psicologia + poder) / 4 + aparencia + sabedoria)} />
            <p>Atualidades: {Math.floor((intelecto + sorte) / 2 + sabedoria)} <Vantagem /></p>
            <p>Bibliotecas: {Math.floor((intelecto + percepcao) / 2)} <Vantagem /></p>
            <AcaoPenalidade label={"Drogas"} valor={Math.floor((intelecto + poder + percepcao) / 3 + sabedoria)} />
            <AcaoPenalidade label={"História"} valor={Math.floor(intelecto + sabedoria)} />
            <AcaoPenalidade label={"Medicina"} valor={Math.floor((intelecto + precisao) / 2 + sabedoria)} />
            <AcaoPenalidade label={"Natureza"} valor={Math.floor(intelecto)} /> 
            <br />
            <p>Percepção</p>
            <p>Encontrar: {Math.floor((percepcao + intelecto) / 2 + sabedoria)} <Vantagem /></p>
            <p>Investigar: {Math.floor((percepcao + intelecto + poder + precisao) / 4)} <Vantagem /></p>
            <p>Ouvir/Sentir: {Math.floor((percepcao + intelecto) / 2)} <Vantagem /></p>
            <br />
            <p>Precisão</p>
            <p>Arremessar: {Math.floor((precisao + forca) / 2)} <Vantagem /></p>
            <AcaoPenalidade label={"Atirar"} valor={Math.floor((precisao + percepcao) / 2)} />
            <AcaoPenalidade label={"Dirigir"} valor={Math.floor((precisao + destreza) / 2 + sabedoria)} />
            <p>Equilibrar: {Math.floor((precisao + destreza + vigor + poder + sorte) / 5 - tamanho)} <Vantagem /></p>
            <AcaoPenalidade label={"Ilusão"} valor={Math.floor((precisao + destreza + poder) / 3 + aparencia)} />
            <p>Mirar: {Math.floor((precisao + destreza) / 2 + sabedoria)} <Vantagem /></p>
            <br />
            <p>Psicologia</p>
            <p>Acalmar: {Math.floor((psicologia + intelecto) / 2 + sabedoria)} <Vantagem /></p>
            <p>Charme: {Math.floor((psicologia + labia) / 2 + 2 * aparencia)} <Vantagem /></p>
            <p>Intimidar: {Math.floor((psicologia + poder + vigor) / 3 + tamanho)} <Vantagem /></p>
            <p>Intuição: {Math.floor((psicologia + sorte + intelecto) / 3 + sabedoria)} <Vantagem /></p>
            <p>Mentir: {Math.floor((psicologia + labia) / 3 + sabedoria + aparencia)} <Vantagem /></p>
            <p>Persuadir: {Math.floor((psicologia + labia) / 2 + aparencia)} <Vantagem /></p>
            <br />
            <p>Técnica</p>
            <AcaoPenalidade label={"Buscar"} valor={Math.floor((2 * tecnica + intelecto) / 3)} />
            <AcaoPenalidade label={"Hacker"} valor={Math.floor((4 * tecnica + intelecto + destreza) / 8 + sabedoria/2)} />
            <AcaoPenalidade label={"Montar"} valor={Math.floor((3 * tecnica + precisao) / 4 + sabedoria)} />
        </>
    )
}