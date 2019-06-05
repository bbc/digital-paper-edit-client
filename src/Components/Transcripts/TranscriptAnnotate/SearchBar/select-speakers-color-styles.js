// helper function for adding custom stylings to speakers in react-select component in search bar
// https://react-select.com/styles

const speakersColorStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles) => {

    const tmpBackgroundColor = null;

    return {
      ...styles,
      backgroundColor: tmpBackgroundColor,
      cursor:'default'
    };
  },

  multiValue: (styles) => {

    return {
      ...styles,
      backgroundColor: 'white',
      border: '0.05em solid grey'
    };
  },
  multiValueLabel: (styles) => ({
    ...styles
  }),
  multiValueRemove: (styles) => ({
    ...styles
  })
};

export default speakersColorStyles;
