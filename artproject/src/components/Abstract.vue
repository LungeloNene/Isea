<template>
<div id="Abstract">
<Alert v-if="alert" v-bind:message="alert" />
 				   <div class="speaker container" style="width:70%">
                    <h3>Add an abtract</h3>
				       <div class="card mb-3">
				            <div class="card-body">
							    <h5 class="card-title"></h5>
								<div class="form-group">
																						   <label>Title</label>
								   <input type="text" class="form-control" placeholder="Title" v-model="Abstract.title">
								   <label>Subtitle</label>
								   <input type="text" class="form-control" placeholder="Subtitle" v-model="Abstract.subtitle"> 
								   <label>Keywords</label>
								   <input type="text" class="form-control" placeholder="Keywords" v-model="Abstract.keywords"> 

									<label>Description</label>
								   <textarea type="text" class="form-control" cols="20" rows="5" placeholder="Description" v-model="Abstract.description"></textarea> 	 
								</div>
<h3>Add a contact</h3>

<div class="inputWithIcon">
  <input type="text" placeholder="Email" v-model="c.email">
  <i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>
</div>


		


					        </div>
				       </div>

					   
  
			   </div>
			    <button class="btn btn-success mt-5 mb-5" @click="SaveAll">Save</button>
	</div>		   
</template>

<script>
import Alert from './Alert'

export default {
  components:{
      Alert
      },
  data () {
    return {
		c:{},
		alert:'',
		Abs:{},
		programme:{},
        Abstract:[{
			title:'',
			subtitle:'',
			keywords:'',
			description:'',
		}],
    
    } 
  },
  methods:{
	  SaveAll(e){
		  if(!this.Abstract.title||!this.Abstract.subtitle|| !this.Abstract.keywords|| !this.Abstract.description|| !this.c ){
			  this.alert = 'Please fill in all required fields';
		  }
		  else{
			  let NewAbstract={
				  title:this.Abstract.title,
				  subtitle:this.Abstract.subtitle,
				  keywords:this.Abstract.keywords,
				  programme_id:'5b190f8eb8964775ebac15d7',
				  description:this.Abstract.description,
				  contacts:this.c,
				  deleted:false
			  }


			this.$http.post('http://160.119.248.203:8080/api/abstract/add', NewAbstract)
           .then(function(response){
			   
            
				this.Abs=response.body;
                     this.alert= 'Abstract Added, Now publish the program';
                     alert('Abstract added');
					 
                    });
/*-------------------------------------------------------------------------------------------*/
       				  let newProgram={
				 name :this.programme.name,
                  name :this.programme.name,
                  category : this.programme.category,
                  lat: this.programme.lat,
                  lon: this.programme.lon,
                  schedules :this.programme.schedules,
                  published:this.programme.published,
                  deleted:this.programme.deleted,
                  created_date:this.programme.created_date,
                  date:this.programme.date,
                  abstracts:this.Abs,
                  _id:this.programme._id
				  }
			 this.$http.post('http://160.119.248.203:8080/api/programme/edit/+this.programme._id', newProgram)
           .then(function(response){
                       console.log(response.body);
                      this.$router.push({path: '/program/'+this.programme._id});
                    });

             e.preventDefault();
          }
           e.preventDefault(); 
		  },

		fetchProgrames(id){
         this.$http.post('http://160.119.248.203:8080/api/programme/view/'+id)
         .then(function(response){
           this.programme = response.body;
              console.log(this.programme);
              
          });
      },
  },
  created:function(){
	  this.fetchProgrames(this.$route.params.id);
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