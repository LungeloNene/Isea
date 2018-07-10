<template>
<div id="contact">
<div class="card mb-3" style="width:100%">
<h3>Add a contact</h3>
<div class="card-body">
<div class="inputWithIcon">
  <input type="text" placeholder="His/Her name" v-model="speakers.name">
  <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
</div>

<div class="inputWithIcon">
  <input type="text" placeholder="Email" v-model="speakers.email">
  <i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>
</div>

</div>
<button class="btn btn-success mt-5 mb-5" type="submit" v-on:click.prevent="Save">Save</button>
</div>
</div>


</template>


<script>
import Alert from './Alert'

export default {
  props:['contact'],
  components:{Alert},
  data () {
    return {
    speakers:{},
    ScheduleInfo:{},
    AddToSchedule:{}
    } 
  },
  methods:{
    Save(e){
      if(!this.speakers.name||!this.speakers.email){
        this.alert='Please fill all the required forms';
      }
      else{
        let newSpeaker={

          name:this.speakers.name,
          email:this.speakers.email,
          users:[],
          profile_photos:[],
          comments:[],
          schedule_id:this.ScheduleInfo._id
        }
           this.$http.post('http://160.119.248.203:8080/api/speaker/add', newSpeaker)
           .then(function(response){
             this.AddToSchedule=response.body;
                       console.log(response.body);
                    this.alert = 'Speaker Added';
                    });

            /*------------------------------Add Speaker to schedule ----------------------*/

                          let UpdatedSchedule = {
                  name :this.ScheduleInfo.name,
                  category : this.ScheduleInfo.category,
                  programme_id: this.ScheduleInfo.programme_id,
                  comments: this.ScheduleInfo.comments,
                  speakers :this.AddToSchedule,
                  venue :this.ScheduleInfo.venue,
                  description : this.ScheduleInfo.description,
                  } 

           this.$http.post('http://160.119.248.203:8080/api/schedule/edit/'+this.ScheduleInfo._id, UpdatedSchedule);
                         
                    

             e.preventDefault();

      }
       e.preventDefault();
    },

           fetchSchedule(id){
         this.$http.get('http://160.119.248.203:8080/api/schedule/view/'+id)
         .then(function(response){
           this.ScheduleInfo = response.body;
              console.log(this.ScheduleInfo);
          });
      },
  },

    created: function(){
        this.fetchSchedule(this.$route.params.id);
    },
  
  
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