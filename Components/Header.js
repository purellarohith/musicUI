import React from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Neomorph } from 'react-native-neomorph-shadows';
import BackIcon from 'react-native-vector-icons/Ionicons';
import MenuIcon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const Header = ({ isBack, isMenu, children, onPressBack, onPressMenu }) => {
  return (
    <>
      <LinearGradient colors={['#dde8fd', '#eef5fd']} style={styles.mainComponent}>
        <View style={styles.HeaderComponent}>
          <View>
            {
              isBack ? (
                <TouchableOpacity onPress={onPressBack}>
                  <Neomorph
                    inner
                    swapShadows
                    style={styles.icon}
                  >
                    <BackIcon name="arrow-back" size={20} color="#A2B1CA" />
                  </Neomorph>
                </TouchableOpacity>) : (
                  <View></View>
                )
            }
          </View>
          <View>
            <Text >{"Song State"}</Text>
          </View>
          <View>
            {
              isMenu ? (
                <TouchableOpacity onPress={onPressMenu}>
                  <Neomorph
                    inner
                    swapShadows
                    style={styles.icon}
                  >
                    <MenuIcon name="menu" size={20} color="#A2B1CA" />
                  </Neomorph>
                </TouchableOpacity>
              ) : (
                  <View></View>
                )
            }
          </View>
        </View>
        {children}
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  mainComponent: {
    flex: 1,
  },
  HeaderComponent: {
    flex: 0.1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16
  },
  icon: {
    width: 30,
    shadowRadius: 6,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEE9F7',
  }
});

export default Header
