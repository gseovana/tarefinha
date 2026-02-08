import { useState } from 'react';
import { toast } from 'react-toastify';

function Onboarding({ usuario, aoCriar, aoEntrar, republicaCriada, aoFinalizar }) {
  const [showModalCriar, setShowModalCriar] = useState(false);
  const [showModalEntrar, setShowModalEntrar] = useState(false);
  const [nomeRepublica, setNomeRepublica] = useState('');
  const [codigoAcesso, setCodigoAcesso] = useState('');

  function handleCriar(e) {
    e.preventDefault();
    aoCriar(nomeRepublica);
  }

  function handleEntrar(e) {
    e.preventDefault();
    aoEntrar(codigoAcesso, () => setShowModalEntrar(false));
  }

  function copiarCodigo() {
    if (republicaCriada?.codigo_acesso) {
      navigator.clipboard.writeText(republicaCriada.codigo_acesso);
      toast.success("Código copiado!");
    }
  }

  return (
    <div className="flex-grow bg-white pb-20 pt-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
          Olá, <span className="text-primary">{usuario?.nome.split(' ')[0]}</span>! 👋
        </h1>
        <p className="text-xl text-tertiary mb-12 max-w-2xl mx-auto">
          Notamos que você ainda não tem um lar configurado. <br/>
          Como você deseja começar sua jornada no Tarefinha?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* card criar */}
          <div onClick={() => setShowModalCriar(true)} className="group bg-surface p-10 rounded-3xl shadow-xl border-2 border-transparent hover:border-primary cursor-pointer transition-all hover:-translate-y-2">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">👑</div>
            <h2 className="text-2xl font-bold text-secondary mb-3">Fundar uma República</h2>
            <p className="text-gray-500 mb-6">Vou criar uma nova casa e ser o administrador.</p>
            <button className="px-6 py-2 bg-primary text-white font-bold rounded-full">Começar do Zero</button>
          </div>

          {/* card entrar */}
          <div onClick={() => setShowModalEntrar(true)} className="group bg-surface p-10 rounded-3xl shadow-xl border-2 border-transparent hover:border-secondary cursor-pointer transition-all hover:-translate-y-2">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🔑</div>
            <h2 className="text-2xl font-bold text-secondary mb-3">Já tenho um convite</h2>
            <p className="text-gray-500 mb-6">Alguém já criou a república e me passou um código.</p>
            <button className="px-6 py-2 bg-secondary text-white font-bold rounded-full">Digitar Código</button>
          </div>
        </div>
      </div>

      {/* --- MODAL CRIAR --- */}
      {showModalCriar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            
            {!republicaCriada ? (
              // ESTADO 1: FORMULÁRIO
              <>
                <h3 className="text-2xl font-bold text-secondary mb-4">Nome da República</h3>
                <form onSubmit={handleCriar}>
                  <input autoFocus type="text" placeholder="Ex: QG dos Devs" className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-6"
                    value={nomeRepublica} onChange={(e) => setNomeRepublica(e.target.value)} required />
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setShowModalCriar(false)} className="px-4 py-2 text-gray-500 font-bold">Cancelar</button>
                    <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg">Criar Agora</button>
                  </div>
                </form>
              </>
            ) : (
              // ESTADO 2: SUCESSO 
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
                <h3 className="text-2xl font-bold text-secondary mb-2">República Criada!</h3>
                <p className="text-gray-500 mb-6 text-sm">Compartilhe este código com os moradores:</p>
                
                <div className="bg-gray-100 p-6 rounded-xl border-2 border-dashed border-gray-300 mb-6">
                    <p className="text-4xl font-mono font-bold text-primary tracking-wider select-all">{republicaCriada.codigo_acesso}</p>
                </div>
                
                <div className="flex flex-col gap-3">
                    <button onClick={copiarCodigo} className="w-full py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500">Copiar Código</button>
                    <button onClick={aoFinalizar} className="w-full py-3 bg-secondary text-white font-bold rounded-lg">Ir para minhas tarefas →</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- MODAL ENTRAR --- */}
      {showModalEntrar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-secondary mb-4">Código de Acesso</h3>
            <form onSubmit={handleEntrar}>
              <input autoFocus type="text" placeholder="Ex: X7K9MP" className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-6 uppercase text-center font-mono tracking-widest"
                value={codigoAcesso} onChange={(e) => setCodigoAcesso(e.target.value.toUpperCase())} required maxLength={6}/>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowModalEntrar(false)} className="px-4 py-2 text-gray-500 font-bold">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-secondary text-white font-bold rounded-lg">Entrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Onboarding;