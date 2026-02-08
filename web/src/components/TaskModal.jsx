import { useState, useEffect } from 'react';

const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

function TaskModal({ isOpen, onClose, onSave, onExcluir, membros, tarefaEmEdicao, republicaId, isLider }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [prazo, setPrazo] = useState('');
  const [frequencia, setFrequencia] = useState('NENHUMA');

  const isConcluida = tarefaEmEdicao?.status === true;

  const isReadOnly = (tarefaEmEdicao && !isLider) || isConcluida;

  useEffect(() => {
    if (tarefaEmEdicao) {
      setTitulo(tarefaEmEdicao.titulo);
      setDescricao(tarefaEmEdicao.descricao || '');
      setResponsavel(tarefaEmEdicao.id_responsavel || '');
      setFrequencia(tarefaEmEdicao.frequencia || 'NENHUMA');
      
      if (tarefaEmEdicao.prazo) {
          const dataFormatada = new Date(tarefaEmEdicao.prazo).toISOString().split('T')[0];
          setPrazo(dataFormatada);
      }
    } else {
      setTitulo('');
      setDescricao('');
      setResponsavel('');
      setPrazo('');
      setFrequencia('NENHUMA');
    }
  }, [tarefaEmEdicao, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
      e.preventDefault();
      if(isReadOnly) return; 

      onSave({ 
          titulo, 
          descricao, 
          prazo, 
          id_responsavel: responsavel ? Number(responsavel) : null, 
          frequencia 
      });
  };

  const handleExcluirClicado = () => {
      if (tarefaEmEdicao && onExcluir) {
          onExcluir(tarefaEmEdicao.id_tarefa);
          onClose();
      }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl transform transition-all scale-100 flex flex-col max-h-[90vh]">
            
            <div className="px-8 pt-6 pb-4 border-b border-gray-100 shrink-0">
                    <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                        {tarefaEmEdicao 
                            ? (isReadOnly ? "Detalhes 👁️" : "Editar Tarefa ✏️") 
                            : "Nova Tarefa ⚡"
                        }
                    </h2>
                    
                    {/* Avisos de Status */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tarefaEmEdicao && !isLider && (
                            <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded">
                                🔒 Modo Leitura (Membro)
                            </span>
                        )}
                        {isConcluida && (
                            <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                                ✅ Tarefa Concluída
                            </span>
                        )}
                    </div>
            </div>

            {/* FORMULÁRIO  */}
            <form onSubmit={handleSubmit} className="p-8 space-y-4 overflow-y-auto flex-1">
                
                {/* TÍTULO */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Título</label>
                    <input 
                        type="text" 
                        disabled={isReadOnly}
                        className="w-full bg-gray-50 border border-gray-200 text-secondary font-medium px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        placeholder="Ex: Comprar detergente"
                        required
                    />
                </div>

                {/* DESCRIÇÃO  */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Descrição</label>
                    <textarea 
                        disabled={isReadOnly}
                        className="w-full bg-gray-50 border border-gray-200 text-secondary font-medium px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 resize-none h-20"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        placeholder="Detalhes opcionais..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* PRAZO */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Prazo</label>
                        <input 
                            type="date"
                            disabled={isReadOnly}
                            className="w-full bg-gray-50 border border-gray-200 text-secondary font-medium px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100"
                            value={prazo}
                            onChange={e => setPrazo(e.target.value)}
                        />
                    </div>

                    {/* RESPONSÁVEL */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Responsável</label>
                        <div className="relative">
                            <select 
                                disabled={isReadOnly}
                                className="w-full bg-gray-50 border border-gray-200 text-secondary font-medium px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 appearance-none"
                                value={responsavel}
                                onChange={e => setResponsavel(e.target.value)}
                            >
                                <option value="">Ninguém</option>
                                {membros.map(m => (
                                    <option key={m.id_usuario} value={m.id_usuario}>{m.nome.split(' ')[0]}</option>
                                ))}
                            </select>
                            {!isReadOnly && <div className="absolute right-4 top-3 pointer-events-none text-gray-400 text-xs">▼</div>}
                        </div>
                    </div>
                </div>

                {/* FREQUÊNCIA */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Repetição</label>
                    <div className="relative">
                        <select
                            disabled={isReadOnly}
                            value={frequencia}
                            onChange={(e) => setFrequencia(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-secondary font-medium px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 appearance-none"
                        >
                            <option value="NENHUMA">Não repetir</option>
                            <option value="DIARIA">Diária</option>
                            <option value="SEMANAL">Semanal</option>
                            <option value="MENSAL">Mensal</option>
                        </select>
                        {!isReadOnly && <div className="absolute right-4 top-3 pointer-events-none text-gray-400 text-xs">▼</div>}
                    </div>
                </div>

            </form>

            {/* RODAPÉ (Fixo na parte inferior) */}
            <div className="px-8 py-4 border-t border-gray-100 flex gap-3 shrink-0 bg-white rounded-b-3xl">
                
                {/* Botão EXCLUIR */}
                {isLider && tarefaEmEdicao && (
                    <button 
                        type="button" 
                        onClick={handleExcluirClicado}
                        className="p-3 rounded-xl font-bold text-red-400 bg-red-50 hover:bg-red-100 hover:text-red-600 transition"
                        title="Excluir Tarefa"
                    >
                        <IconTrash />
                    </button>
                )}

                <button 
                    type="button" 
                    onClick={onClose} 
                    className="flex-1 py-3 px-6 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                >
                    {isReadOnly ? "Fechar" : "Cancelar"}
                </button>
                
                {/* Botão SALVAR */}
                {!isReadOnly && (
                    <button 
                        onClick={handleSubmit}
                        className="flex-1 py-3 px-6 rounded-xl font-bold bg-primary text-white shadow-lg shadow-orange-200 hover:bg-primary-hover transition transform active:scale-95"
                    >
                        Salvar
                    </button>
                )}
            </div>
        </div>
    </div>
  );
}

export default TaskModal;