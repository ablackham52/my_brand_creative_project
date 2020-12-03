<template>
<div id="app">
  <div class="header">
    <router-link to="/">
    <div class="title">
      <h1>MyBrand</h1>
    </div>
    </router-link>

      <router-link to="/sign-up">
      <div class="title">
        <h1>Register</h1>
      </div>
      </router-link>

        <router-link to="/login">
        <div class="title">
          <h1>Login</h1>
        </div>
        </router-link>

        <router-link to="/profile" v-if="this.$root.$data.client.name">
        <div class="title">
          <h1>Profile</h1>
        </div>
        </router-link>


  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <p></p>
    <a class="github" href='https://github.com/ablackham52/my_brand_creative_project' target='_blank'>GitHub Repo</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

a {
color: white;
  text-decoration: none;
}

a:hover {
 color: gray;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #000000;
  color: #FFFFFF;
}

.title {
  margin: 20px;
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
