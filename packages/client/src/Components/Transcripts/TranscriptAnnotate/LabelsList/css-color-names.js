/**
 * List of CSS colors that have letters names as well as hex
 * originally from https://github.com/bahamas10/css-color-names#readme
 * TODO: filter list for colors that meets accessibility requirements and are bright enough
 * TODO: find a way to order this colours, by hue?
 */
const csscolors = {
  'yellow': '#ffff00',
  // '#ffeb3b': '#ffeb3b',
  'greenyellow': '#adff2f',
  'deepskyblue': '#00bfff',
  'deeppink': '#ff1493',
  // 'darkorange': '#ff8c00',
  // 'aliceblue': '#f0f8ff',
  // 'antiquewhite': '#faebd7',
  'aqua': '#00ffff',
  // 'azure': '#f0ffff',
  // 'beige': '#f5f5dc',
  // 'bisque': '#ffe4c4',
  'black': '#000000',
  // 'blanchedalmond': '#ffebcd',
  'blueviolet': '#8a2be2',
  'brown': '#a52a2a',
  'burlywood': '#deb887',
  'cadetblue': '#5f9ea0',
  'chocolate': '#d2691e',
  'coral': '#ff7f50',
  // 'cornflowerblue': '#6495ed',
  // 'cornsilk': '#fff8dc',
  'crimson': '#dc143c',
  // 'cyan': '#00ffff',
  'darkblue': '#00008b',
  'darkcyan': '#008b8b',
  'darkgoldenrod': '#b8860b',
  'darkgray': '#a9a9a9',
  'darkgreen': '#006400',
  // 'darkgrey': '#a9a9a9',
  'darkkhaki': '#bdb76b',
  'darkmagenta': '#8b008b',
  'darkolivegreen': '#556b2f',
  'darkorchid': '#9932cc',
  'darkred': '#8b0000',
  'darksalmon': '#e9967a',
  'darkseagreen': '#8fbc8f',
  'darkslateblue': '#483d8b',
  'darkslategray': '#2f4f4f',
  'darkslategrey': '#2f4f4f',
  'darkturquoise': '#00ced1',
  'darkviolet': '#9400d3',
  'blue': '#0000ff',
  'dimgray': '#696969',
  'dimgrey': '#696969',
  'dodgerblue': '#1e90ff',
  'firebrick': '#b22222',
  // 'floralwhite': '#fffaf0',
  'forestgreen': '#228b22',
  'fuchsia': '#ff00ff',
  'gainsboro': '#dcdcdc',
  // 'ghostwhite': '#f8f8ff',
  'goldenrod': '#daa520',
  'gold': '#ffd700',
  'gray': '#808080',
  'green': '#008000',
  'grey': '#808080',
  'honeydew': '#f0fff0',
  'hotpink': '#ff69b4',
  'indianred': '#cd5c5c',
  'indigo': '#4b0082',
  'ivory': '#fffff0',
  'khaki': '#f0e68c',
  'lavenderblush': '#fff0f5',
  'lavender': '#e6e6fa',
  'lawngreen': '#7cfc00',
  'lemonchiffon': '#fffacd',
  'lightblue': '#add8e6',
  'lightcoral': '#f08080',
  // 'lightcyan': '#e0ffff',
  'lightgoldenrodyellow': '#fafad2',
  'lightgray': '#d3d3d3',
  'lightgreen': '#90ee90',
  'lightgrey': '#d3d3d3',
  'lightpink': '#ffb6c1',
  'lightsalmon': '#ffa07a',
  'lightseagreen': '#20b2aa',
  'lightskyblue': '#87cefa',
  'lightslategray': '#778899',
  'lightslategrey': '#778899',
  'lightsteelblue': '#b0c4de',
  'lightyellow': '#ffffe0',
  'lime': '#00ff00',
  'chartreuse': '#7fff00',
  'limegreen': '#32cd32',
  'linen': '#faf0e6',
  'magenta': '#ff00ff',
  'maroon': '#800000',
  'mediumblue': '#0000cd',
  'mediumorchid': '#ba55d3',
  'mediumpurple': '#9370db',
  'mediumseagreen': '#3cb371',
  'mediumslateblue': '#7b68ee',
  'mediumspringgreen': '#00fa9a',
  'mediumturquoise': '#48d1cc',
  'mediumvioletred': '#c71585',
  'midnightblue': '#191970',
  'mintcream': '#f5fffa',
  'mistyrose': '#ffe4e1',
  'moccasin': '#ffe4b5',
  // 'navajowhite': '#ffdead',
  'navy': '#000080',
  'oldlace': '#fdf5e6',
  'olive': '#808000',
  'olivedrab': '#6b8e23',
  'orange': '#ffa500',
  'orangered': '#ff4500',
  'orchid': '#da70d6',
  'palegoldenrod': '#eee8aa',
  'palegreen': '#98fb98',
  'paleturquoise': '#afeeee',
  'palevioletred': '#db7093',
  'papayawhip': '#ffefd5',
  'peachpuff': '#ffdab9',
  'peru': '#cd853f',
  'pink': '#ffc0cb',
  'plum': '#dda0dd',
  'powderblue': '#b0e0e6',
  'purple': '#800080',
  'rebeccapurple': '#663399',
  'red': '#ff0000',
  'rosybrown': '#bc8f8f',
  'royalblue': '#4169e1',
  'saddlebrown': '#8b4513',
  'salmon': '#fa8072',
  'sandybrown': '#f4a460',
  'seagreen': '#2e8b57',
  'seashell': '#fff5ee',
  'sienna': '#a0522d',
  'silver': '#c0c0c0',
  'skyblue': '#87ceeb',
  'slateblue': '#6a5acd',
  'slategray': '#708090',
  'slategrey': '#708090',
  'snow': '#fffafa',
  'springgreen': '#00ff7f',
  'steelblue': '#4682b4',
  'tan': '#d2b48c',
  'teal': '#008080',
  'thistle': '#d8bfd8',
  'tomato': '#ff6347',
  'turquoise': '#40e0d0',
  'violet': '#ee82ee',
  'wheat': '#f5deb3',
  // 'white': '#ffffff',
  // 'whitesmoke': '#f5f5f5',
  'yellowgreen': '#9acd32',
  'aquamarine': '#7fffd4',
  'mediumaquamarine': '#66cdaa'
};

/**
 * An array list of css colors
 */
const colorNamesList = Object.freeze(Object.keys(csscolors)
  .splice(0, 15) // show only first 20 colours
);

/**
 * returns
 * {value: "aliceblue", label: "aliceblue", color: "#f0f8ff"}
 */
// const cssColorsValueLabelColor = () => {
const cssColorsList = [];
for (var key in csscolors) {
  cssColorsList.push({
    value: key,
    label:key,
    color: csscolors[key]
  });
}
// return cssColorsList;
// };
// const cssColorsValueLabelColor = Object.freeze(cssColorsList);

/**
 * Random color
 */
let counter = -1;
const numberOfColor = colorNamesList.length;
const randomColor = () => {
  if (counter < numberOfColor) {
    counter += 1;
  }
  else {
    counter = 0;
  }

  return colorNamesList[counter];
};

export {
  colorNamesList,
  // cssColorsValueLabelColor,
  randomColor
};

export default csscolors;