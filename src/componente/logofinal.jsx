import React, { useEffect } from "react";
import aos from "aos";
import "aos/dist/aos.css";
import "../componente/logofinal.css";
import Grop1 from "../imagens/grop1.png";
import Grop2 from "../imagens/grop2.png";
import Grop3 from "../imagens/grop3.png";

export const Logofinal = () => {
  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div className="logofinal">
        <div className="section-text">
          <h3>Outros modelos</h3>
          <div className="modelos">
            <p>
              Esses são os outros modelos
              <br /> incriveis da nossa marca ...
            </p>
          </div>
        </div>
        <div className="section">
          <div className="valor">R$1500,99</div>
          <img src={Grop1} alt="" />
          <h3>Headphone H4000</h3>
        </div>

        <div className="section">
          <div className="valor">R$900,95</div>
          <img src={Grop3} alt="" />

          <h3>Headphone H3000</h3>
        </div>

        <div className="section">
          <div className="valor">R$500,22</div>
          <img src={Grop2} alt="" />

          <h3>Headphone H2000</h3>
        </div>
      </div>
    </>
  );
};
