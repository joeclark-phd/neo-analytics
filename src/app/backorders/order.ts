export class Order {
  sku: string;
  quantity: number;
  amount: number;
  shipment: string;
  shipment_id: number;
  customer: string;
  wholesale: boolean;
  category: string;
  planned_date: Date;
  fr_avail: number;
  bs_avail: number;
  warehouse: string;
}
