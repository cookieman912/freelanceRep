import Vue from 'vue'

export const SHOW_MSG = 'show-msg';
export const TOGGLE_LOGIN = 'toggle-login'
export const eventBusService = new Vue();

// Supported types: success, danger
export function showMsg(txt, type = 'success') {
    eventBusService.$emit(SHOW_MSG, { txt, type });
}

export function toggleLogin(num, type = 'toggle') {
    eventBusService.$emit('toggle-login', { num, type });
}

export function toggleSignup(num, type = 'toggle') {
    eventBusService.$emit('toggle-signup', { num, type });
}

export function removeGig(_id, type = 'remove') {
    eventBusService.$emit('remove-gig', { _id, type })
}