<template>
    <div id="dashboard">
       <ul class="collection with-header">
           <li class="collection-header"><h4>Students</h4>
           </li>
           <li v-for="student in students" 
           v-bind:key="student.id" 
           class="collection-item">
           <div class="chip">{{student.grade_level}}</div>{{student.student_id}}:{{student.name}}
           <router-link class="secondary-content" v-bind:to="{name: 'view-student', params: {student_id: student.student_id}}">
               <i class="fa fa-eye"></i>
           </router-link>
           </li>
       </ul>

        <div class="fixed-action-btn">
            <router-link to="/new" class="tbn-floating 
            btn-large red">
            <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export  default {
    name:'dashboard',
    data () {
        return{
            students: []
        }
    },
    created () {
        db.collection('students').orderBy('student_id').get().then
        (querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.id);
                const data = {
                    'id': doc.id,
                    'student_id': doc.data().student_id,
                    'name': doc.data().name,
                    'grade_level': doc.data().grade_level,
                }
                this.students.push(data)
            })
        })
    }
}
</script>