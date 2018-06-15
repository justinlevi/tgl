import React from 'react';
import { Text, View, Button, ScrollView, Slider, AsyncStorage } from 'react-native';

import styles from '../styles';

const data = [
  {
    title: 'Career',
    data: [
      'I love my work.',
      'I feel my talents and skills are well used in my work.',
      'I enjoy my work environment and the people with whom I work.',
      'I see opportunity for growth and development in my position.',
      'I feel like I have found my right livelihood.',
    ],
  },
  {
    title: 'Fun and Recreation',
    data: [
      'I regularly take the time I need to experience play, adventure and leisure.',
      'I know what activities renew me and bring me alive and I participate in them regularly.',
      'I create plenty of space in my life to relax and enjoy myself and others.',
      'I create fun for myself and others.',
    ],
  },
  {
    title: 'Money and Finances',
    data: [
      'I have enough money to do the things I want to do and to accomplish the things that are important to me.',
      'I manage my money and financial affairs and records well.',
      'I am free from worry and anxiety about money.',
      'My financial future feels robust and sustainable.',
    ],
  },
  {
    title: 'Physical Environment',
    data: [
      'I feel nourished and supported by my home.',
      'I am surrounded by things that I love and have meaning to me.',
      'The level of order in my surroundings is appropriate to my needs. (it serves me)',
      'My wardrobe is a clear expression of who I am. I love being in the clothes I wear.',
    ],
  },
  {
    title: 'Personal Growth',
    data: [
      'I have a belief system that sustains me no matter what circumstances life throws at me.',
      'I am engaged in the unfolding story of my life and approach each day as an adventure.',
      'I regularly experience living a life that I love and loving who I am becoming.',
      'I regularly engage in activities and learning that grow and expand me.',
    ],
  },
  {
    title: 'Health and Well Being ',
    data: [
      'I approach my health in a proactive and generative way, rather than crisis management mode.',
      'I am satisfied with my level of vitality and well being.',
      'I have support systems and structures in place that allow me to easily maintain my health and well being.',
      'I am conscious of my body and fitness level and take responsibility for my physical well-being.',
      'I know what works for me to maintain my health and I consistently do it.',
    ],
  },
  {
    title: 'Friendships',
    data: [
      'I have a sufficient number of great friends.',
      'My friendships nourish and sustain me.',
      'I am a good friend and I make myself available to my friendships.',
      'I trust the relationships I have with my friends.',
      'I love and make the most of the time I spend with my friends.',
    ],
  },
  {
    title: 'Family',
    data: [
      'I am satisfied with the level of contact I have with my family.',
      'Nothing feels hidden or witheld in my relationships with family members.',
      'I am satisfied with the role I play and the level of contribution I have in my family.',
      'I have created the experience of family in my life, whether or not it is with my biological relatives.',
    ],
  },
  {
    title: 'Significant Other and Romance',
    data: [
      'I am open to creating an intimate loving relationship.',
      'I am free from past resentments or blame in the area of intimate relationships.',
      'I am willing to risk myself for the sake of intimacy.',
      'I create romance in my life.',
    ],
  },
];

const saveData = (sessionID, newData) => {
  AsyncStorage.getItem('data').then((persistedDataJSONString) => {
    const persistedData = JSON.parse(persistedDataJSONString);

    AsyncStorage.setItem('data', JSON.stringify({ ...persistedData, [sessionID]: newData }));
    // .then(() => {
    //   AsyncStorage.getItem('data').then((d) => {
    //     console.log(JSON.parse(d));
    //   });
    // });
  });
};

const resetSectionData = () => {
  const sectionData = [];
  for (let parentIndex = 0; parentIndex < data.length; parentIndex += 1) {
    sectionData[parentIndex] = [];
    for (let childIndex = 0; childIndex < data[parentIndex].data.length; childIndex += 1) {
      sectionData[parentIndex][childIndex] = 0;
    }
  }
  return sectionData;
};

const generateKey = (pre = '') => `${pre}${new Date().getTime()}`;

class RecordScreen extends React.Component {
  constructor(props) {
    super(props);

    // AsyncStorage.clear();

    this.state = {
      currentSession: generateKey(),
      sectionData: resetSectionData(),
    };
  }

  // componentDidMount = () => {
  //   AsyncStorage.getItem('data').then((persistedDataJSONString) => {
  //     const persistedData = JSON.parse(persistedDataJSONString);
  //     this.setState({ sectionData: persistedData[this.state.currentSession] });
  //   });
  // };

  sliders = (catIndex, questions) => questions.map((item, index) => (
    <View key={`${catIndex}_${index}`}>
      <Text style={styles.question} titleNumberOfLines={8}>{item}</Text>
      <Slider
        style={styles.slider}
        value={this.state.sectionData[catIndex][index]}
        onSlidingComplete={
            (value) => {
              const newsectionData = JSON.parse(JSON.stringify(this.state.sectionData));
              newsectionData[catIndex][index] = value;
              this.setState({ sectionData: newsectionData });
            }
          }
        maximumValue={10.0}
        minimumValue={0.0}
      />
    </View>
  ));

  submitHandler = () => {
    const { currentSession, sectionData } = this.state;
    saveData(currentSession, sectionData);
    this.setState({ currentSession: generateKey(), sectionData: resetSectionData() });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          data.map((category, index) => (
            <View key={`${category.title}`}>
              <Text style={styles.category}>{category.title}</Text>
              { this.sliders(index, category.data) }
            </View>
          ))
        }
        <View style={{ flex: 1, backgroundColor: '#ccc' }}>
          <Button
            title="SUBMIT"
            onPress={this.submitHandler}
            style={{ alignSelf: 'stretch' }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default RecordScreen;
