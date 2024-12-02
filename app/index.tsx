import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cyber Genie</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <TouchableOpacity style={[styles.card, darkMode && styles.darkCard]}>
          <FontAwesome name="shield" size={36} color={darkMode ? "#ecf0f1" : "#2980b9"} />
          <Text style={[styles.cardTitle, darkMode && styles.darkText]}>Practice Tests</Text>
          <Text style={[styles.cardDescription, darkMode && styles.darkText]}>
            Take cybersecurity quizzes to boost your knowledge.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, darkMode && styles.darkCard]}>
          <MaterialIcons name="traffic" size={36} color={darkMode ? "#ecf0f1" : "#e74c3c"} />
          <Text style={[styles.cardTitle, darkMode && styles.darkText]}>Cyber Threats</Text>
          <Text style={[styles.cardDescription, darkMode && styles.darkText]}>
            Learn how to identify and respond to common cyber threats.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={[styles.footer, darkMode && styles.darkFooter]}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={[styles.footerButtonText, darkMode && styles.darkText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={[styles.footerButtonText, darkMode && styles.darkText]}>Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={[styles.footerButtonText, darkMode && styles.darkText]}>Settings</Text>
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
  darkContainer: {
    backgroundColor: "#2c3e50",
  },
  header: {
    backgroundColor: "#34495e",
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#fff",
    fontSize: 28,
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
    alignItems: "center",
  },
  darkCard: {
    backgroundColor: "#34495e",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34495e",
    marginVertical: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ecf0f1",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  darkFooter: {
    backgroundColor: "#2c3e50",
    borderTopColor: "#2c3e50",
  },
  footerButton: {
    padding: 10,
  },
  footerButtonText: {
    color: "#2980b9",
    fontSize: 18,
    fontWeight: "bold",
  },
  darkText: {
    color: "#ecf0f1",
  },
});
