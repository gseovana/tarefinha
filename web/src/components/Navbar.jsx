import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // verifica se o usuário está logado
  const usuarioLogado = localStorage.getItem('usuario');
  const usuarioObj = usuarioLogado ? JSON.parse(usuarioLogado) : null;

  function handleLogout() {
    localStorage.clear(); // limpa token e dados
    navigate('/'); // manda pra home
    window.location.reload(); // recarrega pra atualizar a navbar e limpar estados
  }

  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-secondary text-white shadow-md z-50 relative">
      
      {/* 1. LOGO */}
      <Link 
        to={usuarioObj ? "/dashboard" : "/"} 
        className="text-2xl font-bold tracking-tighter hover:opacity-90 transition"
      >
        Tarefinha<span className="text-primary">.</span>
      </Link>

      {/* 2. LINKS DO MEIO */}
      <div className="space-x-6 hidden md:block text-sm font-medium text-gray-300">
        {!usuarioObj ? (
          // --- VERSÃO VISITANTE ---
          location.pathname === '/' && (
            <>
              <a href="#sobre" className="hover:text-primary transition">Sobre</a>
              <a href="#funcionalidades" className="hover:text-primary transition">Funcionalidades</a>
              <a href="#quem-somos" className="hover:text-primary transition">Quem Somos</a>
            </>
          )
        ) : (
          // --- VERSÃO LOGADA (APP) ---
          <>
            <Link to="/dashboard" className={`transition ${location.pathname === '/dashboard' ? 'text-white font-bold' : 'hover:text-primary'}`}>
                Dashboard
            </Link>
          </>
        )}
      </div>

      {/* 3. ÁREA DO USUÁRIO */}
      <div>
        {!usuarioObj ? (
          // botão de login (visitante)
          <Link to="/login" className="px-6 py-2 bg-primary text-white font-bold rounded-full hover:bg-primary-hover transition shadow-lg transform active:scale-95">
            Login
          </Link>
        ) : (
          // area de perfil (logado)
          <div className="flex items-center gap-4">
            
            {/* LINK PARA O PERFIL */}
            <Link to="/perfil" className="flex items-center gap-3 hover:bg-white/10 pr-4 pl-1 py-1 rounded-full transition group">
               {/* avatarzinho com a inicial */}
               <div className="w-9 h-9 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 border-secondary group-hover:border-white transition shadow-sm">
                  {usuarioObj.nome ? usuarioObj.nome.substring(0,1).toUpperCase() : '?'}
               </div>
               
               <div className="text-left hidden sm:block">
                  <span className="block text-[10px] text-gray-400 leading-none uppercase tracking-wider mb-0.5">Olá,</span>
                  <span className="block text-sm font-bold text-white leading-none group-hover:text-primary transition">
                      {usuarioObj.nome.split(' ')[0]}
                  </span>
               </div>
            </Link>

            {/* BOTÃO SAIR */}
            <button 
              onClick={handleLogout} 
              className="ml-2 text-gray-500 hover:text-red-400 transition p-2 rounded-full hover:bg-white/5"
              title="Sair do Tarefinha"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;