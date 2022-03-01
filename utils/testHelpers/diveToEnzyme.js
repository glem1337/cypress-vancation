// Helper to get wrapper of the actual STATEFUL (defined as class)
// component that resides inside shallow-rendered HOC
//
// Due to enzyme's instance() returning null for functional
// components, this function works only with ones that
// defined as class
// Enzyme's dive() dive only through HOC's
// so you can't reach nested components
// (dive() method may only be run on a single, non-DOM node)

// function diveTo(wrapper, TargetComponent) {
//   wrapper.single((n) => {
//     if (n && n.nodeType === 'host') {
// eslint-disable-next-line max-len
//       throw new Error('diveTo(): Target component not found, but other host component was reached (nested components is not supported by dive())');
//     }
//   });
//   const targetWrapper = wrapper.dive();
//   /* istanbul ignore next */
//   if (targetWrapper.instance() === null) {
// eslint-disable-next-line max-len
//     throw Error("diveTo(): Target component is not found in given wrapper's component hierarchy or is a functional component");
//   }
//   if (Object.getPrototypeOf(targetWrapper.instance()) === TargetComponent.prototype) {
//     return targetWrapper;
//   }
//   return diveTo(targetWrapper, TargetComponent);
// }

// export default diveTo;

// Possibly fixed version, that does not suffer from `instance()` returning `null`

function diveTo(wrapper, TargetComponent) {
  wrapper.single((n) => {
    if (n && n.nodeType === 'host') {
      throw new Error('diveTo(): Target component not found, but other host component was reached (nested components is not supported by dive())');
    }
  });

  // hack to work with component nesting in `withLayout` HOC
  if (wrapper.children().length === 1 && wrapper.instance() && wrapper.instance().constructor.name === 'withLayout') {
    /* istanbul ignore next */
    if (wrapper.children().type() === TargetComponent) { return wrapper.children().shallow(); }
    /* istanbul ignore next */
    return diveTo(wrapper.children().shallow(), TargetComponent);
  }

  // `.type()` returns type of current node, not a root component, so it needs one more .`dive()`
  if (wrapper.type() === TargetComponent) { return wrapper.dive(); }

  const targetWrapper = wrapper.dive();
  return diveTo(targetWrapper, TargetComponent);
}

export default diveTo;
