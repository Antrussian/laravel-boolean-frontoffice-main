<script>
import axios from 'axios';

export default {
    // Nome del componente
    name: 'CocktailsView',
    // Dati del componente
    data() {
        return {
            // URL dell'API per i cocktail
            apiURL: 'http://127.0.0.1:8000/api/cocktails/',
            // Variabile per memorizzare i dettagli del cocktail
            cocktail: {},
            // Array per memorizzare gli ingredienti del cocktail
            ingredients: [],
            // Array per memorizzare le misure degli ingredienti del cocktail
            measures: [],
        }
    },
    // Metodi del componente
    methods: {
        // Funzione per effettuare una chiamata API per ottenere i dettagli del cocktail
        cocktailApiCall() {
            axios.get(this.apiURL + this.$route.params.slug)
                .then(response => {
                    // Memorizza i dettagli del cocktail nella variabile 'cocktail'
                    this.cocktail = response.data.result;
                    // Parsifica e memorizza gli ingredienti nella variabile 'ingredients'
                    this.ingredients = JSON.parse(this.cocktail.ingredients);
                    // Parsifica e memorizza le misure degli ingredienti nella variabile 'measures'
                    this.measures = JSON.parse(this.cocktail.measures);
                    // Stampa gli ingredienti e le misure nella console per debug
                    console.log(this.ingredients, this.measures);
                })
        },
    },
    // Hook di lifecycle per eseguire la funzione 'cocktailApiCall' al caricamento del componente
    mounted() {
        this.cocktailApiCall();
    },
}
</script>

<template>
    <!-- Contenitore principale del componente -->
    <div class="container">
        <!-- Righe per visualizzare i dettagli del cocktail -->
        <div class="row row-cols-1 row-cols-md-2 fs-6">
            <!-- Colonna per visualizzare l'immagine del cocktail -->
            <div class="col py-5">
                <img class="img-fluid" :src="this.cocktail.thumb" alt="">
            </div>
            <!-- Colonna per visualizzare altri dettagli del cocktail -->
            <div class="col">
                <!-- Contenitore per i dettagli del cocktail -->
                <div class="container py-5">
                    <!-- Titolo e categoria del cocktail -->
                    <div class="row">
                        <h4 class="text-white">{{ this.cocktail.category }}</h4>
                    </div>
                    <!-- Nome e ID del cocktail -->
                    <h1 class="display-5 fw-bold text-white mb-5">#{{ this.cocktail.id }} - {{ this.cocktail.name }}</h1>
                    <!-- Contenitore per gli ingredienti e le misure -->
                    <div class="my-1 d-flex justify-content-center flex-wrap">
                        <!-- Elenco degli ingredienti e misure -->
                        <div class="scrollable-container">
                            <span v-for="(ingredient, index) in ingredients" :key="`ingredient-${index}`" class="ingredient-measure-pair">
                                <small class="badge rounded-pill text-bg-primary bg-dark m-1">{{ measures[index] || '' }}</small>
                                <small class="badge rounded-pill text-bg-danger m-1">{{ ingredient }}</small>
                            </span>
                        </div>
                    </div>
                    <!-- Istruzioni per preparare il cocktail -->
                    <h1 class="text-white mb-5">{{ this.cocktail.instructions }}</h1>
                    <!-- Alcolico o non alcolico -->
                    <div class="row">
                        <h4 class="text-white">{{ this.cocktail.alcholic }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>