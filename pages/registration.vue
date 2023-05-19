<template>
  <div>
  <h1 class="text-center">Регистрация</h1>
    <v-form @submit.prevent="registerUser" class="px-12 py-12 text-center">
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
 // middleware: 'auth',
  data () {
    return {
      info: '',
      login: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    async registerUser () {
      try {
        await this.$axios.post('/api/auth/register', {
          login: this.login.user,
          password: this.login.password
        }).then(response => (this.info = response))
        console.log(this.info)
        await this.$toasted.show('<span style="font-family: coursive; font-size: 23px;">Успешно Запегистрировались</span>', {
          theme: 'bubble',
          position: 'top-center',
          duration: 4000
        })
      } catch (err) {
        console.log(err)
        this.$toasted.show('<span style="font-family: coursive; font-size: 23px;">Не удалось зарегистрироваться</span>', {
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
