import React from 'react';
import { StyleSheet, Text, View, Button, SectionList, Slider, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { VictoryGroup, VictoryLine, VictoryArea, VictoryPolarAxis, VictoryLabel, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const characterData = [
  { Career: 10, 'Recreation': 10, '$$$': 10, 'Environment': 10, 'Personal Growth': 10, 'Health': 10, 'Family': 10, 'Romance': 10 },
  { Career: 5, 'Recreation': 1, '$$$': 10, 'Environment': 8, 'Personal Growth': 2, 'Health': 2, 'Family': 1, 'Romance': 1 },
];

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData(characterData),
      maxima: this.getMaxima(characterData)
    };
  }

  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }

  render() {
    return (
      <View style={styles.container}>

        <VictoryChart polar
          theme={VictoryTheme.material}
          domain={{ y: [ 0, 1 ] }}
        >
          <VictoryGroup colorScale={["gray", "blue", "tomato"]}
            style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
          >
            {this.state.data.map((data, i) => {
              return <VictoryArea key={i} data={data}/>;
            })}
          </VictoryGroup>
        {
          Object.keys(this.state.maxima).map((key, i) => {
            return (
              <VictoryPolarAxis key={i} dependentAxis
                style={{
                  axisLabel: { padding: 10 },
                  axis: { stroke: "none" },
                  grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                }}
                tickLabelComponent={
                  <VictoryLabel labelPlacement="vertical"/>
                }
                labelPlacement="perpendicular"
                axisValue={i + 1} label={key}
                tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                tickValues={[0.25, 0.5, 0.75]}
              />
            );
          })
        }
          <VictoryPolarAxis
            labelPlacement="parallel"
            tickFormat={() => ""}
            style={{
              axis: { stroke: "none" },
              grid: { stroke: "grey", opacity: 0.5 }
            }}
          />

        </VictoryChart>

            <SectionList
            sections={[
              {
                title: 'Career', 
                data: [[
                  { x: 'May', y: 0 },
                  { x: 'Jun', y: 2 },
                  { x: 'Jul', y: 1 },
                  { x: 'Aug', y: 2 },
                  { x: 'Sep', y: 3 },
                  { x: 'Oct', y: 0 }
                ]]
              },
              {
                title: 'Fun and Recreation', 
                data: [[
                  { x: 0, y: 0 },
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 4 },
                  { x: 4, y: 3 },
                  { x: 5, y: 5 }
                ]]
              },
              {
                title: 'Money and Finances', 
                data: [[
                  { x: 0, y: 0 },
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 4 },
                  { x: 4, y: 3 },
                  { x: 5, y: 5 }
                ]]
              },
              {
                title: 'Physical Environment', 
                data: [[
                  { x: 0, y: 0 },
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 4 },
                  { x: 4, y: 3 },
                  { x: 5, y: 5 }
                ]]
              },
              {
                title: 'Personal Growth', 
                data: [[
                  { x: 0, y: 0 },
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 4 },
                  { x: 4, y: 3 },
                  { x: 5, y: 5 }
                ]]
              },
              {
                title: 'Health and Well Being ', 
                data: [[
                  { x: 0, y: 0 },
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 4 },
                  { x: 4, y: 3 },
                  { x: 5, y: 5 }
                ]]
              },
              {
                title: 'Friendships', 
                data: [[
                  { x: 0, y: 0 },
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 4 },
                  { x: 4, y: 3 },
                  { x: 5, y: 5 }
                ]]
              },
              {
                title: 'Family', 
                data: [[
                  { x: 0, y: 0 },
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 4 },
                  { x: 4, y: 3 },
                  { x: 5, y: 5 }
                ]]
              },
              {
                title: 'Significant Other and Romance', 
                data: [[
                  { x: 0, y: 0 },
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 4 },
                  { x: 4, y: 3 },
                  { x: 5, y: 5 }
                ]]
              },
            ]}
            renderItem={
              ({item}) => <View>
                <View>
                  <VictoryChart polar={false} height={175}>
                    <VictoryLine
                      interpolation="catmullRom" data={item}
                      style={{ data: { stroke: "#c43a31" } }}
                    />
                  </VictoryChart>
                </View>
              </View>
            }
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
      </View>
    );
  }
}

class RecordScreen extends React.Component {
  state = {
    value: 0.2,
    sections: []
  };

  render() {
    return (
      <View style={styles.container}>
          <View style={{ flex: 1, backgroundColor: '#FF0000' }}>
            <Button 
              title="SUBMIT" 
              onPress={() => { console.log('hey') }} 
              tyle={{ alignSelf: 'stretch' }} /> 
          </View>
        <SectionList
            sections={[
              {
                title: 'Career', 
                data: [
                  'I love my work.', 
                  'I feel my talents and skills are well used in my work.', 
                  'I enjoy my work environment and the people with whom I work.', 
                  'I see opportunity for growth and development in my position.', 
                  'I feel like I have found my right livelihood.'
                ]
              },
              {
                title: 'Fun and Recreation', 
                data: [
                  'I regularly take the time I need to experience play, adventure and leisure.',
                  'I know what activities renew me and bring me alive and I participate in them regularly.',
                  'I create plenty of space in my life to relax and enjoy myself and others.',
                  'I create fun for myself and others.',
                ]
              },
              {
                title: 'Money and Finances', 
                data: [
                  'I have enough money to do the things I want to do and to accomplish the things that are important to me.',
                  'I manage my money and financial affairs and records well.',
                  'I am free from worry and anxiety about money.',
                  'My financial future feels robust and sustainable.'
                ]
              },
              {
                title: 'Physical Environment', 
                data: [
                  'I feel nourished and supported by my home.',
                  'I am surrounded by things that I love and have meaning to me.',
                  'The level of order in my surroundings is appropriate to my needs. (it serves me)',
                  'My wardrobe is a clear expression of who I am. I love being in the clothes I wear.'
                ]
              },
              {
                title: 'Personal Growth', 
                data: [
                  'I have a belief system that sustains me no matter what circumstances life throws at me.',
                  'I am engaged in the unfolding story of my life and approach each day as an adventure.',
                  'I regularly experience living a life that I love and loving who I am becoming.',
                  'I regularly engage in activities and learning that grow and expand me.'
                ]
              },
              {
                title: 'Health and Well Being ', 
                data: [
                  'I approach my health in a proactive and generative way, rather than crisis management mode.',
                  'I am satisfied with my level of vitality and well being.',
                  'I have support systems and structures in place that allow me to easily maintain my health and well being.',
                  'I am conscious of my body and fitness level and take responsibility for my physical well-being.',
                  'I know what works for me to maintain my health and I consistently do it.'
                ]
              },
              {
                title: 'Friendships', 
                data: [
                  'I have a sufficient number of great friends.',
                  'My friendships nourish and sustain me.',
                  'I am a good friend and I make myself available to my friendships.',
                  'I trust the relationships I have with my friends.',
                  'I love and make the most of the time I spend with my friends.'
                ]
              },
              {
                title: 'Family', 
                data: [
                  'I am satisfied with the level of contact I have with my family.',
                  'Nothing feels hidden or witheld in my relationships with family members.',
                  'I am satisfied with the role I play and the level of contribution I have in my family.',
                  'I have created the experience of family in my life, whether or not it is with my biological relatives.'
                ]
              },
              {
                title: 'Significant Other and Romance', 
                data: [
                  'I am open to creating an intimate loving relationship.',
                  'I am free from past resentments or blame in the area of intimate relationships.',
                  'I am willing to risk myself for the sake of intimacy.',
                  'I create romance in my life.'
                ]
              },
            ]}
            renderItem={
              ({item, index}) => <View>
              <Text style={styles.item} titleNumberOfLines={4}>{item}</Text>
              <Slider style={styles.slider}
                value={this.state.value}
                // onValueChange={
                //   value => {
                //     const newSections = JSON.parse(JSON.stringify(this.state.sections));
                //     // this.setState({ sections: [...this.state.sections],  })
                //   }
                // }
                maximumValue={10.0}
                minimumValue={0.0}
              />
              </View>
            }
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />

      </View>
    );
  }
}

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
  }
);

// export default class App extends React.Component {
//   render() {
//     return <RootStack />;
//   }
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  dataContainer: {
    flex: 1,
    padding: 50,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 18,
  },
  slider: {
    margin: 10,
  },
  chart: {
    width: 350,
    height: 500
  }
})
