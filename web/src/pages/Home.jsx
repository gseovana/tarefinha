import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="font-sans text-secondary">
      
      

      {/* --- HERO SECTION --- [Baseado na img 1.jpg] */}
      <header className="bg-secondary text-white px-8 py-20 md:py-32 text-center md:text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Menos confusão, <br/>
              <span className="text-primary">mais organização.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Ferramentas simples para dividir, acompanhar e cumprir tarefas domésticas. A harmonia da sua república começa aqui.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link to="/cadastro" className="px-8 py-4 bg-primary text-white font-bold rounded-lg text-center hover:bg-primary-hover transition shadow-xl transform hover:-translate-y-1">
                Junte-se a nós!
              </Link>
              <Link to="/login" className="px-8 py-4 border border-gray-500 text-white font-bold rounded-lg text-center hover:bg-white hover:text-secondary transition">
                Já tenho conta
              </Link>
            </div>
          </div>
          {/* colocaar uma imagem aqui. pensnado ainda... */}
          <div className="hidden md:flex justify-center">
             <div className="w-full max-w-md h-96 bg-gray-800 rounded-2xl border-4 border-gray-700 shadow-2xl flex items-center justify-center">
                <span className="text-gray-500">Imagem do Dashboard</span>
             </div>
          </div>
        </div>
      </header>

      {/* --- FUNCIONALIDADES ---*/}
      <section id="funcionalidades" className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-secondary">Por que usar o Tarefinha?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-primary hover:scale-105 transition duration-300">
              <div className="text-4xl mb-4 text-primary">⚖️</div>
              <h3 className="text-xl font-bold mb-4">Distribuição Justa</h3>
              <p className="text-gray-600 leading-relaxed">
                Evita que sempre as mesmas pessoas façam tudo. O sistema garante uma divisão equilibrada das tarefas.
              </p>
            </div>

            {/* card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-primary hover:scale-105 transition duration-300">
              <div className="text-4xl mb-4 text-primary">💬</div>
              <h3 className="text-xl font-bold mb-4">Menos Conflitos</h3>
              <p className="text-gray-600 leading-relaxed">
                Com tudo registrado de forma clara, mal-entendidos diminuem e a convivência fica mais tranquila.
              </p>
            </div>

            {/* card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-primary hover:scale-105 transition duration-300">
              <div className="text-4xl mb-4 text-primary">📍</div>
              <h3 className="text-xl font-bold mb-4">Tudo em um só lugar</h3>
              <p className="text-gray-600 leading-relaxed">
                As tarefas ficam centralizadas e acessíveis para todos, facilitando o planejamento da rotina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOBRE / QUEM SOU ---*/}
      <section id="sobre" className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-gray-200 overflow-hidden shadow-xl border-4 border-primary">
                <img 
                  src="https://avatars.githubusercontent.com/gseovana" 
                  alt="Geovana" 
                  className="w-full h-full object-cover"
                />
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-secondary mb-6">Quem sou</h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              O projeto foi criado por <strong>Geovana</strong>, estudante de Sistemas de Informação, a partir de uma situação bem comum no dia a dia de quem mora em república.
            </p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Mesmo não sendo minha área favorita, a proposta surgiu da vontade de transformar um problema real da própria casa em uma solução prática. Este projeto nasceu como um Trabalho de Web 1.
            </p>
            
            <div className="flex gap-4 mt-8">
                <a href="https://github.com/gseovana" className="text-secondary font-bold hover:text-primary transition">Github</a>
                <span className="text-gray-300">|</span>
                <a href="https://www.linkedin.com/in/gseovana/" className="text-secondary font-bold hover:text-primary transition">Linkedin</a>
                <span className="text-gray-300"></span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;