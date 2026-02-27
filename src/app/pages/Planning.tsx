import { Topbar } from "../components/Topbar";
import { Calendar, TrendingUp, BarChart3 } from "lucide-react";

export function Planning() {
  return (
    <>
      <Topbar title="Planning" subtitle="Talep planlaması ve tahminleme" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Haftalık Plan</p>
                <h3 className="text-2xl text-foreground">W11-W14</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Talep Trendi</p>
                <h3 className="text-2xl text-foreground">+12.4%</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Forecast Accuracy</p>
                <h3 className="text-2xl text-foreground">84.2%</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-foreground mb-2">Planning Modülü</h4>
          <p className="text-sm text-muted-foreground">
            Talep planlaması, tahminleme ve kapasite planlama araçları buraya gelecek.
          </p>
        </div>
      </div>
    </>
  );
}
