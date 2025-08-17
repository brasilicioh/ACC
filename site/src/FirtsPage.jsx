import { createRoot } from 'react-dom/client'

function CriaNpc() {
    function Html() {
        return (
            <h1>Egue</h1>
        )
    }

    return (
        createRoot(document.getElementById("main")).render(
            <Html />
        )
    )
}

function CriaPlayer() {
    function Html() {
        return (
            <h1>Eguee</h1>
        )
    }

    return (
        createRoot(document.getElementById("main")).render(
            <Html />
        )
    )
}

function MainChoice() {
    return (
        <>
            <h1>Escolha a sua opção</h1>
            <div id="buttons">
                <button onClick={CriaNpc}>Criar NPC</button>
                <button onClick={CriaPlayer}>Criar Jogador</button>
            </div>
        </>
    )
}

export default function App() {
    return <MainChoice />
}