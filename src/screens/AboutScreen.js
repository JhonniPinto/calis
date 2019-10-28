import React from 'react'
import { StatusBar, View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native'

import Title from '../components/Title'
import ActionButton from '../components/ActionButton'

const AboutScreen = ({ navigation }) => {
  const openURL = url => () => {
    Linking.openURL(url)
  }
  const devreactjs = require('../../assets/imgs/devreact.png')
  const devpleno   = require('../../assets/imgs/devpleno.png')
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Title subTitle='O timer para seus esportes'>CalisTimer</Title>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Este aplicativo foi construido durante as aulas do curso de ReactJS/React-Native do DevPleno, o devReactJs, nos módulos de React Native.</Text>
        <TouchableOpacity onPress={openURL('https://devpleno.com/devreactjs')}>
          <Image style={{height: 70, width: 250, alignSelf: 'center'}} source={devreactjs} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openURL('https://devpleno.com')}>
          <Image style={{height: 70, width: 300, alignSelf: 'center'}} source={devpleno} />
        </TouchableOpacity>
        <ActionButton onPress={() => navigation.goBack()}>{'back'}</ActionButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3436'
  },
  subContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly'
  },
  text: {
    color: '#fff',
    fontFamily: 'Roboto-Light',
    textAlign: 'justify',
    fontSize: 20
  }
})

export default AboutScreen
