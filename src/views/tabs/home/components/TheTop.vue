<script setup lang="ts">
import type { ISearchRecommend } from '@/types'
import OpSearch from '@/components/OpSearch.vue'
interface IProps {
  recommends: ISearchRecommend[]
}

defineProps<IProps>()

interface IEmits {
  (e: 'searchClick'): void
}
const emits = defineEmits<IEmits>()
</script>

<template>
  <div class="home-top">
    <div class="top">
      <img class="location-icon" src="@/assets/imgs/index_page/location.png" />
      <div class="location">幸福小区(北一区东南门)</div>
      <img class="shopcart-icon" src="@/assets/imgs/index_page/shopcart.png" />
      <img class="comments-icon" src="@/assets/imgs/index_page/comments.png" />
    </div>
    <!-- <VanSearch
      shape="round"
      background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
      placeholder="肯德基疯狂星期四"
    >
      <template #right-icon>
        <div>搜索</div>
      </template>
    </VanSearch> -->
    <VanSticky>
      <OpSearch
        shape="round"
        background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
        placeholder="肯德基疯狂星期四"
        @inputClick="emits('searchClick')"
      >
        <template #right-icon>
          <div @click="emits('searchClick')">搜索</div>
        </template>
      </OpSearch>
    </VanSticky>
    <div class="search-recommend">
      <div v-for="v in recommends" :key="v.value" class="tag">{{ v.label }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-top {
  background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
  color: white;
  .top {
    display: flex;
    align-items: center;
    padding: 10px 10px 0 10px;
    line-height: 15px;
    font-size: 15px;
    font-weight: bold;
    .location-icon {
      width: 20px;
      height: 20px;
    }
    .shopcart-icon {
      width: 24px;
      height: 24px;
    }
    .location {
      flex: 1;
    }
    .comments-icon {
      width: 28px;
      height: 24px;
      margin-left: 10px;
    }
  }
  .search-recommend {
    display: flex;
    padding: 0 10px 8px;
    .tag {
      font-size: 12px;
      border-radius: 10px;
      background: rgb(242, 242, 242, 0.3);
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
}
</style>
<style lang="scss">
.home-top {
  .van-field__right-icon {
    margin-right: 0;
  }
}
</style>
