import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import HomeScreen from "./index";
import NotFoundScreen from "./+not-found";
import GameLobbyScreen from "./GameLobbyScreen";
import FindGameScreen from "./FindGameScreen";
import NewGameScreen from "./NewGameScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewGameScreen"
          component={NewGameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FindGameScreen"
          component={FindGameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GameLobbyScreen"
          component={GameLobbyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="+not-found"
          component={NotFoundScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
