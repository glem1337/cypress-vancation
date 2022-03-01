import { createMediaMatcher } from 'react-media-match';

const CustomMatcher = createMediaMatcher({
  mobile: '(max-width: 991px)',
  desktop: '(min-width: 992px)',
});

export default CustomMatcher;
