/* eslint-disable consistent-return */


export const checkContext = (context) => {
  if (!context) {
    return false;
  }
  let hasContext = false;
  context.forEach(({ name }) => {
    if (name.toString().includes('mia-electronic-solution')) {
      hasContext = true;
    }
  });
  return hasContext;
};
