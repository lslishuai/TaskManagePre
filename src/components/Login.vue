<template>
  <div class="Login">
    <div>
      <div class="top">
        <h2>欢迎光临</h2>
      </div>
      <div class="center">
        <!-- 输入任意文本 -->
        <van-field required clearable v-model="text" label="文本" placeholder="请输入用户名"/>
        <!-- 输入密码 -->
        <van-field required clearable v-model="password" type="password" label="密码" placeholder="请输入密码"/>
      </div>
      <div class="button">
        <van-button type="default" style="margin-right: 20%;margin-left: 13%" v-on:click="onClick">登录</van-button>
        <van-button type="default">退出</van-button>
      </div>
    </div>
    <!--可以将登录和选择设为同一级路由，然后建一个上级路由，重定向为登录，点击登录按钮时调用上级路由进行路由切换-->
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        text: '',
        password: '',
        show:true
      };
    },

    methods: {
      //底部菜单选择
      onClick(index) {
        this.$router.push({
          path: '/choose'
        });
        console.log("点击登录按钮");
        console.log('66666'+index);
      },
    },
    created: function () {
      localStorage.setItem('userId',"0002");
    },
    beforeMount: function () {
    },
    mounted: function () {
    },
  };
</script>

<style lang="less">
  .Login{
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
