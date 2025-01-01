import { StyleSheet, View, Text, ScrollView } from 'react-native';

interface DataItem {
    label: string;
    value: string | string[];
}
  
interface DetailProps {
    dados: DataItem[];
}

export default function Detail({dados}: DetailProps) {

    return (
        <ScrollView>
            <View style={styles.containerTable}>
                {dados.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.value}>{item.value}</Text>
                    </View>
                ))}
            </View> 
        </ScrollView>    
    );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  containerTable: {
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginRight: 8
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
});
