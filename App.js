import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './src/screens/HomeScreen'
import EMOMScreen from './src/screens/EMOMScreen'
import AMRAPScreen from './src/screens/AMRAPScreen'
import IsometriaScreen from './src/screens/IsometriaScreen'
import AboutScreen from './src/screens/AboutScreen'

const AppNavigation = createStackNavigator ({
  Home: HomeScreen,
  EMOM: EMOMScreen,
  AMRAP: AMRAPScreen,
  Isometria: IsometriaScreen,
  About: AboutScreen
}, { initialRouteName: 'Home', headerMode: 'none' })

export default createAppContainer(AppNavigation);
