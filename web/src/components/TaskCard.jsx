// Ícones SVG isolados
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconEdit = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;

function TaskCard({ tarefa, onToggle, onDeletar, onEditar, isLider, isProjecao }) {
    const concluida = tarefa.status === true;
    
    const podeInteragir = isLider && !isProjecao;

    const formatarData = (dataISO) => {
        if (!dataISO) return "Sem prazo";
        const data = new Date(dataISO);
        return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(data);
    };

    const cardStyle = isProjecao 
        ? "bg-gray-50 border-2 border-dashed border-gray-300 opacity-70" 
        : `bg-white border border-gray-100 shadow-sm hover:shadow-md ${concluida ? 'bg-gray-50' : ''}`;

    return (
        <div className={`p-6 rounded-2xl flex justify-between items-center transition group relative overflow-hidden ${cardStyle}`}>
            
            {isProjecao && (
                <div className="absolute top-0 right-0 bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                    PREVISÃO
                </div>
            )}

            <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                    {!isProjecao && (
                        <span className={`w-2 h-2 rounded-full ${concluida ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    )}
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {tarefa.frequencia === 'NENHUMA' ? 'Única' : tarefa.frequencia}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        📅 {formatarData(tarefa.prazo)}
                    </span>
                </div>

                <h3 className={`text-lg font-bold truncate ${concluida ? 'text-gray-400 line-through' : 'text-secondary'}`}>
                    {tarefa.titulo}
                </h3>
                
                {tarefa.descricao && <p className="text-xs text-gray-400 mt-1 line-clamp-1">{tarefa.descricao}</p>}
                
                <p className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
                   👤 {tarefa.responsavel?.nome ? tarefa.responsavel.nome.split(' ')[0] : "Sem dono"}
                </p>
            </div>
            
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => onToggle(tarefa)}
                    disabled={!podeInteragir}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all transform 
                        ${!podeInteragir ? 'cursor-not-allowed opacity-30 border-gray-200 text-gray-300 bg-gray-100' : 'active:scale-95'}
                        ${podeInteragir && concluida ? 'bg-green-100 border-green-500 text-green-600' : ''}
                        ${podeInteragir && !concluida ? 'border-gray-200 text-transparent hover:text-green-500 hover:border-green-500' : ''}
                    `}
                    title={!isLider ? "Apenas o líder pode concluir" : (concluida ? "Reabrir tarefa" : "Concluir tarefa")}
                >
                    ✓
                </button>
                
                {/* Ações de Admin (Líder) - Só mostra se for líder e não for projeção */}
                {isLider && !isProjecao && (
                    <div className="flex flex-col gap-1">
                        {onEditar && (
                            <button onClick={() => onEditar(tarefa)} className="text-gray-300 hover:text-blue-500 p-1 transition" title="Editar">
                                <IconEdit />
                            </button>
                        )}
                        <button onClick={() => onDeletar(tarefa.id_tarefa)} className="text-gray-300 hover:text-red-500 p-1 transition" title="Excluir">
                            <IconTrash />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskCard;