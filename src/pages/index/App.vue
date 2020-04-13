<template>
  <div class="App">
    <router-view ></router-view>
<!--可以将登录和选择设为同一级路由，然后建一个上级路由，重定向为登录，点击登录按钮时调用上级路由进行路由切换-->
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        status: '',
      };
    },

    methods: {
      //底部菜单选择
      change(index) {
        if (index ==0) {
          this.$router.push({
            path: '/login'
          });
          }else if(index ==1){
            this.$router.push({
              path: '/choosepage'
            });
          }
      },
    },
    created: function () {
      this.$router.push({
        path: '/login'
      });
    },
    beforeMount: function () {
    },
    mounted: function () {
    },
  };
</script>

<style lang="less">
  .App{
    .top {
      margin: auto;
      width: 50%;
      margin-top:15% ;
      /*border: 3px solid green;*/
      padding: 2%;
      text-align: center;/*让文字水平居中*/
    }
    .center {
      margin: auto;
      width: 80%;
      margin-top:8% ;
      /*border: 3px solid green;*/
      padding: 2%;
    }
    .button{
      margin: auto;
      width: 60%;
      margin-top:5% ;
      /*border: 3px solid green;*/
    }
  }
</style>
