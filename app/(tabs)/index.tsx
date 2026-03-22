import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ExerciseCard } from '@/components/exercise-card';
import { EXERCISES_LIST } from '@/constants/exercises';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <FlatList 
          data={EXERCISES_LIST}
          renderItem={({item}) => <ExerciseCard item={item} seriesTotais={4}/>}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: "#121212"},
})