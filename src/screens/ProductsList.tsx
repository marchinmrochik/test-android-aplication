import React, { useEffect } from "react";
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fetchProducts } from "../actions/products";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Product, StackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<StackParamList, 'ProductDetails'>;

const ProductsList = ({ navigation }: { navigation: NavigationProp }) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      dispatch(fetchProducts());
    });
  }, [navigation]);

  const handleProductPress = (id: string) => {
    navigation.navigate('ProductDetails', { id });
  };

  const renderProductItem = ({item}: {item: Product}) => (
    <TouchableOpacity onPress={() => handleProductPress(item.id)}>
      <View style={styles.productContainer}>
        {
          item?.image ? <Image source={{ uri: item?.image }} style={styles.productImage} /> : null
        }
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title="Add Product" onPress={handleAddProduct} />
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductsList;
