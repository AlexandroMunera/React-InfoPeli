import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      // Bar
      "¿ Cómo funciona ?": "How it works ?",
      Registro: "Register",
      "Mi cuenta": "Register",

      // Home
      Peliculas: "Movies",
    },
  },
  fr: {
    translation: {
      // Bar
      "¿ Cómo funciona ?": "Comment ça marche",
      Registro: "Inscription",
      "Mi cuenta": "Mon compte",
      "Mejor calificadas": "Les mieux notés",
      Listas: "Listes",
      Cuenta: "Compte",
      Salir: "Sortie",
      // Home
      Peliculas: "Films",
      "No se encontraron resultados para tu busquedad":
        "Aucun résultat n'a été trouvé pour votre recherche",
      //OrderMovies
      "Ordenar por": "Trier par",
      "Popularidad descendente": "Une popularité en baisse",
      "Popularidad ascendente": "Une popularité croissante",
      "Valoración descendente": "Évaluation à la baisse",
      "Valoración ascendente": "Évaluation ascendante",
      "Fecha de estreno descendente": "Date de sortie décroissante",
      "Fecha de estreno ascendente": "Date de libération par ordre croissant",
      "Título (A-Z)": "Titre (A-Z)",
      "Título (Z-A)": "Titre (Z-A)",
      //DetailMovie
      "Registrate para ver tus listas":
        "Inscrivez-vous pour consulter vos listes",
      Duración: "Durée",
      Lanzamiento: "Lancement",
      Lenguages: "Langues",
      Generos: "Genres",
      Resumen: "Résumé",
      Actores: "Acteurs",
      Videos: "Vidéos",
      "Agregar a": "Ajouter à",
      "Hola, te recomiendo ver esta película o si quieres ver mas información y crear listas personalizables totalmente gratis, ingresa al sitio web.":
        "Bonjour, je vous recommande de regarder ce film ou si vous voulez voir plus d'informations et créer des listes personnalisables totalement gratuites, allez sur le site.",
      Favoritas: "Favoris",
      "Estas son mis pelis favoritas": "Ce sont mes films préférés",
      Agregada: "Ajouté",
      "Ya esta en esta lista": "Elle figure déjà sur cette liste.",
      //MovieList
      "pelis encontradas": "films trouvés",
      //Search
      "Busca aquí...": "Cherchez ici...",
      //TinderCardsPage
      "Mejor Calificadas": "Les mieux notés",
      //UserWelcome
      Empezar: "C'est parti",
      "Mira información de peliculas": "Regardez les infos sur le film",
      "Revisa en detalle la información de cualquier pelicula":
        "Vérifiez les informations de tout film en détail",
      "Crea listas personalizadas": "Créer des listes personnalisées",
      "No solo agrega a favoritas, crea cuantas listas quieras":
        "Ne vous contentez pas d'ajouter des favoris, créez autant de listes que vous le souhaitez",
      "Comparte lo que te gusta": "Partagez ce que vous aimez",
      "Comparte en redes sociales el detalle de las peliculas que te interesan":
        "Partagez sur les réseaux sociaux le détail des films qui vous intéressent",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    // lng: "fr",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
