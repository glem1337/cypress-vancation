import * as yup from 'yup';

import yupLocale from 'locales/yup';
import { isHexColor } from './validations/css';
import { rangeNumberStr } from './validations/rangeNumberStr';
import { geocoder } from './validations/geocoder';
import { isICALFormat } from './validations/isICALFormat';

yup.setLocale(yupLocale);

yup.addMethod(yup.string, 'isHexColor', isHexColor);

yup.addMethod(yup.string, 'rangeNumberStr', rangeNumberStr);

yup.addMethod(yup.string, 'isICALFormat', isICALFormat);

yup.addMethod(yup.object, 'geocoder', geocoder);

export default yup;
