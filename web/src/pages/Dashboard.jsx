import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

// Componentes
import Onboarding from '../components/Onboarding';
import Taskboard from '../components/Taskboard';

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [temRepublica, setTemRepublica] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [dadosRepublica, setDadosRepublica] = useState(null);
  const [republicaCriada, setRepublicaCriada] = useState(null);

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function carregarDadosIniciais() {
      try {
        const userStorage = localStorage.getItem('usuario');
        
        if (userStorage) {
          const u = JSON.parse(userStorage);
          setUsuario(u);

          const repStorage = localStorage.getItem('republica_ativa');
          
          if (repStorage) {
            const rep = JSON.parse(repStorage);
            setDadosRepublica(rep);
            setTemRepublica(true);

            api.get('/republicas/me')
               .then(() => { })
               .catch(() => {
                   
                   console.log("Cache inválido! Limpando...");
                   localStorage.removeItem('republica_ativa');
                   
                   
                   const userAtualizado = { ...u, id_republica: null, republica: null };
                   localStorage.setItem('usuario', JSON.stringify(userAtualizado));
                   
                   setTemRepublica(false);
                   setDadosRepublica(null);
               });

          } else {
            
            try {
              const { data } = await api.get('/republicas/me'); 
              if (data) {
                setDadosRepublica(data);
                setTemRepublica(true);
                localStorage.setItem('republica_ativa', JSON.stringify(data));
              }
            } catch (error) {
              setTemRepublica(false);
            }
          }
        }
      } catch (error) {
        console.error("Erro dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDadosIniciais();
  }, []);

  // --- LÓGICA DE CRIAR ---
  async function criarRepublica(nome) {
    try {
      const { data } = await api.post('/republicas', { nome });
      toast.success("República criada!");

      setRepublicaCriada(data); 
      setDadosRepublica(data);
      localStorage.setItem('republica_ativa', JSON.stringify(data));
      
      const novoUsuario = { ...usuario, papel: 'LIDER' };
      localStorage.setItem('usuario', JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);

    } catch (error) {
      toast.error("Erro ao criar república.");
    }
  }

  function finalizarCricao() {
    setRepublicaCriada(null);
    setTemRepublica(true);
  }

  // --- LÓGICA DE ENTRAR ---
  async function entrarRepublica(codigo, callbackFechaModal) {
    try {
      const { data } = await api.post('/republicas/entrar', { codigo_acesso: codigo });
      toast.success("Entrou com sucesso!");
      
      setDadosRepublica(data);
      localStorage.setItem('republica_ativa', JSON.stringify(data));
      
      const novoUsuario = { ...usuario, papel: 'MEMBRO' };
      localStorage.setItem('usuario', JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);

      setTemRepublica(true); 
      callbackFechaModal();
      
    } catch (error) {
      toast.error("Erro ao entrar. Verifique o código.");
    }
  }

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-primary">Carregando...</div>;

  // --- RENDERIZAÇÃO ---
  if (temRepublica) {
    return (
      <TaskBoard 
        usuario={usuario} 
        dadosRepublica={dadosRepublica} 
        tarefas={tarefas}
      />
    );
  }

  return (
    <Onboarding 
      usuario={usuario} 
      aoCriar={criarRepublica} 
      aoEntrar={entrarRepublica}
      republicaCriada={republicaCriada}
      aoFinalizar={finalizarCricao}
    />
  );
}

export default Dashboard;