import { useState } from 'react'
import './App.css'

export default function AddTarefa() {
    const [tarefas, setTarefas] = useState([]);

    const addClick = () => {
        setTarefas([...tarefas, { done: false }]);
    };

    const deleteClick = id => {
        setTarefas(tarefas => tarefas.filter((terefas, i) => i !== id))
    }

    const toggleDone = id => {
        setTarefas(prev =>
            prev.map((t, i) => i === id ? { ...t, done: !t.done } : t)
        )
    }

    const updateText = (id, text) => {
        setTarefas(prev =>
            prev.map((t, i) => i === id ? { ...t, text } : t)
        )
    }

    return (
        <div>
            <button onClick={addClick}>Adicionar tarefa</button>
            {tarefas.map((tarefas, id) => (
                <div key={id}>
                    <input
                        type="checkbox"
                        checked={tarefas.done}
                        onChange={() => toggleDone(id)}
                    />
                    <input
                        type="text"
                        value={tarefas.text}
                        onChange={e => updateText(id, e.target.value)}
                    />
                    <button onClick={() => deleteClick(id)}>Deletar</button>
                </div>
            ))}
        </div>
    );
}


