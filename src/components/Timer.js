import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Timer = ({ children, appendText, textFormat, onlySec }) => {
  const formatTime = (time) => {
    const min = '0' + Math.floor(time / 60)
    const sec = '0' + Math.floor(time % 60)
    return `${min.substr(-2)}:${sec.substr(-2)}`
  }
  const formatSec = (time) => {
    const sec = '0' + time
    return sec.substr(-2)
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.timer, textFormat]}>{onlySec ? formatSec(children) : formatTime(children)}{appendText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  timer: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Orbitron-Regular'
  }
})

export default Timer
