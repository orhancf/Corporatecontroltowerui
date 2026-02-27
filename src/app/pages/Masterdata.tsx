import { Topbar } from "../components/Topbar";
import { Database, Package, Users, MapPin } from "lucide-react";

export function Masterdata() {
  return (
    <>
      <Topbar title="Masterdata" subtitle="Ana veri yönetimi ve katalog" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ürün Kataloğu</p>
                <h3 className="text-2xl text-foreground">342</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tedarikçiler</p>
                <h3 className="text-2xl text-foreground">28</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Lokasyonlar</p>
                <h3 className="text-2xl text-foreground">6</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Toplam Kayıt</p>
                <h3 className="text-2xl text-foreground">1.248</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-foreground mb-2">Masterdata Modülü</h4>
          <p className="text-sm text-muted-foreground">
            Ürün kataloğu, tedarikçi bilgileri, lokasyon yönetimi ve ana veri düzenleme araçları buraya gelecek.
          </p>
        </div>
      </div>
    </>
  );
}
