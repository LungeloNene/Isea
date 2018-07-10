<template>
<div>
<div class="card mb-3" style="width:1000%">
<h3>Add a contact</h3>
<div class="card-body">
<div class="inputWithIcon">
  <input type="text" placeholder="His/Her name" v-model="NewContact.name">
  <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
</div>

<div class="inputWithIcon">
  <input type="text" placeholder="Email" v-model="NewContact.email">
  <i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>
</div>

<div class="inputWithIcon">
  <input type="text" placeholder="Phone Number" v-model="NewContact.number">
  <i class="fa fa-phone fa-lg fa-fw" aria-hidden="true"></i>
</div>

</div>
</div>
</div>


</template>


<script>


export default {
   
  components:{
      
      },
  data () {
    return {
    NewContact:{},
    } 
  },
  methods:{},
  
  
}
</script>


<style>
input[type=text]{
    width:50%;
    border:2px solid #aaa;
    border-radius:4px;
    margin:8px 0;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
  }
  
  input[type=text]:focus{
    border-color:dodgerBlue;
    box-shadow:0 0 8px 0 dodgerBlue;
  }
  
  .inputWithIcon input[type=text]{
    padding-left:40px;
  }
  
  .inputWithIcon{
    position:relative;
  }
  
  .inputWithIcon i{
    position:absolute;
    left:0;
    top:8px;
    padding:9px 8px;
    color:#aaa;
    transition:.3s;
  }
  
  .inputWithIcon input[type=text]:focus + i{
    color:dodgerBlue;
  }
  
  .inputWithIcon.inputIconBg i{
    background-color:#aaa;
    color:#fff;
    padding:9px 4px;
    border-radius:4px 0 0 4px;
  }
  
  .inputWithIcon.inputIconBg input[type=text]:focus + i{
    color:#fff;
    background-color:dodgerBlue;
  }
  </style>