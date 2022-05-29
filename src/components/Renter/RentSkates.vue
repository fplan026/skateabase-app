<template>
    <h1>Rent Skates!</h1>
    <dl class="row text-start col-sm-4 border">
        <dt class="header h5 p-2 bg-primary text-white fw-bolder">Rental Session</dt>
        <dt class="col-sm-2">Name</dt>
        <dd class="col-sm-10">{{ rental.name }}</dd>
        <dt class="col-sm-2">Email</dt>
        <dd class="col-sm-10">{{ rental.email }}</dd>
        <dt class="col-sm-2">Phone</dt>
        <dd class="col-sm-10">{{ rental.phone }}</dd>
    </dl>
</template>

<script>
import AddSkateModalVue from "@/components/Skate/AddSkateModal.vue";
import axios from "axios";
export default {
    data() {
        return {
            //list of skate objects returned from the GET request
            Skates: [],
            rental: []
        }
    },
    components: {
        AddSkateModalVue
    },
    created() {
        let apiURL = 'http://localhost:4000/api/skates';
        axios.get(apiURL).then(res => {
            this.Skates = res.data;
        }).catch(error => {
            console.log(error)
        });

        let rentalSessionURL = `http://localhost:4000/api/edit-renter/${this.$route.params.id}`;
        axios.get(rentalSessionURL).then((res) => {
            this.rental = res.data;
        })
    },
    methods: {
    }
}
</script>