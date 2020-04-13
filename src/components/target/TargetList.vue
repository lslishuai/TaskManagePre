<template>
    <div class="targetList">
      <!--    顶部弹出：监督关系选择-->
      <van-popup v-model="show" position="bottom">
        <van-picker
          :columns="suname"
          show-toolbar
          @cancel="show = false"
          @confirm="onConfirmSu"
        />
      </van-popup>
      <!--    //顶部导航栏-->
      <van-nav-bar title="任务"   right-text="新建任务" left-text="监督关系" left-arrow
                   @click-left="onClickLeft"
                   @click-right="onClickRight"
      >
      </van-nav-bar>
      <!--    //任务列表-->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell  v-for="(tar,i) in tarlist" :key="i" is-link >
            <van-swipe-cell>
              <template slot="right">
                <van-button square type="danger"  v-on:click="editTarget(tar,i)" text="编辑" />
                <van-button square type="primary" v-on:click="delTarget(tar,i)" text="删除"/>
              </template>
              <!-- 使用 title 插槽来自定义标题 -->
              <slot-list :objData="tarlist[i]" :color="tarlist[i].color"></slot-list>
            </van-swipe-cell>
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <!--      将列表下面架起来-->
      <div style="height: 50px"></div>
    </div>
</template>

<script>
  import  {targetList,targetAdd} from "../../api/target/target";
  import  {supervisionList} from "../../api/target/supervision";
  import SlotList from "../common/slotList";
  import Toast from "vant/es/toast";
  import { Dialog } from 'vant';

  export default {
    name: "TargetList",
    components: { SlotList },
    data(){
      return{
        loading: false,
        finished: false,
        isLoading: false,
        show:false,
        sulist:[],
        tarlist:[],
        suname:[],
      }
    },
    methods: {
      //导航栏左侧点击---选择监督关系
      onClickLeft() {
        console.log('点击监督关系选择按钮');
        this.show=!this.show;
      },
      //导航栏右侧点击---新建任务
      onClickRight() {
        console.log('点击新建按钮');
        this.$parent.footShow=false;
        this.$router.push({
          name: 'targetAdd',
          params: {
            flag: "0",
          }
        })
      },
      //监督关系选择确认
      onConfirmSu(value){
        console.log("onConfirm"+value);
      },
      //修改任务
      editTarget(tar,i){
        console.log("tar"+tar);
        console.log("i"+i);
        console.log('点击修改任务按钮');
        this.$parent.footShow=false;
        this.$router.push({
          name: 'targetAdd',
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
      //删除任务
      delTarget(tar,i){
        Dialog.confirm({
          title: '删除任务',
          message: '是否确定删除此任务'
        }).then(() => {
          tar.enabled=0;
          targetAdd({
            ...tar
          }).then(res => {
            console.log("删除任务结果报文", res);
            if (res.data.code =='200' ){
              this.targetList();
              Toast.success('删除成功');
              this.$router.push({
                path: "/targetList"
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
      //初始化监督关系
      supervisionList(){
        supervisionList({}).then(res =>{
          if (res.data.msg == 'SUCCESS') {
            this.sulist=res.data.data;
            this.suname=[];
            this.sulist.forEach(su =>{
              let temp=su.userName+'-'+su.supervisionName+"(监督者)";
              this.suname.push(temp);
            })
          } else {
            // this.$notify({
            //   title: '失败',
            //   message: "执行错误",
            //   type: 'error'
            // });
            Toast.success('任务列表获取失败');
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //初始化任务列表
      targetList(){
        targetList({}).then(res =>{
          if (res.data.msg == 'SUCCESS') {
            this.tarlist=res.data.data;
            for (let tar of this.tarlist){
              switch (tar.state) {
                case 1: tar.statefont ='进行中';tar.color ='success'; break;
                case 2: tar.statefont ='审核中';tar.color ='primary'; break;
                case 3: tar.statefont ='完成'; tar.color ='default';break;
                case -1:tar.statefont ='超时';tar.color ='danger'; break;
              }
            }
          } else {
            this.$notify({
              title: '失败',
              message: "执行错误",
              type: 'error'
            });
          }
        }).catch(err => {
          console.log(err);
        })
      },
    },
    created: function () {
      this.supervisionList();
      this.targetList();
    },
  };
</script>

<style lang="less">
 .targetList{
   padding-bottom: 70px;
   height : 50px;
   display :block;
 }
</style>
