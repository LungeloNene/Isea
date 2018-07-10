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
                            <input type="text" class="form-control" placeholder="Venue" v-model="ScheduleInfo.venue">
                      
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
						<textarea type="text" class="form-control" cols="20" rows="5" placeholder="Description" v-model="ScheduleInfo.description"></textarea> 	 
			  </div>

           </div>
      </div>

              <button class="btn btn-success mt-5 mb-5" type="submit" v-on:click.prevent="Save">Save</button>
  
       

   </div>
</template>    


 <script>
 import Alert from './Alert'
export default {
  name: 'ScheduleInfo',
  data () {
    return {

        ScheduleInfo:{},
        programme:{},
        alert:'',
        Saved:false,
        savedSchedule:{},
    }
  },
  methods:{

      Save(e){
        
          if(!this.ScheduleInfo.description || !this.ScheduleInfo.name || !this.ScheduleInfo.category|| !this.ScheduleInfo.venue || !this.ScheduleInfo.time_in || !this.ScheduleInfo.time_out)
          {
              this.alert = "Please fill all required fields";
          }
          else{

                    var today = new Date();
                   var dd = today.getDate();
                   var mm = today.getMonth()+1; 
                   var yyyy = today.getFullYear();
              let newSchedule = {
                    name :this.ScheduleInfo.name,
                  category : this.ScheduleInfo.category,
                  programme_id: this.programme._id,
                  speakers :[],
                  venue :this.ScheduleInfo.venue,
                  time_in:this.ScheduleInfo.time_in,
                  time_out:this.ScheduleInfo.time_out,
                  hasVenue:true,
                  deleted:false,
                  description : this.ScheduleInfo.description,
                                  
              }
              

            this.$http.post('http://160.119.248.203:8080/api/schedule/add', newSchedule)
            .then(function(response){
               this.savedSchedule=response.body;
                       console.log(response.body);
                       alert(this.savedSchedule._id);
      
                    });
                  
                this.alert = 'Schedule Added';  

             e.preventDefault();

             /*--------------------------------SAVE SCHEDULE TO A PROGRAM------*/
                           let AddProgram = {
                  name :this.programme.name,
                  category : this.programme.category,
                  lat: this.programme.lat,
                  lon: this.programme.lon,
                  schedules :this.savedSchedule,
                  published:false,
                  deleted:false,
                  created_date:this.programme.created_date,
                  date:this.programme.date,
                  abstracts:this.programme.abstracts}

             this.$http.post('http://160.119.248.203:8080/api/programme/edit/'+this.programme._id, AddProgram)
             this.alert = "Schedule Added to the program";

          }
           e.preventDefault();
      },

         fetchProgrames(id){
         this.$http.post('http://160.119.248.203:8080/api/programme/view/'+id)
         .then(function(response){
           this.programme = response.body;
           this.Saved=true;
              console.log(this.programme);
          });
      },

      Add(e){
          if(this.Saved){
            
             e.preventDefault();
          }
          else{
              this.alert='Please Save the schedule first';
          }
           e.preventDefault();                

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