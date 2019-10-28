import React, { Component, Fragment } from 'react'
import { StatusBar, Dimensions, View, Text, TextInput, Keyboard, StyleSheet } from 'react-native'
import Sound from 'react-native-sound'
import KeepAwake from 'react-native-keep-awake'

import Title from '../components/Title'
import SelectButton from '../components/SelectButton'
import ActionButton from '../components/ActionButton'
import Timer from '../components/Timer'
import BackgroundProgress from '../components/BackgroundProgress'
import ContainerWithInput from '../components/ContainerWithInput'

const alert = require('../../assets/sounds/alert.wav')

class EMOMScreen extends Component {
  state = {
    target: 1,
    time: '60',

    isRunning: false,
    paused: false,

    keyboard: false,

    countdownValue: 5,
    count: 0
  }
  componentDidMount() {
    Sound.setCategory('Playback', true)
    this.alert = new Sound(alert)

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({ keyboard: true }))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboard: false }))
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }
  shouldAlert = () => {
    if (this.state.target === 1 && this.state.count > parseInt(this.state.time) - 10) this.alert.play()
  }
  play = () => {
    this.setState({
      isRunning: true,
      count: 0,
      countdownValue: 5,
      paused: false
    })

    const counting = () => {
      if (this.state.paused) return
      this.shouldAlert()
      this.setState({ count: this.state.count + 1 })
      if (this.state.target === 1 && this.state.count === parseInt(this.state.time)) {
        this.setState({ count: 1 })
      }
    }

    const countingdown = () => {
      if (this.state.paused) return
      this.setState({ countdownValue: this.state.countdownValue - 1 })
      if (this.state.countdownValue === 0) {
        this.alert.play()
        clearInterval(this.countdownTimer)
        this.countTimer = setInterval(counting, 1000)
      }
    }

    this.countdownTimer = setInterval(countingdown, 1000)
  }
  pause = () => {
    this.setState({ paused: !this.state.paused })
  }
  restart = () => {
    clearInterval(this.countTimer)
    clearInterval(this.countdownTimer)

    this.play()
  }
  back = () => {
    clearInterval(this.countTimer)
    clearInterval(this.countdownTimer)

    this.setState({ isRunning: false })
  }
  render() {
    const targetOptions = [
      { id: 1, label: 'bater tempo' },
      { id: 0, label: 'livre' }
    ]
    const progressMinute = Math.floor(this.state.count % 60 / 60 * 100)
    const timeLeft = parseInt(this.state.time) - this.state.count
    if (this.state.isRunning) {
      const countingdown = () => {
        const { countdownValue } = this.state
        if (countdownValue !== 0) {
          return <Text style={styles.countdown}>{this.state.countdownValue}</Text>
        }
      }
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <KeepAwake />
          {this.state.target === 1 ? <BackgroundProgress progress={progressMinute} /> : null}
          <Title>Isometria</Title>
          <View style={styles.subContainer}>
            {this.state.target === 1 ? (
              <Fragment>
                <Timer textFormat={{ fontSize: 70 }} onlySec={true}>{this.state.count}</Timer>
                <Timer textFormat={{ fontSize: 30 }} onlySec={true} appendText=' restantes'>{timeLeft}</Timer>
              </Fragment>
            ) : (
                <Timer textFormat={{ fontSize: 70 }}>{this.state.count}</Timer>
              )}
            <View style={styles.conditionalBottomContainer}>
              {countingdown()}
              {this.state.paused ? (
                <View style={styles.pausedActions}>
                  <ActionButton onPress={this.back}>{'back'}</ActionButton>
                  <ActionButton onPress={this.pause}>{'play'}</ActionButton>
                  <ActionButton onPress={this.restart}>{'refresh'}</ActionButton>
                </View>
              ) : (
                  <ActionButton onPress={this.pause}>{'pause'}</ActionButton>
                )}
            </View>
          </View>
        </View>
      )
    }
    const justifyTimeContent = { justifyContent: this.state.target === 1 ? 'space-between' : 'flex-end' }
    return (
      <ContainerWithInput keyboard={this.state.keyboard} marginWithKeyboard={-200}>
        <Title>Isometria</Title>
        <Text style={styles.cog}>&#9881;</Text>
        <View style={styles.subContainer}>
          <SelectButton label='Alerts' options={targetOptions} current={this.state.target} width={{ width: 150 }} onPress={(opt) => this.setState({ target: opt })} />
          <View style={[styles.conditionalBottomContainer, justifyTimeContent]}>
            {this.state.target === 1 ? (
              <View style={styles.time}>
                <Text style={styles.timeLabel}>Tempo (seg)</Text>
                <TextInput keyboardType='numeric' onChangeText={(text) => this.setState({ time: text })} style={styles.timeInput}>{this.state.time}</TextInput>
              </View>
            ) : (
              null
            )}
            <View style={styles.cogScreenButtons}>
              <ActionButton onPress={() => this.props.navigation.goBack()}>{'back'}</ActionButton>
              <ActionButton onPress={this.play}>{'play'}</ActionButton>
            </View>
          </View>
        </View>
      </ContainerWithInput>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3436',
    width: Dimensions.get('screen').width,
    paddingHorizontal: 10
  },
  cog: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold'
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-evenly'
  },
  time: {
    alignItems: 'center'
  },
  timeLabel: {
    fontSize: 25,
    fontFamily: 'Roboto-Light',
    color: '#fff'
  },
  timeInput: {
    fontSize: 45,
    fontFamily: 'Orbitron-Regular',
    color: '#e84118'
  },
  conditionalBottomContainer: {
    flex: 0.7,
    paddingBottom: 7,
    justifyContent: 'flex-end'
  },
  countdown: {
    fontSize: 120,
    fontFamily: 'Orbitron-Regular',
    textAlign: 'center',
    color: '#e84118'
  },
  pausedActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cogScreenButtons: {
    flexDirection: 'row',
    width: '66.6%',
    justifyContent: 'space-around'
  }
})

export default EMOMScreen
