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
        <v-btn @click=onJob>Отметиться</v-btn>
        <span color="red" v-if="this.timestamp">Вы уже на работе отметка {{timestamp}} </span>
       <span>{{ $dateFns.format(podschetvremeni, 'yyyy-MM-dd HH:mm:ss') }}</span>
              
              <v-checkbox
    </div>
</template>

<script>
import {format, parse, parseISO} from 'date-fns'
import { ru } from 'date-fns/locale';
import axios from 'axios'
export default {
    
 data () {
    return {
        usrname: '',
        usrfull:'',
        login:'',
        id:'',
        admin: false,
        prishel:new Date(),
        timestamp:'',
    }
 }  
,
mounted() {
    this.getUsrName() 
    
    
  
},

computed: {
    // a computed getter
    podschetvremeni() {
      //const raznica = format(parseISO(new Date), 'T') - format(parseISO(this.timestamp), 'T');
      const unixTimeZero = Date.parse(this.timestamp)
      const unixTimeZero2 = Date.parse(new Date())
      const raznica = unixTimeZero2 - unixTimeZero
      const narabote=raznica
      //const created = format(parseISO(date), 'T',{locale: ru})
      return narabote
      
    }
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
      this.timestamp=this.usrfull.data.prihod
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
  onJob() {
    const formData = {
      login:this.login,
      prishel: this.prishel
    }
    axios
        .patch(
          `http://localhost:3000/api/auth/${this.usrname}/onjob`,
          formData
        )
        .then()
  }
}
}
</script>