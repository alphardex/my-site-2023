import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import type { APIContext } from "astro";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const projects = await getCollection("projects");

  return rss({
    // `<title>` field in output xml
    title: "Portfolio of Haobin Wang",
    // `<description>` field in output xml
    description: "本站点是创意前端工程师——王浩彬的项目作品集。",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    // @ts-ignore
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: projects.map((project) => ({
      ...project.data,
      content: sanitizeHtml(parser.render(project.body)),
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
