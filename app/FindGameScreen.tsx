import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, UserPlus } from "lucide-react-native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { joinRoom } from "./api";

const FindGameScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const joinExistingRoom = async () => {
    try {
      await joinRoom(username, roomCode);
      navigation.navigate("GameLobbyScreen", { isGameMaster: false, username, roomCode });
    } catch (error) {
      console.error('Error joining room:', error);
      // Handle error (show alert to user)
    }
  };
  return (
    <LinearGradient
      colors={["#1a2a6c", "#b21f1f", "#fdbb2d"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Find a Game</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your Room Code"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={roomCode}
              onChangeText={setRoomCode}
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, !roomCode.trim() && styles.buttonDisabled]}
            onPress={joinExistingRoom}
            disabled={!roomCode.trim()}
          >
            <UserPlus color="#fff" size={24} />
            <Text style={styles.buttonText}>Find Room</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    color: "#fff",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default FindGameScreen;
