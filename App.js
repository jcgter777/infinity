import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Main from './Main'
export default function App() {
  return (
    <>
      <Main style={styles.container}/>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-left',
    justifyContent: 'center',
  },
});
