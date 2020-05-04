import React from 'react';
import { View, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function MenuButton({navigation}) {
    function openDrawer(){
        navigation.openDrawer()
    }

  return (
    <View style={styles.content}>
        <TouchableHighlight 
            onPress={openDrawer}
            style={styles.button}>
            <Icon name="home" size={20} color="#fff" /> 
        </TouchableHighlight>
    </View>
  );
}


const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        top: 50,
        right: 20,
        borderRadius: 30
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: '#313131',
        justifyContent: 'center',
        alignItems: 'center'
    }
})