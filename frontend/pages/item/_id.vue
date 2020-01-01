<template>
  <div class="container">
    <div v-if="item != ''">
      {{ item.result }}
      <br>
      <img :src="item.image">
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
      item: ''
    }
  },
  mounted: function () {
      axios.get('http://localhost:8080/getid', { params: {id: this.$route.params.id}})
        .then(response => this.item = response.data)
          .catch(function (error) {
            console.log(error);
          });
  },
  methods: {
      
  }
}
</script>