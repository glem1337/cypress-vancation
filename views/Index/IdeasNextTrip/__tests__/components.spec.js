import { shallow } from 'enzyme';

import IdeasNextTrip from '../component';

describe('IdeasNextTrip component', () => {
  const props = {
    handlerShowAllStates: jest.fn(),
    homeStatesItems: [{
      id: 'homeStatesItems.id',
      title: 'homeStatesItems.title',
      subtitle: 'homeStatesItems.subtitle',
      link: 'homeStatesItems.link',
    }],
    epicenterLocationsItems: [{
      id: 'epicenterLocationsItems.id',
      title: 'epicenterLocationsItems.title',
      subtitle: 'epicenterLocationsItems.subtitle',
      link: 'epicenterLocationsItems.link',
    }],
    nearestDestinationsItems: [{
      id: 'nearestDestinationsItems.id',
      title: 'nearestDestinationsItems.title',
      subtitle: 'nearestDestinationsItems.subtitle',
      link: 'nearestDestinationsItems.link',
    }],
    isLoadingHomeStates: true,
    isLoadingEpicenterLocations: true,
    isLoadingNearestDestinations: true,
    showAllState: true,
    containerRef: {},
  };

  const wrapper = shallow(<IdeasNextTrip {...props} />);

  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('isLoadingEpicenterLocations equal false', () => {
    wrapper.setProps({ isLoadingEpicenterLocations: false });

    const tab = wrapper.find('.home__campervan-epicenters TabItem');

    expect(tab.props().items).toEqual(props.epicenterLocationsItems);
  });

  it('isLoadingHomeStates equal false', () => {
    wrapper.setProps({ isLoadingHomeStates: false });

    const tab = wrapper.find('.home__campervan-state TabItem');

   expect(tab.props().items).toEqual(props.homeStatesItems);
  });

  it('isLoadingNearestDestinations equal false', () => {
    wrapper.setProps({ isLoadingNearestDestinations: false });

    const tab = wrapper.find('.home__campervan-nearest-destinations TabItem');

    expect(tab.props().items).toEqual(props.nearestDestinationsItems);
  });

  it('showAllState equal false', () => {
    wrapper.setProps({ isLoadingHomeStates: false, showAllState: false });

    const btnMessage = wrapper.find('Button Memo(FormattedMessage)');

    expect(btnMessage.props().id).toBe('shared.showMoreCities');
  });
});
