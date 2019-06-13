<!--  -->
<template>
<div>
<div class="goods">
    <!-- 左侧的菜单选项 -->
      <div class="menu-wrapper">
        <ul>
            <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{current:index===currentIndex}" @click="clickMenuItem(index)">
              <span class="text bottom-border-1px">
                <img :src="item.icon" alt="" class="icon" v-if="item.icon">
                {{item.name}}
              </span>
            </li>

        </ul>
      </div>
      <!-- 右侧的食物列表 -->
      <div class="foods-wrapper">
        <!-- 右侧的食物列表是根据左侧的分类列表展现的-->
        <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
        <ul ref="foodsUl">
          <li class="food-list-hook"  v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
           	  <li v-for="(food,index) in good.foods" :key="index" class="food-item bottom-border-1px" @click="showFood(food)">
                <div class="icon">
                  <img :src="food.image" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div> 
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div> 
     <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="food"></Food>
</div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
import ShopCart from '../../../components/ShopCart/ShopCart'
export default {
  data () {
    return {
      scrollY:0,
      tops:[],
      food: {}
    };
  },
  mounted(){
    //使用axios请求mockjs的接口
    this.$store.dispatch('getShopGoods', () => {
      this.$nextTick (() => {
        //列表更新后执行
       this._initScroll()
       this._initTop()

      })
    }) 

  },
  computed:{
    ...mapState(['goods']),
    currentIndex () {
      //得到条件数据
      const {scrollY,tops} = this
      const index = tops.findIndex((top,index) => {
        return scrollY >= tops[index] && scrollY < tops[index + 1]
      })
      // console.log('currentIndex:' + index)
      //记录index 相当于在某个区间
      return index
    }
  },
  methods: {
    //收集滚动的数据，利用betterScroll对象来监听滚动事件
    //初始化滚动
    _initScroll () {
      //列表显示之后创建
      new BScroll ('.menu-wrapper', {
        click : true
      })
      //根据文档配置 scroll选项
      this.foodsScroll = new BScroll ('.foods-wrapper' , {
        probeType : 2, // 设置成因为惯性滑动不会触发
        click : true
      })

      //给右侧列表添加scroll监听
      this.foodsScroll.on('scroll',({x,y}) => {
        // console.log(x,y)
        this.scrollY = Math.abs(y)
      })

      //给右侧列表添加scrollEnd监听
      this.foodsScroll.on('scrollEnd',({x,y}) => {
        // console.log('scrollEnd',x,y)
        this.scrollY = Math.abs(y)
      })
    },
    //计算右侧分类标题到顶部的举例数组
    _initTop () {
      // 1. 初始化tops
      let top = 0
      const tops = []
      tops.push(top)

      // 2. 收集
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      
      //3.更新数据 
      this.tops = tops
    },
    clickMenuItem (index) {
      // console.log("index:" + index)
      let scrollY = this.tops[index]
      // console.log('scrollY:' + scrollY)
      //让点击的index=currentIndex
      this.scrollY = scrollY
      // console.log('This.scrollY:' + this.scrollY)
      this.foodsScroll.scrollTo(0,-scrollY,300)
    },
    showFood (food) {
      this.food = food
      //显示food组件 (在父组件中调用子组件对象的方法)
      this.$refs.food.toggleShow(food)

    }
  },
  components:{
    CartControl,
    Food,
    ShopCart
  }
}

</script>
<style lang="stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
