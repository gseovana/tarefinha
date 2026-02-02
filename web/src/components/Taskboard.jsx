import { useState } from 'react';

function TaskBoard({ usuario, dadosRepublica, tarefas = [] }) { 
  const [activeTab, setActiveTab] = useState('minhas');
  
  const isLider = usuario?.papel === 'LIDER';
  const primeiroNome = usuario?.nome ? usuario.nome.split(' ')[0] : '';
  const minhasTarefasList = tarefas.filter(t => t.responsavel === primeiroNome || t.responsavel === usuario?.nome);

  // helper para saber se está numa aba de tarefas
  const isTabTarefas = activeTab === 'minhas' || activeTab === 'casa';
  // helper para saber se a lista tá vazia
  const listaVazia = tarefas.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8 px-4">
        <div className="max-w-5xl mx-auto">
            
            {/* --- 1. CABEÇALHO --- */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Bem-vindo à</h2>
                    <h1 className="text-4xl font-bold text-secondary flex items-center gap-2">
                        {dadosRepublica?.nome || "Minha República"} ✨
                        {isLider && (
                            <button className="text-gray-300 hover:text-primary transition text-xl p-2 rounded-full hover:bg-orange-50" title="Configurações">
                                ⚙️
                            </button>
                        )}
                    </h1>
                </div>
                
                {isLider && (
                    <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-primary-hover transition flex items-center gap-2 transform active:scale-95">
                        <span className="text-xl leading-none">+</span> Nova Tarefa
                    </button>
                )}
            </div>

            {/* --- 2. ABAS --- */}
            <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
                <button onClick={() => setActiveTab('minhas')} className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${activeTab === 'minhas' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>📌 Minhas Tarefas</button>
                <button onClick={() => setActiveTab('casa')} className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${activeTab === 'casa' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>🏡 Mural da Casa</button>
                <button onClick={() => setActiveTab('membros')} className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${activeTab === 'membros' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>👥 Moradores</button>
            </div>

            {/* --- 3. CONTEÚDO: EMPTY STATE */}
            {isTabTarefas && listaVazia && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 animate-fade-in">
                    <div className="text-5xl mb-4">✨</div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Tudo limpo por aqui!</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Ainda não existem tarefas cadastradas na república.
                        {isLider 
                            ? " Como você é o líder, que tal organizar a casa e criar a primeira?" 
                            : " Aguarde o líder criar as atividades ou aproveite o descanso!"}
                    </p>
                    {isLider && (
                         <button className="text-primary font-bold hover:text-primary-hover underline decoration-2 underline-offset-4">
                            Criar primeira tarefa agora →
                         </button>
                    )}
                </div>
            )}

            {/* --- 4. LISTA: MINHAS TAREFAS --- */}
            {!listaVazia && activeTab === 'minhas' && (
                <>
                    {minhasTarefasList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {minhasTarefasList.map(tarefa => (
                                <div key={tarefa.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-md hover:border-primary/30 transition group">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`w-2 h-2 rounded-full ${tarefa.status === 'feito' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{tarefa.tipo || 'Geral'}</span>
                                        </div>
                                        <h3 className={`text-lg font-bold ${tarefa.status === 'feito' ? 'text-gray-400 line-through' : 'text-secondary'}`}>
                                            {tarefa.titulo}
                                        </h3>
                                        <p className="text-sm text-gray-500">Prazo: {tarefa.prazo}</p>
                                    </div>
                                    <button className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all ${tarefa.status === 'feito' ? 'bg-green-100 border-green-500 text-green-600 scale-95' : 'border-gray-200 text-transparent hover:text-primary hover:border-primary group-hover:scale-105'}`}>
                                        ✓
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
                            <p>Você não tem nenhuma tarefa pendente. Aproveite! 😴</p>
                        </div>
                    )}
                </>
            )}

            {/* --- 5. LISTA: MURAL DA CASA --- */}
            {!listaVazia && activeTab === 'casa' && (
                <div className="space-y-3">
                     {tarefas.map(tarefa => (
                        <div key={tarefa.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${tarefa.responsavel === primeiroNome ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {tarefa.responsavel ? tarefa.responsavel.substring(0,1).toUpperCase() : '?'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary text-sm md:text-base">{tarefa.titulo}</h3>
                                    <p className="text-xs text-gray-500">
                                        Responsável: <strong>{tarefa.responsavel}</strong> • {tarefa.prazo}
                                    </p>
                                </div>
                             </div>
                             <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tarefa.status === 'feito' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                {tarefa.status === 'feito' ? 'Feito' : 'Pendente'}
                             </span>
                        </div>
                     ))}
                </div>
            )}

            {/* --- 6. ABA MORADORES  --- */}
            {activeTab === 'membros' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* exibe o próprio usuário (sem lista do back ainda) */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden">
                             <img src={`https://ui-avatars.com/api/?name=${usuario?.nome}&background=random`} alt="Avatar" />
                        </div>
                        <h3 className="font-bold text-lg text-secondary">{usuario?.nome}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${isLider ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                            {isLider ? 'LÍDER 👑' : 'MEMBRO'}
                        </span>
                        <div className="mt-4 text-sm text-gray-500">
                            {/* futuramente: número real de tarefas */}
                            entrou hoje
                        </div>
                    </div>
                    
                    {/* placeholder para outros membros */}
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-6 min-h-[200px]">
                        <p className="text-sm text-center mb-2">Convide moradores compartilhando o código:</p>
                        <p className="font-mono bg-gray-100 px-2 py-1 rounded text-primary font-bold">
                            {dadosRepublica?.codigo_acesso || 'CODE'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}

export default TaskBoard;