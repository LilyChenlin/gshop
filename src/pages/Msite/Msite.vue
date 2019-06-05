<!-- Msite -->
<template>
  <div>
      <section class="msite">
          <!-- 首页头部 -->
          <HeaderTop :title="address.name">
            <!-- <router-link slot="left" class="header_search"></router-link>
            <router-link slot="right" class="header_login"></router-link> -->
            <span class="header_search" slot="left">
              <i class="iconfont icon-icon_sousuo_xian"></i>
            </span>
            <span class="header_login" slot="right">
              <span class="header_login_text">登录|注册</span>
            </span>
          </HeaderTop>

          <!-- 首页轮播图 -->
          <nav class="msite_nav">
          <!-- 判断从后端加载的数据是否获取完 -->
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(pages,index) in categoryArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(data,index) in pages" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl + data.image_url">
                  </div>
                  <span>{{data.title}}</span>
                </a>

              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back" v-else>
          </nav>

          <div class="msite_shop_list">
            <div class="shop_header">
              <i class="iconfont icon-xuanxiang"></i>
              <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList></ShopList>
          </div>
      </section>
  </div>
</template>

<script>
import Swiper from 'swiper'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import 'swiper/dist/css/swiper.min.css'
import ShopList from '../../components/ShopList/ShopList.vue'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      baseImageUrl:'http://fuss10.elemecdn.com'
    };
  },
  //注意在页面加载完成之后再进行swriper的初始化
  mounted () {
    //在组件中分发action
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  components:{
    HeaderTop,
    ShopList
  },
  computed : {
    ...mapState(['address','categorys']),
    categoryArr () {
        const {categorys} = this
        // 准备空的2维数组
        const arr = []
        // 准备一个小数组(最大长度为8)
        let minArr = []
        // 遍历categorys
        categorys.forEach(data => {
          // 如果当前小数组已经满了, 创建一个新的
          if(minArr.length===8) {
            minArr = []
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if(minArr.length===0) {
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(data)
        })
        return arr
      }
  },
  watch: {
    //分页器Swiper其实应该是在轮播列表显示(即categorys数组有了数据)以后才初始化。
    //最开始categorys为空数组，有了数据才会显示轮播列表，而要监视categorys的数据变化，就要用到watch。

    //监听categorys
    categorys (value) {
      //但其实state里的状态数据改变（categorys接收数据）与异步更新界面（显示轮播列表）是两个步骤。
      //所以需要等待界面完成异步更新后才可以进行Swiper的初始化。
      //利用vm.$nextTick( [callback] )来实现等待界面完成异步更新就立即创建Swiper对象
      this.$nextTick(() => {
        //一旦界面完成更新，就立即创建Swiper对象
        new Swiper('.swiper-container', {
          autoPlay : true,
          //如果需要分页器
          pagination: {
            el :'.swiper-pagination',
            clickable :true
          }
        })
      })
    }
  }

}

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-icon_sousuo_xian
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
           

</style>



