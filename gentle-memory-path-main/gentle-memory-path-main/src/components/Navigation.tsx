import { Users, MessageCircle, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const sections = [
    { id: "gallery", label: "My People", icon: Users },
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "location", label: "Where Am I", icon: MapPin },
    { id: "caregiver", label: "Caregiver", icon: User },
  ];

  return (
    <nav className="bg-gentle border-b border-gentle-foreground/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-warm rounded-full flex items-center justify-center">
              <span className="text-warm-foreground font-bold text-sm">❤️</span>
            </div>
            <h1 className="text-xl font-semibold text-gentle-foreground">Memory Companion</h1>
          </div>
          
          <div className="flex space-x-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "ghost"}
                onClick={() => onSectionChange(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === id
                    ? "bg-warm text-warm-foreground shadow-sm"
                    : "text-gentle-foreground hover:bg-gentle-foreground/5"
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline text-sm font-medium">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;