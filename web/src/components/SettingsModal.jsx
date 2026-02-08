import { useState } from 'react';

// Ícones
const IconRefresh = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

function SettingsModal({ isOpen, onClose, republica, onUpdateName, onRegenerateCode, onDeleteRepublic }) {
    const [nome, setNome] = useState(republica?.nome || '');
   
    if (!isOpen) return null;

    function handleSalvarNome(e) {
        e.preventDefault();
        onUpdateName(nome);
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                
                {/* Header */}
                <div className="px-8 pt-8 pb-2">
                    <h2 className="text-2xl font-bold text-secondary">Configurações ⚙️</h2>
                    <p className="text-gray-500 text-sm mt-1">Gerencie sua república</p>
                </div>

                <div className="p-8 space-y-8">
                    
                    {/* 1. Alterar Nome */}
                    <form onSubmit={handleSalvarNome}>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nome da República</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                className="flex-1 bg-gray-50 border border-gray-200 text-secondary font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                            <button type="submit" className="bg-primary text-white font-bold px-4 rounded-xl hover:bg-primary-hover transition">
                                Salvar
                            </button>
                        </div>
                    </form>

                    <hr className="border-gray-100" />

                    {/* 2. Código de Acesso */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Código de Acesso</label>
                        <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
                            <span className="text-2xl font-mono font-bold text-gray-700 tracking-widest select-all">
                                {republica.codigo_acesso}
                            </span>
                            <button 
                                onClick={onRegenerateCode}
                                className="text-gray-400 hover:text-blue-500 hover:bg-white p-2 rounded-lg transition"
                                title="Gerar novo código"
                            >
                                <IconRefresh />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Clique no ícone para invalidar o código atual e gerar um novo.
                        </p>
                    </div>

                    <hr className="border-gray-100" />

                    {/* 3. Zona de Perigo */}
                    <div>
                        <label className="block text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Zona de Perigo</label>
                        <button 
                            onClick={onDeleteRepublic}
                            className="w-full border-2 border-red-100 text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 hover:border-red-200 transition flex items-center justify-center gap-2"
                        >
                            <IconTrash /> Excluir República
                        </button>
                        <p className="text-xs text-center text-gray-300 mt-2">
                            Isso apagará todas as tarefas e removerá todos os membros.
                        </p>
                    </div>

                </div>

                {/* Footer Cancelar */}
                <div className="bg-gray-50 p-4 text-center cursor-pointer hover:bg-gray-100 transition" onClick={onClose}>
                    <span className="text-gray-500 font-bold text-sm">Fechar</span>
                </div>

            </div>
        </div>
    );
}

export default SettingsModal;