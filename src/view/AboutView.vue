<script>
export default {
    name: 'AboutView',
}
</script>

<template>
    <div class="container py-5">
        <h1 class="text-white mb-4">About us</h1>
        <div class="p-5 bg-light rounded-3">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Ciao, benvenuto da La Aparicon 👋</h1>
                <p class="fs-4">
                    🍸 Talk. Drink. Love. 🍸
                </p>
                <!-- Aggiunta della sezione speakeasy -->
                <div class="speakeasy-section mt-5">
                    <h2 class="fw-bold">Scopri il nostro Speakeasy in Milano</h2>
                    <img src="https://www.cincinnati.com/gcdn/presto/2023/05/04/PCIN/39978bda-d7a5-43ed-88e8-3727a6505837-Unexpected_Speakeasy.png" alt="Speakeasy Milano" class="img-fluid" />
                    <p class="mt-3">
                        Nascosto nelle vie segrete di Milano, "La Aparición" si rivela come una gemma rara per gli amanti dei cocktail alla ricerca di un'esperienza unica. Questo bar speakeasy, il cui nome evoca il mistero e il fascino dell'apparire improvviso, offre un rifugio dall'ordinario. Entrando in "La Aparición", i visitatori vengono trasportati in un'epoca passata, dove l'eleganza degli anni '20 si fonde con un tocco di modernità sofisticata.

Ogni cocktail servito a "La Aparición" è una creazione artistica, frutto della passione e dell'esperienza dei nostri bartender, che mixano ingredienti di prima qualità con tecniche innovative. La cura dei dettagli si estende anche all'ambiente, caratterizzato da arredi d'epoca, luci soffuse e musica jazz di sottofondo, che insieme creano un'atmosfera accogliente e intima.

"La Aparición" non è solo un bar, ma una destinazione per coloro che cercano di svelare i segreti di Milano e vivere momenti indimenticabili. Lasciati sedurre dall'incanto di "La Aparición", dove ogni visita è un'esperienza da ricordare.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-info {
    border: 5px solid black;
    border-radius: 20px;

    & .info {
        display: none;
        text-align: start;
    }

    &:hover {
        .info {
            display: block;
        }
    }
}

.main_content {
    height: 1100px;
    padding-top: 10vh;
}

.speakeasy-section img {
    max-width: 100%;
    height: auto;
    border-radius: 15px; 
}
</style>
