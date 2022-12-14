const path = require(`path`); // eslint-disable-line @typescript-eslint/no-var-requires

const blacklist = ['project1', 'project2'];

const getTags = (rawTags) =>
  rawTags.reduce((tags, currentTags) => {
    const currentTagsArray = currentTags.split(/\s*(?:,|$)\s*/);
    const newTags = [...tags];

    currentTagsArray.forEach((currentTag) => {
      if (
        tags.indexOf(currentTag) === -1 &&
        blacklist.indexOf(currentTag) === -1
      ) {
        newTags.push(currentTag);
      }
    });

    return newTags;
  }, []);

exports.createPages = async ({ actions, graphql }) => {
  const {
    data: { notes },
  } = await graphql(`
    query {
      notes: allMarkdownRemark(
        sort: { frontmatter: { date: ASC } }
      ) {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `);

  const tags = getTags(
    notes.nodes.map(({ frontmatter: { tags } }) => tags)
  );

  actions.createPage({
    path: '/',
    component: path.resolve(`./src/page-templates/index-template.tsx`),
    context: {
      tagsRegex: `/^.*$/i`,
      page: 'notes',
      tags: tags,
      tag: '',
    },
  });

  tags.forEach((tag) => {
    actions.createPage({
      path: `${tag}`,
      component: path.resolve(`./src/page-templates/index-template.tsx`),
      context: {
        tagsRegex: `/^(?=.*${tag}).*$/i`,
        page: 'notes',
        tags: tags,
        tag,
      },
    });
  });
};
