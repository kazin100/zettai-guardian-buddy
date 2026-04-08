import { BarChart3, Users, ScanSearch, Bot, ShieldAlert, MapPin } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const monthlyData = [
  { month: "Fev", acessos: 320, scans: 45, chats: 120 },
  { month: "Mar", acessos: 580, scans: 89, chats: 210 },
  { month: "Abr", acessos: 890, scans: 156, chats: 340 },
  { month: "Mai", acessos: 1240, scans: 220, chats: 480 },
  { month: "Jun", acessos: 1650, scans: 310, chats: 620 },
];

const vulnData = [
  { name: "HTTPS ausente", value: 35 },
  { name: "Headers faltando", value: 45 },
  { name: "Servidor exposto", value: 15 },
  { name: "Páginas sensíveis", value: 5 },
];

const COLORS = ["hsl(160,100%,45%)", "hsl(200,100%,50%)", "hsl(40,100%,50%)", "hsl(0,80%,55%)"];

const regionData = [
  { region: "SP", users: 480 },
  { region: "RJ", users: 320 },
  { region: "MG", users: 190 },
  { region: "BA", users: 140 },
  { region: "PR", users: 120 },
  { region: "RS", users: 95 },
];

const stats = [
  { icon: Users, label: "Total de Acessos", value: "4,680", change: "+32%" },
  { icon: ScanSearch, label: "Análises Realizadas", value: "820", change: "+28%" },
  { icon: Bot, label: "Interações do Chat", value: "1,770", change: "+45%" },
  { icon: ShieldAlert, label: "Vulnerabilidades", value: "312", change: "-12%" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient-cyber">Dashboard</span> Analítico
            </h1>
            <p className="text-muted-foreground text-sm">Dados de Fevereiro a Junho de 2026</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="card-cyber p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  <span className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Area chart */}
            <div className="card-cyber p-6">
              <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" /> Crescimento Mensal
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorAcessos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160,100%,45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(160,100%,45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,15%)" />
                  <XAxis dataKey="month" stroke="hsl(220,10%,40%)" fontSize={12} />
                  <YAxis stroke="hsl(220,10%,40%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(220,18%,7%)", border: "1px solid hsl(160,30%,15%)", borderRadius: "8px", fontSize: 12 }} />
                  <Area type="monotone" dataKey="acessos" stroke="hsl(160,100%,45%)" fillOpacity={1} fill="url(#colorAcessos)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pie chart */}
            <div className="card-cyber p-6">
              <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-primary" /> Vulnerabilidades por Tipo
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={vulnData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                    {vulnData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(220,18%,7%)", border: "1px solid hsl(160,30%,15%)", borderRadius: "8px", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar chart - Chatbot vs Scans */}
            <div className="card-cyber p-6">
              <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" /> Chatbot vs Scanner (mensal)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,15%)" />
                  <XAxis dataKey="month" stroke="hsl(220,10%,40%)" fontSize={12} />
                  <YAxis stroke="hsl(220,10%,40%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(220,18%,7%)", border: "1px solid hsl(160,30%,15%)", borderRadius: "8px", fontSize: 12 }} />
                  <Bar dataKey="chats" fill="hsl(160,100%,45%)" radius={[4, 4, 0, 0]} name="Chatbot" />
                  <Bar dataKey="scans" fill="hsl(200,100%,50%)" radius={[4, 4, 0, 0]} name="Scanner" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Region chart */}
            <div className="card-cyber p-6">
              <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Usuários por Região
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={regionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,15%)" />
                  <XAxis type="number" stroke="hsl(220,10%,40%)" fontSize={12} />
                  <YAxis dataKey="region" type="category" stroke="hsl(220,10%,40%)" fontSize={12} width={30} />
                  <Tooltip contentStyle={{ background: "hsl(220,18%,7%)", border: "1px solid hsl(160,30%,15%)", borderRadius: "8px", fontSize: 12 }} />
                  <Bar dataKey="users" fill="hsl(160,100%,45%)" radius={[0, 4, 4, 0]} name="Usuários" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Dashboard;
