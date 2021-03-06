import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../Header';
import BottomContaollers from './BottomContaollers';
import MiddleBelow from './MiddleBelow';
import MiddleScreen from './MiddleScreen';
import Progress from './Progress';

const ScreenTwo = ({ navigation }) => {
  return (
    <View style={styles.mainComponent}>
      <Header isBack={true} isMenu={true} onPressBack={() => navigation.navigate('screenOne')} onPressMenu={() => alert('Coming Soon...')}>
        <MiddleScreen />
        <MiddleBelow />
        <Progress />
        <BottomContaollers />
      </Header>
    </View>
  );
};
const styles = StyleSheet.create({
  mainComponent: { flex: 1 }
});
export default ScreenTwo;
