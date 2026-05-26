import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#16171d" />
      <WebView
        source={{ uri: "https://api-react-ten.vercel.app/" }}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16171d",
  },
  webview: {
    flex: 1,
  },
});
