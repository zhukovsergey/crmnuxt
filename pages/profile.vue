<template>
    <div>
        <h2>Профиль пользователя {{this.login}} </h2>
        
        {{this.id}}
    
        
    <v-text-field
      label="Логин"
      v-model="this.login"
      hide-details="auto"
    ></v-text-field>
    <v-checkbox
                v-model="admin"
                label="Администратор"
                name="admin"
                :value="this.admin"
              />
              <v-checkbox
        <v-btn @click=moderatecom>Изменить</v-btn>
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
  },
  moderatecom () {
      const formData = {
        admin: this.admin,
        login: this.login
      }
      axios
        .patch(
          `http://localhost:3000/api/auth/${this.usrname}`,
          formData
        )
        .then()
    },
}
}
</script>