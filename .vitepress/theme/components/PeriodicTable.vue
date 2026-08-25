<template>
  <section class="periodic-tool">
    <header class="tool-header">
      <div>
        <span class="eyebrow">CHEMISTRY TOOL</span>
        <h1>元素周期表</h1>
        <p>包含 118 个元素。可按名称、元素符号或原子序数搜索，点击元素查看分类与周期信息。</p>
      </div>
      <div class="selected-card" :class="`type-${selected.category}`">
        <span class="number">{{ selected.number }}</span>
        <strong>{{ selected.symbol }}</strong>
        <span class="name">{{ selected.name }}</span>
      </div>
    </header>

    <div class="toolbar s-card">
      <label class="element-search">
        <i class="iconfont icon-search" />
        <input v-model.trim="query" type="search" placeholder="搜索：氧、O、8" />
      </label>
      <select v-model="category" aria-label="按元素类别筛选">
        <option value="all">全部类别</option>
        <option v-for="(label, key) in elementCategories" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
      <button v-if="query || category !== 'all'" type="button" @click="resetFilters">重置</button>
    </div>

    <div class="legend" aria-label="元素类别图例">
      <button
        v-for="(label, key) in elementCategories"
        :key="key"
        type="button"
        :class="['legend-item', `type-${key}`, { active: category === key }]"
        @click="category = category === key ? 'all' : key"
      >
        <span />{{ label }}
      </button>
    </div>

    <div class="table-scroll" tabindex="0" aria-label="元素周期表，可横向滚动">
      <div class="periodic-grid">
        <button
          v-for="element in elements"
          :key="element.number"
          type="button"
          :class="[
            'element-cell',
            `type-${element.category}`,
            { muted: !isVisible(element), selected: selected.number === element.number },
          ]"
          :style="{ gridColumn: element.column, gridRow: element.row }"
          :aria-label="`${element.number}号元素 ${element.name} ${element.symbol}`"
          @click="selectElement(element)"
        >
          <span class="atomic-number">{{ element.number }}</span>
          <strong>{{ element.symbol }}</strong>
          <span class="element-name">{{ element.name }}</span>
        </button>
      </div>
    </div>

    <aside class="detail-panel s-card">
      <div class="detail-symbol" :class="`type-${selected.category}`">
        <span>{{ selected.number }}</span>
        <strong>{{ selected.symbol }}</strong>
      </div>
      <div class="detail-copy">
        <span class="detail-label">当前元素</span>
        <h2>{{ selected.name }}</h2>
        <p>
          {{ selected.categoryName }} · 第 {{ selected.period }} 周期<span v-if="selected.group">
            · 第 {{ selected.group }} 族</span
          >
        </p>
      </div>
      <dl>
        <div>
          <dt>原子序数</dt>
          <dd>{{ selected.number }}</dd>
        </div>
        <div>
          <dt>元素符号</dt>
          <dd>{{ selected.symbol }}</dd>
        </div>
        <div>
          <dt>所属类别</dt>
          <dd>{{ selected.categoryName }}</dd>
        </div>
        <div>
          <dt>周期位置</dt>
          <dd>第 {{ selected.period }} 周期</dd>
        </div>
      </dl>
    </aside>
  </section>
</template>

<script setup>
import { elements, elementCategories } from "@/assets/elementData.mjs";

const query = ref("");
const category = ref("all");
const selected = ref(elements[0]);
const normalizedQuery = computed(() => query.value.toLocaleLowerCase("zh-CN"));

const isVisible = (element) => {
  const matchesCategory = category.value === "all" || element.category === category.value;
  const keyword = normalizedQuery.value;
  const matchesQuery =
    !keyword ||
    element.name.toLocaleLowerCase("zh-CN").includes(keyword) ||
    element.symbol.toLocaleLowerCase("zh-CN").includes(keyword) ||
    String(element.number) === keyword;
  return matchesCategory && matchesQuery;
};
const selectElement = (element) => {
  selected.value = element;
};
const resetFilters = () => {
  query.value = "";
  category.value = "all";
};
</script>

<style lang="scss" scoped>
$types: (
  alkali: #ef6c78,
  alkaline: #e7a044,
  transition: #d0a93d,
  post: #5e9cca,
  metalloid: #57a98c,
  nonmetal: #5b9f65,
  halogen: #5c9fd2,
  noble: #8974d1,
  lanthanide: #bc6fa4,
  actinide: #c16b85,
);
@each $name, $color in $types {
  .type-#{$name} {
    --element-color: #{$color};
  }
}
.periodic-tool {
  width: 100%;
  padding: 1rem 0 3rem;
}
.tool-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.5rem;
  .eyebrow {
    color: var(--main-color);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.16em;
  }
  h1 {
    margin: 0.35rem 0;
    font-size: clamp(2rem, 5vw, 3.6rem);
    line-height: 1.08;
  }
  p {
    max-width: 650px;
    margin: 0;
    color: var(--main-font-second-color);
  }
}
.selected-card,
.detail-symbol {
  position: relative;
  flex: 0 0 auto;
  width: 112px;
  aspect-ratio: 1;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--element-color) 60%, transparent);
  border-radius: 20px;
  background: color-mix(in srgb, var(--element-color) 15%, var(--main-card-background));
  box-shadow: 0 18px 40px -25px var(--element-color);
  .number {
    position: absolute;
    top: 10px;
    left: 12px;
    font-size: 12px;
  }
  strong {
    display: block;
    margin-top: 12px;
    font-size: 42px;
    text-align: center;
  }
  .name {
    display: block;
    font-size: 13px;
    text-align: center;
  }
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  .element-search {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 9px;
    padding: 0 12px;
    border-radius: 10px;
    background: var(--main-card-second-background);
    input {
      width: 100%;
      height: 42px;
      border: 0;
      outline: 0;
      color: inherit;
      background: transparent;
      font: inherit;
    }
  }
  select,
  button {
    height: 42px;
    padding: 0 14px;
    border: 1px solid var(--main-card-border);
    border-radius: 10px;
    color: inherit;
    background: var(--main-card-background);
    font: inherit;
  }
  button {
    cursor: pointer;
  }
}
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 14px 0;
  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 9px;
    border: 1px solid transparent;
    border-radius: 999px;
    color: var(--main-font-second-color);
    background: transparent;
    font: inherit;
    font-size: 12px;
    cursor: pointer;
    span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--element-color);
    }
    &.active {
      border-color: var(--element-color);
      color: var(--main-font-color);
    }
  }
}
.table-scroll {
  width: 100%;
  overflow-x: auto;
  padding: 8px 2px 16px;
}
.periodic-grid {
  display: grid;
  grid-template-columns: repeat(18, minmax(52px, 1fr));
  grid-template-rows: repeat(9, 68px);
  gap: 5px;
  min-width: 1050px;
}
.element-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 1px solid color-mix(in srgb, var(--element-color) 55%, transparent);
  border-radius: 10px;
  color: var(--main-font-color);
  background: color-mix(in srgb, var(--element-color) 13%, var(--main-card-background));
  cursor: pointer;
  transition:
    transform 0.18s,
    opacity 0.18s,
    box-shadow 0.18s;
  .atomic-number {
    position: absolute;
    top: 4px;
    left: 6px;
    color: var(--main-font-second-color);
    font-size: 9px;
  }
  strong {
    font-size: 20px;
    line-height: 1.1;
  }
  .element-name {
    max-width: 100%;
    overflow: hidden;
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover,
  &.selected {
    z-index: 2;
    transform: translateY(-3px);
    box-shadow: 0 10px 18px -12px var(--element-color);
  }
  &.selected {
    outline: 2px solid var(--element-color);
    outline-offset: 1px;
  }
  &.muted {
    opacity: 0.12;
  }
}
.detail-panel {
  display: grid;
  grid-template-columns: auto 1fr minmax(360px, 1.5fr);
  align-items: center;
  gap: 20px;
  margin-top: 1rem;
  padding: 18px;
  .detail-symbol {
    width: 86px;
    border-radius: 16px;
    strong {
      margin-top: 16px;
      font-size: 32px;
    }
  }
  .detail-label {
    color: var(--main-color);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
  }
  h2 {
    margin: 2px 0;
    font-size: 24px;
  }
  p {
    margin: 0;
    color: var(--main-font-second-color);
    font-size: 13px;
  }
  dl {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin: 0;
  }
  dl div {
    padding: 8px 10px;
    border-radius: 9px;
    background: var(--main-card-second-background);
  }
  dt {
    color: var(--main-font-second-color);
    font-size: 11px;
  }
  dd {
    margin: 2px 0 0;
    font-size: 14px;
    font-weight: 600;
  }
}
@media (max-width: 768px) {
  .tool-header {
    align-items: center;
    .selected-card {
      width: 88px;
      border-radius: 16px;
      strong {
        font-size: 30px;
      }
    }
  }
  .toolbar {
    align-items: stretch;
    flex-direction: column;
    select,
    button {
      width: 100%;
    }
  }
  .detail-panel {
    grid-template-columns: auto 1fr;
    dl {
      grid-column: 1 / -1;
    }
  }
}
@media (max-width: 480px) {
  .tool-header {
    align-items: flex-start;
    flex-direction: column;
    .selected-card {
      display: none;
    }
  }
  .detail-panel {
    grid-template-columns: 1fr;
    .detail-symbol {
      display: none;
    }
    dl {
      grid-column: auto;
    }
  }
}
</style>
