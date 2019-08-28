import React from 'react';
import { shallow } from 'enzyme';
import VideoContextProgressBar from './VideoContextProgressBar';
describe('VideoContextProgressBar', () => {
  it('should render correctly', () => { const component = shallow(<VideoContextProgressBar />);

    expect(component).toMatchSnapshot();
  });

  it('should be possible to activate button with Spacebar', () => {
    const component = mount(<VideoContextProgressBar />); component
      .find('button#my-button-one')
      .simulate('keydown', { keyCode: 32 }); expect(component).toMatchSnapshot();
    component.unmount();
  });
});
