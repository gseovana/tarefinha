import { useState, useEffect, useRef } from 'react';

// --- ÍCONES ---
const IconCrown = () => <span className="text-lg">👑</span>;
const IconChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
const IconKick = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" /></svg>;
const IconPromote = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>;

function MemberCard({ membro, isLider, usuarioLogadoId, onRemover, onPromover, onAlterarPapel }) {
    const isMembroLider = membro.papel === 'LIDER';
    const isEuMesmo = membro.id_usuario === usuarioLogadoId;
    
    const [menuAberto, setMenuAberto] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [novoPapelSelecionado, setNovoPapelSelecionado] = useState('');
    
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleSelectOption(papel) {
        setNovoPapelSelecionado(papel);
        setMenuAberto(false);
        setModalAberto(true); 
    }

    function confirmarMudanca() {
        onAlterarPapel(membro, novoPapelSelecionado);
        setModalAberto(false);
    }

    const papeisDisponiveis = ["MEMBRO", "CALOURO", "DECANO", "AGREGADO"];

    return (
        <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center relative group hover:shadow-md transition z-0">
                
                {/* FOTO */}
                <div className="relative mb-4 flex justify-center items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gray-200 overflow-hidden flex items-center justify-center">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${membro.nome}&background=random&size=128`} 
                            alt={membro.nome} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {isMembroLider && (
                        <div className="absolute -bottom-1 -right-1 bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10" title="Líder da República">
                            <IconCrown />
                        </div>
                    )}
                </div>

                {/* NOME */}
                <h3 className="font-bold text-lg text-secondary mb-1 text-center">
                    {isEuMesmo ? `${membro.nome} (Você)` : membro.nome}
                </h3>
                
                {/* --- SELETOR DE PAPEL --- */}
                {isLider && !isMembroLider && !isEuMesmo ? (
                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={() => setMenuAberto(!menuAberto)}
                            className="flex items-center gap-1 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                        >
                            {membro.papel}
                            <IconChevronDown />
                        </button>

                        {/* O Menu Flutuante (Dropdown) */}
                        {menuAberto && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                                {papeisDisponiveis.map((papel) => (
                                    <button
                                        key={papel}
                                        onClick={() => handleSelectOption(papel)}
                                        className={`w-full text-left px-4 py-2 text-xs font-bold uppercase hover:bg-orange-50 hover:text-primary transition ${membro.papel === papel ? 'text-primary bg-orange-50/50' : 'text-gray-500'}`}
                                    >
                                        {papel}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${isMembroLider ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                        {membro.papel}
                    </span>
                )}

                {/* AÇÕES DE LÍDER (Hover) */}
                {isLider && !isEuMesmo && (
                    <div className="mt-6 w-full flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onPromover(membro)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-xs font-bold transition" title="Tornar Líder">
                            <IconPromote /> Líder
                        </button>
                        <button onClick={() => onRemover(membro)} className="w-10 flex items-center justify-center py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition" title="Expulsar">
                            <IconKick />
                        </button>
                    </div>
                )}
            </div>

            {/* --- MODAL DE CONFIRMAÇÃO (Portal) --- */}
            {modalAberto && (
                <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-orange-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                🏷️
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Alterar Papel?</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Você vai mudar <strong>{membro.nome}</strong> de <span className="line-through text-gray-400">{membro.papel}</span> para <strong className="text-primary">{novoPapelSelecionado}</strong>.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={() => setModalAberto(false)}
                                className="flex-1 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirmarMudanca}
                                className="flex-1 py-2.5 rounded-xl font-bold bg-primary text-white shadow-lg shadow-orange-200 hover:bg-primary-hover hover:scale-[1.02] transition transform"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MemberCard;