import { useState, useEffect, createContext, useMemo } from 'react'
import './App.css'

export const ThemeContext = createContext(null)

export default function AddTarefa() {
    const [tarefas, setTarefas] = useState(() => {
        const savedTarefas = localStorage.getItem('tarefas')
        return savedTarefas ? JSON.parse(savedTarefas) : [];
    })

    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }, [tarefas])

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

    // Define o tema inicial como 'light'
    const [theme, setTheme] = useState('light')

    // Efeito colateral para aplicar a classe 'dark' ao body quando o tema for 'dark'
    useEffect (() => {
        document.body.className = theme === 'dark' ? 'dark' : ''
    }, [theme])

    // Calcula o número de tarefas concluídas 
    const tarefasConcluidas = useMemo(() => {
        return tarefas.filter(tarefas => tarefas.done).length
    }, [tarefas])

    // Calcula o número total de tarefas (contabiliza apaenas tarefas que tenham texto)
    const totalTarefas = useMemo(() => {
        return tarefas.filter(tarefas => tarefas.text).length
    })
    return (
        <ThemeContext.Provider value={theme}>
            <div className='app-container'>
                <label>
                    <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={(e) => {
                        setTheme(e.target.checked ? 'dark' : 'light')
                    }}
                    />
                    Usar Modo Escuro
                </label>
                <hr />
                <p>Total taredas {totalTarefas}</p>
                <hr />
                <p>Trefas Concluidas: {tarefasConcluidas}</p>
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
        </ThemeContext.Provider>
    );
}


