<template>
  <div class="prizeAdd">
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
        :value="prize.supervision"
        label="监督关系"
        placeholder="点击选择"
        @click="suClick"
      />
      <van-field  autosize  :readonly=detailFlag  v-model="prize.name" name="code" label="奖品名称" :rules="codeRules" placeholder="请输入"/>
      <van-field  autosize  v-model="prize.worth" name="code" label="奖品价值(元)" :rules="codeRules" placeholder="请输入">
      <template #input>
        <textarea autosize="true"  :readonly=detailFlag  style="border: 0px" v-model="prize.worth"/>
      </template>
      </van-field>
      <van-field  :readonly=detailFlag  autosize v-model="prize.score" name="code" label="兑换积分(分)" :rules="codeRules" placeholder="请输入"/>
      <van-field  :readonly=detailFlag  autosize   name="code" label="上传图片" :rules="codeRules" placeholder="请输入">
        <template #input>
          <van-uploader v-model="uploader"
                        multiple
                        :max-count="1"
          />
        </template>
      </van-field>
      <div style="margin: 16px;" v-if="!detailFlag">
        <van-button round block type="info">
          提交
        </van-button>
      </div>
    </van-form>

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
  import  {prizeAdd} from "../../api/target/prize";
  import Toast from "vant/es/toast";


  export default {
    name: "PrizeAdd",
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
        prize:{
          supervision: "",//监督关系名称
          supervisionId: "",//监督关系id
          name: "",
          worth: "",
          score: "",
          path: "",
        },
        sulist: [],
        suname: [],
        uploader: [
          ],
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
      onSubmit (values) {
        console.log(values);
        console.log("提交："+this.uploader[0]);
        this.printOb(this.uploader[0]);
        this.prize.path=this.uploader[0].content;
        prizeAdd({
          ...this.prize
        }).then(res => {
          console.log("新建奖品结果报文", res);
          if (res.data.code =='200' ){
            Toast.success('成功');
            this.$parent.footShow = true;
            this.$router.push({
              path: "/prizeList"
            });
          } else{
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
      //监督关系选择确认0
      onConfirmSu(value,index){
        this.prize.supervision=value;
        this.prize.supervisionId=this.sulist[index].id;
        console.log("index:  "+index);
          console.log("onConfirm  "+value+" id :"+this.prize.supervisionId);
        this.show=!this.show;
      },
      //选择监督关系
      suClick(){
        console.log("选择监督关系.detailFlag:"+this.detailFlag);
        if (!this.detailFlag) {
          this.show =true;
        }
      },
      //返回
      back () {
        this.$parent.footShow = true;
        this.$router.push({
          path: "/shopping"
        });
      },
      printOb(obj){
        console.log("开始打印信息");
        for(let key  in obj){
          console.log(key + '---' + obj[key])
        }
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
            if(this.prize.supervisionId=su.id){
              //此方法慢，赋值可以放在这
              this.prize.supervision=temp;
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
        this.title="修改奖品";
        console.log("是要修改奖品");
        this.prize=this.$route.params.tar;
        this.uploader[0].url=this.prize.path;
        this.detailFlag=false
      }else if (this.$route.params.flag =="2") {
        this.title="奖品详情";
        console.log("是要查看奖品详情");
        this.prize=this.$route.params.tar;
        this.detailFlag=true
      }else{
        this.title="新建奖品";
        console.log("是要添加奖品");
        this.detailFlag=false
      }
    }
  };
</script>

<style lang="less">
  .prizeAdd {
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
