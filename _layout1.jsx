import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack> 
  <Stack.Screen name="index"
   options={{headerTitle: "Home"}}/>
  <Stack.Screen name="login" options={{headerTitle: "Login"}}/>
  <Stack.Screen name="signup" options={{headerTitle: "Signup"}}/>
  <Stack.Screen name="readreview" options={{headerTitle: "Read reviews"}}/>
  <Stack.Screen name="addreview" options={{headerTitle: "Add reviews"}}/>
  </Stack>;
}
