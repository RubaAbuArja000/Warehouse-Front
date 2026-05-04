export interface WarehouseItem {
  id:            number;
  itemName:      string;
  skuCode?:      string;
  quantity:      number;
  costPrice:     number;
  msrpPrice?:    number;
  warehouseId:   number;
  warehouseName: string;
}

export interface CreateWarehouseItemRequest {
  itemName:    string;
  skuCode?:    string;
  quantity:    number;
  costPrice:   number;
  msrpPrice?:  number;
  warehouseId: number;
}
