import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

Vue.component('loader', {
    template: `
    <div style="display: flex; justify-content: center; align-items: center" >
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    `
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            form: {
                name: '',
                value: ''
            },
            contacts: []
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim();
        }
    },
    methods: {
        async createContact() {
            const { ...contact } = this.form;
            
            const newContact = await request('/api/contacts', 'POST', contact)
            console.log(newContact)

            this.contacts.push(newContact);

            this.form.name = '';
            this.form.value = '';
        },
        async markContact(id) {
            const contact = this.contacts.find(c => c.id === id);
            const updated = await request(`/api/contacts/${id}`, 'PUT', {
                ...contact,
                marked: true
            })
            console.log(updated)
            contact.marked = updated.marked;
        },
        async removeContact(id) {
            await request(`/api/contacts/${id}`, 'DELETE')
            this.contacts = this.contacts.filter((contact) => { contact.id !== id })
        }
    },
    // method, that called, when component is ready
    async mounted() {
        this.loading = true
        // If server and client on different ports the url must be: 'http://localhost:3000/'
        // contacts - the name of object, that we work with
        this.contacts = await request('/api/contacts')
        this.loading = false

    },

});

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            // format of data, that will be passed
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        // fetch - async method, that enable to make an async requests
        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (error) {
        console.log('Error: ', error.message)
    }
}