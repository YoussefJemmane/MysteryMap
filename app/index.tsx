import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Map, Compass, Info, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <LinearGradient
      colors={["#1a2a6c", "#b21f1f", "#fdbb2d"]}
      style={styles.container}
    >
      <TouchableOpacity style={styles.infoButton} onPress={toggleModal}>
        <Info color="#fff" size={24} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>MysteryMap</Text>
        <Text style={styles.subtitle}>Explore, Scan, Solve!</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("NewGameScreen")}
          >
            <Map color="#fff" size={24} />
            <Text style={styles.buttonText}>New Game</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("FindGameScreen")}
          >
            <Compass color="#fff" size={24} />
            <Text style={styles.buttonText}>Find a Game</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <X color="#000" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>How to Play MysteryMap</Text>
            <ScrollView>
              <Text style={styles.modalText}>
                MysteryMap is an exciting mobile game that blends digital
                exploration, teamwork, and trivia in a unique map-based
                adventure. Here's how it works:
              </Text>
              <Text style={styles.modalListItem}>
                1. Create or join a game room with your friends.
              </Text>
              <Text style={styles.modalListItem}>
                2. Explore a customizable digital map filled with hidden QR code
                questions.
              </Text>
              <Text style={styles.modalListItem}>
                3. Form small teams and take turns rolling a virtual dice to
                move around the game board.
              </Text>
              <Text style={styles.modalListItem}>
                4. When you land on a spot, use your device's camera to scan the
                corresponding QR code on the map.
              </Text>
              <Text style={styles.modalListItem}>
                5. Work together to answer trivia questions and solve puzzles.
              </Text>
              <Text style={styles.modalListItem}>
                6. Correct answers let you roll again, while wrong answers send
                you back a space.
              </Text>
              <Text style={styles.modalListItem}>
                7. Race against other teams to reach the finish line first!
              </Text>
              <Text style={styles.modalText}>
                MysteryMap combines the fun of board games with the
                interactivity of mobile technology, creating a unique social
                experience that challenges your mind and teamwork skills.
                Perfect for game nights, parties, or any time you want to add
                some excitement to your hangouts!
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 50,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  orText: {
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  infoButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalListItem: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 20,
  },
});

export default HomeScreen;

