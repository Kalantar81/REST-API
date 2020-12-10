import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

new Vue({
    el: '#app',
    data() {
        return {
            form: {
                name: '',
                value: ''
            },
            contacts: [
                {id: 1, name: 'Vlad', value: '+7-921-100-20-30', marked: false}
            ]
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim();
        }
    },
    methods: {
        createContact() {
           const {...contact} = this.form;
           this.contacts.push({...contact, id: Date.now(), marked: false});
           console.log(this.contacts);

           this.form.name = '';
           this.form.value = '';
        },
        markContact(id) {
            const contact = this.contacts.find(c => c.id === id);
            contact.marked = true;
        },
        removeContact(id) {
            this.contacts = this.contacts.filter((contact) => {contact.id !== id})
        }
    }
    
});
