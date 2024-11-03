import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  header: {
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c6e49',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recommendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  recommendCard: {
    backgroundColor: '#e2f0d9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  recommendText: {
    fontSize: 16,
    color: '#2c6e49',
  },
  button: {
    backgroundColor: '#2c6e49',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e2f0d9',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  detailsContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AppStyles;
