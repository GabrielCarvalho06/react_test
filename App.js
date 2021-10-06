import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {

  const [selectedImage, setSelectImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permissão é necessária para acessar as mídias')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    //console.log(pickerResult);
    if(pickerResult.cancelled === true) {
      return
    }

    setSelectImage({localUri: pickerResult.uri})
  }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Não é possível compratilhar imagem`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }; 


  if(selectedImage !== null) {
    return (
      <View style={styles.container}>

        <Image source = {{ uri: selectedImage.localUri}}
            style = {styles.thumbnail}/>  
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>

        <Image source = {logo}
            style = {styles.logo}/>

        <Text style = {styles.instructions}>Para compartilhar uma foto, você deve clicar no botão abaixo!!!</Text>
        <StatusBar style="auto" />

        <TouchableOpacity 
        onPress={openImagePickerAsync}
        style = {styles.button}>
          <Text style={styles.buttonText}>Escolha uma foto</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return(
    <View style={styles.container}>
      <Image source = {logo}
                style = {styles.logo}/>
        <Text style = {styles.instructions}>Para compartilhar uma foto, você deve clicar no botão abaixo!!!</Text>
        <StatusBar style="auto" />

      <TouchableOpacity 
        onPress={openImagePickerAsync}
        style = {styles.button}>
          <Text style={styles.buttonText}>Escolha uma foto</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom:10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 30,
  },
  button: {
    backgroundColor:'blue',
    padding:50,
    borderRadius:100,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
});
