import React, { useEffect, useRef } from "react";
import "../styles/cadastro.css";

import aos from "aos";
import "aos/dist/aos.css";
import { Form } from "react-router-dom";

export const Cadastro = () => {
  useEffect(() => {
    aos.init({ duração: 1500 });
  }, []);

  return (
    <>
      <div className="container-login" data-aos="flip-left">
        <div className="div-lubi">
          <div className="wrappr-login">
            <div className="digite">
              <p>Para garantir Cadastro sacou!!!!</p>
            </div>

            <div className="input-wrappre">
              <input
                name="email"
                type="text"
                required="required"
                autoComplete="false"
              />
              <span>E-mail</span>
              <i></i>
            </div>

            <div className="input-wrappre">
              <input name="password" type="pessword" required="required" />
              <span>pessword</span>
              <i></i>
            </div>
            <div className="mybotton">
              <div className="logiAnimado">
                <button>Login</button>
              </div>

              <button className="cadastro">Cadastro</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
