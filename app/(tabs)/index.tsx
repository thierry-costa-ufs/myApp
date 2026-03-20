import React, {useState} from 'react';
import { 
  FlatList, 
  StyleSheet,
  View,
  Text,
  TouchableOpacity, 
  StatusBar,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

type ItemData = {
  id: string;
  text: string;
  seriesFeitas: number;
  seriesTotais: number;
};

const EXERCISES: ItemData[] = [
  {
    id: '0',
    text: 'Supino Inclinado',
    seriesFeitas: 0,
    seriesTotais: 4,
  },
  {
    id: '1',
    text: 'Remada Baixa',
    seriesFeitas: 0,
    seriesTotais: 4,
  },
  {
    id: '2',
    text: 'Desenvolvimento',
    seriesFeitas: 0,
    seriesTotais: 4,
  },
];

const Item = ({item}: {item: ItemData}) => {
  const [seriesFeitas, setSeriesFeitas] = useState(0);
  const concluido = seriesFeitas === item.seriesTotais;

  const getStatusColor = () => {
    if (seriesFeitas === 0) return '#FF5252';
    if (!concluido) return '#FFAB40';
    return '#4CAF50';
  }

  return (
  <View style={styles.container}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
      <Text style={[
        styles.text, 
        styles.item,
        concluido && {color: '#666', textDecorationLine: 'line-through'}
      ]}>
          {item.text}
      </Text>
    </View>
    

    <View style={styles.controls}>
      <TouchableOpacity style={[
                          styles.button,
                          styles.item,
                          seriesFeitas === 0 && { opacity: 0.3 }
                        ]} 
                        onPress={() => (seriesFeitas > 0) ? setSeriesFeitas( seriesFeitas-1) : setSeriesFeitas(seriesFeitas)}
                        disabled={seriesFeitas === 0}
      >
        <Text style={[
          styles.text,
          {color:'#E0E0E0'},
        ]}>
          -
        </Text>
      </TouchableOpacity>

      <Text style={[
        styles.counterText,
        concluido && {backgroundColor: '#666', color: '#333333'}
      ]}>
        {seriesFeitas} / {item.seriesTotais}
      </Text>

      <TouchableOpacity style={[
                          styles.button,
                          styles.item,
                          concluido && {opacity : 0.3}
                        ]}
                        onPress={() => (seriesFeitas < item.seriesTotais) ? setSeriesFeitas( seriesFeitas+1) : setSeriesFeitas(seriesFeitas)}
                        disabled={concluido}
      >
        <Text style={[
          styles.text,
          {color:'#E0E0E0'},
        ]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

export default function HomeScreen() {
  const renderItem = ({item}: {item: ItemData}) => {
    return <Item item={item} />;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="light-content" />
        <FlatList 
          data={EXERCISES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    backgroundColor: "#1E1E1E",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  item: {
    padding: 10,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  counterText: {
    backgroundColor: '#FFFFFF',
    fontSize: 18,
    fontWeight: "600",
    color: "#121212",
    paddingVertical: 10,
    width: 80,
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 10,
    width: 50,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Joga um botão pra cada lado e o texto no meio
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 20,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },
});