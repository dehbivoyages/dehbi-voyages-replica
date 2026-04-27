import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'user' | 'bot'; timestamp: Date }[]>([
    {
      id: '1',
      text: 'Bonjour! 👋 Bienvenue chez Dehbi Voyages. Comment puis-je vous aider aujourd\'hui?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: 'Merci pour votre message! Notre équipe vous répondra dans les plus brefs délais. Vous pouvez aussi nous contacter directement via WhatsApp ou Gmail.',
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickReply = (message: string) => {
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: 'Excellent choix! Veuillez cliquer sur le bouton "Réserver" pour commencer votre réservation ou contactez-nous directement.',
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
        title="Chat en direct"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-40 w-96 bg-white rounded-lg shadow-2xl flex flex-col max-h-96">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold">Chat Dehbi Voyages</h3>
              <p className="text-sm text-blue-100">En ligne</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 space-y-2 border-t">
            <button
              onClick={() => handleQuickReply('Je veux réserver un voyage')}
              className="w-full text-left text-sm bg-blue-50 hover:bg-blue-100 p-2 rounded text-blue-600 transition"
            >
              📅 Je veux réserver un voyage
            </button>
            <button
              onClick={() => handleQuickReply('Quels sont vos tarifs?')}
              className="w-full text-left text-sm bg-blue-50 hover:bg-blue-100 p-2 rounded text-blue-600 transition"
            >
              💰 Quels sont vos tarifs?
            </button>
            <button
              onClick={() => handleQuickReply('Je veux plus d\'informations')}
              className="w-full text-left text-sm bg-blue-50 hover:bg-blue-100 p-2 rounded text-blue-600 transition"
            >
              ℹ️ Plus d'informations
            </button>
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Votre message..."
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 transition"
            >
              <Send size={18} />
            </button>
          </div>

          {/* Contact Info */}
          <div className="px-4 py-3 border-t bg-gray-50 rounded-b-lg space-y-2 text-sm">
            <p className="font-semibold text-gray-700">Contactez-nous directement :</p>
            <div className="flex gap-2">
              <a
                href="https://wa.me/212653940304"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded text-center flex items-center justify-center gap-1 transition"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href="mailto:Dehbivoyages23@gmail.com"
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded text-center flex items-center justify-center gap-1 transition"
              >
                <Mail size={16} /> Email
              </a>
            </div>
            <a
              href="tel:+212653940304"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center flex items-center justify-center gap-1 transition"
            >
              <Phone size={16} /> Appeler
            </a>
          </div>
        </div>
      )}
    </>
  );
}
