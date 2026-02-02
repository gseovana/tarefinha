import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import do Toast
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, senha });
      
      // salva os dados
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      // avisa e redireciona
      toast.success(`Bem-vindo de volta, ${data.usuario.nome.split(' ')[0]}!`);
      navigate('/dashboard'); 

    } catch (error) {
      toast.error("Erro ao fazer login! Verifique email e senha.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      
      <div className="bg-surface p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6">
        
        <div className="text-center">
            <h1 className="text-4xl font-bold text-secondary mb-2 tracking-tight">
              Tarefinha<span className="text-primary">.</span>
            </h1>
            <p className="text-tertiary">Gerencie sua república sem brigas.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-secondary text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="exemplo@ufop.edu.br"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-secondary text-sm font-semibold mb-2">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <div className="text-right mt-2">
                <a href="#" className="text-xs font-semibold text-tertiary hover:text-primary transition-colors">
                  Esqueceu a senha?
                </a>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary-hover transition-all shadow-md transform active:scale-95"
          >
            Entrar
          </button>

        </form>

        <div className="text-center border-t border-gray-100 pt-6 space-y-4">
          <p className="text-tertiary text-sm">
            Ainda não mora aqui?{' '}
            <Link to="/cadastro" className="text-primary font-bold hover:underline">
              Crie uma conta
            </Link>
          </p>
          
          {/* link para voltar pra Home */}
          <div>
            <Link to="/" className="text-sm text-gray-400 hover:text-primary transition">
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;