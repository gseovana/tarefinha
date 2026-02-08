import { Link } from 'react-router-dom';
import dashboardPreview from '../assets/dashboard-preview.png'; 

function Home() {
  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-primary selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <header className="bg-gradient-to-br from-secondary via-gray-900 to-secondary text-white px-6 pt-12 pb-24 md:pt-5 md:pb-55 relative overflow-hidden">
        
        {/* Elementos decorativos de fundo (Blobs) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary opacity-10 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 mb-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm text-sm font-medium text-orange-200 uppercase tracking-wider">
              ✨ Gestão de Repúblicas Simplificada
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
              Menos confusão, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">
                mais organização.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Ferramenta simples para dividir tarefas. O fim das brigas por louça suja começa aqui.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/cadastro" 
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl text-center hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 transform hover:-translate-y-1 hover:scale-105"
              >
                Junte-se a nós
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl text-center hover:bg-white hover:text-secondary transition-all transform hover:-translate-y-1"
              >
                Já tenho cadastro
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-primary opacity-20 blur-3xl rounded-full transform translate-y-10"></div>
                
                <img 
                  src={dashboardPreview} 
                  alt="Prévia do Dashboard Tarefinha" 
                  className="relative w-full max-w-xl rounded-xl shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 scale-110 transition duration-500"
                />
            </div>
          </div>

        </div>
      </header>

      {/* --- FUNCIONALIDADES --- */}
      <section id="funcionalidades" className="py-24 px-6 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Por que usar o Tarefinha?</h2>
            <p className="text-gray-500 text-lg">Organizar a casa não precisa ser difícil. Funcionalidades pensadas para a realidade de quem divide teto.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                ⚖️
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Distribuição Justa</h3>
              <p className="text-gray-500 leading-relaxed">
                Evita que sempre as mesmas pessoas façam tudo e garante uma divisão equilibrada das tarefas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                💬
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Menos Conflitos</h3>
              <p className="text-gray-500 leading-relaxed">
                Com tudo registrado de forma clara, mal entendidos diminuem e a convivência fica mais leve.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                📍
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Centralizado</h3>
              <p className="text-gray-500 leading-relaxed">
                As tarefas ficam acessíveis para todos, facilitando o planejamento da rotina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOBRE --- */}
      <section id="autora" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          
          <div className="md:w-1/3 relative">
            <div className="absolute top-4 -left-4 w-full h-full rounded-3xl border-2 border-primary border-dashed"></div>
            <div className="relative w-full aspect-square rounded-3xl bg-gray-100 overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-500">
                <img 
                  src="https://avatars.githubusercontent.com/gseovana" 
                  alt="Geovana" 
                  className="w-full h-full object-cover"
                />
            </div>
          </div>

          <div className="md:w-2/3 text-center md:text-left">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Sobre a Criadora</span>
            <h2 className="text-4xl font-bold text-secondary mb-6">Olá, eu sou a Geovana! 👋</h2>
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              O <strong>Tarefinha</strong> nasceu de uma dor real: a pia cheia de louça e a pergunta eterna de "de quem é a vez?". 
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Estudante de Sistemas de Informação, desenvolvi este projeto como um Trabalho de Web 1, unindo a necessidade de organizar minha própria república com o desafio de criar uma solução útil e intuitiva.
            </p>
            
            <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://github.com/gseovana" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-900 transition flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Github
                </a>
                <a href="https://www.linkedin.com/in/gseovana/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    Linkedin
                </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;