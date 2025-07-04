import { useState, useEffect } from 'react'
import './App.css'

export default function AddTarefa() {
    const [tarefas, setTarefas] = useState(() => {
        const savedTarefas = localStorage.getItem('tarefas')
        return savedTarefas ? JSON.parse(savedTarefas) : [];
    })

    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    },[tarefas])

    const addClick = () => {
        setTarefas([...tarefas, { done: false }]);
    };

    const deleteClick = id => {
        setTarefas(tarefas => tarefas.filter((_terefas, i) => i !== id))
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
            {tarefas.map((tarefa, id) => (
                <div key={tarefa.id}>
                    <input className='checkbox-input'
                        type="checkbox"
                        checked={tarefa.done}
                        onChange={() => toggleDone(id)}
                    />
                    <input
                        type="text"
                        value={tarefa.text}
                        onChange={e => updateText(id, e.target.value)}
                    />
                    <button onClick={() => deleteClick(id)}>Deletar</button>
                </div>
            ))}
        </div>
    );
}


