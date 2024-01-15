import { MetadataRoute } from "next"
 
// @ts-ignore
const robots: MetadataRoute.Robots = () => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://wuxinhua.com/sitemap.xml",
  }
}
 
export default robots