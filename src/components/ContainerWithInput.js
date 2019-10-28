import React, { Component } from 'react'
import { StatusBar ,Dimensions, Animated, Easing, StyleSheet } from 'react-native'


class ContainerWithInput extends Component {
  constructor(props) {
    super(props)
    this.marginTop = new Animated.Value(0)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.keyboard !== this.props.keyboard) {
      Animated.timing(this.marginTop, {
        toValue: this.props.keyboard ? this.props.marginWithKeyboard : 0,
        duration: 700,
        easing: Easing.linear
      }).start()
    }
  }
  render() {
    const marginTop = {marginTop: this.marginTop}
    return (
      <Animated.View style={[styles.container, marginTop]}>
        <StatusBar hidden />
        {this.props.children}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3436',
    width: Dimensions.get('screen').width,
    paddingHorizontal: 10
  }
})

export default ContainerWithInput
