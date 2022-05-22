<template>
    <div class="test">
        <h1>Test Component</h1>
        <button class="btn btn-primary" data-bs-target="#collapseTarget" data-bs-toggle="collapse">
            {{ testContent }}
        </button>
        <div class="collapse py-2" id="collapseTarget">
            This is the toggle-able content!
        </div>
    </div>
</template>

<script>
export default {
    name: 'TestComponent',
    props: {
        testContent: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: dodgerblue;
  font-weight: bold;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>