import React from 'react'
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

const ActionButton = ({children, onPress}) => {
  const play = require('../../assets/imgs/play.png')
  const pause = require('../../assets/imgs/pause.png')
  const back = require('../../assets/imgs/back.png')
  const refresh = require('../../assets/imgs/refresh.png')
  const source = children === 'pause' ? pause : children === 'back' ? back  : children === 'refresh' ? refresh : play

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.img} source={source}  />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  img: {
    width: 35,
    height: 35,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})

export default ActionButton
