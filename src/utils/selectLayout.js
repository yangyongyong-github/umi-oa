export const selectLayout = (pathName) => {
  return pathName.includes('/users') ? 'LoginLayout' : 'BaseLayout';
};
