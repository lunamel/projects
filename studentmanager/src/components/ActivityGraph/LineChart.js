import {Line} from 'vue-chartjs'

export default Line.extend({
    mounted () {
        this.renderChart({
            labels:['Monday','Tuesday','Wednesday','Thursday','Friday'],
            datasets: [
                {label: 'Number of Messages', data:[5,15,10,8,6] }
            ]
        }, {responsive: true, maintainAspecRatio: false})
    }
})