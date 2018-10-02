<template>
    <div id="view-student">
       <ul class="collection with-header">
           <li class="collection-header"><h4>{{name}}
            </h4></li>
            <li class="collection-item">Student ID#: {{student_id}}</li>
            <li class="collection-item">Grade Level: {{grade_level}}</li>
       </ul>
       <router-link to="/" class="btn blue">Back</router-link>
       <button @click="deleteStudent" class="btn red">Delete</button>

        <div class="fixed-action-btn">
            <router-link v-bind:to="{name:'edit-student', params:{student_id: student_id }}" class="tbn-floating 
            btn-large blue">
            <i class="fa fa-pencil"></i>
            </router-link>
    </div>
</template>

<script>
import db from './firebaseInit'
export  default {
    name:'view-student',
    data () {
        return{
            student_id: null,
            name:null,
            grade_level: null,
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
        deleteStudent () {
            if(confirm('Are you sure?')) {
                db.collection('students').where('student_id', '==',
                this.$route.params.student_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete()
                        this.$router.push('/')
                    })
                })
            }
        }
    }
}
</script>