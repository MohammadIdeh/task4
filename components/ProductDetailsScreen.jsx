import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductDetailsScreen = ({ product, onBackButtonPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productDetailsText}>Name: {product.name}</Text>
        <Text style={styles.productDetailsText}>Description: {product.description}</Text>
        <Text style={styles.productDetailsText}>Price: ${product.price}</Text>
      
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity onPress={onBackButtonPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  productDetailsContainer: {
    width: '80%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  productDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,       
    marginBottom: 15,  
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#3c3c3c',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
