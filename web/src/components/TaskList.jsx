import { useState } from 'react';
import TaskCard from './TaskCard';

function TaskList({ tarefas, isLider, onToggle, onDeletar, onEdit }) {
    const [statusTab, setStatusTab] = useState('PENDENTE');

    const listaFiltrada = tarefas.filter(t => {
        if (statusTab === 'CONCLUIDA') {
            return t.status === true && !t.isProjecao;
        }
        
       
        return t.status === false && !t.isProjecao;
    });

    return (
        <div className="animate-fade-in">
            {/* Botões de Navegação */}
            <div className="flex bg-gray-200 p-1 rounded-xl mb-6 w-fit">
                <button 
                    onClick={() => setStatusTab('PENDENTE')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition ${statusTab === 'PENDENTE' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    A Fazer
                </button>
                <button 
                    onClick={() => setStatusTab('CONCLUIDA')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition ${statusTab === 'CONCLUIDA' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Concluídas
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {listaFiltrada.length === 0 && (
                    <div className="col-span-3 text-center py-12 text-gray-400 flex flex-col items-center">
                        <span className="text-4xl mb-2">{statusTab === 'PENDENTE' ? '🌴' : '📭'}</span>
                        <p>{statusTab === 'PENDENTE' ? "Tudo em dia! Aproveite o descanso." : "Nenhuma tarefa concluída ainda."}</p>
                    </div>
                )}
                {listaFiltrada.map(tarefa => (
                    <TaskCard 
                        key={tarefa.id_tarefa} 
                        tarefa={tarefa} 
                        onToggle={onToggle} 
                        onDeletar={onDeletar} 
                        onEditar={onEdit}
                        isLider={isLider}
                        isProjecao={tarefa.isProjecao}
                    />
                ))}
            </div>
        </div>
    );
}

export default TaskList;