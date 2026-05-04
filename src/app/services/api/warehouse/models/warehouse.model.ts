export interface Warehouse {
  id:      number;
  name:    string;
  address: string;
  city:    string;
  country: string;
}

export interface CreateWarehouseRequest {
  name:    string;
  address: string;
  city:    string;
  country: string;
}

export interface UpdateWarehouseRequest {
  id:      number;
  name:    string;
  address: string;
  city:    string;
  country: string;
}
