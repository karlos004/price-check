<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        frontend
      </h1>
      <h2 class="subtitle">
        My finest Nuxt.js project
      </h2>
      <div>
        <input type="text" v-model="url">
        <input type="button" @click="geturl">
        {{ result }}
      </div>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  components: {
    Logo
  },
  data () {
    return { 
      url: '',
      result: {}
    }
  },
  methods: {
    geturl: async function (){
      await axios.get('http://localhost:8080/geturl', { params: {url: this.url}})
        .then(response => this.result = response.data)
          .catch(function (error) {
            console.log(error);
          });
          console.log(this.result)
          var id = this.result.data._id;
          var status = this.result.status
          console.log(id)
          this.$router.push({ path: `/item/${id}`, query: {status: status} }) // -> /item/123
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
