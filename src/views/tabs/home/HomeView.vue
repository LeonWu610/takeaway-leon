<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import type { ICountdown, IHomeInfo } from '@/types'
import OploadingView from '@/components/OploadingView.vue'
import ScrollBar from './components/ScrollBar.vue'
import TheTransformer from './components/TheTransformer.vue'
import CountDown from './components/CountDown.vue'
import OpSwipe from '@/components/swipe/OpSwipe'
import OpSwipeItem from '@/components/swipe/OpSwipeItem'
import { PRIMARY_COLOR, TRANSPARENT } from '@/config'
import { ref } from 'vue'
import { HOME_TABS } from './config'

const [isSearchViewShown, toggleSearchView] = useToggle(false)

const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecommends: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: []
} as IHomeInfo)

const tabBackgroundColor = ref(TRANSPARENT)
const onTabScroll = ({ isFixed }: { isFixed: boolean }) => {
  tabBackgroundColor.value = isFixed ? 'white' : TRANSPARENT
}
</script>

<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <div v-show="!isSearchViewShown">
      <TheTop :recommends="data.searchRecommends" @searchClick="toggleSearchView" />
      <OploadingView :loading="pending" type="skeleton">
        <div class="home-page__banner">
          <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
        </div>
        <TheTransformer :data="data.transformer"></TheTransformer>
        <ScrollBar :data="data.scrollBarInfoList"></ScrollBar>
        <div class="home-page__activity">
          <CountDown :data="data.countdown"></CountDown>
          <OpSwipe class="home-page__activity__swipe" :autoplay="3000" :loop="true">
            <OpSwipeItem v-for="v in data.activities" :key="v"><img :src="v" /></OpSwipeItem>
          </OpSwipe>
        </div>
        <VanTabs
          sticky
          offsetTop="54px"
          :color="PRIMARY_COLOR"
          :background="tabBackgroundColor"
          @scroll="onTabScroll"
        >
          <VanTab v-for="v in HOME_TABS" :key="v.value" :title="v.title">
            <component :is="v.component"></component>
          </VanTab>
        </VanTabs>
      </OploadingView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-enter-to {
  opacity: 0;
}

.home-page {
  background: var(--op-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }
  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
