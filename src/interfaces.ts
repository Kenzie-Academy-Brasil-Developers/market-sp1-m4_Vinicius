export interface IProductsData {
  name: string;
  price: number;
  weight: number;
  expirationDate: string;
  section: 'food' | 'cleaning';
}

export interface ICleaning {
  total: number;
  marketProducts: Omit<IMarketProducts[], 'id' | 'calories'>;
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
