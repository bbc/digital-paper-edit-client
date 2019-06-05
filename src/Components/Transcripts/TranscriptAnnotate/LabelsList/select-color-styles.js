// helper funciton for adding colors to labels in react-select component
// https://react-select.com/styles
// import chroma from 'chroma-js';

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);

    const tmpBackgroundColor = null;// 'black;
    // if (isDisabled) {
    //   tmpBackgroundColor = null;
    // }
    // if (isSelected) {
    //   tmpBackgroundColor = data.color;
    // }
    // if (isFocused) {
    //   tmpBackgroundColor = color.alpha(0.1).css();
    // }

    const tmpColor = data.color;
    // if (isDisabled) {
    //   tmpColor = '#ccc';
    // }
    // if (isSelected) {
    //   tmpColor = chroma.contrast(color, 'white') > 2
    //     ? 'white'
    //     : 'black';
    // }

    return {
      ...styles,
      backgroundColor: tmpBackgroundColor,
      borderLeft: '1.5em solid',
      borderColor: tmpColor,
      marginBottom: '0.4em',
      // color: tmpColor,
      cursor: isDisabled ? 'not-allowed' : 'default'
    };
  },
  //   return {
  //     ...styles,
  //     backgroundColor: isDisabled
  //       ? null
  //       : isSelected
  //         ? data.color
  //         : isFocused
  //           ? color.alpha(0.1).css()
  //           : null, //'black'
  //     color: isDisabled
  //       ? '#ccc'
  //       : isSelected
  //         ? chroma.contrast(color, 'white') > 2
  //           ? 'white'
  //           : 'black'
  //         : data.color,
  //     cursor: isDisabled ? 'not-allowed' : 'default'
  //   };
  // },
  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';

  //   return { ...provided, opacity, transition };
  // },
  multiValue: (styles, { data }) => {
    // const color = chroma(data.color);

    return {
      ...styles,
      // backgroundColor: color.alpha(0.1).css()
      backgroundColor: 'white',
      border: '0.05em solid',
      borderLeft: '1.2em solid',
      borderColor: data.color,
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    // color: data.color
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    // color: data.color,
    // ':hover': {
    //   backgroundColor: data.color,
    //   color: 'white'
    // }
  })
};

export default colourStyles;
