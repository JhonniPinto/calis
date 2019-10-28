import React, { Component } from 'react'
import { Dimensions ,Animated, Easing, View, StyleSheet } from 'react-native'

class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.width = new Animated.Value(0)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.width, {
        toValue: this.props.progress > 100 ? 100 : this.props.progress,
        duration: 1000,
        easing: Easing.linear
      }).start()
    }
  }
  render() {
    const progress = this.width.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    })
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.progressBar, {width: progress}]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    alignSelf: 'center'
  },
  progressBar: {
    height: 3,
    backgroundColor: '#fff'
  }
})

export default ProgressBar
