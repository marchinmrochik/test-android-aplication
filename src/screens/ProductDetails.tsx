import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, StackParamList } from "../types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

type ProductDetailsScreenRouteProp = RouteProp<StackParamList, 'ProductDetails'>;

type ProductDetailsScreenNavigationProp = StackNavigationProp<StackParamList, 'ProductDetails'>;

type Props = {
  route: ProductDetailsScreenRouteProp;
  navigation: ProductDetailsScreenNavigationProp;
};

const ProductDetails = ({ route }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem('products');
        const products = storedProducts ? JSON.parse(storedProducts) : [];

        const productId = route.params.id;
        const selectedProduct = products.find((product: Product) => product.id === productId);

        if (selectedProduct) {
          setProduct(selectedProduct);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProductDetails();
  }, [route.params.id]);

  if (!product) {
    return null;
  }

  return (
    <View style={styles.container}>
      {
        product?.image ? <Image source={{ uri: product.image }} style={styles.image} /> : null
      }
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} $</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default ProductDetails;

