// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Programmes from './components/Programmes'
import Schedule from './components/Schedule'
import Speakers from './components/Speakers'
import AddProgram from './components/AddProgram'
import contact from './components/contact'
import Abstract from './components/Abstract'
import ProgramDetails from './components/ProgramDetails'
import EditProgramInfo from './components/EditProgramInfo'
import EditSchedule from './components/EditSchedule'

Vue.use(VueRouter)
Vue.use(vueResource)
//Vue.use(iView)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes:[
    {path:'/', component: Programmes},
    {path:'/schedule/:id', component: Schedule},
    {path:'/speakers/:id', component: Speakers},
    {path:'/contact', component: contact},
    {path:'/abstract/:id', component: Abstract},
    {path:'/program/:id', component: ProgramDetails},
    {path:'/editschedule/:id', component:EditSchedule },
    {path:'/editprograminfo/:id', component: EditProgramInfo},
    {path:'/add', component: AddProgram}
  ]
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  template: `
  <div id="app">
  <nav class="navbar navbar-default">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">ISEA 18</a>
    </div>
    <div id="navbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><router-link to="/">Home<span class="oi oi-home"></span></router-link></li>
        <!--<li><router-link to="/about">About</router-link></li>-->
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><router-link to="/add">Add Program</router-link></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</nav>
  <router-view></router-view>
  </div>
  `
}).$mount('#app')
