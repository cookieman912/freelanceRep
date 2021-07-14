import Vue from 'vue'

export const SHOW_MSG = 'show-msg';
export const TOGGLE_LOGIN = 'toggle-login'
export const eventBusService = new Vue();

// Supported types: success, danger
export function showMsg(txt, type = 'success') {
    eventBusService.$emit(SHOW_MSG, { txt, type });
}

export function toggleLogin(num, type = 'toggle') {
    console.log('in functon')
    eventBusService.$emit('toggle-login', { num, type });
}