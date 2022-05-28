<template>
    <div class="container">
        <div class="row justify-content-end">
            <div class="col-2">
                <button class="btn btn-success" @click="this.$router.push('/create')">
                    <i class="bi bi-plus-circle-fill"></i>
                    <span class="ms-2">New Rental</span>
                </button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rental in Rentals" :key="rental._id">
                        <td>{{ rental.name }}</td>
                        <td>{{ rental.email }}</td>
                        <td>{{ formatPhoneNumber(rental.phone) }}</td>
                        <td>
                            <router-link :to="{ name: 'edit', params: { id: rental._id } }" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteRental(rental._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { parsePhoneNumber } from 'libphonenumber-js'
export default {
    data() {
        return {
            Rentals: []
        }
    },
    created() {
        let apiURL = 'http://localhost:4000/api';
        axios.get(apiURL).then(res => {
            this.Rentals = res.data;
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
        deleteRental(id) {
            let apiURL = `http://localhost:4000/api/delete-renter/${id}`;
            let indexOfArrayItem = this.Rentals.findIndex(i => i._id === id);
            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Rentals.splice(indexOfArrayItem, 1);
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        formatPhoneNumber(phone) {
            try {
                return parsePhoneNumber(phone).formatNational()
            } catch (error) {
                return phone
            }
        }
    }
}
</script>
<style>
.btn-success {
    margin-right: 10px;
}
</style>