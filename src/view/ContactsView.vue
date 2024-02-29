
<script>
import axios from 'axios';

export default {
    // Nome del componente
    name: 'ContactsView',
    // Dati del componente
    data() {
        return {
            // Variabili per i campi del form e gestione degli errori
            name: '',
            email: '',
            phone: '',
            message: '',
            errors: {},
            // Variabile per gestire lo stato di caricamento del form
            loading: false,
            // Variabile per indicare se il form è stato inviato con successo
            formSend: false,
            // Messaggio di successo dopo l'invio del form
            successMessage: ''
        }
    },
    // Metodi del componente
    methods: {
        // Metodo per inviare il form
        sendForm() {
    // Imposta lo stato di caricamento a true e resetta gli errori e i messaggi di successo
    this.loading = true;
    this.errors = {};
    this.formSend = false;
    this.successMessage = '';

    // Costruisce il payload del form
    const payload = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message
    };

    // Effettua una richiesta POST all'API con il payload
    axios.post('http://127.0.0.1:8000/api/contacts', payload)
        .then(response => {
            // Una volta ricevuta la risposta, imposta lo stato di caricamento a false
            this.loading = false;

            // Se la richiesta ha avuto successo, resetta i campi del form e mostra un messaggio di successo
            if (response.data.success) {
                this.name = '';
                this.email = '';
                this.phone = '';
                this.message = '';
                this.formSend = true;
                this.successMessage = 'Invio completato con successo';
            } else {
                // Se ci sono errori, imposta gli errori restituiti dalla risposta
                this.errors = response.data.errors;
            }
        })
        .catch(error => {
            // Gestisce gli errori
            console.error(error.message);
            this.loading = false;
        });
        }
    }
}
</script>


<template>
    <!-- Form per contattare -->
    <div class="container">
        <h1 class="pt-5 text-white">Contattaci</h1>
        <form action="#" class="my-5" @submit.prevent="sendForm">
            <!-- Campi del form -->
            <div class="d-flex gap-4 justify-content-between pb-4">
                <!-- Campo Nome -->
                <div class="form-floating flex-grow-1">
                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }" id="name" placeholder="Nome Cognome" v-model="name">
                    <label for="name">Nome</label>
                    <!-- Messaggi di errore per il campo Nome -->
                    <div class="alert alert-danger mt-2" role="alert" v-if="errors.name">
                        <strong>Errori! </strong>
                        <span v-for="(message, index) in errors.name" :key="index">{{ message }}</span>
                    </div>
                </div>
                <!-- Campo Email -->
                <div class="form-floating flex-grow-1">
                    <input type="email" class="form-control" id="email" :class="{ 'is-invalid': errors.email }" placeholder="nome@example.com" v-model="email">
                    <label for="email">Indirizzo Email</label>
                    <!-- Messaggi di errore per il campo Email -->
                    <div class="alert alert-danger mt-2" role="alert" v-if="errors.email">
                        <strong>Errori! </strong>
                        <span v-for="(message, index) in errors.email" :key="index">{{ message }}</span>
                    </div>
                </div>
                <!-- Campo Telefono -->
                <div class="form-floating flex-grow-1">
                    <input type="tel" class="form-control" :class="{ 'is-invalid': errors.phone }" id="phone" placeholder="0123456789" v-model="phone">
                    <label for="phone">Numero di Telefono</label>
                    <!-- Messaggi di errore per il campo Telefono -->
                    <div class="alert alert-danger mt-2" role="alert" v-if="errors.phone">
                        <strong>Errori! </strong>
                        <span v-for="(message, index) in errors.phone" :key="index">{{ message }}</span>
                    </div>
                </div>
            </div>
            <!-- Campo Messaggio -->
            <div class="py-5">
                <textarea class="form-control" id="message" rows="5" placeholder="Lascia qui il tuo messaggio" v-model="message" :class="{ 'is-invalid': errors.message }"></textarea>
                <!-- Messaggi di errore per il campo Messaggio -->
                <div class="alert alert-danger mt-2" role="alert" v-if="errors.message">
                    <strong>Errori! </strong>
                    <span v-for="(message, index) in errors.message" :key="index">{{ message }}</span>
                </div>
            </div>
            <!-- Pulsante Invia -->
            <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Invio in corso...' : 'Invia' }}
            </button>
            <!-- Messaggio di successo dopo l'invio del form -->
            <div class="alert alert-success mt-2" role="alert" v-if="formSend" style="background-color: #d4edda; color: #155724;">
                <strong>{{ successMessage }}</strong>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
</style>
