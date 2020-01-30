import React from 'react';
import { shallow, mount } from 'enzyme';
import VideoContextProgressBar from './VideoContextProgressBar';

describe('VideoContextProgressBar', () => {
  const mockVideoContext = {};

  it('should render shallowly', () => { const component = shallow(<VideoContextProgressBar videoContext={ mockVideoContext } />);
    expect(component).toMatchSnapshot();
  });

  it('should fully render', () => {
    const component = mount(<VideoContextProgressBar videoContext={ mockVideoContext }/>);
    expect(component).toMatchSnapshot();

    component.unmount();
  });
});
