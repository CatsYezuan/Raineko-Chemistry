<!-- 本地站内搜索 -->
<template>
  <Modal
    :show="store.searchShow"
    title="站内搜索"
    titleIcon="search"
    @mask-click="closeSearch"
    @modal-close="closeSearch"
  >
    <div class="local-search">
      <label class="search-box">
        <i class="iconfont icon-search" />
        <input
          ref="inputRef"
          v-model.trim="query"
          type="search"
          autocomplete="off"
          placeholder="搜索文章、页面或关键词"
          @keydown.esc="closeSearch"
          @keydown.enter="openFirstResult"
        />
        <kbd>Enter</kbd>
      </label>
      <div v-if="query" class="result-meta">找到 {{ results.length }} 条结果</div>
      <div v-if="results.length" class="search-list">
        <button
          v-for="item in results"
          :key="item.url"
          type="button"
          class="search-item s-card hover"
          @click="jumpSearch(item.url)"
        >
          <span class="title">{{ item.title }}</span>
          <span class="path">{{ item.url }}</span>
          <span v-if="item.description" class="description">{{ item.description }}</span>
        </button>
      </div>
      <div v-else class="empty-state">
        <i :class="['iconfont', query ? 'icon-search-empty' : 'icon-search']" />
        <span>{{ query ? "没有找到匹配内容" : "输入关键词开始搜索" }}</span>
      </div>
      <p class="local-tip">搜索索引随网站构建生成，不会将关键词发送给第三方。</p>
    </div>
  </Modal>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();
const router = useRouter();
const { theme } = useData();
const query = ref("");
const inputRef = ref(null);
const normalize = (value) => String(value || "").toLocaleLowerCase("zh-CN");

const results = computed(() => {
  const words = normalize(query.value).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return (theme.value.searchIndex || [])
    .map((item) => {
      const title = normalize(item.title);
      const text = normalize(`${item.title} ${item.keywords} ${item.description}`);
      if (!words.every((word) => text.includes(word))) return null;
      const score = words.reduce(
        (total, word) =>
          total +
          (title === word ? 100 : title.startsWith(word) ? 40 : title.includes(word) ? 20 : 1),
        0,
      );
      return { ...item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
});

const closeSearch = () => {
  if (store.searchShow) store.changeShowStatus("searchShow");
  query.value = "";
};
const jumpSearch = (url) => {
  closeSearch();
  router.go(url);
};
const openFirstResult = () => {
  if (results.value[0]) jumpSearch(results.value[0].url);
};

watch(
  () => store.searchShow,
  (show) => show && nextTick(() => inputRef.value?.focus()),
);
</script>

<style lang="scss" scoped>
.local-search {
  min-height: 360px;
  .search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    border: 1px solid var(--main-card-border);
    border-radius: 12px;
    background: var(--main-card-second-background);
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
    &:focus-within {
      border-color: var(--main-color);
      box-shadow: 0 8px 22px -12px var(--main-color);
    }
    input {
      flex: 1;
      min-width: 0;
      height: 48px;
      border: 0;
      outline: 0;
      color: var(--main-font-color);
      background: transparent;
      font: inherit;
    }
    kbd {
      padding: 2px 7px;
      border: 1px solid var(--main-card-border);
      border-radius: 6px;
      color: var(--main-font-second-color);
      font-size: 11px;
    }
  }
  .result-meta {
    margin: 14px 2px 8px;
    color: var(--main-font-second-color);
    font-size: 13px;
  }
  .search-list {
    max-height: 430px;
    overflow-y: auto;
  }
  .search-item {
    display: grid;
    grid-template-columns: 1fr auto;
    width: 100%;
    margin-bottom: 9px;
    padding: 12px 14px;
    border: 1px solid var(--main-card-border);
    color: inherit;
    text-align: left;
    cursor: pointer;
    .title {
      font-size: 16px;
      font-weight: 600;
    }
    .path {
      color: var(--main-color);
      font-size: 12px;
    }
    .description {
      grid-column: 1 / -1;
      margin-top: 5px;
      overflow: hidden;
      color: var(--main-font-second-color);
      font-size: 13px;
      line-height: 1.5;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .empty-state {
    display: flex;
    min-height: 250px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--main-font-second-color);
    .iconfont {
      font-size: 36px;
    }
  }
  .local-tip {
    margin: 16px 0 0;
    color: var(--main-font-second-color);
    font-size: 12px;
    text-align: center;
  }
}
</style>
