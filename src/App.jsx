/*
ALTERAÇÕES A SEREM FEITAS:
1.  APLICAR HOOK useReducer

2.  AO QUILICAR NO BOTÃO "ADCIONAR TAREFA", ABRIR UM MODAL
    PEDIDNO PARA O USUÁRIO DIGITAR O TEXTO DA TAREFA
    E INFORMAR A PRIORIDADE DA TAREFA (ALTA, MÉDIA OU BAIXA).

3.  AO DELETAR UMA TAREFA, O USARIO DEVE CONFIRMAR A AÇÃO
    COM UM ALERTA DE CONFIRMAÇÃO. (feito)

4.  AJUSTAR DARK MODE.
5.  AJUSTAR CHECKBOX.

6.  APLICAR HOOK useCallback (feito)
*/

import { useState, useEffect, createContext, useMemo, useReducer, useCallback } from 'react'
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


    const addClick = useCallback(() => {
        setTarefas(tarefas => [...tarefas, { done: false }]);
    }, [])

    const deleteClick = useCallback((id) => {
        const tarefa = tarefas[id]
        const texto = tarefa && tarefa.text ? tarefa.text : 'esta tarefa';
        if (window.confirm(`Tem certeza que deseja deletar "${texto}"?`)) {
            setTarefas(tarefas => tarefas.filter((_terefas, i) => i !== id))
        }
    }, [tarefas]) // [] -> significa que está usando a função funcional do
    // setTarefas, Qque sempre pega o valor mais recente.

    const toggleDone = useCallback((id) => {
        setTarefas(prev =>
            prev.map((t, i) => i === id ? { ...t, done: !t.done } : t)
        )
    }, [])

    const updateText = useCallback((id, text) => {
        setTarefas(prev =>
            prev.map((t, i) => i === id ? { ...t, text } : t)
        )
    }, [])

    // Define o tema inicial como 'light'
    const [theme, setTheme] = useState('light')

    // Efeito colateral para aplicar a classe 'dark' ao body quando o tema for 'dark'
    useEffect(() => {
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


