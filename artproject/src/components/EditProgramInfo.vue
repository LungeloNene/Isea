<template>
 				   <div class="speaker container" style="width:100%">
                    <Alert v-if="alert" v-bind:message="alert" />

                    <h3 class="page-header">Program Information</h3>
                    <br />
				       <div class="card mb-3">
				            <div class="card-body">
							    <h5 class="card-title"></h5>
								<div class="form-group">
								   <label>Program Name</label>
								   <input type="text" class="form-control" placeholder="Program Name"v-model="ProgramInfo.name">
								   <label>Category</label>
								   <input type="text" class="form-control" placeholder="Category" v-model="ProgramInfo.category"> 
								   <div class="inputWithIcon">
                                   <input type="text" placeholder="Latitude coordinates" v-model="ProgramInfo.lat">
                                   <i class="far fa-map-marker-alt" aria-hidden="true"></i>
                                    </div>
									
							       <div class="inputWithIcon">
                                   <input type="text" placeholder="Longtude coordinates" v-model="ProgramInfo.lon">
                                   <i class="far fa-map-marker-alt" aria-hidden="true"></i>
                                    </div>

									<label>Comments</label>
								   <textarea type="text" class="form-control" cols="20" rows="5" placeholder="Description" v-model="ProgramInfo.description"></textarea> 	 
								</div>
					        </div>

 </div>

 <button class="btn btn-success mt-5 mb-5" type="submit" v-on:click="UpdateProgrameInfo">Update</button>
 </div>
 </template>    


 <script>
 import Alert from './Alert'
export default {
  name: 'ProgramInfo',
  data () {
    return {

        ProgramInfo:{},
        alert:''
    }
  },
  methods:{
       fetchProgrames(id){
         this.$http.post('http://160.119.248.203:8080/api/programme/Edit/'+id)
         .then(function(response){
           this.ProgramInfo = response.body;
              console.log(this.ProgramInfo);
          });
      },
      UpdateProgrameInfo(e){
          if(!this.ProgramInfo.name || !this.ProgramInfo.lat || !this.ProgramInfo.lon || !this.ProgramInfo.category){
              this.alert = 'Please fill in all required fields';

          }
          else{
              let UpdatedProgram = {
                  name :this.ProgramInfo.name,
                  category : this.ProgramInfo.category,
                  lat: this.ProgramInfo.lat,
                  lon: this.ProgramInfo.lon,
                  schedules :this.ProgramInfo.schedules,
                  published:false,
                  deleted:false,
                  created_date:this.ProgramInfo.created_date,
                  date:this.ProgramInfo.date,
                  abstracts:this.ProgramInfo.abstracts

              }

           this.$http.post('http://160.119.248.203:8080/api/programme/edit/'+this.$route.params.id, UpdatedProgram)
           .then(function(response){this.$router.push({path: '/', query: {alert: 'Program Updated'}});
            });

             e.preventDefault();
          }
           e.preventDefault();

      }


  },

  created: function(){
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