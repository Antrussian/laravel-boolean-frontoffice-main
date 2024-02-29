<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';

export default {
    name: 'HomeView',
    components: {
        AppCard
    },
    data() {
        return {
            apiURL: 'http://127.0.0.1:8000/api/cocktails/?page=',
            cocktails: [],
            currentPage: 1,
            lastPage: null,
            filter: '',
            images: [
                // URL delle immagini per lo slider
                'https://cdn.vox-cdn.com/thumbor/Ut5LHtqMD7fujdF9HQGRg95_xKk=/0x0:2000x1401/1200x675/filters:focal(287x482:607x802)/cdn.vox-cdn.com/uploads/chorus_image/image/69406593/untitled_6698_HDR.0.jpg',
                'https://www.cincinnati.com/gcdn/presto/2023/05/04/PCIN/39978bda-d7a5-43ed-88e8-3727a6505837-Unexpected_Speakeasy.png',
                'https://www.dispatch.com/gcdn/presto/2022/04/04/NCOD/e7622896-71fe-4195-ae44-b3b818f206aa-BZ_Private_Bars_KWR_02.JPG?crop=2499,1406,x0,y127&width=2499&height=1406&format=pjpg&auto=webp'
            ],
            currentImageIndex: 0,
            rotationInterval: null
        }
    },
    methods: {
        // Metodo per passare alla pagina successiva-
        nextPage() {
            if (this.currentPage < this.lastPage) {
                this.currentPage++;
            } else {
                this.currentPage = 1;
            }
            this.apiCall();
        },
        // Metodo per tornare alla pagina precedente
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            } else {
                this.currentPage = this.lastPage;
            }
            this.apiCall();
        },
        // Metodo per chiamare l'API e ottenere i dati dei cocktail
        apiCall() {
            axios.get(`${this.apiURL}${this.currentPage}`)
                .then(response => {
                    this.cocktails = response.data.result.data;
                    this.currentPage = response.data.result.current_page;
                    this.lastPage = response.data.result.last_page;
                })
                .catch(error => console.error(error));
        },
        // Metodo per avviare la rotazione automatica dello slider
        startRotation() {
            this.rotationInterval = setInterval(this.rotateImage, 3000);
        },
        // Metodo per fermare la rotazione automatica dello slider quando il mouse entra
        stopRotation() {
            clearInterval(this.rotationInterval);
        },
        // Metodo per cambiare l'immagine corrente nello slider
        rotateImage() {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        }
    },
    mounted() {
        // Chiama l'API e avvia la rotazione automatica dello slider quando il componente è montato
        this.apiCall();
        this.startRotation();
    }
}
</script>
        
<template>
    <!-- Slider delle immagini con Autoplay -->
    <div class="hero-slider" @mouseenter="stopRotation" @mouseleave="startRotation">
       <!-- Vengono ciclate le immagini. Solo l'immagine corrente viene mostrata -->
       <div class="slide" v-for="(image, index) in images" :key="index" 
            :style="{ backgroundImage: `url(${image})`, display: index === currentImageIndex ? 'block' : 'none' }">
       </div>
    </div>
 
    <!-- Sezione Jumbotron per la presentazione -->
    <div class="p-5 mb-4 bg-light rounded-1 bg-dark w-75 m-auto shadow mt-2 background_jumbo">
       <div class="container py-5">
          <h1 class="display-5 fw-bold text-white">Talk. Drink. Love.</h1>

       </div>
    </div>
 
    <!-- Container per le cards dei cocktail -->
    <div class="container mb-5">
       <div class="row row-cols-1 row-cols-lg-3 g-4">
          <div class="col" v-for="cocktail in cocktails" :key="cocktail.id" 
               v-show="filter === '' || filter === cocktail.alcholic">
             <AppCard :cocktail="cocktail"></AppCard>
          </div>
       </div>
 
       <!-- Navigazione/Paginazione -->
       <div class="row mt-4">
          <div class="prev w-50 text-start" @click="prevPage">
             <i class="fas fa-arrow-left text-white" style="font-size: 28px;"></i>
          </div>
          <div class="next w-50 text-end" @click="nextPage">
             <i class="fas fa-arrow-right text-white" style="font-size: 28px;"></i>
          </div>
       </div>
    </div>
 </template>
 

<!-- Stili (mantenuti come fornito precedentemente) -->
<style lang="scss" scoped>
/* Stili esistenti qui */
</style>


<style lang="scss" scoped>
.hero-slider {
    display: flex;
    overflow: hidden;
    .slide {
        flex: none;
        width: 100%;
        height: 300px; // Imposta l'altezza desiderata per lo slider
        background-size: cover; // Imposta l'immagine come "cover"
        background-position: center;
    }
}

.background_jumbo {
    background-image: url(../assets/image/brand.png);
    background-size: 30%;
    background-repeat: no-repeat;
    background-position: right 10% bottom 45%;
}
</style>
