<script>
export default {
    // Nome del componente
    name: 'AppCard',
    // Proprietà passata al componente
    props: {
        cocktail: Object
    },
    // Dati del componente
    data() {
        return {
            ingredients: [], // Array per gli ingredienti
            measures: [] // Array per le misure
        }
    },
    // Metodi del componente
    methods: {
        // Metodo per decodificare gli ingredienti dal formato JSON
        ingredientsDecode() {
            this.ingredients = JSON.parse(this.cocktail.ingredients);
        },
        // Metodo per decodificare le misure dal formato JSON
        measuresDecode() {
            this.measures = JSON.parse(this.cocktail.measures);
        }
    },
    // Metodo eseguito quando il componente viene montato
    mounted() {
        this.ingredientsDecode(); // Decodifica gli ingredienti
        this.measuresDecode(); // Decodifica le misure
    }
}
</script>

<template>
    <!-- Link alla pagina del cocktail -->
    <router-link class="text-decoration-none" :to="{ name: 'Cocktail', params: { slug: cocktail.slug } }">
        <!-- Card del cocktail -->
        <div class="card h-100 ">
            <!-- Immagine del cocktail -->
            <img :src="cocktail.thumb" alt="Cocktail image">
            <div class="card-body h-100 d-flex flex-column justify-content-around">
                <!-- Titolo del cocktail -->
                <h3 class="text-center text-truncate text-white">{{ cocktail.name }}</h3>
                <!-- Container per misure e ingredienti scrollabile -->
                <div class="scrollable-container">
                    <!-- Coppia di ingrediente e misura -->
                    <span v-for="(ingredient, index) in ingredients" :key="`ingredient-${index}`" class="ingredient-measure-pair">
                        <!-- Badge per la misura -->
                        <small class="badge rounded-pill text-bg-primary bg-dark m-1">{{ measures[index] || '' }}</small>
                        <!-- Badge per l'ingrediente -->
                        <small class="badge rounded-pill text-bg-danger m-1">{{ ingredient }}</small>
                    </span>
                </div>
                <!-- Container per la categoria e alcolicità -->
                <div class="container d-flex justify-content-between py-2 align-items-center">
                    <!-- Categoria -->
                    <div class="d-flex justify-content-between py-2">
                        <h4 class="text-danger" v-if="cocktail.alcholic === 'Alcoholic'">{{ cocktail.alcholic }}</h4>
                        <h4 class="text-success" v-else>{{ cocktail.alcholic }}</h4>
                    </div>
                    <!-- Alcolicità -->
                    <div class="d-flex justify-content-between py-1">
                        <h4 class="text-warning" v-if="cocktail.category === 'Cocktail'">{{ cocktail.category }}</h4>
                        <h4 class="text-primary" v-else>{{ cocktail.category }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
.card {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.032); 
    border: 2px solid rgb(242, 160, 251);
    display: flex;
    flex-direction: column;
    transition: 0.4s ease-out;
    box-shadow: 0px 7px 10px rgba(186, 0, 232, 0.514);
    backdrop-filter: blur(10px); 
    &:hover {
        transform: translateY(-20px);
    }
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 5px;
    }
}

.scrollable-container {
    display: flex;
    overflow-x: auto;
    gap: 10px;
    padding: 5px 0;

    .ingredient-measure-pair {
        white-space: nowrap;
    }

    &::-webkit-scrollbar {
        height: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 20px;
    }
}
</style>