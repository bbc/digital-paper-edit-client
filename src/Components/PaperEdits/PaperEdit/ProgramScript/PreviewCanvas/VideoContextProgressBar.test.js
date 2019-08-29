import React from 'react';
import { shallow, mount } from 'enzyme';
import VideoContextProgressBar from './VideoContextProgressBar';

describe('VideoContextProgressBar', () => {
  const mockVideoContext = {};

  it('should render correctly', () => { const component = shallow(<VideoContextProgressBar videoContext={ mockVideoContext } />);
    expect(component).toMatchSnapshot();
  });

  it('should be possible to activate button with Spacebar', () => {
    const component = mount(<VideoContextProgressBar videoContext={ mockVideoContext }/>);
    expect(component).toMatchSnapshot();

    component.unmount();
  });
});
