<template>
  <div id="app">
    <header>
      <div id="logo">
        <img src="./assets/logo.png">
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  max-width: 1164px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

#logo {

}

#nav {
  padding-left: 50px;
  padding-right: 50px;

  a {
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }

    &:not(:last-child) {
      margin-right: 32px;
    }
  }
}

.sequence-part {
  margin-bottom: 40px;
  padding-top: 20px;
  border-top: 2px solid lightgrey;
}
</style>
