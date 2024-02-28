import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import ProjectDetail from './pages/ProjectDetail.vue';


const router = createRouter({
history: createWebHistory(),
routes: [
{

    path: '/',
    name: 'Home',
    component: HomePage

},

{

    path: '/projects/:id',
    name: 'project-detail',
    component: ProjectDetail

},


]


});

export {router};

