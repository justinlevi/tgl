
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  dataContainer: {
    flex: 1,
    padding: 50,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  category: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  question: {
    paddingTop: 5,
    paddingLeft: 15,
    fontSize: 14,
  },
  slider: {
    margin: 10,
  },
  chart: {
    width: 350,
    height: 500,
  },
});

export default styles;
