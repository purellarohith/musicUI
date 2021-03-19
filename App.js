import React from 'react';
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionPreset, TransitionSpecs } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import SplashScreen from './Components/SplashScreen';
import ScreenOne from './Components/ScreenOne/ScreenOne';
import ScreenTwo from './Components/ScreenTwo/ScreenTwo';
import ContextAPi from './Hooks/ContextAPi';


let Stack = createStackNavigator();
const App = () => {
  enableScreens();
  // const openTransition = {
  //   animation: 'spring',
  //   config: {
  //     stiffness: 1000,
  //     damping: 500,
  //     mass: 3,
  //     overshootClamping: true,
  //     restDisplacementThreshold: 0.01,
  //     restSpeedThreshold: 0.01,
  //   },
  // }
  // const closeTranstion = {
  //   animation: 'timing',
  //   config: {
  //     duration: 1000,
  //     easing: Easing.linear,   
  //   },
  // }

  let commonOptions = {
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec
    },
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            // {
            //   rotate: current.progress.interpolate({
            //     inputRange: [0, 1],
            //     outputRange: [1, 0],
            //   }),
            // },
            {
              scale: next
                ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
                : 1,
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      };
    },
  }




  return (
    <ContextAPi >
      <NavigationContainer >
        <Stack.Navigator initialRouteName={'splashScreen'} headerMode={false} >
          <Stack.Screen name={'splashScreen'} component={SplashScreen} options={commonOptions} />
          <Stack.Screen name={'screenOne'} component={ScreenOne} options={commonOptions} />
          <Stack.Screen name={'screenTwo'} component={ScreenTwo} options={commonOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextAPi>
  );
};

export default App;
