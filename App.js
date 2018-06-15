import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';

import HomeScreen from './containers/HomeScreen';
import RecordScreen from './containers/RecordScreen';

import './ReactotronConfig';

export default createBottomTabNavigator(
  {
    Home: HomeScreen,
    Record: RecordScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-pie${focused ? '' : '-outline'}`;
        } else if (routeName === 'Record') {
          iconName = `ios-pulse${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

// export default class App extends React.Component {
//   render() {
//     return <RootStack />;
//   }
// }
