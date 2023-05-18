<template>
  <div>
  <h1 class="text-center">Вход на сайт</h1>
    <v-form @submit.prevent="userLogin" class="px-12 py-12 text-center">
      <div>
        <v-text-field label="Имя пользователя" type="text" v-model="login.user" />
      </div>
      <div>
          <v-text-field label="Пароль" type="password" v-model="login.password" />
      </div>
      <div>
        <v-btn class="primary" type="submit">Войти</v-btn>
      </div>
    
    </v-form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      login: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin () {
      try {
        const resp=await this.$auth.loginWith('local', { data: this.login }).then(console.log(resp))
        await this.$toasted.show('<span style="font-family: coursive; font-size: 23px;">Успешно авторизовались</span>', {
          theme: 'bubble',
          position: 'top-center',
          duration: 4000
        })
      } catch (err) {
        console.log(err)
        this.$toasted.show('<span style="font-family: coursive; font-size: 23px;">Неправильный логин или пароль</span>', {
          theme: 'bubble',
          type: 'error',
          position: 'top-center',
          duration: 3000
        })
      }
    }
  }
}
</script>
