<template>
 				   <div class="speaker container" style="width:100%">
                    <Alert v-if="alert" v-bind:message="alert" />

                    <h3 class="page-header">Add Program</h3>
                    <br />
				       <div class="card mb-3">
				            <div class="card-body">
							    <h5 class="card-title"></h5>
								<div class="form-group">
								   <label>Program Name</label>
								   <input type="text" class="form-control" placeholder="Program Name"v-model="NewProgram.name">
								   	  <label>Category</label>
	  <select class="form-control" v-model="NewProgram.category" style="width:50%">
        <option value="Academics">Academics</option>>
        <option value="Cultural">Cultural</option>>
        </select>
        <div>
        <label>Date : <input type="date" class="form-control" v-model="NewProgram.date"></label>
        </div>
								   <div class="inputWithIcon">
                                   <input type="text" placeholder="Latitude coordinates" v-model="NewProgram.lat">
                                   <i class="far fa-map-marker-alt" aria-hidden="true"></i>
                                    </div>
									
							       <div class="inputWithIcon">
                                   <input type="text" placeholder="Longtude coordinates" v-model="NewProgram.lon">
                                   <i class="far fa-map-marker-alt" aria-hidden="true"></i>
                                    </div>

									<label>Comments</label>
								   <textarea type="text" class="form-control" cols="20" rows="5" placeholder="Do you have any comments" v-model="NewProgram.comments"></textarea> 	 
								</div>
					        </div>

 </div>

 <button class="btn btn-success mt-5 mb-5" type="submit" v-on:click="Add">Add</button>
 </div>
 </template>



<script>
import Schedule from './Schedule'
import Alert from './Alert'

export default {
   
  components:{
      Alert
      },
  data () {
    return {
        NewProgram:{},
        alert:''
    
    } 
  },
  methods:{
    Add(e){
      if(!this.NewProgram.name || !this.NewProgram.lat || !this.NewProgram.lon || !this.NewProgram.category){
         this.alert = 'Please fill in all required fields';
      }

      else{

                var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();

              let AddProgram = {
                  name :this.NewProgram.name,
                  category : this.NewProgram.category,
                  lat: this.NewProgram.lat,
                  lon: this.NewProgram.lon,
                  schedules :[],
                  published:false,
                  deleted:false,
                  created_date:mm + '/' + dd + '/' + yyyy,
                  date:this.NewProgram.date,
                  abstracts:[]

              }

           this.$http.post('http://160.119.248.203:8080/api/programme/add', AddProgram)
           .then(function(response){
             var prog=response.body;
                       console.log(response.body);
                      this.$router.push({path: '/program/'+prog._id});
                    });
                this.alert = 'Program Added';    

             e.preventDefault();
          }
           e.preventDefault();
    }
    
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

  li button{
      display:inline;}
  </style>