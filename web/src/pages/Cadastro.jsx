import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import do Toast
import api from '../services/api';

function Cadastro() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validação de senhas iguais
    if (formData.senha !== formData.confirmarSenha) {
        toast.warning("As senhas não conferem!");
        return;
    }

    try {
      await api.post('/usuarios', {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha
      });
      
      toast.success("Cadastro realizado! Faça login para continuar.");
      navigate('/login');

    } catch (error) {
      toast.error("Erro ao cadastrar. Verifique os dados ou tente outro email.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4 py-12">
      
      <div className="bg-surface p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col gap-6">
        
        <div className="text-center">
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Crie sua conta
            </h1>
            <p className="text-tertiary">Junte-se à república mais organizada da UFOP.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-secondary text-sm font-semibold mb-2">
              Nome Completo
            </label>
            <input
              name="nome"
              type="text"
              placeholder="Ex: João da Silva"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-secondary text-sm font-semibold mb-2">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              placeholder="exemplo@ufop.edu.br"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-secondary text-sm font-semibold mb-2">
                  Senha
                </label>
                <input
                  name="senha"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  onChange={handleChange}
                  required
                />
            </div>
            <div>
                <label className="block text-secondary text-sm font-semibold mb-2">
                  Confirmar Senha
                </label>
                <input
                  name="confirmarSenha"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  onChange={handleChange}
                  required
                />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-4 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary-hover transition-all shadow-md transform active:scale-95"
          >
            Cadastrar
          </button>

        </form>

        <div className="text-center border-t border-gray-100 pt-6 space-y-4">
          <p className="text-tertiary text-sm">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Fazer Login
            </Link>
          </p>

           {/* Link pra voltar pra Home */}
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

export default Cadastro;