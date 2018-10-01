<template>
    <div id="edit-student">
        <h3>Edit Student</h3>
        <div class="row">
            <form @submit.prevent="updateStudent" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="student_id" required>
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
                <button type="submit" class="btn blue">Submit</button>
                <router-link to ="/" class="btn red">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export  default {
    name:'edit-student',
    data () {
        return{
            student_id: null,
            name: null,
            grade_level: null
        }
    },
        beforeRouteEnter (to, from, next) {
        db.collection('students').where('student_id',
        '==',to.params.student_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.student_id = doc.data().student_id
                    vm.name = doc.data().name
                    vm.grade_level = doc.data().grade_level
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            db.collection('students').where('student_id', '==', this.$route.params.student_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.student_id = doc.data().student_id
                    this.name = doc.data().name
                    this.grade_level = doc.data().grade_level
                })
            })
        },
        updateStudent () {
               db.collection('students').where('student_id', '==', 
               this.$route.params.student_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  doc.ref.update({
                      student_id: this.student_id,
                      name: this.name,
                      grade_level: this.grade_level
                  })
                  .then(() => {
                      this.$router.push({name:'view-student', params: {student_id: this.student_id}})
                  })
                })
            })
        }
    }
}