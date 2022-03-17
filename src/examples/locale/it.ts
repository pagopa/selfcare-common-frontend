const labelTitle = 'nome Titolo';
const descriptionIt = 'descrizione in grassetto';

export default {
  'session modal button': 'Apri Session Modal',
  labelTitle: `${labelTitle}`,
  boldDescriptionText: ' testo in grassetto',
  boldDescriptionTwo: `visualizza la ${descriptionIt}`,
  description: {
    part1: 'ita: descrizione test-parte1',
    part2: 'ita: descrizione test-parte2',
  },
  key: '{{what}} {{e}} {{how}}!!',
  key2: 'sono <1>{{author}}</1> non in grassetto',
  nesting1: '1 $t(nesting2)',
  nesting2: '2 $t(nesting3)',
  nesting3: '3',
  arrayJoinWithInterpolation: ['tu', 'puoi', '{{myVar}}'],
  arrayOfObjects: [{ name: 'tom' }, { name: ' steve' }],
};
