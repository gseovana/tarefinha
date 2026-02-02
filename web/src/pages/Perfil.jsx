import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import api from '../services/api'; 

function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nome: '', email: '', papel: '' });
  const [republica, setRepublica] = useState(null);
  
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // state pra controlar o modal de exclusão
  const [showModalExcluir, setShowModalExcluir] = useState(false);

  // estados dos inputs temporários
  const [nomeTemp, setNomeTemp] = useState('');
  const [emailTemp, setEmailTemp] = useState('');

  useEffect(() => {
    const userStorage = localStorage.getItem('usuario');
    if (userStorage) {
      const u = JSON.parse(userStorage);
      setUsuario(u);
      setNomeTemp(u.nome);
      setEmailTemp(u.email);
    }

    const repStorage = localStorage.getItem('republica_ativa');
    if (repStorage) {
      setRepublica(JSON.parse(repStorage));
    }
  }, []);

  async function handleSalvar() {
    try {
      setLoading(true);
      // await api.put('/usuarios', ...);
      
      const novoUsuario = { ...usuario, nome: nomeTemp, email: emailTemp };
      localStorage.setItem('usuario', JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);
      
      toast.success("Perfil atualizado com sucesso!");
      setEditando(false);
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  }

  // função que realmente apaga a conta 
  async function confirmarExclusao() {
    try {
        // await api.delete('/usuarios');
        toast.info("Conta excluída. Sentiremos sua falta! 👋");
        localStorage.clear();
        navigate('/');
        window.location.reload();
    } catch (error) {
        toast.error("Erro ao excluir conta.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 px-4 pb-20">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-secondary">Meu Perfil</h1>
            
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
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

        {/* FOTO */}
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
                    Editar Foto ou Dados
                </button>
            )}
        </div>

        {/* FORMULÁRIO */}
        <div className="space-y-6">
            <div>
                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Nome Completo</label>
                <input 
                    type="text" 
                    value={nomeTemp}
                    onChange={e => setNomeTemp(e.target.value)}
                    disabled={!editando}
                    className={`w-full px-4 py-3 rounded-xl border transition-all ${editando ? 'border-primary bg-white ring-2 ring-primary/20' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
                />
            </div>

            <div>
                <label className="block text-gray-400 text-xs font-bold uppercase mb-1">E-mail</label>
                <input 
                    type="email" 
                    value={emailTemp}
                    onChange={e => setEmailTemp(e.target.value)}
                    disabled={!editando}
                    className={`w-full px-4 py-3 rounded-xl border transition-all ${editando ? 'border-primary bg-white ring-2 ring-primary/20' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
                />
            </div>

            {/* BOTÕES */}
            <div className="pt-6 flex flex-col gap-3">
                {editando ? (
                    <div className="flex gap-3 animate-fade-in">
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
                            className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg transition transform active:scale-95"
                        >
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                ) : (
                    <div className="border-t border-gray-100 pt-6 mt-4">
                        <button 
                            onClick={() => setShowModalExcluir(true)} // abre o modal
                            className="w-full text-red-400 text-sm font-bold hover:text-red-600 transition flex items-center justify-center gap-2 hover:bg-red-50 py-3 rounded-xl"
                        >
                            🗑️ Excluir minha conta permanentemente
                        </button>
                    </div>
                )}
            </div>
        </div>

      </div>

      {/* --- MODAL DE EXCLUSÃO (PERIGO) --- */}
      {showModalExcluir && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-red-100 transform transition-all scale-100">
            
            {/* icone de alerta */}
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              ⚠️
            </div>

            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Tem certeza?</h3>
            
            <div className="text-gray-600 text-center mb-8 space-y-4">
                <p>
                    Essa ação é <strong>irreversível</strong>. Todos os seus dados e tarefas concluídas serão perdidos.
                </p>
                
                {/* aviso específico de liderança */}
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