import "../../css/app.css";
import React from "react";

import { NavLink } from "react-router-dom";


export default function App() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <section id="firstSection" className=""  >
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
          <div className="container px-4 mx-auto flex flex-wrap items-center -between">
            <div className="w-full relative flex lg:w-auto lg:static lg:block lg:justify-start">
              <NavLink className="text-xl font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap uppercase text-white"
                to="/store">
                Easy
              </NavLink>

              <NavLink className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                to="/store">
                Scooter
              </NavLink>
            </div>
            <div
              className={"lg:flex flex-grow items-center"}
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Besoin d'aide</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="fab fa-twitter text-xl leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Connexion</span>
                  </a>
                </li>
                <li className="nav-item" onClick={() => setShowModal(true)}>
                  <a
                    className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="fab fa-pinterest text-xl leading-lg text-white opacity-75"></i>
                    <span
                      type="button"
                      className="ml-2"
                    >
                      Inscription
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="mt-40 flex flex-nowrap justify-between items-center" onClick={() => setShowModal(false)} >
          <div id="Left" class="">
            <img id="img" src="images/Frame 2.png"></img>
          </div>

          <div id="Right-Phone" class="">
            <div class="">
              <a
                className="text-7xl font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap uppercase text-white"
                href="#pablo"
              >
                Easy
              </a>
              <a
                id="OrangePaper"
                className="text-7xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
                Scooter
              </a>
            </div>

            <div id="Slogan" class="text-white text-xl">
              <p>
                Depuis 2012, Easy Scooter est la première société à proposer la
                location de trottinettes électriques à Lyon avec des offres
                diversifiées, capables de répondre à toutes sortes de demandes !
              </p>
            </div>

            <div>
              <button
                id="buttonOrange"
                class="mt-10 font-bold py-2 px-8 rounded inline-flex items-center"
              >
                <span>Télécharger l'Application </span>
              </button>
            </div>

            <div></div>
          </div>


        </div>
      </section>



      <section></section>


      {showModal ? (
        <>

          <div
            className="opacity-70 fixed inset-0 z-40 bg-black"
            onClick={() => setShowModal(false)}
          ></div>

          <div
            tabindex="-5"
            aria-hidden="true"
            class="overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center"

          >
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex justify-end p-2">
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="authentication-modal"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <form
                  class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                  action="#"
                >
                  <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Inscription 🥺{" "}
                  </h3>
                  <div>
                    <label
                      for="secondname"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      name="secondname"
                      id="secondname"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    ></input>
                  </div>
                  <div>
                    <label
                      for="firstname"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Prénom
                    </label>
                    <input
                      type="email"
                      name="firstname"
                      id="firstname"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    ></input>
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Votre email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    ></input>
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    ></input>
                  </div>
                  <div>
                    <label
                      for="passwordconfirmation"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Confirmer mot de passe
                    </label>
                    <input
                      type="password"
                      name="passwordconfirmation"
                      id="passwordconfirmation"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    ></input>
                  </div>
                  <div class="flex justify-between">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                          required
                        ></input>
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="remember"
                          class="font-medium text-gray-900 dark:text-gray-300"
                        >
                          Se souvenir de moi
                        </label>
                      </div>
                    </div>
                    <a
                      id="OrangePaper"
                      href="#"
                      class="text-sm hover:underline dark:text-blue-500"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <button
                    id="buttonOrange"
                    type="submit"
                    class="w-full text-white  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Créer votre compte
                  </button>
                  <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Déjà un compte?{" "}
                    <a
                      id="OrangePaper"
                      href="#"
                      class="hover:underline dark:text-blue-500"
                    >
                      Connecte-toi
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </>
      ) : null}
    </>
  );
}
