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
      //SignInDialog
      Hola: "Bonjour",
      "Ingresa a tu cuenta": "Connectez-vous à votre compte",
      cerrar: "fermer",
      Correo: "E-mail",
      Contraseña: "Mot de passe",
      "Recuperar contraseña": "Récupérer le mot de passe",
      "Enviar Iniciar con link": "Envoyer Commencer par le lien",
      Entrar: "Entrez",
      //SignUpDialog
      "Crear una cuenta": "Créer un compte",
      "Confirmar Email": "Confirmer l'e-mail",
      "Confirmar Contraseña": "Confirmer le mot de passe",
      "Registrarse": "S'inscrire",
      //App
      "¿ Salir ?":"Sortir ?",
      "Si sales ya no podras crear listas y administrar tus pelis":"Si vous sortez, vous ne pouvez plus créer de listes et gérer vos films",
      "Cancelar":"Annuler",
      "Adios, vuelve pronto":"Au revoir, revenez bientôt.",
      "Cuenta eliminada":"Compte supprimé",
      //ListsPage
      "No se pudo obtener el usuario":"L'utilisateur n'a pas pu être obtenu",
      "Ocurrio un problema tratando de obtener tu información":"Un problème est survenu en essayant d'obtenir vos informations",
      "Cargando":"Chargement",
      "El usuario no existe":"L'utilisateur n'existe pas",
      "La solicitud de usuario no existe":"La demande de l'utilisateur n'existe pas",
      "Lista editada":"Liste éditée",
      "Lista agregada":"Liste agrégée",
      "Lista eliminada":"Liste supprimée",
      "Mis listas":"Mes listes",
      "Datos de la lista":"Données sur les listes",
      "Ingresar los datos de tu lista":"Saisissez les données de votre liste",
      "NombreLista":"Nom",
      "Descripción":"Description",
      "Guardar":"Sauvegarder",
      "Reintentar":"Retry",
      //SettingsDialog
      "Configuración":"Configuration",
      "Apariencia":"Apparence",
      "Accesos":"Accès",
      "Seguridad":"Sécurité",
      //AccountTab
      "Eliminar":"Supprimer",
      "Subir":"Télécharger",
      "Elige":"Choisissez",
      "Perfil":"Profil",
      "No hay un nombre":"Il n'y a pas de nom",
      "Presiona enter para guardar":"Appuyez sur la touche Entrée pour sauvegarder",
      "No tienes un nombre":"Vous n'avez pas de prenom",
      "Cambiar":"Changer",
      "Agregar":"Ajouter",
      "Sin apellido":"Pas de nom de famille",
      "Nombre":"Prenom",
      "Apellido":"Nom",
      "No tienes apellido":"Vous n'avez pas de nom de famille",
      "Sin usuario":"Pas d'utilisateur",
      "Usuario":"Utilisateur",
      "Sin email":"Pas d'e-mail",
      "Verificar":"Vérification",
      "Último ingreso":"Dernière connexion",
      "Eliminar cuenta":"Supprimer le compte",
      "Las cuentas no se pueden recuperar":"Les comptes ne peuvent pas être recouvrés",
      //AppearanceTab
      "Color principal":"Couleur principale",
      "Color secundario":"Couleur secondaire",
      "Muestra superficies oscuras":"Affiche les surfaces sombres",
      "Resetear colores":"Réinitialisation des couleurs",
      "No se restablecieron cambios":"Aucun changement n'a été rétabli",
      "Los cambios se restablecerán":"Les changements seront rétablis",
      "Restablecer":"Restaurer",
      //LinksTab
      "Desligar":"Dé-lien",
      "Ligar":"Lien",
      //SecurityTab
      "Presiona enter para cambiar la contraseña":"Appuyez sur la touche Entrée pour changer le mot de passe",
      "Último cambio":"Dernière modification",
      "Nunca modificada":"Jamais modifié"
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
