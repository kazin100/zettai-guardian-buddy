import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, MessageSquare, Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! Sou o assistente de segurança da **Zettai Security**. Como posso ajudar a proteger seu e-commerce?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { profile, isPremium, decrementMessages, upgradeToPremium } = useProfile();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const canSendMessage = isPremium || (profile?.mensagens_restantes ?? 0) > 0;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (!user) {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Você precisa estar **logado** para usar o chatbot." }]);
      return;
    }

    if (!canSendMessage) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Decrement for non-premium users
    if (!isPremium) {
      await decrementMessages();
    }

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Falha na conexão");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Desculpe, houve um erro ao processar sua mensagem. Tente novamente." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async () => {
    await upgradeToPremium();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "🎉 **Parabéns!** Você agora é um usuário **Premium**! Aproveite o chatbot ilimitado." },
    ]);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-cyber flex items-center justify-center shadow-lg animate-pulse-glow hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="h-6 w-6 text-primary-foreground" /> : <MessageSquare className="h-6 w-6 text-primary-foreground" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh] card-cyber flex flex-col overflow-hidden border-glow">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-gradient-cyber">
            <Bot className="h-6 w-6 text-primary-foreground" />
            <div className="flex-1">
              <h3 className="font-semibold text-primary-foreground text-sm">Zettai AI</h3>
              <p className="text-xs text-primary-foreground/70">Especialista em segurança</p>
            </div>
            {user && profile && (
              <span className="text-xs text-primary-foreground/80 flex items-center gap-1">
                {isPremium ? (
                  <><Crown className="h-3 w-3" /> Premium</>
                ) : (
                  <>{profile.mensagens_restantes}/3</>
                )}
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary/20 text-foreground border border-primary/30"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none [&>p]:m-0">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-lg px-3 py-2 text-sm text-muted-foreground">
                  <span className="animate-pulse">Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Limit reached banner */}
          {user && !canSendMessage && !isPremium && (
            <div className="px-4 py-3 border-t border-border bg-card/80 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 text-primary" />
                <span>Limite diário atingido (3/3 mensagens)</span>
              </div>
              <Button variant="cyber" size="sm" className="w-full gap-2" onClick={handleUpgrade}>
                <Crown className="h-4 w-4" /> Tornar-se Premium
              </Button>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={canSendMessage ? "Pergunte sobre segurança..." : "Limite diário atingido"}
                disabled={!canSendMessage && !!user}
                className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 disabled:opacity-50"
              />
              <Button variant="cyber" size="icon" onClick={sendMessage} disabled={isLoading || (!canSendMessage && !!user)}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
