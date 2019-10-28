import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class SelectButton extends Component {

  render() {
    const renderOptions = this.props.options.map(opt => {
      const { current, width, onPress } = this.props
      const optionStyle = opt.id === current ? [styles.option, styles.optionSelected, width] : [styles.option, width]
      const labelStyle = opt.id === current ? [styles.optionLabel, {color: '#fff'}] : styles.optionLabel
      return (
        <TouchableOpacity onPress={() => onPress(opt.id)} style={optionStyle} key={opt.id}>
          <Text style={labelStyle}>{opt.label}</Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.containerOptions}>
          {renderOptions}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10
  },
  label: {
    fontSize: 25,
    fontFamily: 'Roboto-Light',
    color: '#fff'
  },
  containerOptions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  optionSelected: {
    borderColor: '#e84118',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    color: '#ffffffcc'
  },
  optionLabel: {
    fontSize: 20,
    fontFamily: 'Orbitron-Regular'
  }
})

export default SelectButton
