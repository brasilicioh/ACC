import { useState } from "react";
import { ExibirHabilidade } from "./Adicionais.jsx";

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

export default function Ficha({ info, habilidades, atributos, pericias, buffs }) {
  let somaPericias = 0;
  let somaBuffs = 0;
  for (const chave in pericias) {
    somaPericias += pericias[chave];
    somaBuffs += buffs[chave];
  }

  const aparencia = atributos.aparencia + buffs.aparencia;
  const sabedoria = atributos.sabedoria + buffs.sabedoria;
  const tamanho = atributos.tamanho + buffs.tamanho;
  const destreza = pericias.destreza + buffs.destreza;
  const forca = pericias.forca + buffs.forca;
  const intelecto = pericias.intelecto + buffs.intelecto;
  const labia = pericias.labia + buffs.labia;
  const percepcao = pericias.percepcao + buffs.percepcao;
  const poder = pericias.poder + buffs.poder;
  const precisao = pericias.precisao + buffs.precisao;
  const psicologia = pericias.psicologia + buffs.psicologia;
  const tecnica = pericias.tecnica + buffs.tecnica;
  const vigor = pericias.vigor + buffs.vigor;
  const sorte = pericias.sorte + buffs.sorte;

  return (
    <>
      {info.nome != "" ? <p>Nome: {info.nome}</p> : null}
      {info.idade != "" ? <p>Idade: {info.idade}</p> : null}
      {info.nascimento != "" ? <p>Nascimento: {info.nascimento}</p> : null}
      {info.historia != "" ? <p>História: {info.historia}</p> : null}

      <br />

      <section>
        <h2>ATRIBUTOS</h2>
        <div>
          <ExibirValor label={"Aparência"} valor={atributos.aparencia} buff={buffs.aparencia} />
          <ExibirValor label={"Sabedoria"} valor={atributos.sabedoria} buff={buffs.sabedoria} />
          <ExibirValor label={"Tamanho"} valor={atributos.tamanho} buff={buffs.tamanho} />
        </div>
      </section>

      <br />

      <section>
        <h2>Habilidades:</h2>
        <ExibirHabilidade habilidades={habilidades} />
      </section>

      <section>
        <h2>Classe e Especialidade: tem que fazer</h2>
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
        <h2>PERÍCIAS</h2>
        <div>
          <ExibirValor label={"Destreza"} valor={pericias.destreza} buff={buffs.destreza} />
          <ExibirValor label={"Força"} valor={pericias.forca} buff={buffs.forca} />
          <ExibirValor label={"Intelecto"} valor={pericias.intelecto} buff={buffs.intelecto} />
          <ExibirValor label={"Lábia"} valor={pericias.labia} buff={buffs.labia} />
          <ExibirValor label={"Percepção"} valor={pericias.percepcao} buff={buffs.percepcao} />
          <ExibirValor label={"Poder"} valor={pericias.poder} buff={buffs.poder} />
          <ExibirValor label={"Precisão"} valor={pericias.precisao} buff={buffs.precisao} />
          <ExibirValor label={"Psicologia"} valor={pericias.psicologia} buff={buffs.psicologia} />
          <ExibirValor label={"Técnica"} valor={pericias.tecnica} buff={buffs.tecnica} />
          <ExibirValor label={"Vigor"} valor={pericias.vigor} buff={buffs.vigor} />
          <ExibirValor label={"Sorte"} valor={pericias.sorte} buff={buffs.sorte} />
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
          <ExibirValor label={"Reflexos"} valor={Math.floor((destreza + intelecto + percepcao) / 3 + sabedoria)} havePenali={true} />
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
          <ExibirValor label={"Drogas"} valor={Math.floor((intelecto + poder + percepcao) / 3 + sabedoria)} havePenali={true} />
          <ExibirValor label={"História"} valor={Math.floor(intelecto + sabedoria)} havePenali={true} />
          <ExibirValor label={"Medicina"} valor={Math.floor(((4 * intelecto) + precisao) / 2 + sabedoria)} havePenali={true} />
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
    </>
  );
}