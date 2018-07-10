<template>
 	<div class="speaker container" style="width:100%">
        <Alert v-if="alert" v-bind:message="alert" />

        <h3 class="page-header">Schedule Information</h3>
        <br />
		<div class="card mb-3">
			<div class="card-body">
							
				<div class="form-group">
				   <label>Session Name</label>
					<input type="text" class="form-control" placeholder=" Name"v-model="ScheduleInfo.name">
					<label>Category</label>
				   	  <select class="form-control" v-model="ScheduleInfo.category" style="width:50%">
        <option value="Academics">Academics</option>>
        <option value="Cultural">Cultural</option>>
        </select>
<div>
                   <label>Venue</label>
						<div class="inputWithIcon">
                            <input type="text" placeholder="Venue" v-model="ScheduleInfo.venue">
                        </div>
        <form action="/action_page.php" style="width:40%">
 <label> Start time:</label>
  <input type="time" class="form-control" style="width:40%" v-model="ScheduleInfo.time_in">
</form>

        <form action="/action_page.php" style="width:40%">
  <label>End time:</label>
  <input type="time" class="form-control" style="width:40%" v-model="ScheduleInfo.time_out">
</form>
</div>

									
						<label>Description</label>
						<textarea type="text" class="form-control" cols="20" rows="5" placeholder="Description" v-model="ScheduleInfo.comments"></textarea> 	 
			  </div>

           </div>
      </div>
  
      <h3 class="page-header">Speakers Information</h3>

      <table class="table table-striped table-bordered table-hover">
       <thead>
       <tr>
       <th><strong>Name</strong></th>
       <th><strong>Email</strong></strong>
       <th><strong>Users</strong></th>
       <th><strong>Comments</strong></th>
       </tr>
       </thead>
       <tbody>     
       <tr v-for="speaker in ScheduleInfo.speakers">
       <td>{{speaker.name}}</td>
       <td>{{speaker.email}}</td>
       <td><div v-for="user in speaker.users">{{user.name}}</div></td>
       <td><div v-for="comment in speaker.comments">{{comment.body}}</div></td>
       <td><router-link class="btn btn-default"v-bind:to="'/editspeaker/'+speaker._id">Edit</router-link> 
       <button class="btn btn-default" v-on:click="DeleteSpeaker(speaker._id)">Delete</button>
       </td>
       </tr>
       </tbody> 
       </table>
       <router-link class="btn btn-success mt-5 mb-5" v-bind:to="'/speakers/'+ScheduleInfo._id">Add a Speaker</router-link>
        <button class="btn btn-success mt-5 mb-5" type="submit" v-on:click="UpdateSchedule">Update</button>
   </div>
</template>    


 <script>
 import Alert from './Alert'
export default {
  name: 'ScheduleInfo',
  data () {
    return {

        ScheduleInfo:{},
        alert:''
    }
  },
  methods:{
       fetchSchedule(id){
         this.$http.get('http://160.119.248.203:8080/api/schedule/view/'+id)
         .then(function(response){
           this.ScheduleInfo = response.body;
              console.log(this.ScheduleInfo);
          });
      },
      UpdateSchedule(e){
          if(!this.ScheduleInfo.name || !this.ScheduleInfo.email){
              this.alert = 'Please fill in all required fields';
               }
          else{
              let UpdatedSchedule = {
                  name :this.ScheduleInfo.name,
                  category : this.ScheduleInfo.category,
                  programme_id: this.ScheduleInfo.programme_id,
                  comments: this.ScheduleInfo.comments,
                  speakers :this.ScheduleInfo.speakers,
                  venue :this.ScheduleInfo.venue,
                  description : this.ScheduleInfo.description,
                  

              }

           this.$http.post('http://160.119.248.203:8080/api/schedule/edit/'+this.$route.params.id, UpdatedSchedule)
           .then(function(response){this.$router.push({path: '/', query: {alert: 'Schedule Updated'}});
            });

             e.preventDefault();
          }
           e.preventDefault();

      },

      //delete speaker
            DeleteSpeaker(id){

          this.$http.post('http://160.119.248.203:8080/api/speaker/remove/'+id)
          .then(function(response){
              
              alert('Speaker Deleted');
          });


      },


  },

  created: function(){
        this.fetchSchedule(this.$route.params.id);
    },

      components:{
        Alert
    }
  
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

  li button{
      display:inline;}
  </style>                    