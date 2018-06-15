import React from 'react';
import { Text, View, SectionList, AsyncStorage } from 'react-native';
import { VictoryGroup, VictoryLine, VictoryArea, VictoryPolarAxis, VictoryLabel, VictoryChart, VictoryTheme } from 'victory-native';

import styles from '../styles';

const characterData = [
  {
    Career: 10, Recreation: 10, $$$: 10, Environment: 10, 'Personal Growth': 10, Health: 10, Family: 10, Romance: 10,
  },
  // {
  //   Career: 5, Recreation: 1, $$$: 10, Environment: 8, 'Personal Growth': 2, Health: 2, Family: 1, Romance: 1,
  // },
];

const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

const sectionData = [
  {
    title: 'Career',
    data: [[
      { x: 'May', y: 0 },
      { x: 'Jun', y: 2 },
      { x: 'Jul', y: 1 },
      { x: 'Aug', y: 2 },
      { x: 'Sep', y: 3 },
      { x: 'Oct', y: 0 },
    ]],
  },
  {
    title: 'Fun and Recreation',
    data: [[
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 5 },
    ]],
  },
  {
    title: 'Money and Finances',
    data: [[
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 5 },
    ]],
  },
  {
    title: 'Physical Environment',
    data: [[
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 5 },
    ]],
  },
  {
    title: 'Personal Growth',
    data: [[
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 5 },
    ]],
  },
  {
    title: 'Health and Well Being ',
    data: [[
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 5 },
    ]],
  },
  {
    title: 'Friendships',
    data: [[
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 5 },
    ]],
  },
  {
    title: 'Family',
    data: [[
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 5 },
    ]],
  },
  {
    title: 'Significant Other and Romance',
    data: [[
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 5 },
    ]],
  },
];

const getMaxima = (data) => {
  const groupedData = Object.keys(data[0]).reduce((memo, key) => {
    const newMemo = memo;
    newMemo[key] = data.map(d => d[key]);
    return newMemo;
  }, {});
  return Object.keys(groupedData).reduce((memo, key) => {
    const newMemo = memo;
    newMemo[key] = Math.max(...groupedData[key]);
    return newMemo;
  }, {});
};

const processData = (data) => {
  const maxByGroup = getMaxima(data);
  const makeDataArray = d => Object.keys(d).map(key => ({ x: key, y: d[key] / maxByGroup[key] }));
  return data.map(datum => makeDataArray(datum));
};


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   data: processData(characterData),
    //   maxima: getMaxima(characterData),
    // };
    this.state = {
      data: [],
      maxima: [],
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem('data').then((persistedDataJSONString) => {
      const persistedData = JSON.parse(persistedDataJSONString);

      Object.entries(persistedData).forEach((entry) => {
        // entry[1].foreach((categoryDataArray) => {
        characterData.push({
          Career: average(entry[1][0]),
          Recreation: average(entry[1][1]),
          $$$: average(entry[1][2]),
          Environment: average(entry[1][3]),
          'Personal Growth': average(entry[1][4]),
          Health: average(entry[1][5]),
          Family: average(entry[1][6]),
          Romance: average(entry[1][7]),
        });
        // });
      });

      console.log(characterData);
      this.setState({
        data: processData(characterData),
        maxima: getMaxima(characterData),
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: '50%' }}>
          <VictoryChart
            polar
            theme={VictoryTheme.material}
            domain={{ y: [0, 1] }}
          >
            <VictoryGroup
              colorScale={['gray', 'blue', 'tomato']}
              style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
            >
              {this.state.data.map((data, i) => <VictoryArea key={i} data={data} />)}
            </VictoryGroup>
            {
            Object.keys(this.state.maxima).map((key, i) => (
              <VictoryPolarAxis
                key={`${key}`}
                dependentAxis
                style={{
                    axisLabel: { padding: 10 },
                    axis: { stroke: 'none' },
                    grid: { stroke: 'grey', strokeWidth: 0.25, opacity: 0.5 },
                  }}
                tickLabelComponent={
                  <VictoryLabel labelPlacement="vertical" />
                  }
                labelPlacement="perpendicular"
                axisValue={i + 1}
                label={key}
                tickFormat={t => Math.ceil(t * this.state.maxima[key])}
                tickValues={[0.25, 0.5, 0.75]}
              />
              ))
          }
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickFormat={() => ''}
              style={{
                axis: { stroke: 'none' },
                grid: { stroke: 'grey', opacity: 0.5 },
              }}
            />

          </VictoryChart>
        </View>

        <View style={{ height: '40%' }}>
          <SectionList
            sections={sectionData}
            renderItem={
            ({ item }) => (

              <View>
                <VictoryChart polar={false} height={175}>
                  <VictoryLine
                    interpolation="catmullRom"
                    data={item}
                    style={{ data: { stroke: '#c43a31' } }}
                  />
                </VictoryChart>
              </View>

            )
          }
            renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
        </View>

      </View>
    );
  }
}

export default HomeScreen;
