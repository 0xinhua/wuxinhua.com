import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

async function downloadImage(url: string, filepath: string): Promise<void> {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer'
  });
  await writeFile(filepath, response.data);
}

async function main(articleUrl: string, folderName: string): Promise<void> {
  try {
    // 创建目标文件夹
    const folderPath = path.join(process.cwd(), 'public', 'assets', 'blog', folderName);
    await mkdir(folderPath, { recursive: true });

    // 获取文章内容
    const response = await axios.get(articleUrl);
    const $ = cheerio.load(response.data);

    // 查找所有图片，排除 class="navbar-buttons" 内的 img
    const images = $('article img:not(.navbar-buttons img)').map((i, el) => $(el).attr('src')).get();

    // 下载图片
    for (let i = 0; i < images.length; i++) {
      const imageUrl = images[i];
      const filename = `image_${i + 1}${path.extname(imageUrl)}`;
      const filepath = path.join(folderPath, filename);
      
      console.log(`Downloading: ${imageUrl}`);
      await downloadImage(imageUrl, filepath);
      console.log(`Saved as: ${filepath}`);
    }

    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

if (require.main === module) {
  const [articleUrl, folderName] = process.argv.slice(2);
  if (articleUrl && folderName) {
    main(articleUrl, folderName);
  } else {
    console.log('Usage: ts-node image.ts <articleUrl> <folderName>');
  }
}

// 由于图片cdn问题，需将图片下载到本地，使用示例
// main('https://321letter.substack.com/p/further-away-from-30', 'further-away-from-30');

export { main };