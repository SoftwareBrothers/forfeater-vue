<script>
    import DatePicker from 'vue2-datepicker'
    
    export default {
        props: {
            orderDate: {
                default: null
            }
        },
        components: {
            DatePicker
        },
        data() {
            return {
                time: '',
                timePickerOptions: {
                    start: '08:00',
                    step: '00:15',
                    end: '17:00'
                }
            }
        }
    }
</script>
 
<template>
    <date-picker v-model="orderDate" type="datetime" :time-picker-options="timePickerOptions" :first-day-of-week="1" lang="en" format="YYYY-MM-DD HH:mm">
    </date-picker>
</template>
