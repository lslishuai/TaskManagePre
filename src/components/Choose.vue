<template>
  <div className="choose">
      <router-view ></router-view>
    <!--    底部菜单-->
    <div  v-if="footShow" class="footer">
      <van-tabbar v-model="active" v-on:>
        <van-tabbar-item icon="label-o" v-on:click="onClick('1')">任务</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" v-on:click="onClick('2')">商城</van-tabbar-item>
        <van-tabbar-item icon="manager" v-on:click="onClick('3')">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'choose',
    data () {
      return {
        active: 0,
        footShow:true,
        flag:1,
      };
    },

    methods: {
      //底部菜单选择
      onClick (index) {
        console.log('66666' + index);
        switch (index) {
          case '1': this.$router.push({
            name:"targetList"
          });break;
          case '2': this.$router.push({
            name: 'shopping'
          });break;
          case '3': this.$router.push({
            name: 'mine'
          });break;
        }
      },
    },
    watch: {
      'flag': function(newVal) {
        //监听flag的编号
      },
    },
    created: function() {
    },
    beforeMount: function() {
    },
    mounted: function() {
    },
  };
</script>

<style lang="less">
  .choose {
    .footer {
      display: flex;
      position: absolute;
      left: 0;
      bottom: 0;
      box-sizing: border-box;
      height: 55px;
      background: #909090;
      width: 100%;
    }

    .itemSort {
      width: 100%;
      line-height: 100px; /*让div中的文字内容垂直居中*/
      text-align: center; /*让文字水平居中*/
    }
  }

</style>
