const initFancybox = async (themeConfig) => {
  if (!themeConfig.fancybox?.enable || typeof window === "undefined") return false;
  try {
    const [{ Fancybox }] = await Promise.all([
      import("@fancyapps/ui"),
      import("@fancyapps/ui/dist/fancybox/fancybox.css"),
    ]);
    Fancybox.bind("[data-fancybox]", {
      hideScrollbar: true,
      Hash: false,
      Carousel: { transition: "slide" },
      l10n: {
        CLOSE: "关闭",
        NEXT: "下一个",
        PREV: "上一个",
        ZOOMIN: "放大",
        ZOOMOUT: "缩小",
        DOWNLOAD: "下载",
      },
    });
    return true;
  } catch (error) {
    console.error("图片灯箱初始化失败", error);
    return false;
  }
};

export default initFancybox;
