<template>
    <div class="programmes container">
    <Alert v-if="alert" v-bind:message="alert" />
  <h1 class="page-hearder">Manage Programmes</h1>
   <br />
  <input class="form-control form-rounded" placeholder="Search by Program Name" v-model="filterInput">

  <br />

<table class="table table-striped">
  <thead>
  <tr>
  <th>programme</th>
  <th>Category</th>
  <th>Session</th>
  <th>Speaker</th>
  <th>abstract</th>
  </tr>
  </thead>
  <tbody>  
 <tr v-for="programme in filterBy(programmes, filterInput)">
  <td>{{programme.name}}</td>
  <td>{{programme.category}}</td>
  <td><li v-for="Schedule in programme.schedules">{{Schedule.name}}</li></td>
  <td><div v-for="Schedule in programme.schedules"><div v-for="speaker in Schedule.speakers">{{speaker.name}}</div></div></td>
  <td>{{programme.abstract}}</td>
  <td><router-link class="btn btn-default"v-bind:to="'/program/'+programme._id">View</router-link></td>
 </tr>
  </tbody>
  </table>
  </div>
</template>

<script>

  import Alert from './Alert';

export default {
  name: 'programmes',
  data () {
    return {
        programmes:[],
        alert:'',
        filterInput:''

    }
  },

  methods:{
       filterBy(list, value){
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return list.filter(function(programme){
          return programme.name.indexOf(value) > -1;
        });
        },
      fetchProgrames(){
          this.$http.get('http://160.119.248.203:8080/api/programme')
          .then(function(response){
              this.programmes = response.body;
              console.log(programmes);
          });
      }
  },
  created:function(){
      this.fetchProgrames();
   },
  updated:function(){
      this.fetchProgrames();
   },

   components: {
      Alert
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
