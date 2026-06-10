import { copyFileSync, createReadStream, existsSync, mkdirSync } from 'node:fs';
import { basename, isAbsolute, join } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin, type ResolvedConfig } from 'vite';

const repoUploadedImages = [
  'watermarked_img_11321665646606839912.jpg',
  'watermarked_img_11539890353660775228.jpg',
  'watermarked_img_3758094186528968053.jpg',
  'watermarked_img_6231043378607359984.jpg',
  'watermarked_img_8512971140518397507.jpg',
];

const repoUploadedImagesPlugin = (): Plugin => {
  let resolvedConfig: ResolvedConfig;

  return {
    name: 'repo-uploaded-images',
    configResolved(config) {
      resolvedConfig = config;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = req.url?.split('?')[0] ?? '';
        const fileName = basename(urlPath);

        if (!urlPath.startsWith('/assets/') || !repoUploadedImages.includes(fileName)) {
          next();
          return;
        }

        const sourcePath = join(server.config.root, fileName);
        if (!existsSync(sourcePath)) {
          next();
          return;
        }

        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'image/jpeg');
        createReadStream(sourcePath).pipe(res);
      });
    },
    closeBundle() {
      const outDir = isAbsolute(resolvedConfig.build.outDir)
        ? resolvedConfig.build.outDir
        : join(resolvedConfig.root, resolvedConfig.build.outDir);
      const assetsDir = join(outDir, 'assets');
      mkdirSync(assetsDir, { recursive: true });

      repoUploadedImages.forEach((fileName) => {
        const sourcePath = join(resolvedConfig.root, fileName);
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, join(assetsDir, fileName));
        }
      });
    },
  };
};

export default defineConfig({
  plugins: [react(), repoUploadedImagesPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
