<template>
  <div class="targetAdd">
    <!--    //顶部导航栏-->
    <van-nav-bar :title="title " left-text="返回" left-arrow
                 @click-left="back"
    >

    </van-nav-bar>
    <van-form  @submit="onSubmit" @failed="onFailed" >
      <van-field
        readonly
        clickable
        autosize
        name="picker"
        :value="target.supervision"
        label="监督关系"
        placeholder="点击选择"
        @click="suClick"
      />
      <van-field  autosize  :readonly=detailFlag  v-model="target.name" name="code" label="任务名称" :rules="codeRules" placeholder="请输入"/>
      <van-field  autosize  v-model="target.content" name="code" label="任务内容" :rules="codeRules" placeholder="请输入">
      <template #input>
        <textarea autosize="true"  :readonly=detailFlag  style="border: 0px" v-model="target.content"/>
      </template>
      </van-field>
      <van-field
        readonly
        clickable
        autosize
        name="calendar"
        :value="target.deadline"
        label="截止时间"
        placeholder="点击选择"
        @click="timeClick"
      />
      <van-field  :readonly=detailFlag  autosize v-model="target.reward" name="code" label="积分奖励(分)" :rules="codeRules" placeholder="请输入"/>
      <van-field  :readonly=detailFlag  autosize  v-model="target.punishment" name="code" label="积分惩罚(分)" :rules="codeRules" placeholder="请输入"/>
      <div style="margin: 16px;" v-if="!detailFlag">
        <van-button round block type="info">
          提交
        </van-button>
      </div>
    </van-form>

<!--    //日历-->
    <van-calendar v-model="showCalendar"  position="right" @confirm="onConfirmDate" />
<!--    //时间-->
    <van-popup v-model="showPicker" position="right">
      <van-datetime-picker
        type="time"
        @confirm="onConfirmTime"
        @cancel="cancelTime"
      />
    </van-popup>
    <!--    顶部弹出：监督关系选择-->
    <van-popup  v-model="show" position="bottom">
      <van-picker
        :columns="suname"
        name="suPicker"
        show-toolbar
        @cancel="show = false"
        @confirm="onConfirmSu"
      />
    </van-popup>
  </div>
</template>

<script>
  import { supervisionList } from "../../api/target/supervision";
  import  {targetAdd} from "../../api/target/target";
  import Toast from "vant/es/toast";


  export default {
    name: "TargetAdd",
    data () {
      this.codeRules = [
        { required: true, message: "请输入内容" }
        // { validator: this.codeValidator, message: '验证码错误' },
      ];
      return {
        de:"",
        title:"",
        show: false,//监督关系
        showCalendar: false,//日历
        showPicker: false,//时间
        detailFlag:true,
        sulist: [],
        suname: [],
        target:{
          supervision: "",//监督关系名称
          supervisionId: "",//监督关系id
          name: "",
          content: "",
          deadline: "",
          reward: "",
          punishment: ""},

      };
    },
    methods: {
      // 校验函数返回 Promise 来实现异步校验
      codeValidator (val) {
        return new Promise(resolve => {

          setTimeout(() => {
            resolve(/\d{6}/.test(val));
          }, 1000);
        });
      },
      //选择截止时间
      timeClick(){
        console.log("选择截止时间this.detailFlag:"+this.detailFlag);
        if (!this.detailFlag) {
          this.showCalendar = true;
        }
      },
      //选择监督关系
      suClick(){
        console.log("选择监督关系.detailFlag:"+this.detailFlag);
        if (!this.detailFlag) {
          this.show =true;
        }
      },
      onSubmit (values) {
        targetAdd({
          ...this.target
        }).then(res => {
          console.log("新建任务结果报文", res);
          if (res.data.code =='200' ){
            // this.$notify({
            //   title: "成功",
            //   message: "新建成功",
            //   type: "success"
            // });
            Toast.success('成功');
            this.$parent.footShow = true;
            this.$router.push({
              path: "/targetList"
            });
          } else{
            // this.$notify({
            //   title: "失败",
            //   message: "新建失败",
            //   type: "error"
            // });
            Toast.fail('失败');
          }
      }).catch(err => {
          console.log(err);
      });
        console.log("submit", values);
      },
      onFailed (errorInfo) {
        console.log("failed", errorInfo);
      },
      //日期确定
      onConfirmDate(date) {
        this.target.deadline = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        this.showCalendar = false;
        this.showPicker = true;
      },
      //时间确定
      onConfirmTime(time) {
        this.target.deadline = this.target.deadline+" "+time;
        this.showPicker = false;
      },
      cancelTime(){
        this.showPicker = false;
        this.target.deadline="";
      },
      //监督关系选择确认0
      onConfirmSu(value,index){
        this.target.supervision=value;
        this.target.supervisionId=this.sulist[index].id;
        console.log("index:  "+index);
          console.log("onConfirm  "+value+" id :"+this.target.supervisionId);
        this.show=!this.show;
      },
      //返回
      back () {
        this.$parent.footShow = true;
        this.$router.push({
          path: "/targetList"
        });
      }
    },
    created: function() {
      //监督关系列表
      supervisionList({}).then(res => {
        if (res.data.msg == "SUCCESS") {
          this.sulist = res.data.data;
          this.suname = [];
          this.sulist.forEach(su => {
            let temp = su.userName + "-" + su.supervisionName + "(监督者)";
            this.suname.push(temp);
            if(this.target.supervisionId=su.id){
              //此方法慢，赋值可以放在这
              this.target.supervision=temp;
            }
          });
          console.log("sulist"+this.sulist.length);
        } else {
          // this.$notify({
          //   title: "失败",
          //   message: "执行错误",
          //   type: "error"
          // });
          Toast.fail('执行错误');
        }
      }).catch(err => {
        console.log(err);
      });

    },
    mounted () {
      //判断是修改还是新建
      if (this.$route.params.flag =="1" ){
        this.title="修改任务";
        console.log("是要修改任务");
        this.target=this.$route.params.tar;
        this.detailFlag=false
      }else if (this.$route.params.flag =="2") {
        this.title="任务详情";
        console.log("是要查看任务详情");
        this.target=this.$route.params.tar;
        this.detailFlag=true
      }else{
        this.title="新建任务";
        console.log("是要添加任务");
        this.detailFlag=false
      }
    }
  };
</script>

<style lang="less">
  .targetAdd {
    .van-form {
      margin-top: 5px;
    }

    .addfont {
      color: #323233;
      font-size: 14px;
      line-height: 24px;
    }
  }
</style>
