import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Componentes Filhos
import TaskCalendar from './TaskCalendar';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import MemberCard from './MemberCard';

// Ícones
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconList = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconExit = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const IconFilter = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;

function TaskBoard({ usuario, dadosRepublica }) {
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState('LISTA'); 
  const [activeTab, setActiveTab] = useState('minhas'); 
  const [filtroMembro, setFiltroMembro] = useState(''); 

  const [tarefas, setTarefas] = useState([]);
  const [membros, setMembros] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const isLider = Number(usuario?.id_usuario) === Number(dadosRepublica?.id_lider);

  // Reseta filtros e página ao mudar de aba
  useEffect(() => {
    setFiltroMembro('');
    setPage(1); 
  }, [activeTab]);

  // --- LÓGICA DE PROJEÇÃO ---
  const processarRecorrencias = useCallback((listaTarefas) => {
    let listaFinal = [];
    
    listaTarefas.forEach(tarefa => {
        listaFinal.push(tarefa);

    
        if (!tarefa.status && tarefa.frequencia && tarefa.frequencia !== 'NENHUMA') {
            for (let i = 1; i <= 6; i++) { 
                const dataOriginal = new Date(tarefa.prazo);
                let novaData = new Date(dataOriginal);
                
                if (tarefa.frequencia === 'DIARIA') novaData.setDate(dataOriginal.getDate() + i);
                if (tarefa.frequencia === 'SEMANAL') novaData.setDate(dataOriginal.getDate() + (i * 7));
                if (tarefa.frequencia === 'MENSAL') novaData.setMonth(dataOriginal.getMonth() + i);

                listaFinal.push({
                    ...tarefa,
                    id_tarefa: `${tarefa.id_tarefa}-ghost-${i}`,
                    prazo: novaData.toISOString(),
                    isProjecao: true,
                    status: false
                });
            }
        }
    });
    return listaFinal;
  }, []);

  // --- BUSCA DE DADOS ---
  const fetchTarefas = useCallback(async () => {
    try {
        const res = await api.get('/tarefas', { 
            params: { 
                page: page, 
                limit: 15, 
            } 
        });
        
        const dados = res.data.data || [];
        const totalPgs = res.data.totalPaginas || 1;
        
        setTotalPages(totalPgs);

        const tarefasExpandidas = processarRecorrencias(dados);
        setTarefas(tarefasExpandidas);
    } catch (error) { 
        console.error("Erro buscar tarefas", error); 
    }
  }, [page, processarRecorrencias]);

  useEffect(() => {
    if (dadosRepublica?.id_republica) {
       fetchTarefas();
       api.get(`/republicas/${dadosRepublica.id_republica}/membros`)
          .then(res => setMembros(res.data)).catch(console.error);
    }
  }, [dadosRepublica, fetchTarefas]);

  // --- ACTIONS DE TAREFA ---

  function abrirModalCriacao() { 
      setTarefaEmEdicao(null); 
      setShowModal(true); 
  }

  function abrirModalEdicao(tarefa) { 
      if (tarefa.isProjecao) return; 
      setTarefaEmEdicao(tarefa); 
      setShowModal(true); 
  }

  async function handleSalvarTarefa(dadosTarefa) {
      try {
          if (tarefaEmEdicao) {
              await api.put(`/tarefas/${tarefaEmEdicao.id_tarefa}`, dadosTarefa);
              toast.success("Tarefa atualizada!");
          } else {
              await api.post('/tarefas', { 
                  ...dadosTarefa, 
                  id_republica: dadosRepublica.id_republica 
              });
              toast.success("Tarefa criada!");
          }
          setShowModal(false);
          fetchTarefas(); 
      } catch (error) { 
          toast.error("Erro ao salvar."); 
      }
  }
  
  async function handleToggleStatus(tarefa) {
      if (tarefa.isProjecao) return toast.info("Conclua apenas a tarefa atual.");
      
      if (!isLider) return toast.error("Apenas o líder pode concluir tarefas!");

      const novoStatus = !tarefa.status;
      setTarefas(prev => prev.map(t => t.id_tarefa === tarefa.id_tarefa ? { ...t, status: novoStatus } : t));

      try {
          if (novoStatus === true) {
              await api.patch(`/tarefas/${tarefa.id_tarefa}/concluir`);
              toast.success("Concluída!");
          } else {
              await api.put(`/tarefas/${tarefa.id_tarefa}`, { status: false });
              toast.info("Reaberta");
          }
          fetchTarefas();
      } catch (error) { 
          fetchTarefas(); 
          toast.error("Erro ao atualizar."); 
      }
  }

  async function handleDeletar(id_tarefa) {
      if (!isLider) return toast.error("Apenas o líder pode apagar.");
      if (String(id_tarefa).includes('ghost')) return;
      
      if(!window.confirm("Apagar permanentemente?")) return;
      
      try { 
          await api.delete(`/tarefas/${id_tarefa}`); 
          fetchTarefas(); 
          toast.success("Removida."); 
      } catch(e){ 
          toast.error("Erro ao remover."); 
      }
  }

  // --- ACTIONS DE MEMBROS ---

  async function handleRemoverMembro(membro) {
      if (!isLider) return;
      if (!window.confirm(`Tem certeza que deseja expulsar ${membro.nome}?`)) return;

      try {
          await api.delete(`/republicas/${dadosRepublica.id_republica}/membros/${membro.id_usuario}`);
          setMembros(membros.filter(m => m.id_usuario !== membro.id_usuario));
          toast.success("Membro removido.");
      } catch (error) {
          toast.error("Erro ao remover membro.");
      }
  }

  async function handlePromoverMembro(membro) {
      if (!isLider) return;
      if (!window.confirm(`Ao promover ${membro.nome}, você deixará de ser o líder. Continuar?`)) return;

      try {
          await api.patch(`/republicas/${dadosRepublica.id_republica}/membros/${membro.id_usuario}/promover`);
          window.location.reload(); 
      } catch (error) {
          toast.error("Erro ao transferir liderança.");
      }
  }

  async function handleAlterarPapel(membro, novoPapel) {
      try {
          await api.patch(`/republicas/${dadosRepublica.id_republica}/membros/${membro.id_usuario}/papel`, { novoPapel });
          setMembros(membros.map(m => m.id_usuario === membro.id_usuario ? { ...m, papel: novoPapel } : m));
          toast.success("Papel atualizado!");
      } catch (error) { 
          toast.error("Erro ao alterar papel."); 
      }
  }

  // --- SAIR DA REPÚBLICA ---

  async function confirmarSaida() {
    try {
        await api.delete(`/republicas/${dadosRepublica.id_republica}/sair`);
        toast.info("Você saiu da república.");
        
        const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioSalvo) {
            localStorage.setItem('usuario', JSON.stringify({ ...usuarioSalvo, id_republica: null }));
        }
        
        setTimeout(() => { 
            navigate('/dashboard'); 
            window.location.reload(); 
        }, 1000);

    } catch (error) {
        toast.error("Erro ao sair.");
    } finally {
        setShowLeaveModal(false);
    }
  }

  let tarefasParaExibir = tarefas;

  if (activeTab === 'minhas') {
      tarefasParaExibir = tarefasParaExibir.filter(t => t.id_responsavel === usuario?.id_usuario);
  }

  if (activeTab === 'casa' && filtroMembro !== '') {
      tarefasParaExibir = tarefasParaExibir.filter(t => {
          if (filtroMembro === 'sem_dono') return !t.id_responsavel;
          return Number(t.id_responsavel) === Number(filtroMembro);
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8 px-4">
        <div className="max-w-6xl mx-auto">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Bem-vindo à</h2>
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-bold text-secondary">{dadosRepublica?.nome || "Minha República"} ✨</h1>
                        <div className="flex items-center gap-2">
                             {isLider ? (
                                <button 
                                    onClick={() => navigate('/configuracoes', { state: { republica: dadosRepublica } })} 
                                    className="p-3 rounded-full text-gray-400 hover:text-primary hover:bg-orange-50 transition"
                                >
                                    <IconSettings />
                                </button>
                             ) : (
                                <button onClick={() => setShowLeaveModal(true)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"><IconExit /></button>
                             )}
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-3 flex-wrap justify-end">
                    
                    {/* FILTRO DE MORADOR */}
                    {activeTab === 'casa' && (
                        <div className="relative animate-fade-in">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <IconFilter />
                            </div>
                            <select
                                value={filtroMembro}
                                onChange={(e) => setFiltroMembro(e.target.value)}
                                className="pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer hover:border-gray-300 transition shadow-sm h-full"
                            >
                                <option value="">Todos</option>
                                <option value="sem_dono">Sem Responsável</option>
                                <hr />
                                {membros.map(m => (
                                    <option key={m.id_usuario} value={m.id_usuario}>
                                        {m.nome.split(' ')[0]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="bg-white p-1 rounded-xl border border-gray-200 flex shadow-sm">
                        <button onClick={() => setViewMode('LISTA')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${viewMode === 'LISTA' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}><IconList /> Lista</button>
                        <button onClick={() => setViewMode('CALENDARIO')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${viewMode === 'CALENDARIO' ? 'bg-gray-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}><IconCalendar /> Calendário</button>
                    </div>

                    {isLider && <button onClick={abrirModalCriacao} className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-primary-hover transition transform active:scale-95">+ Nova</button>}
                </div>
            </div>

            {/* TABS */}
            <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
                {['minhas', 'casa', 'membros'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm font-bold whitespace-nowrap border-b-2 transition capitalize ${activeTab === tab ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>
                        {tab === 'minhas' ? '📌 Minhas Tarefas' : tab === 'casa' ? '🏡 Mural da Casa' : '👥 Moradores'}
                    </button>
                ))}
            </div>

            {activeTab === 'membros' ? (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                    {membros.map(membro => (
                        <MemberCard 
                            key={membro.id_usuario} 
                            membro={membro} 
                            isLider={isLider} 
                            usuarioLogadoId={usuario?.id_usuario}
                            onRemover={handleRemoverMembro}
                            onPromover={handlePromoverMembro}
                            onAlterarPapel={handleAlterarPapel}
                        />
                    ))}
                 </div>
            ) : (
                viewMode === 'LISTA' ? (
                    <>
                        <TaskList 
                            tarefas={tarefasParaExibir} 
                            isLider={isLider} 
                            onToggle={handleToggleStatus} 
                            onDeletar={handleDeletar} 
                            onEdit={abrirModalEdicao} 
                        />
                        
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                                <button 
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Anterior
                                </button>
                                <span className="text-sm text-gray-500 font-medium">
                                    Página {page} de {totalPages}
                                </span>
                                <button 
                                    disabled={page === totalPages}
                                    onClick={() => setPage(p => p + 1)}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Próxima
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <TaskCalendar 
                        tarefas={tarefasParaExibir} 
                        currentDate={currentDate} 
                        setCurrentDate={setCurrentDate} 
                        onEdit={abrirModalEdicao} 
                    />
                )
            )}
        </div>

        {/* MODAIS */}
        <TaskModal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)}
            onSave={handleSalvarTarefa} 
            onExcluir={handleDeletar} 
            membros={membros} 
            tarefaEmEdicao={tarefaEmEdicao} 
            republicaId={dadosRepublica?.id_republica}
            isLider={isLider}
        />

        {showLeaveModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99] p-4 animate-fade-in">
                <div className="bg-white rounded-3xl w-full max-w-sm p-6 border-4 border-red-50 shadow-2xl">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">👋</div>
                        <h3 className="text-xl font-bold text-gray-800">Sair da República?</h3>
                        <p className="text-sm text-gray-500 mt-2">Você perderá acesso a todas as tarefas e o chat.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowLeaveModal(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition">Cancelar</button>
                        <button onClick={confirmarSaida} className="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white shadow-lg shadow-red-200 hover:bg-red-600 transition">Sim, Sair</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default TaskBoard;