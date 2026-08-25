# 雨猫化学

雨猫化学是一个基于 VitePress 的静态化学学习资料站，收录化学学习笔记、微专题与竞赛相关内容。

## 技术栈

- VitePress 1、Vue 3、Sass
- Pinia 与 Vue Router
- PWA、RSS、sitemap
- MiSans 本地 WOFF2 字体

## 本地开发

需要 Node.js 20 或更高版本，以及 pnpm。

```bash
pnpm install
pnpm dev
```

本地预览默认运行在 `http://localhost:9877`。

## 构建

```bash
pnpm build
```

构建产物位于 `.vitepress/dist`，会同时生成 `sitemap.xml` 与 `rss.xml`。

## Vercel 部署

将仓库导入 Vercel 后，使用以下配置：

- Build Command：`pnpm build`
- Output Directory：`.vitepress/dist`
- Node.js：20 或更高版本

部署完成后，将自定义域名 `chemistry.raineko.net` 指向该项目即可。

## 内容与配置

- 文章：`posts/`
- 普通页面：`pages/`
- 站点配置：`.vitepress/theme/assets/themeConfig.mjs`
- 本地字体与图标：`public/`

搜索服务的公开配置写在站点配置中；请勿将管理密钥或其他私密凭据提交到仓库。

## 主题来源

本站基于 [vitepress-theme-curve](https://github.com/imsyy/vitepress-theme-curve) 改造，保留其 MIT 许可证与来源说明。
