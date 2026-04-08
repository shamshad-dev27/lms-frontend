// components/DoubtSolver.jsx
import { useState, useRef, useEffect } from 'react';
import axiosInstance from "../../Helper/axiosInstance";

function DoubtSolver({ courseTitle, lectureTitle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

useEffect(() => {
    setMessages([
        { role: 'assistant', content: `Namaste! 👋 ${lectureTitle} ke baare mein koi bhi doubt poochho!` }
    ]);
}, [lectureTitle]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;
        const userMsg = { role: 'user', content: input };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setInput('');
        setLoading(true);
        try {
            const { data } = await axiosInstance.post('/doubt/ask', {
                messages: updated,
                courseContext: courseTitle,
            });
            setMessages([...updated, { role: 'assistant', content: data.reply }]);
        } catch {
            setMessages([...updated, { role: 'assistant', content: 'Error aa gaya, dobara try karo.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-22 right-6 z-50 flex flex-col items-end gap-3">

            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 sm:w-96 h-[28rem] bg-[#1e1e2e] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-yellow-500/30">

                    {/* Header */}
                    <div className="bg-yellow-500 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🤖</span>
                            <div>
                                <p className="font-bold text-black text-sm">AI Doubt Solver</p>
                                <p className="text-black/70 text-xs truncate max-w-[180px]">{courseTitle}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-black font-bold text-lg hover:scale-110 transition-transform"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed
                                    ${msg.role === 'user'
                                        ? 'bg-yellow-500 text-black rounded-br-none font-medium'
                                        : 'bg-[#2a2a3e] text-white rounded-bl-none border border-white/10'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-[#2a2a3e] text-white px-4 py-2 rounded-2xl rounded-bl-none text-sm border border-white/10">
                                    <span className="animate-pulse">AI soch raha hai... ⏳</span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-white/10 flex gap-2">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Doubt poochho..."
                            className="flex-1 bg-[#2a2a3e] text-white text-sm rounded-xl px-3 py-2 outline-none border border-white/10 focus:border-yellow-500/50 placeholder-white/30 transition-colors"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-bold px-4 py-2 rounded-xl text-sm transition-all hover:scale-105 active:scale-95"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full shadow-lg hover:shadow-yellow-500/40 flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
                title="Doubt Poochho"
            >
                {isOpen ? '✕' : '🤖'}
            </button>
        </div>
    );
}

export default DoubtSolver;