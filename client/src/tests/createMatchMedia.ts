import mediaQuery from 'css-mediaquery';

export const createMatchMedia = (width: number | string) => {
  return (query: string) => ({
    addEventListener: () => {},
    addListener: () => {},
    dispatchEvent,
    matches: mediaQuery.match(query, {
      width,
    }),
    media: query,
    onchange: () => {},
    removeEventListener: () => {},
    removeListener: () => {},
  });
};
