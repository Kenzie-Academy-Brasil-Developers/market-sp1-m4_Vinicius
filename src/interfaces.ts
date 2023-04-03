export interface IProductsData {
  total: number;
  marketProducts: IMarketProducts[];
}

export interface IMarketProducts {
  id: number;
  name: string;
  price: number;
  weight: number;
  expirationDate: string;
  section: 'food' | 'cleaning';
  colories: number;
}

export interface IFoodProducts {
  total: number;
  marketProducts: IMarketProducts[];
}
