export interface ProductValues {
  title: string;
  price: string;
  description: string;
}

export interface Product extends ProductValues {
  id: string;
  image: string | null;
}

export type StackParamList = {
  ProductsList: undefined;
  ProductDetails: { id: string };
  AddProduct: undefined;
};


