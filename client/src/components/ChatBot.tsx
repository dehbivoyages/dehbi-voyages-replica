import { MessageCircle, X, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! 👋 Je suis l\'assistant Dehbi Voyages. Comment puis-je vous aider ?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const faqResponses: { [key: string]: string } = {
    'prix': 'Nos prix varient selon la destination et la saison. Les voyages commencent à partir de 7.690 MAD. Pour des tarifs précis, consultez la section "Voyages Organisés" ou contactez-nous directement.',
    'réservation': 'Vous pouvez réserver en cliquant sur le bouton "Réserver" en bas à gauche, ou en remplissant le formulaire de réservation dans la section "Voyages Organisés".',
    'documents': 'Pour les voyages internationaux, vous aurez besoin d\'un passeport valide. Pour les voyages religieux (Omra/Hajj), des documents supplémentaires peuvent être requis.',
    'annulation': 'Les conditions d\'annulation varient selon le type de voyage. Veuillez consulter les conditions générales ou contacter notre équipe pour plus de détails.',
    'groupe': 'Nous proposons des tarifs spéciaux pour les groupes. Contactez-nous pour discuter de votre projet de voyage en groupe.',
    'assurance': 'L\'assurance voyage est incluse dans tous nos packages. Elle couvre les annulations, les urgences médicales et les bagages.',
    'contact': 'Vous pouvez nous contacter via WhatsApp au +212 6 63 38 10 04, par email à Dehbivoyages23@gmail.com, ou en utilisant le bouton "Réserver".',
    'destinations': 'Nous proposons des voyages vers : Punta Cana, Turquie, Arabie Saoudite, et bien d\'autres destinations. Consultez notre section "Voyages Organisés" pour la liste complète.',
    'durée': 'Nos voyages durent généralement entre 8 et 15 jours. Consultez les détails de chaque voyage pour connaître la durée exacte.',
    'hébergement': 'Nous proposons des hébergements 3, 4 et 5 étoiles selon votre budget. Tous les hôtels sont sélectionnés pour leur qualité et leur confort.',
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Vérifier les mots-clés
    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Réponse par défaut
    return 'Merci pour votre question ! Pour une réponse plus détaillée, veuillez nous contacter via WhatsApp (+212 6 63 38 10 04) ou email (Dehbivoyages23@gmail.com). Notre équipe sera ravie de vous aider ! 😊';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simuler un délai de réponse
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 left-6 z-40 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center gap-2 font-semibold text-sm"
          title="Chat Assistant"
          style={{
            backgroundColor: '#00ff80',
            color: '#ff8000'
          }}
        >
          <MessageCircle size={20} />
          <span className="hidden sm:inline">Réserver</span>
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
            ?
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <div>
                <h3 className="font-semibold">Dehbi Assistant</h3>
                <p className="text-xs text-blue-100">En ligne 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-800 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ maxHeight: '400px' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-foreground border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                    {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-foreground border border-gray-200 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              💡 Posez des questions sur nos voyages, tarifs, réservations, etc.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
