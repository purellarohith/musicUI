import React from 'react';
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionPreset } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import SplashScreen from './Components/SplashScreen';
import ScreenOne from './Components/ScreenOne/ScreenOne';
import ScreenTwo from './Components/ScreenTwo/ScreenTwo';
import ContextAPi from './Hooks/ContextAPi';


let Stack = createStackNavigator();
const App = () => {
  enableScreens();
  const openTransition = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  }
  const closeTranstion = {
    animation: 'timing',
    config: {
      duration: 500,
      easing: Easing.linear
    },
  }
  return (
    <ContextAPi >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'splashScreen'} headerMode={false}
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
            //   transitionSpec: {
            //     open: closeTranstion,
            //     close: closeTranstion
            //   }
          }}
        >
          <Stack.Screen name={'splashScreen'} component={SplashScreen} />
          <Stack.Screen name={'screenOne'} component={ScreenOne} />
          <Stack.Screen name={'screenTwo'} component={ScreenTwo} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextAPi>
  );
};

export default App;
