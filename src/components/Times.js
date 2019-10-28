import React, { Fragment } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Timer from './Timer'

const Times = ({repetitions, count, time}) => {
  const timeForRep = count / repetitions
  const estimated = Math.round(parseInt(time) * 60 / timeForRep)
  return (
    <View style={styles.container}>
      { repetitions > 0 ? (
        <Fragment>
          <View>
            <Timer textFormat={{fontSize: 20}}>{timeForRep}</Timer>
            <Text style={styles.text}>por repetição</Text>
          </View>
          <View>
            <Timer textFormat={{fontSize: 20}} onlySec={true}>{estimated}</Timer>
            <Text style={styles.text}>reps estimadas</Text>
          </View>
        </Fragment>
      ) : (
        null
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  text: {
    color: '#fff',
    fontFamily: 'Roboto-Light',
    fontSize: 20,
    textAlign: 'center'
  }
})

export default Times
