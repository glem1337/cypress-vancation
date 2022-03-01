import detectCamperStepHelper from '../detectCamperStepHelper';

describe('detectCamperStepHelper helper', () => {
  it('when camper was not provided', () => {
    const steps = detectCamperStepHelper();

    expect(steps).toEqual({
      1: false,
      2: false,
      3: false,
      4: false,
    });
  });

  it('when first step was completed', () => {
    const camper = {
      specificationDetail: true,
    };

    const steps = detectCamperStepHelper(camper);

    expect(steps).toEqual({
      1: true,
      2: false,
      3: false,
      4: false,
    });
  });

  it('when second step was completed', () => {
    const camper = {
      specificationDetail: true,
      insuranceInfo: true,
    };

    const steps = detectCamperStepHelper(camper);

    expect(steps).toEqual({
      1: true,
      2: true,
      3: false,
      4: false,
    });
  });

  it('when second step was completed', () => {
    const camper = {
      specificationDetail: true,
      insuranceInfo: true,
      name: true,
    };

    const steps = detectCamperStepHelper(camper);

    expect(steps).toEqual({
      1: true,
      2: true,
      3: true,
      4: false,
    });
  });

  it('when all steps were completed', () => {
    const camper = {
      specificationDetail: true,
      insuranceInfo: true,
      name: true,
      camperRule: true,
    };

    const steps = detectCamperStepHelper(camper);

    expect(steps).toEqual({
      1: true,
      2: true,
      3: true,
      4: true,
    });
  });
});
