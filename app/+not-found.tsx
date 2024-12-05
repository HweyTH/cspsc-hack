// +not-found.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops! Page Not Found</Text>
      <Text style={styles.message}>The page you are looking for doesn't exist.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  message: {
    fontSize: 16,
    color: "#333",
  },
});

export default NotFound;
