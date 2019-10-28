import React from 'react'
import { StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import Title from '../components/Title'

const HomeScreen = ({ navigation }) => {
  const navigating = screen => () => {
    navigation.navigate(screen)
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Title subTitle='O timer para seus esportes'>CalisTimer</Title>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Protocolos</Text>
        <TouchableOpacity onPress={navigating('EMOM')}>
          <Text style={styles.options}>EMOM</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigating('AMRAP')}>
          <Text style={styles.options}>AMRAP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigating('Isometria')}>
          <Text style={styles.options}>Isometria</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigating('About')}>
          <Text style={styles.options}>Sobre</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    color: '#e84118',
    fontFamily: 'Roboto-Bold'
  },
  options: {
    fontSize: 20,
    color: '#ffffffcc',
    fontFamily: 'Roboto-Light'
  }
})

export default HomeScreen
