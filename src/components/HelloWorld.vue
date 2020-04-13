<template>
  <div class="hello">
    <iframe  name = "child" id = "child" v-bind:src="reportUrl"
            width="auto" height="300"
            frameborder="0" scrolling="no"  style="position:absolute;top:80px;left: 30px;"
    ></iframe>
  </div>

</template>

<script>
  export default {
    name: 'HelloWorld',
    data(){
      return{
        reportUrl:"https://www.baidu.com/",
      }
    }
  }
</script>
