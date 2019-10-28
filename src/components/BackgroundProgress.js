import React, {Component} from 'react'
import { Dimensions, Animated, Easing, StyleSheet } from 'react-native'

class BackgroundProgress extends Component {
  constructor(props) {
    super(props)
    this.height = new Animated.Value(0)
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.progress !== this.props.progress ) {
      Animated.timing(this.height, {
        toValue: this.props.progress > 100 ? 100 : this.props.progress,
        duration: 1000,
        easing: Easing.linear
      }).start()
    }
  }
  render() {
    const progress = this.height.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    })
    return (
      <Animated.View style={[styles.backgroundProgress, {height: progress}]} />
    )
  }
}

const styles = StyleSheet.create({
  backgroundProgress: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#e84118',
    position: 'absolute',
    zIndex: -1,
    bottom: 0
  }
})

export default BackgroundProgress
