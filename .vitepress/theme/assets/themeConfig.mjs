// 主题配置
export const themeConfig = {
  // 站点信息
  siteMeta: {
    // 站点标题
    title: "雨猫化学",
    // 站点描述
    description: "记录化学学习笔记、微专题与竞赛资料。",
    // 站点logo
    logo: "/images/logo/logo.webp",
    // 站点地址
    site: "https://chemistry.raineko.net",
    // 语言
    lang: "zh-CN",
    // 作者
    author: {
      name: "雨猫化学",
      cover: "/images/logo/logo.webp",
      link: "https://raineko.net",
    },
  },
  // 备案信息
  icp: "萌ICP备20250501号",
  // 建站日期
  since: "2026-01-03",
  // 版权起始年份
  copyrightStartYear: 2025,
  // 每页文章数据
  postSize: 8,
  // inject
  inject: {
    // 头部
    // https://vitepress.dev/zh/reference/site-config#head
    header: [
      // favicon
      ["link", { rel: "icon", href: "/favicon.ico" }],
      // RSS
      [
        "link",
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS",
          href: "https://chemistry.raineko.net/rss.xml",
        },
      ],
      // iconfont
      [
        "link",
        {
          rel: "stylesheet",
          href: "/fonts/iconfont.css",
        },
      ],
    ],
  },
  // 导航栏菜单
  nav: [
    {
      text: "文库",
      items: [
        { text: "文章列表", link: "/pages/archives", icon: "article" },
        { text: "全部分类", link: "/pages/categories", icon: "folder" },
        { text: "全部标签", link: "/pages/tags", icon: "hashtag" },
      ],
    },
    {
      text: "工具",
      items: [{ text: "元素周期表", link: "/pages/tools", icon: "tools" }],
    },
    {
      text: "友链",
      items: [{ text: "友情链接", link: "/pages/link", icon: "people" }],
    },
    {
      text: "雨猫",
      items: [{ text: "致谢名单", link: "/pages/thanks", icon: "reward" }],
    },
  ],
  // 导航栏菜单 - 左侧
  navMore: [
    {
      name: "博客",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "雨猫主页",
          url: "https://raineko.net",
        },
      ],
    },
    {
      name: "站点",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "雨猫化学",
          url: "https://chemistry.raineko.net",
        },
      ],
    },
    {
      name: "项目",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "雨猫化学源码",
          url: "https://github.com/CatsYezuan/Raineko-Chemistry",
        },
        {
          icon: "/images/logo/logo.webp",
          name: "雨猫主页",
          url: "https://raineko.net",
        },
      ],
    },
  ],
  // 封面配置
  cover: {
    // 是否开启双栏布局
    twoColumns: false,
    // 是否开启封面显示
    showCover: {
      // 是否开启封面显示 文章不设置cover封面会显示异常，可以设置下方默认封面
      enable: false,
      // 封面布局方式: left | right | both
      coverLayout: "both",
      // 默认封面(随机展示)
      defaultCover: [],
    },
  },
  // 页脚信息
  footer: {
    // 社交链接（请确保为偶数个）
    social: [
      {
        icon: "github",
        link: "https://github.com/CatsYezuan",
      },
    ],
    // sitemap
    sitemap: [
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/pages/categories" },
          { text: "全部标签", link: "/pages/tags" },
          { text: "文章归档", link: "/pages/archives", newTab: true },
        ],
      },
      {
        text: "项目",
        items: [
          {
            text: "雨猫化学源码",
            link: "https://github.com/CatsYezuan/Raineko-Chemistry",
            newTab: true,
          },
          { text: "雨猫主页", link: "https://raineko.net", newTab: true },
        ],
      },
      {
        text: "工具",
        items: [{ text: "元素周期表", link: "/pages/tools" }],
      },
      {
        text: "页面",
        items: [
          { text: "关于本站", link: "/pages/about" },
          { text: "隐私政策", link: "/pages/privacy" },
          { text: "版权协议", link: "/pages/cc" },
        ],
      },
      {
        text: "服务",
        items: [
          { text: "雨猫主页", link: "https://raineko.net", newTab: true },
          { text: "站点订阅", link: "https://chemistry.raineko.net/rss.xml", newTab: true },
        ],
      },
    ],
  },
  // 侧边栏
  aside: {
    // 站点简介
    hello: {
      enable: true,
      text: "这里整理<strong>化学学习</strong>笔记、<strong>微专题</strong>与<strong>竞赛资料</strong>，希望能为你的学习带来一点帮助。",
    },
    // 目录
    toc: {
      enable: true,
    },
    // 标签
    tags: {
      enable: true,
    },
    // 倒计时
    countDown: {
      enable: false,
      // 倒计时日期
      data: {
        name: "春节",
        date: "2026-02-17",
      },
    },
    // 站点数据
    siteData: {
      enable: true,
    },
  },
  // 友链
  friends: {
    // 动态友链
    dynamicLink: {
      server: "",
      app_token: "",
      table_id: "",
    },
  },
  // 音乐播放器
  music: {
    enable: false,
    url: "",
    // id
    id: 9379831714,
    // netease / tencent / kugou
    server: "netease",
    // playlist / album / song
    type: "playlist",
  },
  // 本地搜索
  search: {
    enable: true,
  },
  // 打赏
  rewardData: {
    enable: false,
    wechat: "",
    alipay: "",
  },
  // 图片灯箱
  fancybox: {
    enable: true,
  },
  // 外链中转
  jumpRedirect: {
    enable: true,
    // 排除类名
    exclude: [
      "cf-friends-link",
      "icp",
      "author",
      "rss",
      "cc",
      "power",
      "social-link",
      "link-text",
      "travellings",
      "post-link",
      "report",
      "more-link",
      "skills-item",
      "right-menu-link",
      "link-card",
      "hitokoto-link",
    ],
  },

  /* 站点统计
  tongji: {
    "51la": "",
  },
  */
};
