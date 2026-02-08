import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const IconBack = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nome: '', email: '', papel: '' });
  const [republica, setRepublica] = useState(null);
  
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);

  const [nomeTemp, setNomeTemp] = useState('');
  const [emailTemp, setEmailTemp] = useState('');

  useEffect(() => {
    const userStorage = localStorage.getItem('usuario');
    let userIdAtual = null;

    if (userStorage) {
      const u = JSON.parse(userStorage);
      setUsuario(u);
      setNomeTemp(u.nome);
      setEmailTemp(u.email);
      userIdAtual = u.id_usuario;
    }

    const repStorage = localStorage.getItem('republica_ativa');
    if (repStorage) {
      setRepublica(JSON.parse(repStorage));
    }

    async function fetchDadosAtualizados() {
        try {
            const res = await api.get('/republicas/me');
            const dadosRepublica = res.data;

            if (dadosRepublica) {
                setRepublica(dadosRepublica);
                localStorage.setItem('republica_ativa', JSON.stringify(dadosRepublica));

                if (userIdAtual) {
                    const souLiderAgora = Number(dadosRepublica.id_lider) === Number(userIdAtual);
                    const papelReal = souLiderAgora ? 'LIDER' : 'MEMBRO';

                    setUsuario(prev => {
                        const usuarioAtualizado = { ...prev, papel: papelReal };
                        localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
                        return usuarioAtualizado;
                    });
                }
            }
        } catch (error) {
            console.error("Erro ao sincronizar dados do perfil:", error);
        }
    }

    fetchDadosAtualizados();

  }, []);

  async function handleSalvar() {
    try {
      setLoading(true);
      await api.put(`/usuarios/${usuario.id_usuario}`, { nome: nomeTemp, email: emailTemp });
      
      const novoUsuario = { ...usuario, nome: nomeTemp, email: emailTemp };
      localStorage.setItem('usuario', JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);
      
      toast.success("Perfil atualizado com sucesso!");
      setEditando(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function confirmarExclusao() {
    try {
        const idParaDeletar = usuario.id_usuario; 
        await api.delete(`/usuarios/${idParaDeletar}`); 
        
        toast.info("Conta excluída. Sentiremos sua falta! 👋");
        localStorage.clear();
        setTimeout(() => {
            window.location.replace("/");
        }, 2000);
    } catch (error) {
        console.error(error);
        toast.error("Erro ao excluir conta. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate('/dashboard')} 
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition text-gray-500"
                >
                    <IconBack />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Meu Perfil</h1>
                    <p className="text-gray-500 text-sm">Gerencie seus dados pessoais</p>
                </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${usuario.papel === 'LIDER' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {usuario.papel === 'LIDER' ? '👑 Líder' : '👤 Membro'}
                </span>
                {republica ? (
                    <span className="text-sm font-medium text-gray-500">
                        em <strong className="text-secondary">{republica.nome}</strong>
                    </span>
                ) : (
                    <span className="text-xs text-gray-400 italic">Sem república</span>
                )}
            </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-secondary mb-6">Informações Básicas</h2>

            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg relative group">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=F97316&color=fff&size=128`} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                    />
                </div>
                {!editando && (
                    <button onClick={() => setEditando(true)} className="text-primary text-sm font-bold hover:underline">
                        Editar Dados
                    </button>
                )}
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase mb-2 tracking-wider">Nome Completo</label>
                    <input 
                        type="text" 
                        value={nomeTemp}
                        onChange={e => setNomeTemp(e.target.value)}
                        disabled={!editando}
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${editando ? 'border-primary bg-white ring-2 ring-primary/20' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
                    />
                </div>

                <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase mb-2 tracking-wider">E-mail</label>
                    <input 
                        type="email" 
                        value={emailTemp}
                        onChange={e => setEmailTemp(e.target.value)}
                        disabled={!editando}
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${editando ? 'border-primary bg-white ring-2 ring-primary/20' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
                    />
                </div>

                {editando && (
                    <div className="flex gap-3 pt-4 animate-fade-in">
                        <button 
                            onClick={() => {
                                setEditando(false);
                                setNomeTemp(usuario.nome); 
                                setEmailTemp(usuario.email);
                            }} 
                            className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleSalvar} 
                            disabled={loading}
                            className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-orange-100 transition transform active:scale-95"
                        >
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                )}
            </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100">
            <h2 className="text-lg font-bold text-red-500 mb-4">Zona de Perigo</h2>
            <p className="text-sm text-gray-500 mb-6">
                A exclusão é irreversível. Todos os seus dados e tarefas concluídas serão perdidos permanentemente.
            </p>
            <button 
                onClick={() => setShowModalExcluir(true)} 
                className="w-full border-2 border-red-100 text-red-500 font-bold py-4 rounded-xl hover:bg-red-50 hover:border-red-200 transition flex items-center justify-center gap-2"
            >
                <IconTrash /> Excluir minha conta
            </button>
        </div>

      </div>

      {/* MODAL DE EXCLUSÃO */}
      {showModalExcluir && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-red-50 transform transition-all scale-100">
            
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              ⚠️
            </div>

            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Tem certeza?</h3>
            
            <div className="text-gray-600 text-center mb-8 space-y-4">
                <p>
                    Essa ação é <strong>irreversível</strong>. Todos os seus dados e tarefas concluídas serão perdidos.
                </p>
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl text-sm text-orange-800 text-left">
                    <strong>👑 Atenção sobre a Liderança:</strong><br/>
                    Se você for o líder atual, ao sair, a liderança será transferida automaticamente para a pessoa mais antiga na casa.
                </div>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={() => setShowModalExcluir(false)}
                    className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition"
                >
                    Cancelar
                </button>
                <button 
                    onClick={confirmarExclusao}
                    className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-200 transition transform active:scale-95"
                >
                    Sim, excluir
                </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Perfil;