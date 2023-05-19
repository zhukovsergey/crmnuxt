<template>
    <div>
        <h2>Профиль пользователя </h2>
        {{this.login}}
        {{this.id}}

        <div>
    <v-text-field
      label="Логин"
      v-model="this.login"
      hide-details="auto"
    ></v-text-field>
    <v-text-field label="Another input"></v-text-field>
  </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    
 data () {
    return {
        usrname: '',
        usrfull:'',
        login:'',
        id:'',
        admin: false,
    }
 }  
,
mounted() {
    this.getUsrName() 
    
    
  
},
methods: {
  async getUsrName() {
   this.usrname=  this.$auth.user
   const res = await axios.get(
        `http://localhost:3000/api/auth/${this.usrname}`
      ).then(response => (this.usrfull = response))
      this.login = this.usrfull.data.login
      this.id = this.usrfull.data._id
      this.admin = this.usrfull.data.admin
  }
}
}
</script>