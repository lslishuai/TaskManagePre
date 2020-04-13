<template>
  <div class="shoppingCenter">
    <!--    //顶部导航栏-->
<!--    <van-nav-bar title="积分商城"></van-nav-bar>-->
<!--    <div class="top"> <h3>积分商城</h3></div>-->
    <!--    //顶部导航栏-->
    <van-nav-bar title="积分商城"   right-text="新建奖品"
                 @click-right="onClickRight"
    />



    <div >
<!--          <goods-list ></goods-list>-->
<!--          <goods-list></goods-list>-->
<!--          <goods-list></goods-list>-->
<!--          <goods-list></goods-list>-->
<!--          <goods-list></goods-list>-->
      <!--    //奖品列表-->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="goodsList"
        >
           <goods-list  :prize="pList[i]" style="" v-for="(prize,i) in pList" :key="i"></goods-list>
        </van-list>
      </van-pull-refresh>
    </div>
    <!--      将列表下面架起来-->
    <div style="height: 80px"></div>
  </div>
</template>

<script>
  import GoodsList from "../common/goodsList";
  import  {prizeList,prizeAdd} from "../../api/target/prize";
  import Toast from "vant/es/toast";
  import { Dialog } from 'vant';
  export default {
    name: 'ShoppingCenter',
    components: { GoodsList },
    data(){
      return{
        loading: false,
        finished: false,
        isLoading: false,
        show:false,
        pList:[],
      }
    },
    methods: {
      //导航栏右侧点击---新建奖品
      onClickRight() {
        console.log('点击新建按钮');
        this.$parent.footShow=false;
        this.$router.push({
          name: 'prizeAdd',
          params: {
            flag: "0",
          }
        })
      },
      //修改奖品
      editprize(tar,i){
        console.log("tar"+tar);
        console.log("i"+i);
        console.log('点击修改奖品按钮');
        this.$parent.footShow=false;
        this.$router.push({
          name: 'prizeAdd',
          params: {
            tar: tar,
            flag:"1"
          }
        });
      },
      //下拉刷新
      onRefresh() {
        setTimeout(() => {
          Toast.success('刷新成功');
          this.isLoading = false;
        }, 1000);
      },
      onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
          // for (let i = 0; i < 10; i++) {
          //   this.list.push(this.list.length + 1);
          // }

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          // if (this.list.length >= 40) {
          this.finished = true;
          // }
        }, 1000);
      },
      //删除奖品
      delprize(tar,i){
        Dialog.confirm({
          title: '删除奖品',
          message: '是否确定删除此奖品'
        }).then(() => {
          tar.enabled=0;
          prizeAdd({
            ...tar
          }).then(res => {
            console.log("删除奖品结果报文", res);
            if (res.data.code =='200' ){
              this.prizeList();
              Toast.success('删除成功');
              this.$router.push({
                path: "/prizeList"
              });
            } else{
              Toast.fail('删除失败');
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      },
      //初始化奖品列表
      prizeList(){
        prizeList({}).then(res =>{
          if (res.data.msg == 'SUCCESS') {
            this.pList=res.data.data;
            console.log("prizeList:  "+this.pList);
          } else {
            Toast.success('奖品列表获取失败');
          }
        }).catch(err => {
          console.log(err);
        });
      },
    },
    created: function () {
      this.prizeList();
      this.prizeList();
    },
  }
</script>

<style lang="less">
.shoppingCenter{
  .top{
    border:1px solid #f9f9fd;
    display: block;
    float: top;
    margin-top: 0;
    padding-top: 0;
    width: 100%;
  }
  .van-list__error-text, .van-list__finished-text, .van-list__loading{
    margin-left: 38%;
  }
  .goodsList{
    height: 80%;
    width: 100%;
    display:-webkit-flex;
    flex:none;
    flex-wrap: wrap;
    flex-direction: row;
    display: flex;
  }
  .goods{
    width: 50%;
  }

}
</style>
