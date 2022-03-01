import { shallow } from 'enzyme';
import VehicleCardComponent from '../component';

describe('EstimatedEarningCard Component', () => {
  const props = {
    isVisible: true,
    handlerClose: jest.fn(),
    content: {
      name: 'test_name',
      estimatedEarning: 1200.0,
      iconUrl: 'test_iconUrl',
    },
    isSlim: false,
  };

  const component = shallow(<VehicleCardComponent {...props} />);

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });

  it('snapshot content is empty', () => {
    component.setProps({ content: null });

    const cardWrap = component.find('.car-card-wrap');
    const cardTitle = component.find('.car-card__title');
    const cardTotal = component.find('.car-card__total-price');
    const cardImg = component.find('.car-card__img');

    expect(cardWrap.hasClass('d-none')).toEqual(true);
    expect(cardWrap.hasClass('d-md-block')).toEqual(false);

    expect(cardTitle.isEmptyRender()).toEqual(true);
    expect(cardTotal.isEmptyRender()).toEqual(true);
    expect(cardImg.isEmptyRender()).toEqual(true);
  });
});
