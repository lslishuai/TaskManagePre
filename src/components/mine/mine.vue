<template>
  <div class="mine">
    <div class="top">
      456
    </div>
    <div class="message">
      <div class="left">
      <van-image
        round
        width="100%"
        height="100%"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      </div>
      <div class="right">
        <van-cell><h3>Hi , {{this.user.name}}</h3></van-cell>
        <van-cell><h3>积分：  {{this.user.amount}}</h3></van-cell>
      </div>
    </div>
    <div style="margin-top:30px;line-height: 10px ">
      <van-cell title="监督关系管理" style="margin-bottom: 13px"  is-link/>
      <van-cell title="待审核列表"   is-link/>
    </div>
    <div style="margin-top:30px ">
      <van-cell title="兑换记录"   is-link/>
    </div>




  </div>
</template>

<script>
  import { quaryUserMsg } from "../../api/target/user";
  import Toast from "vant/es/toast";
  export default {
    name: 'mine',
    data(){
      return{
        user:{}
      }
    },
    methods:{
      quaryUserMsg() {
        let userId = localStorage.getItem('userId');
        quaryUserMsg({
          "userId": userId
        }).then(res => {
          if (res.data.msg == 'SUCCESS') {
            this.user=res.data.data;
          } else {
            Toast.success('任务列表获取失败');
          }
        }).catch(err => {
          console.log(err);
        });
      }
    },
    created () {
      this.quaryUserMsg();
    }
  }
</script>

<style lang="less">
  .mine{
    .van-cell{
      padding: 0;
      margin: 0;
      padding-left: 15px;
    }
    .top{
      border:1px solid #dc0022;
      display: block;
      float: top;
      margin-top: 0;
      padding-top: 0;
      width: 100%;
      height:70% ;
    }
    .message{
      /*margin-left: 5%;*/
      height: 7%;
      width: 100%;
      margin: 10px;
      display:-webkit-flex;
      flex: 1 1 auto;
      flex-direction: row;
      display: flex;
    }
    .left{
      width: 32%;
    }
    .right{
      width: 50%;
    }
  }
</style>
