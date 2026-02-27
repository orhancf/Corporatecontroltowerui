import { Topbar } from "../components/Topbar";
import { LineChart, Target, TrendingUp, Activity } from "lucide-react";

export function IBP() {
  return (
    <>
      <Topbar title="IBP" subtitle="Integrated Business Planning" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <LineChart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">S&OP Döngüsü</p>
                <h3 className="text-2xl text-foreground">W11</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Plan Uyumu</p>
                <h3 className="text-2xl text-foreground">92.1%</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Büyüme Hedefi</p>
                <h3 className="text-2xl text-foreground">+8.5%</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Senaryo Sayısı</p>
                <h3 className="text-2xl text-foreground">5</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-foreground mb-2">IBP Modülü</h4>
          <p className="text-sm text-muted-foreground">
            Integrated Business Planning, S&OP süreçleri, senaryo analizi ve stratejik planlama araçları buraya gelecek.
          </p>
        </div>
      </div>
    </>
  );
}
