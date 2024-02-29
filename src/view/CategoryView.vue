<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';

export default {
    // Nome del componente
    name: 'HomeView',
    // Componenti utilizzati nel componente HomeView
    components: {
        AppCard
    },
    // Dati del componente
    data() {
        return {
            // URL dell'API per i cocktail
            apiURL: 'http://127.0.0.1:8000/api/cocktails/category/',
            // Array per i cocktail
            cocktails: [],
            // Pagina corrente
            currentPage: null,
            // Ultima pagina disponibile
            lastPage: null,
            // Filtro per i cocktail
            filter: ''
        }
    },
    // Metodi del componente
    methods: {
        // Metodo per passare alla pagina successiva
        nextPage() {
            // Se la pagina corrente è l'ultima, torna alla prima pagina
            if (this.currentPage === this.lastPage) {
                this.currentPage = 1;
            } else {
                this.currentPage++;
            }
            // Chiama l'API per ottenere i cocktail
            this.apiCall()
        },
        // Metodo per tornare alla pagina precedente
        prevPage() {
            // Se la pagina corrente è la prima, passa all'ultima pagina
            if (this.currentPage === 1) {
                this.currentPage = this.lastPage;
            } else {
                this.currentPage--;
            }
            // Chiama l'API per ottenere i cocktail
            this.apiCall()
            console.log(this.filter);
        },
        // Metodo per chiamare l'API e ottenere i cocktail
        apiCall() {
            axios.get(`${this.apiURL}${this.filter}/?page=${this.currentPage}`)
                .then(response => {
                    // Imposta la pagina corrente
                    this.currentPage = response.data.result.current_page;
                    // Imposta i cocktail ottenuti dalla risposta
                    this.cocktails = response.data.result.data;
                    // Imposta l'ultima pagina disponibile
                    this.lastPage = response.data.result.last_page;
                })
                .catch(error => {
                    // Gestisce gli errori
                    console.log(error);
                })
        },
        // Metodo per filtrare i cocktail per categoria
        filterCocktails(filter) {
            // Imposta il filtro
            this.filter = filter;
            // Reimposta la pagina corrente a 1 quando si applica un filtro
            this.currentPage = 1;
            // Chiama l'API per ottenere i cocktail filtrati
            this.apiCall();
            console.log(this.filter);
        },
    },
    // Metodo eseguito quando il componente viene montato
    mounted() {
    },
}
</script>
        
<template>
    <!-- Sezione Jumbotron per la presentazione -->
    <div class="p-5 mb-4 bg-dark w-75 m-auto shadow mt-2 background_jumbo">
        <div class="container  py-5 ">
            <h1 class="text-white">Scegli tra la nostra selezione.</h1>
        </div>
        <!-- Gruppo di pulsanti di filtro -->
        <div class="row">
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <!-- Pulsante per filtrare cocktail alcolici -->
                <button type="radio" class="btn-check" id="radio2" autocomplete="off"
                    @click="filterCocktails('Alcoholic')"></button>
                <label class="btn btn-outline-light" for="radio2">Alcolici</label>
                <!-- Pulsante per filtrare cocktail analcolici -->
                <button type="radio" class="btn-check" id="radio3" autocomplete="off"
                    @click="filterCocktails('Non alcoholic')"></button>
                <label class="btn btn-outline-light" for="radio3">Analcolici</label>
                <!-- Pulsante per filtrare cocktail con alcol opzionale -->
                <button type="radio" class="btn-check" id="radio4" autocomplete="off"
                    @click="filterCocktails('Optional alcohol')"></button>
                <label class="btn btn-outline-light" for="radio4">Alcol Opzionale</label>
            </div>
        </div>
    </div>

    <!-- Container per le cards dei cocktail -->
    <div class="container mb-5 ">
        <div class="row row-cols-1 row-cols-lg-3 g-4">
            <!-- Ciclo per mostrare le cards dei cocktail -->
            <div class="col" v-for="cocktail in cocktails"
                v-show="this.filter === '' ? true : (this.filter === cocktail.alcholic ? true : false)">
                <!-- Componente AppCard per mostrare il cocktail -->
                <AppCard :cocktail="cocktail"></AppCard>
            </div>
        </div>
        <!-- Navigazione/Paginazione -->
        <div class="row mt-4 ">
            <div class="prev w-50 text-start" @click="prevPage">
                <i class="fas fa-arrow-left text-white" style="font-size: 28px;"></i>
            </div>
            <div class="next w-50 text-end" @click="nextPage">
                <i class="fas fa-arrow-right text-white" style="font-size: 28px;"></i>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.background_jumbo {
    background-image: url(../assets/image/brand.png);
    width: 100px;
    background-size: 30%;
    background-repeat: no-repeat;
    background-position: right 10% bottom 45%;


}
</style>