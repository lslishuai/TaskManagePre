<template>
  <div class="goods" style="padding-bottom: 5px;">
    <div class="message">
      <div class="top">
        <van-swipe-cell right-width="50px">
          <template slot="right">
            <div style="display: flex;flex-direction: column;line-height: 20px">
              <van-button  type="danger" style="margin-bottom:10%;  height: 40%"  v-on:click="editTarget(tar,i)" text="编辑" />
              <van-button  type="primary" style="height: 40%" v-on:click="delTarget(tar,i)" text="删除"/>
            </div>
          </template>
          <van-image
            width="100%"
            height="100%"
            :src=prize.path
          />
        </van-swipe-cell>
      </div>
      <div class="bottom">
        <h5 style="padding: 0;margin: 0;display: inline-block">{{prize.name}}</h5>
        <div style="width: 100%;font-size: 12px">
            <h5 style="padding: 0;margin: 0;display: inline-block;font-size: 14px;width: 25%;color: #2ECC71">Y{{prize.worth}}</h5>
               分数：{{prize.score}}
      </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "goodsList",
    props:{
      prize:{name:null,
              worth:null,
        score:null},
    },
    data(){
      return {
      };
    },
    methods:{

    },
    created () {
      console.log("cre prize:"+ this.prize);
    },
    mounted () {
      console.log("mou prize:"+ this.prize);
    }
  };
</script>

<style lang="less">
  .goods{
    .message{
      height: 80%;
      width: 80%;
      margin: 10px;
      display:-webkit-flex;
      flex: none;
      flex-direction: column;
      display: flex;
    }
    .top{
      height: 80%;
    }
    .bottom{
      height: 10%;
      padding-left: 8px;
    }
  }

</style>
