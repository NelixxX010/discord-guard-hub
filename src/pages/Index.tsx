import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, AlertTriangle, UserX, Ban, Send } from "lucide-react";
import { toast } from "sonner";

interface ModEvent {
  userId: string;
  guildId: string;
  username: string;
  avatar: string;
  guild: string;
  message: string;
  timestamp: number;
}

const Index = () => {
  const [token, setToken] = useState("");
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<ModEvent[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    if (connected) {
      const mockEvents: ModEvent[] = [
        {
          userId: "1",
          guildId: "1",
          username: "User123",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User123",
          guild: "Gaming Community",
          message: "Comportement inapproprié dans le salon général",
          timestamp: Date.now(),
        },
        {
          userId: "2",
          guildId: "1",
          username: "PlayerTwo",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlayerTwo",
          guild: "Tech Server",
          message: "Spam de liens non autorisés",
          timestamp: Date.now() - 1000,
        },
        {
          userId: "3",
          guildId: "2",
          username: "Moderator99",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moderator99",
          guild: "Creative Hub",
          message: "Propos toxiques envers d'autres membres",
          timestamp: Date.now() - 2000,
        },
      ];
      setEvents(mockEvents);
    }
  }, [connected]);

  const handleConnect = () => {
    if (!token.trim()) {
      toast.error("Veuillez entrer un token valide");
      return;
    }
    setConnected(true);
    toast.success("Connecté au bot Discord avec succès!");
  };

  const handleAction = (type: string, username: string) => {
    const actionLabels = {
      warn: "Avertissement envoyé",
      kick: "Utilisateur expulsé",
      ban: "Utilisateur banni",
      dm: "Message privé envoyé",
    };
    toast.success(`${actionLabels[type as keyof typeof actionLabels]} à ${username}`);
  };

  return (
    <div className="min-h-screen bg-background p-6 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-hero opacity-50 pointer-events-none" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-card/50 backdrop-blur-sm rounded-full border border-border/50">
            <Shield className="w-8 h-8 text-primary animate-glow" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dashboard Modération Discord
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Gérez vos serveurs Discord en temps réel</p>
        </div>

        {/* Connection Card */}
        {!connected && (
          <Card className="max-w-2xl mx-auto p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-card animate-scale-in">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Token du Bot Discord
                </label>
                <Input
                  type="password"
                  placeholder="Entrez votre token de bot..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300"
                  onKeyPress={(e) => e.key === "Enter" && handleConnect()}
                />
              </div>
              <Button
                onClick={handleConnect}
                className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow"
                size="lg"
              >
                <Shield className="mr-2 h-5 w-5" />
                Se Connecter
              </Button>
            </div>
          </Card>
        )}

        {/* Events Grid */}
        {connected && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {events.map((event, index) => (
              <Card
                key={`${event.userId}-${event.timestamp}`}
                className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 space-y-4">
                  {/* User Header */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                      <AvatarImage src={event.avatar} />
                      <AvatarFallback>{event.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{event.username}</h3>
                      <p className="text-sm text-muted-foreground">{event.guild}</p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-secondary/50 rounded-lg p-3 border border-border/30">
                    <p className="text-sm text-foreground leading-relaxed">{event.message}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction("warn", event.username)}
                      className="bg-warning/10 border-warning/30 hover:bg-warning hover:text-warning-foreground transition-all duration-300 group"
                    >
                      <AlertTriangle className="mr-1 h-4 w-4 group-hover:animate-pulse" />
                      Warn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction("kick", event.username)}
                      className="bg-kick/10 border-kick/30 hover:bg-kick hover:text-kick-foreground transition-all duration-300 group"
                    >
                      <UserX className="mr-1 h-4 w-4 group-hover:animate-pulse" />
                      Kick
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction("ban", event.username)}
                      className="bg-destructive/10 border-destructive/30 hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 group"
                    >
                      <Ban className="mr-1 h-4 w-4 group-hover:animate-pulse" />
                      Ban
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction("dm", event.username)}
                      className="bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                    >
                      <Send className="mr-1 h-4 w-4 group-hover:animate-pulse" />
                      DM
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {connected && events.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-xl text-muted-foreground">Aucun événement à modérer pour le moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
