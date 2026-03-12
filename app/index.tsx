import { StyleSheet, View } from "react-native";
import SplashScreen from "./screens/SplashScreen";

export default function Index() {
  return (
    <View style={styles.container}>
      <SplashScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
