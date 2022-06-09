import React, { useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity, FlatList, Image, Text,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Product {
  title: string,
  price: number,
  zipcode: string,
  seller: string,
  thumbnailHd: string,
  date: string,
  cartQuantity: number,
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

export default function HistoryCard({ purchase }: Purchase) {
  const [open, setOpen] = useState<boolean>(false);

  const purchaseId = purchase.totalValue * 96;

  return (
    <View style={styles.container}>

      <View style={styles.cardMain}>
        <View style={styles.cardTop}>
          <Text style={styles.title}>
            Id da compra:
            {' '}
            {purchaseId}
          </Text>

          <Text style={styles.title}>
            Valor total:
            {' '}
            {purchase.totalValue}

          </Text>

          <Text style={styles.title}>
            Total de Itens:
            {' '}
            { purchase.totalQuantity }
          </Text>

          <Text style={styles.title}>
            Nome:
            {'\n'}
            {purchase.checkoutInfo?.holderName}
          </Text>
        </View>

        {!open ? (
          <TouchableOpacity style={styles.button} onPress={() => setOpen(!open)}>
            <Text style={styles.buttonText}>
              Mais detalhes
            </Text>
            <FontAwesome name="plus" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setOpen(!open)}>
            <Text style={styles.buttonText}>
              Menos detalhes
            </Text>
            <FontAwesome name="minus" size={30} color="black" />
          </TouchableOpacity>
        )}

        {open && (
          <View style={styles.productsDetails}>
            <Text style={styles.title}>
              Número do cartão:
              {'\n'}
              {purchase.checkoutInfo?.cardNumber}
            </Text>

            <Text style={styles.title}>
              Vencimento do cartão:
              {'\n'}
              {purchase.checkoutInfo?.expiration}
            </Text>

            <Text style={styles.title}>
              Código de segurança:
              {'\n'}
              {purchase.checkoutInfo?.cvv}
            </Text>

            <Text style={styles.title}>
              Produtos:
            </Text>

            <FlatList
              data={purchase.products}
              renderItem={({ item }) => (
                <View style={styles.productList}>
                  <Image style={styles.image} source={{ uri: item.thumbnailHd }} resizeMode="contain" />

                  <Text style={styles.title}>
                    Nome:
                    {'\n'}
                    {item.title}
                  </Text>

                  <Text style={styles.title}>
                    Valor:
                    {'\n'}
                    R$
                    {item.price}
                    ,00
                  </Text>

                  <Text style={styles.title}>
                    Quantidade:
                    {'\n'}
                    {item.cartQuantity}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    height: 'auto',
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.71,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
  },
  cardMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    minWidth: 350,
  },
  cardTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardBottom: {
    flex: 1,
    width: '100%',
    maxWidth: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    flexShrink: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffe81f',
    flex: 1,
    width: 260,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    flexShrink: 1,
  },
  productsDetails: {
    marginTop: 30,
    color: '#000',
    borderTopWidth: 1,
    borderTopColor: '#000',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 15,
    alignItems: 'center',
  },
  productList: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    margin: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
