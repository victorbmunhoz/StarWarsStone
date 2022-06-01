import React from 'react';
import {
  StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import StoreCard from '../components/StoreCard';
import { Text, View } from '../components/Themed';

export default function CartScreen({ navigation }:any) {
  const data = [{
    title: 'Blusa do Imperio',
    price: 7990,
    zipcode: '78993-000',
    seller: 'Jo\u00e3o da Silva',
    thumbnailHd: 'https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg',
    date: '26/11/2015',
  },
  {
    title: 'Blusa Han Shot First',
    price: 7990,
    zipcode: '13500-110',
    seller: 'Joana',
    thumbnailHd: 'https://cdn.awsli.com.br/1000x1000/21/21351/produto/7234148/55692a941d.jpg',
    date: '26/11/2015',
  }];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu carrinho:</Text>

      {data ? (
        <Text style={styles.title}>
          Total de itens:
          {' '}
          {data.length}
        </Text>
      ) : null}

      {data ? (<Text style={styles.title}>Valor total: R$1000,00</Text>) : null}

      <FlatList
        data={data}
        style={styles.productList}
        renderItem={({ item }) => <StoreCard product={item} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pagamento')}>
        <Text style={styles.buttonText}>FINALIZAR COMPRA</Text>
      </TouchableOpacity>
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
    maxHeight: 460,
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
});
