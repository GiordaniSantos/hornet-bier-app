import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';

export default function CreateOS() {
    return (
        <>
            <Stack.Screen options={{ title: 'Criar Cliente' }} />
            <Container>
                <View style={styles.container}>
                    <View style={styles.containerTable}>
                        <ScrollView>
                            
                        </ScrollView>
                    </View>
                </View>
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerTable: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
});
