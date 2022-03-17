const descriptionEn = 'bold description';

export default {
  'session modal button': 'Open Session Modal',
  labelTitle: 'name Title',
  boldDescriptionText: ' Test Description with bold text',
  boldDescriptionTwo: `view ${descriptionEn}`,
  description: {
    part1: 'eng: description test-part1',
    part2: 'eng: description test-part2',
  },
  key: '{{what}} {{and}} {{how}}!!',
  key2: 'I am <1>{{author}}</1> not bold',
  nesting1: '1 $t(nesting2)',
  nesting2: '2 $t(nesting3)',
  nesting3: '3',
  arrayJoinWithInterpolation: ['you', 'can', '{{myVar}}'],
  arrayOfObjects: [{ name: 'tom' }, { name: 'steve' }],
};
