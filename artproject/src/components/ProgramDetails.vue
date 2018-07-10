<template>
<div class="datails container">
<Alert v-if="alert" v-bind:message="alert" />
<h3 class="page-header">Programme Information</h3>
<div><strong>Program Name : </strong>{{programme.name}}</div>
<div><strong>Category : </strong>{{programme.category}}</div>
<div><strong>Latitude : </strong>{{programme.lat}}</div>
<div><strong>Longtude : </strong>{{programme.lon}}</div>
<br />
<div><strong><u>Comments</u></strong></div>
<div>{{com}}</div>
<router-link class="btn btn-default" v-bind:to="'/editprograminfo/'+programme._id">Edit Program Info</router-link>
<br />

<h3 class="page-header">Programme Abstract</h3>

<div><strong>Title : </strong>{{abstracts.title}}</div>
<div><strong>Subtitle : </strong>{{abstracts.subtitle}}</div>
<div><strong>Keywords : </strong>{{abstracts.keywords}}</div>
<div><strong>Contact : </strong>{{abstracts.contacts}}</div>
<div><strong>Description : </strong>{{abstracts.description}}</div>

<br />
<router-link class="btn btn-default" v-bind:to="'/editabstract/'+programme._id">Edit Abstract</router-link>
<router-link class="btn btn-default" v-bind:to="'/abstract/'+programme._id">Add Abstract</router-link>




<h3 class="page-header">{{programme.name}}'s Schedule</h3>

  <table class="table table-striped table-bordered table-hover">
  <thead>
  <tr>
  <th><strong>Session</strong></th>
  <th><strong>Category</strong></strong>
  <th><strong>Speakers</strong></th>
  <th><strong>Venue</strong></th>
  <th><strong>Time Starts</strong></th>
  <th><strong>Times Ends</strong></th>
  </tr>
  </thead>
  <tbody>     
   <tr v-for="Schedule in programme.schedules">
   <td>{{Schedule.name}}</td>
   <td>{{Schedule.category}}</td>
   <td><div v-for="speaker in Schedule.speakers" v-on:click="PostComment(speaker.name)">{{speaker.name}}</div></td>
   <td>{{Schedule.venue}}</td>
   <td>{{Schedule.time_in}}</td>
   <td>{{Schedule.time_out}}</td>
   <td><router-link class="btn btn-default"v-bind:to="'/editschedule/'+Schedule._id">Edit</router-link> 
   <button class="btn btn-default" v-on:click="DeleteSchedule(Schedule._id)">Delete</button>
   </td>
   </tr>
   </tbody> 
   </table>
   <router-link class="btn btn-success mt-5 mb-5"v-bind:to="'/schedule/'+programme._id">Add Schedule</router-link>
<div>
<button class="btn btn-success mt-5 mb-5" v-bind:to="'/'">Back</button>
<button class="btn btn-danger" v-on:click="DeleteProgram(programme._id)">Delete</button>
<button class="btn btn-warning" v-on:click="PublishProgram(programme._id)">Publish</button>

</div>

</div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'programdetails',
  data () {
    return {
        abstracts:{},
        programme:[],
        AlwaysFalse:false,
        com:'',
        alert:''

 
    }
  },
  methods:{

      PostComment(name){
          for (comment in this.programme.comments){
              if(name==comment.speaker){
                  com=comment.body;
              }
          }
      },
      PublishProgram(id){
        this.$http.post('http://160.119.248.203:8080/api/programme/publish/'+id)
          .then(function(response){
              alert("Please note that this program has been published to the website");
              this.alert='Please note that this program has been published to the website';
          });

      },

       fetchProgrames(id){
         this.$http.post('http://160.119.248.203:8080/api/programme/view/'+id)
         .then(function(response){
           this.programme = response.body;
           this.abstracts = this.programme.abstracts;
              console.log(programme);
          });
      },

      DeleteProgram(id){

          this.$http.post('http://160.119.248.203:8080/api/programme/remove/'+id)
          .then(function(response){
              this.alert='Program Deleted';
          });


      },
      DeleteSchedule(id){
          this.$http.post('http://160.119.248.203:8080/api/schedule/remove/'+id)
          .then(function(response){
              this.alert='Session Deleted';
          }); 
      },

  },

      created:function(){
      this.fetchProgrames(this.$route.params.id);
      },


  components:{
        Alert
    }
      
}
</script>

