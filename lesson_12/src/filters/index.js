import Vue from 'vue'

Vue.filter('addCurrency', (value) => {
    if (!value) return '';
    // Если строка уже заканчивается на $, возвращаем как есть
    if (value.toString().endsWith('$')) return value;
    return value + '$';
})