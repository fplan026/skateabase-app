<template>
    <!-- Add skates modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        data-bs-whatever="@mdo">Add skates</button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Skates</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-for="size in Sizes" :key="size">
                        Size {{ size }}:
                        <IncrementDecrementInput :initialValue="3"></IncrementDecrementInput>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Send message</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import IncrementDecrementInput from "@/components/IncrementDecrementInput.vue"
export default {
    data() {
        return {
            Skates: [],
            Sizes: []
        };
    },
    created() {
        let apiURL = "http://localhost:4000/api/skates";
        axios.get(apiURL).then(res => {
            this.Skates = res.data;
            let sizes = new Set();
            //create an array of all of the sizes in the db
            for (let skate of this.Skates.values()) {
                sizes.add(skate.size);
            }
            this.Sizes = sizes;
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {},
    components: {
        IncrementDecrementInput
    }
}
</script>