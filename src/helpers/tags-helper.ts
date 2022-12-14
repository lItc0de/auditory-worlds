export const getTagLink = (page: string|undefined, tag: string, activeTag?: string) => {
  const path = activeTag === tag ? '' : tag;

  return `/${path}`;
};
