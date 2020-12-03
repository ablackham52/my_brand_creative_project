<template>
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="brand in brands" :key="brand.id">

      <img :src="brand.path" />
      <h2>{{brand.name}}</h2>
      <p>Followers: {{brand.followers}}</p>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
  return {
   brands: [],
  }
},
created() {
  this.getBrands();
},
methods: {
  async getBrands() {
    try {
      let response = await axios.get("/api/brand");
      this.brands = response.data;
      return true;
    } catch (error) {
      //console.log(error);
    }
  },
}
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
margin-top: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
}

.image {
margin: 33px;
margin-top: 50px;
width: 200px;
}

.image img {
height: 250px;
width: 200px;
object-fit: contain;
}


</style>
