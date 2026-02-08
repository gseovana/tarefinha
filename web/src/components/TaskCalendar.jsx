import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function TaskCalendar({ tarefas, currentDate, setCurrentDate, onEdit }) {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    const renderTasksForDay = (day) => {
        const daysTasks = tarefas.filter(t => isSameDay(parseISO(t.prazo), day));
        return (
            <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[60px] scrollbar-hide">
                {daysTasks.map(t => (
                    <div 
                        key={t.id_tarefa} 
                        onClick={(e) => { e.stopPropagation(); onEdit(t); }}
                        className={`text-[10px] px-1 py-0.5 rounded truncate cursor-pointer border-l-2
                            ${t.status ? 'bg-green-100 text-green-700 border-green-500 line-through opacity-60' : 
                              t.isProjecao ? 'bg-purple-50 text-purple-700 border-purple-300' : 
                              'bg-blue-50 text-blue-700 border-blue-500 font-bold shadow-sm'}
                        `}
                        title={t.titulo}
                    >
                        {t.titulo}
                    </div>
                ))}
            </div>
        )
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
            {/* Header do Calendário */}
            <div className="flex justify-between items-center p-4 border-b">
                <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2 hover:bg-gray-100 rounded-full">‹</button>
                <h2 className="text-lg font-bold capitalize text-gray-700">
                    {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                </h2>
                <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2 hover:bg-gray-100 rounded-full">›</button>
            </div>
            
            {/* Dias da Semana */}
            <div className="grid grid-cols-7 bg-gray-50 border-b">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                    <div key={d} className="py-2 text-center text-xs font-bold text-gray-400 uppercase">{d}</div>
                ))}
            </div>

            {/* Grade de Dias */}
            <div className="grid grid-cols-7">
                {allDays.map((dayItem, i) => {
                    const isCurrentMonth = isSameMonth(dayItem, monthStart);
                    return (
                        <div 
                            key={i} 
                            className={`min-h-[100px] border-b border-r p-2 transition hover:bg-gray-50 
                                ${!isCurrentMonth ? 'bg-gray-50/50 text-gray-300' : 'bg-white'}
                                ${isToday(dayItem) ? 'bg-blue-50/30' : ''}
                            `}
                        >
                            <div className="flex justify-between items-start">
                                <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday(dayItem) ? 'bg-blue-600 text-white' : ''}`}>
                                    {format(dayItem, 'd')}
                                </span>
                            </div>
                            {renderTasksForDay(dayItem)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TaskCalendar;