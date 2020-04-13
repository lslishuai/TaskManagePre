<template>
  <div style="border-bottom:1px solid green;" v-on:click="targetDetail(objData)">
    <span class="custom-title" style="display:block">{{objData.name}}</span>
    <van-icon name="underway"/> {{objData.deadline}}
<!--    <van-button plain color="#7232dd" size="mini" >截止时间:</van-button>-->
    <van-tag :type=color >{{objData.statefont}}</van-tag>
  </div>

</template>

<script>
  export default {
    name: "slotList",
    props:{
      objData:{deadline:null},
      color:null,
    },
    data(){
      return {
      };
    },
    methods:{
      targetDetail(target){
        console.log("999   "+target.id);
        console.log('点击查看任务详情');
        this.$parent.footShow=false;
        this.$router.push({
          name: 'targetAdd',
          params: {
            tar: target,
            flag:"2"
          }
        });
      }
    },
  };
</script>

<style lang="less">

</style>
