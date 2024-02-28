<template>
    <div>
        <!-- Container per le cards dei progetti -->
        <div class="projects-container">
            <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProjectCard from '../components/AppProjectCard.vue'; // Assicurati che il percorso sia corretto

export default {
    name: 'HomePage',
    components: {
        ProjectCard,
    },
    data() {
        return {
            projects: [],
        };
    },
    methods: {
        getProjects() {
            axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                this.projects = response.data.result.map(project => ({
                    ...project,
                    type_name: project.type?.name, // Assumi che esista una proprietà 'name' nell'oggetto 'type'
                    technologies: project.technologies || []
                }));
            })
            .catch(error => {
                console.error(error);
            });
        }
    },
    created() {
        this.getProjects();
    }
}
</script>

<style>
.projects-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Allinea le cards al centro orizzontalmente */
  gap: 20px; /* Mantiene lo spazio tra le cards */
  padding: 20px; /* Aggiunge padding intorno alle cards per un po' di spazio esterno */
  background-color: rgb(34, 34, 34); /* (Opzionale) Colore di sfondo per il contenitore */
}

/* (Opzionale) Se vuoi che ogni card abbia anche del padding interno, puoi aggiungere uno stile specifico per le cards qui. */
.project-card {
  padding: 20px; /* Aggiunge padding interno per ogni card */
  margin-bottom: 20px; /* Assicura che ci sia spazio sotto ogni card */
  align-items: center; /* Centra gli elementi della card verticalmente, se usi flexbox all'interno delle cards */
  width: calc(100% / 3 - 40px); /* Esempio per avere tre cards per riga con il gap considerato, aggiustalo secondo le tue necessità */
  background-color: #fff; /* Colore di sfondo per le cards */
  border-radius: 8px; /* Bordi arrotondati per le cards */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra leggera per un effetto elevato */
}

</style>

