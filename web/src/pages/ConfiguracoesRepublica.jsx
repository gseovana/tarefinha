import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const IconBack = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const IconRefresh = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

function ConfiguracoesRepublica() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const dadosIniciais = location.state?.republica;

    const [republica, setRepublica] = useState(dadosIniciais || null);
    const [loading, setLoading] = useState(!dadosIniciais);

    useEffect(() => {
        if (!dadosIniciais) {
            async function loadDados() {
                try {
                    const response = await api.get('/republicas/me'); 
                    setRepublica(response.data);
                } catch (error) {
                    toast.error("Erro ao carregar dados. Redirecionando...");
                    setTimeout(() => navigate('/dashboard'), 2000);
                } finally {
                    setLoading(false);
                }
            }
            loadDados();
        }
    }, [dadosIniciais, navigate]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-400">Carregando configurações...</div>;
    }

    if (!republica) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition text-gray-500"
                    >
                        <IconBack />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-secondary">Configurações</h1>
                        <p className="text-gray-500 text-sm">Gerencie sua república</p>
                    </div>
                </div>

                <Content republica={republica} navigate={navigate} />
                
            </div>
        </div>
    );
}

function Content({ republica: dadosIniciais, navigate }) {
    const [republica, setRepublica] = useState(dadosIniciais);
    const [novoNome, setNovoNome] = useState(dadosIniciais.nome);
    
    const [showModalCodigo, setShowModalCodigo] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [confirmName, setConfirmName] = useState('');

    async function salvarNome(e) {
        e.preventDefault();
        try {
            await api.put(`/republicas/${republica.id_republica}`, { nome: novoNome });
            
            toast.success("Nome atualizado!");
            setRepublica({...republica, nome: novoNome});
        } catch (err) { 
            console.error(err);
            toast.error("Erro ao salvar nome."); 
        }
    }

    async function gerarNovoCodigo() {
        try {
            const { data } = await api.patch(`/republicas/${republica.id_republica}/codigo`);
            
            setRepublica({...republica, codigo_acesso: data.novoCodigo});
            setShowModalCodigo(false);
            toast.success("Novo código gerado!");
        } catch (err) { 
            console.error(err);
            toast.error("Erro ao gerar código."); 
        }
    }

    async function excluirTudo() {
        if (!republica?.id_republica) return toast.error("Erro: ID inválido.");
        if (confirmName !== republica.nome) return toast.error("Nome incorreto.");
        
        try {
            await api.delete(`/republicas/${republica.id_republica}`);
            
            localStorage.removeItem('republica');
            localStorage.removeItem('republica_ativa');  

            const usr = JSON.parse(localStorage.getItem('usuario') || '{}');
            const usuarioLimpo = { ...usr, id_republica: null, republica: null, papel: null };
            localStorage.setItem('usuario', JSON.stringify(usuarioLimpo)); 

            toast.info("República excluída. Redirecionando...");

            setTimeout(() => {
                navigate('/dashboard'); 
                window.location.reload(); 
            }, 2000); 

        } catch (err) { 
            console.error(err);
            if (err.response?.status === 404 || err.response?.status === 400) {
                 localStorage.removeItem('republica');
                 const usr = JSON.parse(localStorage.getItem('usuario') || '{}');
                 localStorage.setItem('usuario', JSON.stringify({ ...usr, id_republica: null }));
                 
                 toast.warn("Limpando dados antigos...");
                 setTimeout(() => { navigate('/dashboard'); window.location.reload(); }, 2000);
            } else {
                toast.error("Erro ao excluir república."); 
            }
        }
    }

    return (
        <div className="space-y-6 animate-fade-in">
            
            {/* CARD 1: Informações Básicas */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-secondary mb-4">Informações Básicas</h2>
                <form onSubmit={salvarNome}>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nome da República</label>
                    <div className="flex gap-3">
                        <input 
                            type="text" 
                            className="flex-1 bg-gray-50 border border-gray-200 text-secondary font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                            value={novoNome}
                            onChange={e => setNovoNome(e.target.value)}
                        />
                        <button type="submit" className="bg-primary text-white font-bold px-6 rounded-xl hover:bg-primary-hover transition shadow-lg shadow-orange-100">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>

            {/* CARD 2: Acesso */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-secondary mb-4">Acesso e Segurança</h2>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Código Atual</p>
                        <p className="text-3xl font-mono font-bold text-gray-700 tracking-widest select-all">
                            {republica.codigo_acesso}
                        </p>
                    </div>
                    <button 
                        onClick={() => setShowModalCodigo(true)}
                        className="flex items-center gap-2 text-primary font-bold bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-primary hover:bg-orange-50 transition shadow-sm"
                    >
                        <IconRefresh /> Regenerar
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-3 ml-1">
                    ⚠️ Ao regenerar, o código antigo deixa de funcionar imediatamente.
                </p>
            </div>

            {/* CARD 3: Danger Zone */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100">
                <h2 className="text-lg font-bold text-red-500 mb-4">Zona de Perigo</h2>
                <p className="text-sm text-gray-500 mb-6">
                    A exclusão é irreversível. Todas as tarefas, histórico e vínculos de membros serão apagados permanentemente.
                </p>
                <button 
                    onClick={() => setShowModalDelete(true)}
                    className="w-full border-2 border-red-100 text-red-500 font-bold py-4 rounded-xl hover:bg-red-50 hover:border-red-200 transition flex items-center justify-center gap-2"
                >
                    <IconTrash /> Encerrar República
                </button>
            </div>

            {/* --- MODAL CONFIRMAÇÃO CÓDIGO --- */}
            {showModalCodigo && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-fade-in">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-orange-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔄</div>
                            <h3 className="text-xl font-bold text-secondary">Trocar Código?</h3>
                            <p className="text-sm text-gray-500 mt-2">O código atual <strong>{republica.codigo_acesso}</strong> será invalidado.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowModalCodigo(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50">Cancelar</button>
                            <button onClick={gerarNovoCodigo} className="flex-1 py-3 rounded-xl font-bold bg-primary text-white shadow-lg hover:opacity-90">Confirmar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL CONFIRMAÇÃO EXCLUSÃO --- */}
            {showModalDelete && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-fade-in border-4 border-red-50">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⚠️</div>
                            <h3 className="text-xl font-bold text-red-500">Tem certeza?</h3>
                            <p className="text-sm text-gray-500 mt-2">Digite <strong>{republica.nome}</strong> para confirmar a exclusão.</p>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Digite o nome da república"
                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl mb-4 text-center font-bold outline-none focus:border-red-500 transition"
                            onChange={e => setConfirmName(e.target.value)}
                        />
                        <div className="flex gap-3">
                            <button onClick={() => setShowModalDelete(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50">Cancelar</button>
                            <button 
                                onClick={excluirTudo} 
                                disabled={confirmName !== republica.nome}
                                className="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white shadow-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ConfiguracoesRepublica;