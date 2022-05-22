<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Content goes here -->
        </div>
    </div>
</template>

<script>
export default {
    name: "EditRentalSession",
    created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
      }
    )
  },
}
</script>