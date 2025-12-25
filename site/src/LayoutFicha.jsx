import { useState, useRef } from "react";
import { ExibirAdicional } from "./Adicionais.jsx";

function normalize(obj = {}, keys) {
  const out = {};
  for (const k of keys) {
    const raw = obj?.[k];
    if (raw === "" || raw == null) { out[k] = 0; continue; }
    const n = Number(raw);
    out[k] = Number.isFinite(n) ? Math.trunc(n) : 0;
  }
  return out;
}

function organizarFicha(text) {
  function classify(line) {
    const out = {};
    if (!line) { out.type = "null"; out.text = ""; }
    if (/^[A-ZÇÃÕÁÉÍÓÚ ]{3,}$/.test(line)) { out.type = "section"; out.text = line; }
    if (/^[A-ZÁÉÍÓÚÇ][^:]{2,}:$/.test(line)) { out.type = "blockTitle"; out.text = line; }
    if (/^[^:]+:\s*\S+/.test(line)) { out.type = "kv"; out.text = line; }
    else { out.type = "text"; out.text = line; }
    return out;
  }

  text = text.replace(/\r\n/g, "\n").replace(/\s*\+\s*-\s*$/gm, "").replace(/\n{3,}/g, "\n\n").trim();

  const rawLines = text.split("\n").map(l => l.trim());

  const lines = rawLines.map(classify);

  const out = [];

  function blank(n = 1) {
    for (let i = 0; i < n; i++) out.push("");
  }

  for (const l of lines) {
    if (l.type === "null") continue;
    if (l.type === "section") {
      blank(2);
      out.push(l.text);
      blank(1);
      continue;
    }
    if (l.type === "kv") {
      out.push(l.text);
      continue;
    }
    if (l.type === "blockTitle") {
      blank(1);
      out.push(l.text);
      continue;
    }
    out.push(l.text);
  }

  let result = out.join("\n");

  result = result.replace(/(Vida:.*)\n(Saúde Mental:)/, "$1\n\n$2");
  result = result.replace(/(Saúde Mental:.*)\n(Movimentação:)/, "$1\n\n$2");
  result = result.replace(/(Movimentação:.*)\n(Bolsa)/, "$1\n\n$2");
  result = result.replace(/(Bolsa.*)\n(Munição:)/, "$1\n\n$2");
  result = result.replace(/(Munição:.*)\n(Dinheiro:)/, "$1\n\n$2");

  const actionSubtitles = [
    "Destreza",
    "Força",
    "Intelecto",
    "Percepção",
    "Precisão",
    "Psicologia",
    "Técnica"
  ];

  const lines2 = result.split("\n");
  const fixed = [];

  for (let i = 0; i < lines2.length; i++) {
    const line = lines2[i];
    const prev = fixed[fixed.length - 1];

    if (actionSubtitles.includes(line) && prev && prev.includes(":")) {
      fixed.push("");
    }
    fixed.push(line);
  }

  result = fixed.join("\n");
  result = result.replace("PERÍCIAS", "\n\nPERÍCIAS").replace("AÇÕES", "\n\nAÇÕES");

  return result.replace(/\n{3,}/g, "\n\n").trim();
}

function CopiarFicha({ fichaRef }) {
  async function copy() {
    if (!fichaRef.current) return;
    const text = organizarFicha(fichaRef.current.innerText);
    await navigator.clipboard.writeText(text);
  }

  return (
    <>
      <div className="row justify-content-center">
        <button className="btn btn-info col-8 col-md-6 col-lg-4 mt-3" onClick={copy}>
          Copiar para área de transferência
        </button>
      </div>
    </>
  );
}

function Vantagem() {
  const [vant, setVant] = useState(0);

  return (
    <>
      {vant === 0 ? "" : vant > 0 ? `(${vant} vantagem)` : `(${vant * -1} desvantagem)`}
      <span onClick={() => setVant(element => element + 1)} style={{ cursor: "pointer" }}>  +  </span>
      <span onClick={() => setVant(element => element - 1)} style={{ cursor: "pointer" }}>  -  </span>
    </>
  );
}

function Penalidade({ label }) {
  const [penal, setPenal] = useState("°");

  return (
    <span style={{ cursor: "pointer", margin: 0 }} onClick={() => setPenal(penal == "°" ? "" : "°")}>
      {label}{penal}
    </span>
  )
}

function ExibirValor({ label, valor, buff, havePenali = false }) {
  valor = Math.max(0, valor);

  let buffOut = "";
  if (buff > 0) {
    buffOut = "+" + buff;
  } else if (buff < 0) {
    buffOut = buff
  }

  switch (label) {
    case "Aparência":
    case "Sabedoria":
    case "Total":
      return (<p>{label}: {Math.max(0, valor)}{buffOut}</p>);
    case "Tamanho":
      return (<p>{label}: {Math.max(0, valor)}{buffOut} -- 1d{Math.max(4, (4 + 2 * (valor + buff)))}</p>);
  }

  return (
      <p>
        {havePenali ? <Penalidade label={label} /> : label}: {valor}{buffOut} <Vantagem />
      </p>
  );
}

export default function Ficha({ info, classe, especialidades, habilidades, atributos, pericias, buffs }) {
  const fichaRef = useRef(null);

  const periciaKeys = ['destreza','forca','intelecto','labia','percepcao','poder','precisao','psicologia','tecnica','vigor','sorte'];
  const atributoKeys = ['aparencia','sabedoria','tamanho'];
  const buffKeys = [...periciaKeys, ...atributoKeys];

  const periciasNum = normalize(pericias, periciaKeys);
  const atributosNum = normalize(atributos, atributoKeys);
  const buffsNum = normalize(buffs, buffKeys);

  let somaPericias = 0;
  let somaBuffs = 0;
  for (const k of periciaKeys) {
    somaPericias += periciasNum[k] || 0;
    somaBuffs += buffsNum[k] || 0;
  }

  const aparencia = atributosNum.aparencia + (buffsNum.aparencia || 0);
  const sabedoria = atributosNum.sabedoria + (buffsNum.sabedoria || 0);
  const tamanho = atributosNum.tamanho + (buffsNum.tamanho || 0);
  const destreza = periciasNum.destreza + (buffsNum.destreza || 0);
  const forca = periciasNum.forca + (buffsNum.forca || 0);
  const intelecto = periciasNum.intelecto + (buffsNum.intelecto || 0);
  const labia = periciasNum.labia + (buffsNum.labia || 0);
  const percepcao = periciasNum.percepcao + (buffsNum.percepcao || 0);
  const poder = periciasNum.poder + (buffsNum.poder || 0);
  const precisao = periciasNum.precisao + (buffsNum.precisao || 0);
  const psicologia = periciasNum.psicologia + (buffsNum.psicologia || 0);
  const tecnica = periciasNum.tecnica + (buffsNum.tecnica || 0);
  const vigor = periciasNum.vigor + (buffsNum.vigor || 0);
  const sorte = periciasNum.sorte + (buffsNum.sorte || 0);

  return (
    <>
      <div ref={fichaRef}>
        {info.nome != "" ? <p>Nome: {info.nome}</p> : null}
        {info.idade != "" ? <p>Idade: {info.idade}</p> : null}
        {info.nascimento != "" ? <p>Nascimento: {info.nascimento}</p> : null}
        {info.historia != "" ? <p>História: {info.historia}</p> : null}

        <br />

        <section>
          <h2>CLASSE E ESPECIALIDADES</h2>
          <ExibirAdicional name="Classe" itens={classe} />
          <ExibirAdicional name="Especialidade" itens={especialidades} classe={classe} />
        </section>

        <section>
          <h2>HABILIDADES</h2>
          <ExibirAdicional name="Habilidade" itens={habilidades} />
        </section>

        <br />

        <p>
          Vida: {Math.floor((vigor + tamanho + 20) * 1.5)}/{Math.floor((vigor + tamanho + 20) * 1.5)}
        </p>

        <p>
          Saúde Mental: {Math.floor((poder + sabedoria) * 2 + psicologia / 3 + 15)}/{Math.floor((poder + sabedoria) * 2 + psicologia / 3 + 15)}
        </p>

        <br />

        <p>Movimentação: {Math.floor((destreza + tamanho + 3) / 2)}m</p>

        <br />

        <p>Bolsa 0/{Math.floor(vigor + tamanho + forca / 2)}:</p>

        <br />

        <p>Munição:</p>

        <br />

        <p>Dinheiro:</p>

        <br />

        <section>
          <h2>ATRIBUTOS</h2>
          <div>
            <ExibirValor label={"Aparência"} valor={atributosNum.aparencia} buff={buffsNum.aparencia} />
            <ExibirValor label={"Sabedoria"} valor={atributosNum.sabedoria} buff={buffsNum.sabedoria} />
            <ExibirValor label={"Tamanho"} valor={atributosNum.tamanho} buff={buffsNum.tamanho} />
          </div>
        </section>

        <br />

        <section>
          <h2>PERÍCIAS</h2>
          <div>
            <ExibirValor label={"Destreza"} valor={periciasNum.destreza} buff={buffsNum.destreza} />
            <ExibirValor label={"Força"} valor={periciasNum.forca} buff={buffsNum.forca} />
            <ExibirValor label={"Intelecto"} valor={periciasNum.intelecto} buff={buffsNum.intelecto} />
            <ExibirValor label={"Lábia"} valor={periciasNum.labia} buff={buffsNum.labia} />
            <ExibirValor label={"Percepção"} valor={periciasNum.percepcao} buff={buffsNum.percepcao} />
            <ExibirValor label={"Poder"} valor={periciasNum.poder} buff={buffsNum.poder} />
            <ExibirValor label={"Precisão"} valor={periciasNum.precisao} buff={buffsNum.precisao} />
            <ExibirValor label={"Psicologia"} valor={periciasNum.psicologia} buff={buffsNum.psicologia} />
            <ExibirValor label={"Técnica"} valor={periciasNum.tecnica} buff={buffsNum.tecnica} />
            <ExibirValor label={"Vigor"} valor={periciasNum.vigor} buff={buffsNum.vigor} />
            <ExibirValor label={"Sorte"} valor={periciasNum.sorte} buff={buffsNum.sorte} />
            <ExibirValor label={"Total"} valor={somaPericias} buff={somaBuffs} />
          </div>
        </section>
        
        <br />

        <section>
          <h2>AÇÕES</h2>

          <br />

          <div>
            <p>Destreza</p>
            <ExibirValor label={"Acrobacia"} valor={Math.floor((destreza + precisao) / 2)} />
            <ExibirValor label={"Correr"} valor={Math.floor((destreza + vigor) / 2)} />
            <ExibirValor label={"Escalar"} valor={Math.floor((destreza + forca) / 2 - tamanho)} havePenali={true} />
            <ExibirValor label={"Esquivar"} valor={Math.floor((destreza + percepcao) / 2)} />
            <ExibirValor label={"Furtividade"} valor={Math.floor((destreza + intelecto) / 2)} />
            <ExibirValor label={"Reflexos"} valor={Math.floor((destreza + intelecto + percepcao) / 3 + sabedoria)} />
          </div>

          <br />

          <div>
            <p>Força</p>
            <ExibirValor label={"Agarrar"} valor={Math.floor((forca + vigor + destreza) / 3)} />
            <ExibirValor label={"Bloquear"} valor={Math.floor((forca + vigor + poder) / 3 - 2)} />
            <ExibirValor label={"Contra-atacar"} valor={Math.floor((forca + destreza) / 2 - 1)} />
            <ExibirValor label={"Cortar"} valor={Math.floor((forca + destreza + precisao) / 3 + tamanho)} />
            <ExibirValor label={"Derrubar"} valor={Math.floor((forca + vigor + poder) / 3 + tamanho)} />
            <ExibirValor label={"Lutar"} valor={Math.floor(((2 * forca) + vigor) / 3 + tamanho)} />
          </div>

          <br />

          <div>
            <p>Intelecto</p>
            <ExibirValor label={"Artes"} valor={Math.floor((intelecto + destreza + psicologia + poder) / 4 + aparencia + sabedoria)} havePenali={true} />
            <ExibirValor label={"Atualidades"} valor={Math.floor((intelecto + sorte) / 2 + sabedoria)} />
            <ExibirValor label={"Bibliotecas"} valor={Math.floor((intelecto + percepcao) / 2)} />
            <ExibirValor label={"Crime"} valor={Math.floor((intelecto + (2 * destreza) + (2 * tecnica)) / 5 + (sabedoria / 2))} havePenali={true} />
            <ExibirValor label={"Drogas"} valor={Math.floor((intelecto + poder + percepcao) / 3 + sabedoria)} havePenali={true} />
            <ExibirValor label={"História"} valor={Math.floor(intelecto + sabedoria)} havePenali={true} />
            <ExibirValor label={"Medicina"} valor={Math.floor(((4 * intelecto) + precisao) / 5 + sabedoria)} havePenali={true} />
            <ExibirValor label={"Natureza"} valor={Math.floor(((3 * intelecto) + poder) / 4)} havePenali={true} />
          </div>
          
          <br />

          <div>
            <p>Percepção</p>
            <ExibirValor label={"Encontrar"} valor={Math.floor((percepcao + intelecto) / 2 + sabedoria)} />
            <ExibirValor label={"Investigar"} valor={Math.floor((percepcao + intelecto + poder + precisao) / 4)} />
            <ExibirValor label={"Ouvir/Sentir"} valor={Math.floor((3 * (percepcao) + intelecto) / 4)} />
          </div>

            <br />

          <div>
            <p>Precisão</p>
            <ExibirValor label={"Arremessar"} valor={Math.floor((precisao + forca) / 2)} />
            <ExibirValor label={"Atirar"} valor={Math.floor(((2 * precisao) + percepcao) / 3)} havePenali={true} />
            <ExibirValor label={"Dirigir"} valor={Math.floor((precisao + destreza) / 2 + sabedoria)} havePenali={true} />
            <ExibirValor label={"Equilibrar"} valor={Math.floor((precisao + destreza + vigor + poder + sorte) / 5 - tamanho)} />
            <ExibirValor label={"Ilusão"} valor={Math.floor((precisao + destreza + poder) / 3 + aparencia)} havePenali={true} />
            <ExibirValor label={"Mirar"} valor={Math.floor(((3 * precisao) + destreza + percepcao) / 5 + sabedoria)} />
          </div>

          <br />

          <div>
            <p>Psicologia</p>
            <ExibirValor label={"Acalmar"} valor={Math.floor(((3 * psicologia) + intelecto) / 4 + sabedoria)} />
            <ExibirValor label={"Charme"} valor={Math.floor((psicologia + labia) / 2 + 2 * aparencia)} />
            <ExibirValor label={"Intimidar"} valor={Math.floor((psicologia + poder + vigor) / 3 + tamanho)} />
            <ExibirValor label={"Intuição"} valor={Math.floor((psicologia + sorte + intelecto) / 3 + sabedoria)} />
            <ExibirValor label={"Mentir"} valor={Math.floor((psicologia + labia) / 3 + sabedoria + aparencia)} />
            <ExibirValor label={"Persuadir"} valor={Math.floor((psicologia + labia) / 2 + aparencia)} />
          </div>

          <br />

          <div>
            <p>Técnica</p>
            <ExibirValor label={"Buscar"} valor={Math.floor((2 * tecnica + intelecto) / 3)} havePenali={true} />
            <ExibirValor label={"Hacker"} valor={Math.floor((4 * tecnica + intelecto + destreza) / 8 + sabedoria / 2)} havePenali={true} />
            <ExibirValor label={"Montar"} valor={Math.floor((3 * tecnica + precisao) / 4 + sabedoria)} havePenali={true} />
          </div>
        </section>
      </div>

      <CopiarFicha fichaRef={fichaRef} />
    </>
  );
}