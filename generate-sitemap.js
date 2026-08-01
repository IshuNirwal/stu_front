// generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { SitemapStream, streamToPromise } from 'sitemap';

// Needed to simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load router file
const routerPath = path.resolve(__dirname, 'src', 'Router.js');
const code = fs.readFileSync(routerPath, 'utf-8');

// Parse the code to AST
const ast = parse(code, {
  sourceType: 'module',
  plugins: ['jsx'],
});

// Traverse AST to extract route paths
const routePaths = new Set();

traverse.default(ast, {
  JSXElement(path) {
    const { openingElement } = path.node;
    const tagName = openingElement.name.name;

    if (tagName === 'Route') {
      const pathAttr = openingElement.attributes.find(
        attr => attr.name?.name === 'path'
      );

      if (pathAttr?.value?.type === 'StringLiteral') {
        routePaths.add(pathAttr.value.value);
      }
    }
  }
});

// Create sitemap
const sitemap = new SitemapStream({ hostname: 'https://salarytopup.com' });
const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
const writeStream = fs.createWriteStream(sitemapPath);

const generateSitemap = async () => {
  for (const url of routePaths) {
    if (!url.includes('*')) {
      sitemap.write({ url: url.startsWith('/') ? url : `/${url}`, changefreq: 'weekly', priority: 0.8 });
    }
  }

  sitemap.end();

  const xmlBuffer = await streamToPromise(sitemap);
  let xml = xmlBuffer.toString();

  // Manually insert line breaks between tags (basic formatting)
  xml = xml.replace(/></g, '>\n<').replace(/<url>/g, '\n  <url>').replace(/<\/url>/g, '</url>\n');
  const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`✅ Sitemap written to: ${sitemapPath} with ${routePaths.size} routes`);
};

generateSitemap().catch(console.error);
