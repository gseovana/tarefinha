import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

// IMPORTAÇÃO DOS COMPONENTES
import Onboarding from '../components/Onboarding';
import TaskBoard from '../components/Taskboard';

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [temRepublica, setTemRepublica] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // dados importantes
  const [dadosRepublica, setDadosRepublica] = useState(null);
  const [republicaCriada, setRepublicaCriada] = useState(null); // usado só no momento da criação

  // dados Fake de teste
  const tarefasFake = [];

  useEffect(() => {
    async function carregarDados() {
      try {
        const userStorage = localStorage.getItem('usuario');
        if (userStorage) {
          setUsuario(JSON.parse(userStorage));
          
          // verifica se já tem república salva no navegador
          const repStorage = localStorage.getItem('republica_ativa');
          if (repStorage) {
            setDadosRepublica(JSON.parse(repStorage));
            setTemRepublica(true);
          } else {
            setTemRepublica(false);
          }
        }
      } catch (error) {
        console.error("Erro", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  // --- LÓGICA DE CRIAR ---
  async function criarRepublica(nome) {
    try {
      const { data } = await api.post('/republicas', { nome });
      toast.success("República criada!");

      // salva os dados para o modal (mostrar código pro lider)
      setRepublicaCriada(data); 
      // salva os dados para o futuro dashboard
      setDadosRepublica(data);
      localStorage.setItem('republica_ativa', JSON.stringify(data));
      
      // atualiza usuário
      const novoUsuario = { ...usuario, papel: 'LIDER' };
      localStorage.setItem('usuario', JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);

    } catch (error) {
      toast.error("Erro ao criar.");
    }
  }

  // --- LÓGICA DE FINALIZAR CRIAÇÃO (botão "Ir para tarefas") ---
  function finalizarCricao() {
    setRepublicaCriada(null); // limpa o estado temporário
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
      toast.error("Erro ao entrar.");
    }
  }

  if (loading) return <div>Carregando...</div>;

  // --- RENDERIZAÇÃO CONDICIONAL ---
  if (temRepublica) {
    return (
      <TaskBoard 
        usuario={usuario} 
        dadosRepublica={dadosRepublica} 
        tarefas={tarefasFake} 
      />
    );
  }

  return (
    <Onboarding 
      usuario={usuario} 
      aoCriar={criarRepublica} 
      aoEntrar={entrarRepublica}
      republicaCriada={republicaCriada} // passa o dado pro modal de sucesso
      aoFinalizar={finalizarCricao}     // função pra quando clicar em "Ir"
    />
  );
}

export default Dashboard;