import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

// INSTANCIATIONS DES VARIABLES
// -- La page d'accueil au départ
export const page_active = ref("accueil")
// -- La liste de chanson
export const chansons = ref([])
// -- V-Model entrer une information de recherche
export const texte_recherche = ref("")
// -- La source de l'audio
export const source_audio = ref("")
// -- Référencement des informations de la balise audio
export const balise_audio = ref(null)
// -- Le bouton PLAY principal qui change si la chanson arrêt ou non
export const source_image_bouton = ref("pause_gris.png")
// -- sauvegarde des informations de la musique présentement joué
export let sauvegarde_chanson_id = ref("")
export let sauvegarde_chanson_titre = ref("TITRE")
export let sauvegarde_chanson_artiste = ref("ARTISTE")
export let sauvegarde_chanson_image = ref("album_gris.jpg")
export let sauvegarde_chanson_duree = ref("")
// -- Durée actuelle de la chanson en cours en minute et seconde
export let duree_actuelle = ref("")
// -- Progression de la barre actuelle, sur 100
export const progression = ref(0)
// -- Sélection de la division chanson choisit
export const selection_chanson = ref(null)
// -- La varialble du volume de l'audio
export const audio_volume = ref(50)

// Récupération des informations du fichier chansons.json
fetch("chansons/chansons.json").then(resp => resp.json()).then(contenu => {
    chansons.value = contenu
})

//  Fonction pour changer de page en SPA
export function changerPage(nom_page){
    page_active.value = nom_page
}

// Fonction pour retourner les chansons selon la recherche faîte par l'utilisateur
export function filtrer(chansons) {

    // Méthode pour filtrer les titres et artistes selon la recherche
    const chansons_filtres = chansons.filter(chanson => {
    const titre = chanson.titre.toLowerCase()
    const artiste = chanson.artiste.toLowerCase()
    const recherche = texte_recherche.value.toLowerCase()

        return titre.includes(recherche) || artiste.includes(recherche)
    })

    // Retourne les titres et les artistes filtrées par la recherche
    return chansons_filtres
}

// Fonction pour la conversions du temps reçu en seconde de la chanson en format minute:seconde
export function conversionTemps(chanson_temps) {
    let minutes = Math.floor(chanson_temps / 60)
    let secondes = chanson_temps - minutes * 60

    if (secondes < 10) {
        secondes = "0" + secondes
    }

    return minutes + ":" + secondes
}

// Fonction pour lancer l'audio de la chanson demandée
export function lancerAudio(chanson) {

    source_audio.value = chanson.audio

    sauvegarde_chanson_id = chanson.id
    sauvegarde_chanson_titre = chanson.titre
    sauvegarde_chanson_artiste = chanson.artiste
    sauvegarde_chanson_image = chanson.image
    sauvegarde_chanson_duree = chanson.temps

    selection_chanson.value = chanson

    source_image_bouton.value = "pause.png"
}

// Fonction pour mettre sur pause ou continuer une chanson
// -- changer le bouton PLAY principal selon le statut de lecture de la chanson
export function basculerJouer() {
    if (balise_audio.value.paused == false) {
        balise_audio.value.pause()

        source_image_bouton.value = "play.png"

    } else {
        balise_audio.value.play()
        source_image_bouton.value = "pause.png"
    } 
}

// Fonction pour mettre à jour la progression de la chanson en cours
export function tempsMiseAJour() {

    let minutes = Math.floor(balise_audio.value.currentTime / 60)
    let secondes = (balise_audio.value.currentTime - minutes * 60).toFixed(0)

    progression.value = ((balise_audio.value.currentTime / 
                         balise_audio.value.duration) * 100).toFixed(0)

    if (secondes < 10) {
        secondes = "0" + secondes
    }

    duree_actuelle = minutes + ":" + secondes

    if (progression.value == 100) {
        source_image_bouton.value = "pause_gris.png"
    }
}

// Fonction pour ajuster le volume de l'audio
export function audioVolume(volume) {

    audio.volume = volume / 100
}