<template>
    <div class="project-details" v-if="project">
        <h1>{{ project.title }}</h1>
        <p>{{ project.description }}</p>
        <img :src="project.project_image" alt="Project Image" v-if="project.project_image">
        <p>Author: {{ project.author }}</p>
        <p>Type: {{ project.type_name }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ProjectDetail',
    data() {
        return {
            project: null,
        };
    },
    created() {
        const projectId = this.$route.params.id;
        axios.get(`http://localhost:8000/api/projects/${projectId}`)
            .then(response => {
                this.project = response.data.result;
            })
            .catch(error => {
                console.error("There was an error fetching the project details:", error);
            });
    },
}
</script>
<style scoped>
.project-details {
    background-color: #333; /* Sfondo scuro */
    color: #fff; /* Testo bianco */
    border: 1px solid #eee;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
}

h1, h5 {
    color: #fff; /* Assicurati che anche i titoli siano bianchi */
}

p, img {
    margin: 10px 0;
}

img {
    max-width: 100%;
    height: auto;
    display: block; /* Assicura che le immagini non abbiano spazio extra sotto */
}
</style>
