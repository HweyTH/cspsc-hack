import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cyber Genie</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Welcome to the app!</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer Section</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    backgroundColor: "#6200ee",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    backgroundColor: "#6200ee",
    padding: 15,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
});
