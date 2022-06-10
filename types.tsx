/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Pagamento: NavigatorScreenParams<RootTabParamList> | undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootTabParamList = {
  StoreScreen: undefined;
  CartScreen: undefined;
  PurchaseHistoryScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

// Object Types

export type Product = {
  title: string,
  price: number,
  zipcode: string,
  seller: string,
  thumbnailHd: string,
  date: string,
  cartQuantity?: number
}

export type Purchase = {
  purchase:{
    products: Product[],
    totalValue: number,
    totalQuantity: number,
    checkoutInfo: {
      holderName: string,
      cardNumber: string,
      expiration: string,
      cvv: string,
    }
  }
}

export type CartCardProps = {
  product: {
    title: string,
    price: number,
    zipcode: string,
    seller: string,
    thumbnailHd: string,
    date: string,
    cartQuantity: number,
  }
}

export type StoreCardProps = {
  product: {
    title: string,
    price: number,
    zipcode: string,
    seller: string,
    thumbnailHd: string,
    date: string,
    cartQuantity?: number,
  },
}
