import React from 'react';
import {
  StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import CartCard from '../components/CartCard';
import { Text, View } from '../components/Themed';

export default function CartScreen({ navigation }:any) {
  const data = [{
    title: 'Blusa do Imperio',
    price: 100,
    zipcode: '78993-000',
    seller: 'Jo\u00e3o da Silva',
    thumbnailHd: 'https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg',
    date: '26/11/2015',
  },
  {
    title: 'Blusa Han Shot First',
    price: 50,
    zipcode: '13500-110',
    seller: 'Joana',
    thumbnailHd: 'https://cdn.awsli.com.br/1000x1000/21/21351/produto/7234148/55692a941d.jpg',
    date: '26/11/2015',
  }];

  const totalValue = data.reduce((a, b) => a + (b.price || 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu carrinho:</Text>

      {data.length > 0 ? (
        <>
          <Text style={styles.title}>
            Total de itens:
            {' '}
            {data.length}
          </Text>

          <Text style={styles.title}>
            Valor total: R$
            {totalValue}
            ,00
          </Text>

          <FlatList
            data={data}
            style={styles.productList}
            renderItem={({ item }) => <CartCard product={item} key={`${item.zipcode + item.price}`} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />

          <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('StoreList')}>
            <Text style={styles.buttonBackText}>Remover Todos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pagamento')}>
            <Text style={styles.buttonText}>FINALIZAR COMPRA</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>
            Você ainda não adicionou nada aqui!
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
  buttonBack: {
    alignItems: 'center',
    padding: 10,
    width: 350,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonBackText: {
    color: '#fff',
    fontSize: 18,
  },
});
