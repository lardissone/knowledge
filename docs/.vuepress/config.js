const getConfig = require('vuepress-bar')

module.exports = {
  title: 'My Knowledge Base',
  description: 'Everything I know',
  themeConfig: {
    ...getConfig(`${__dirname}/..`, {
        addReadMeToFirstGroup: false,
        maxLevel: 8
    })
  },
  plugins: [
    '@vuepress/last-updated',
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom'
  ]
}
