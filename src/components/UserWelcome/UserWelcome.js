import { blue, green, red } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import React from "react";
import { useMediaQuery } from "@material-ui/core";
import SVGHomeCinema from "../../assets/homeCinema.svg";
import SVGListsToDo from "../../assets/listsToDo.svg";
import SVGSocialGirl from "../../assets/socialGirl.svg";

function UserWelcome({ handleOpen, setHandleOpen }) {

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <AutoRotatingCarousel
        label="Get started"
        open={handleOpen.open}
        onClose={() => setHandleOpen(false)}
        onStart={() => setHandleOpen(false)}
        autoplay={true}
        mobile={isMobile}
        style={{ position: "absolute" }}
      >
        <Slide
          media={

            <img
              alt="SVGHomeCinema"
              id="SVGHomeCinema"
              src={SVGHomeCinema}
              style={{ paddingTop: "20px" }}
            />

          }
          mediaBackgroundStyle={{ backgroundColor: red[400] }}
          style={{ backgroundColor: red[600] }}
          title="Mira información de peliculas"
          subtitle="Revisa en detalle la información de cualquier pelicula."
        />
        <Slide
          media={

            <img
              alt="SVGListsToDo"
              id="SVGListsToDo"
              src={SVGListsToDo}
              style={{ paddingTop: "20px" }}
            />
            
          }
          mediaBackgroundStyle={{ backgroundColor: blue[400] }}
          style={{ backgroundColor: blue[600] }}
          title="Crea listas personalizadas"
          subtitle="No solo agrega a favoritas, crea cuantas listas quieras."
        />
        <Slide
          media={

            <img
              alt="SVGSocialGirl"
              id="SVGSocialGirl"
              src={SVGSocialGirl}
              style={{ paddingTop: "20px" }}
            />
            
          }
          mediaBackgroundStyle={{ backgroundColor: green[400] }}
          style={{ backgroundColor: green[600] }}
          title="Comparte lo que te gusta"
          subtitle="Comparte en redes sociales el detalle de las peliculas que te interesan."
        />
      </AutoRotatingCarousel>
    </div>
  );
}

export default UserWelcome;
