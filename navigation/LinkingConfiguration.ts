import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          StoreScreen: {
            screens: {
              StoreScreen: '',
            },
          },
          CartScreen: {
            screens: {
              CartScreen: 'cart',
            },
          },
          PurchaseHistoryScreen: {
            screens: {
              PurchaseHistoryScreen: 'history',
            },
          },
        },
      },
      Pagamento: 'payment',
    },
  },
};

export default linking;
