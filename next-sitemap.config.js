/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bravoo.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './dist',
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://bravoo.in/sitemap.xml',
    ],
  },
}
