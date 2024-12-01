import React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cyber Genie</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Practice Tests</Text>
          <Text style={styles.cardDescription}>
            Take a variety of G1 practice tests to prepare for the real thing.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Road Signs</Text>
          <Text style={styles.cardDescription}>
            Learn important road signs and their meanings.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#2c3e50",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ecf0f1",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerButton: {
    padding: 10,
  },
  footerButtonText: {
    color: "#2980b9",
    fontSize: 16,
    fontWeight: "bold",
  },
});
