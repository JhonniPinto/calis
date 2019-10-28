import React, { Component } from 'react'
import { StatusBar, Dimensions, View, Text, TextInput, Keyboard, StyleSheet } from 'react-native'
import Sound from 'react-native-sound'
import KeepAwake from 'react-native-keep-awake'

import Title from '../components/Title'
import SelectButton from '../components/SelectButton'
import ActionButton from '../components/ActionButton'
import Timer from '../components/Timer'
import BackgroundProgress from '../components/BackgroundProgress'
import ProgressBar from '../components/ProgressBar'
import Times from '../components/Times'
import ContainerWithInput from '../components/ContainerWithInput'

const alert = require('../../assets/sounds/alert.wav')

class EMOMScreen extends Component {
  state = {
    alert: 0,
    countdown: 0,
    time: '1',

    isRunning: false,
    paused: false,

    keyboard: false,

    countdownValue: 5,
    count: 0,
    repetitions: 0
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
    if (this.state.count > parseInt(this.state.time) * 60 - 10) this.alert.play()
    if (this.state.count % 60 === this.state.alert) this.alert.play()
  }
  play = () => {
    this.setState({
      isRunning: true,
      count: 0,
      countdownValue: 5,
      repetitions: 0,
      paused: false
    })

    const counting = () => {
      if (this.state.paused) return
      this.shouldAlert()
      this.setState({count: this.state.count + 1})
      if (this.state.count === parseInt(this.state.time) * 60) {
        clearInterval(this.countTimer)
      }
    }

    const countingdown = () => {
      if (this.state.paused) return
      this.setState({countdownValue: this.state.countdownValue - 1})
      if (this.state.countdownValue === 0) {
        this.alert.play()
        clearInterval(this.countdownTimer)
        this.countTimer = setInterval(counting, 1000)
      }
    }

    if (this.state.countdown === 1) {
      this.countdownTimer = setInterval(countingdown, 1000)
    } else {
      this.countTimer = (setInterval(counting, 1000))
    }
  }
  pause = () => {
    this.setState({paused: !this.state.paused})
  }
  restart = () => {
    clearInterval(this.countTimer)
    clearInterval(this.countdownTimer)

    this.play()
  }
  back = () => {
    clearInterval(this.countTimer)
    clearInterval(this.countdownTimer)

    this.setState({isRunning: false})
  }
  increment = () => this.setState({repetitions: this.state.repetitions + 1})
  decrement = () => this.state.repetitions > 0 && this.setState({repetitions: this.state.repetitions - 1})
  render() {
    const alertOptions = [
      {id: 0, label: '0s'},
      {id: 15, label: '15s'},
      {id: 30, label: '30s'},
      {id: 45, label: '45s'},
    ]
    const countdownOptions = [
      { id: 0, label: 'não' },
      { id: 1, label: 'sim' }
    ]
    const progressTime = this.state.count / (parseInt(this.state.time) * 60) * 100
    const progressMinute = Math.floor(this.state.count % 60 / 60 * 100)
    const timeLeft = parseInt(this.state.time) * 60 - this.state.count
    if (this.state.isRunning) {
      const countindownOrRep = () => {
        const {countdown, countdownValue} = this.state
          if (countdown === 1 && countdownValue !== 0) {
            return <Text style={styles.countdown}>{this.state.countdownValue}</Text>
          } else {
            const opacity = { opacity: this.state.repetitions > 0 ? 1 : 0.5 }
            return (
              <View style={styles.countingRep}>
                <Text onPress={this.decrement} style={[styles.countingRepButtons, opacity]}>-</Text>
                <Text style={styles.countingRepNumber}>{this.state.repetitions}</Text>
                <Text onPress={this.increment} style={styles.countingRepButtons}>+</Text>
              </View>
            )
          }
        }
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <KeepAwake />
          <BackgroundProgress progress={progressMinute} />
          <Title subTitle='As Many Repetitions As Possible'>AMRAP</Title>
          <View style={styles.subContainer}>
            <Times repetitions={this.state.repetitions} count={this.state.count} time={this.state.time} />
            <Timer textFormat={{fontSize: 70}}>{this.state.count}</Timer>
            <ProgressBar progress={progressTime} />
            <Timer textFormat={{fontSize: 30}} appendText=' restantes'>{timeLeft}</Timer>
            <View style={styles.countdownContainer}>
              {countindownOrRep()}
              { this.state.paused ? (
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
    return (
      <ContainerWithInput keyboard={this.state.keyboard} marginWithKeyboard={-270}>
        <Title subTitle='As Many Repetitions As Possible'>AMRAP</Title>
        <Text style={styles.cog}>&#9881;</Text>
        <View style={styles.subContainer}>
          <SelectButton label='Alerts' options={alertOptions} current={this.state.alert} width={{width: 70}} onPress={(opt) => this.setState({alert: opt})} />
          <SelectButton label='Countdown' options={countdownOptions} current={this.state.countdown} width={{width: 100}} onPress={(opt) => this.setState({countdown: opt})} />
          <View style={styles.time}>
            <Text style={styles.timeLabel}>Tempo (min)</Text>
            <TextInput keyboardType='numeric' onChangeText={(text) => this.setState({time: text})} style={styles.timeInput}>{this.state.time}</TextInput>
          </View>
          <View style={styles.cogScreenButtons}>
            <ActionButton onPress={() => this.props.navigation.goBack()}>{'back'}</ActionButton>
            <ActionButton onPress={this.play}>{'play'}</ActionButton>
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
  countdownContainer: {
    flex: 0.7,
    justifyContent: 'flex-end',
    paddingBottom: 7
  },
  countdown: {
    fontSize: 120,
    fontFamily: 'Orbitron-Regular',
    textAlign: 'center',
    color: '#e84118'
  },
  countingRep: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  countingRepButtons: {
    fontSize: 90,
    fontFamily: 'Orbitron-Bold',
    color: '#fff'
  },
  countingRepNumber: {
    fontSize: 90,
    textAlign: 'center',
    fontFamily: 'Orbitron-Bold',
    width: 200,
    color: '#fff'
  },
  pausedActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cogScreenButtons: {
    flexDirection: 'row',
    width: '66.6%',
    justifyContent: 'space-around',
    paddingBottom: 30
  }
})

export default EMOMScreen
