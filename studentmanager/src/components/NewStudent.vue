<template>
    <div id="new-student">
        <h3>New Student</h3>
        <div class="row">
            <form @submit.prevent="saveStudent" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="student_id" required>
                        <label>Student ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>Name</label>
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="grade_level" required>
                        <label>Grade Level</label>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to ="/" class="btn red">Cancel</router-link>
            </form>
        </div>
     </div>
</template>

<script>
import db from './firebaseInit'
export  default {
    name:'new-student',
    data () {
        return{
            student_id: null,
            name: null,
            grade_level: null,
        }
    },
    methods: {
        saveStudent () {
            db.collection('students').add({
              student_id: this.student_id,
              name: this.name,
              grade_level: this.grade_level
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>