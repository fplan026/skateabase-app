<template>
    <AddSkateModalVue />
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Size</th>
                        <th>Rented</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="skate in Skates" :key="skate._id">
                        <td>{{ skate.size }}</td>
                        <td>{{ skate.isRented }}</td>
                        <td>{{ skate.status }}</td>
                        <td>
                            <router-link :to="{ name: 'edit', params: { id: skate._id } }" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteRental(skate._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import AddSkateModalVue from "./AddSkateModal.vue";
import axios from "axios";
export default {
    data() {
        return {
            //list of skate objects returned from the GET request
            Skates: []
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
    },
    methods: {
    }
}
</script>