import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ExerciseData } from '@/constants/exercises';

type Props = {
    item: ExerciseData;
    seriesTotais: number;
}

export const ExerciseCard = ({item, seriesTotais}: Props) => {
    const [seriesFeitas, setSeriesFeitas] = useState(0);
    const concluido = seriesFeitas === seriesTotais;

    const getStatusColor = () => {
    if (seriesFeitas === 0) return '#FF5252';
    if (!concluido) return '#FFAB40';
    return '#4CAF50';
    }

    return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.statusIndicator, {backgroundColor: getStatusColor()}]} />
            <Text style={[styles.text, styles.item, concluido && {color: '#666', textDecorationLine: 'line-through'}]}>
            {item.name}
            </Text>
        </View>
        
        <View style={styles.controls}>
            <TouchableOpacity style={[styles.button, styles.item, seriesFeitas === 0 && { opacity: 0.3 }]} 
                            onPress={() => (seriesFeitas > 0) ? setSeriesFeitas( seriesFeitas-1) : setSeriesFeitas(seriesFeitas)}
                            disabled={seriesFeitas === 0}
            >
            <Text style={[styles.text, {color:'#E0E0E0'},]}>-</Text>
            </TouchableOpacity>

            <Text style={[styles.counterText, concluido && {backgroundColor: '#666', color: '#333333'}]}>
            {seriesFeitas} / {seriesTotais}
            </Text>

            <TouchableOpacity style={[styles.button, styles.item, concluido && {opacity : 0.3}]}
                            onPress={() => (seriesFeitas < seriesTotais) ? setSeriesFeitas( seriesFeitas+1) : setSeriesFeitas(seriesFeitas)}
                            disabled={concluido}
            >
            <Text style={[styles.text, {color:'#E0E0E0'}]}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
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
        justifyContent: 'space-between',
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