import { Topbar } from "../components/Topbar";
import { ShoppingBag, Truck, CheckCircle } from "lucide-react";

export function Procurement() {
  return (
    <>
      <Topbar title="Procurement" subtitle="Satın alma ve tedarikçi yönetimi" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Açık PO</p>
                <h3 className="text-2xl text-foreground">24</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Transit</p>
                <h3 className="text-2xl text-foreground">8.450 KG</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Teslim Edildi</p>
                <h3 className="text-2xl text-foreground">156</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-foreground mb-2">Procurement Modülü</h4>
          <p className="text-sm text-muted-foreground">
            Satın alma siparişleri, tedarikçi performansı ve sipariş takibi buraya gelecek.
          </p>
        </div>
      </div>
    </>
  );
}
