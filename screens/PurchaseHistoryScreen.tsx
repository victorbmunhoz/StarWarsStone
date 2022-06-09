/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity, FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryCard from '../components/HistoryCard';
import { Text } from '../components/Themed';

interface Product {
  title: string,
  price: number,
  zipcode: string,
  seller: string,
  thumbnailHd: string,
  date: string,
}

interface Purchase {
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

export default function PurchaseHistoryScreen({ navigation }:any) {
  const [purchaseHistory, setpurchaseHistory] = useState<Purchase[]>([]);

  const purchaseHistoryFetch = async () => {
    try {
      const response = await AsyncStorage.getItem('purchaseHistory');
      if (response !== null) {
        setpurchaseHistory(JSON.parse(response));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const restorePurchaseHistory = () => {
    AsyncStorage.clear();
  };

  useEffect(() => {
    purchaseHistoryFetch();
  }, [purchaseHistory]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu histórico de compras:</Text>

      {purchaseHistory.length > 0 ? (
        <>
          <Text style={styles.title}>
            Total de compras:
            {' '}
            {purchaseHistory.length}
          </Text>

          <FlatList
            data={purchaseHistory}
            style={styles.productList}
            renderItem={
              ({ item }) => <HistoryCard purchase={item.purchase} key={item.purchase.totalValue} />
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />

          <TouchableOpacity style={styles.button} onPress={restorePurchaseHistory()}>
            <Text style={styles.buttonText}>Excluir histórico</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>
            Você ainda não comprou nada na nossa loja!
          </Text>

          <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('StoreList')}>
            <Text style={styles.buttonText}>VOLTAR PARA A LOJA</Text>
          </TouchableOpacity>
        </>
      )}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  productList: {
    marginTop: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffe81f',
    padding: 10,
    width: 350,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#fff',
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
  },
  buttonBack: {
    alignItems: 'center',
    padding: 10,
    width: 350,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: 30,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ffe81f',
  },
  buttonBackText: {
    color: '#fff',
    fontSize: 18,
  },
  quantity: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    color: '#000',
    marginHorizontal: 10,
  },
});
