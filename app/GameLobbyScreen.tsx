import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ArrowLeft, Copy, Check, Play } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { getRoomInfo } from "./api"; // Make sure to import this from your api file

const GameLobbyScreen = ({ route }) => {
  const navigation = useNavigation();
  const { isGameMaster, username, roomCode } = route.params;
  const [players, setPlayers] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const roomInfo = await getRoomInfo(roomCode);
        setPlayers(roomInfo.players);
      } catch (error) {
        console.error("Error fetching room info:", error);
        // Handle error (e.g., show an alert to the user)
      }
    };

    fetchRoomInfo();
    // Set up an interval to periodically fetch room info
    const interval = setInterval(fetchRoomInfo, 5000); // Fetch every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [roomCode]);

  const copyRoomCode = async () => {
    await Clipboard.setStringAsync(roomCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 4000);
  };

  const startGame = () => {
    // Logic to start the game
    alert("Game started!");
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
          <Text style={styles.title}>Game Lobby</Text>

          <View style={styles.roomCodeContainer}>
            <Text style={styles.roomCodeText}>Room Code: {roomCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyRoomCode}>
              {isCopied ? (
                <Check color="#fff" size={24} />
              ) : (
                <Copy color="#fff" size={24} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.playerListContainer}>
            <Text style={styles.playerListTitle}>Players:</Text>
            <FlatList
              data={players}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.playerItem}>{item}</Text>
              )}
            />
          </View>

          {isGameMaster && (
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Play color="#fff" size={24} />
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
          )}
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
  roomCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  roomCodeText: {
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
  },
  copyButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 10,
  },
  playerListContainer: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 20,
  },
  playerListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  playerItem: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
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

export default GameLobbyScreen;
