export interface WarehouseStatus {
  warehouseId:   number;
  warehouseName: string;
  totalItems:    number;
}

export interface DashboardItem {
  id:       number;
  name:     string;
  quantity: number;
}
