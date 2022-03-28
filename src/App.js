import './App.css';
import React from "react";


export default function App({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
    <section id="firstSection" className="">
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex lg:w-auto lg:static lg:block lg:justify-start">
            <a className="text-xl font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
              Easy 
            </a>
            <a id="OrangePaper" className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase" href="#pablo">
             Scooter
            </a>
        
          </div>
          <div className={ "lg:flex flex-grow items-center"} id="example-navbar-danger">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i><span className="ml-2">Besoin d'aide</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-twitter text-xl leading-lg text-white opacity-75"></i><span className="ml-2">Connexion</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-xl leading-lg text-white opacity-75"></i><span className="ml-2">Inscription</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="mt-40 flex flex-nowrap justify-between items-center">

        <div id="Left" class="">
           <img id="img" src="images/Frame 2.png" ></img>
        </div>


        <div id="Right-Phone" class="">

          <div class="">
            <a className="text-7xl font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
                  Easy 
                </a>
            <a id="OrangePaper" className="text-7xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase" href="#pablo">
                Scooter
            </a>
          </div>

          <div id="Slogan" class="text-white text-xl">
            <p>Depuis 2012, Easy Scooter est la première société à proposer la location de trottinettes électriques à
            Lyon avec des offres diversifiées, capables de répondre à toutes sortes de demandes !</p>
          </div>

          <div>

          <button id="buttonDownload" class="mt-10 font-bold py-2 px-8 rounded inline-flex items-center">
          <span>Télécharger l'Application </span>
         </button>

         </div>

          <div>
          </div>

      </div>
        
      </div>
      
      </section>

      <section>
        <p> "" </p>
      </section>

      
    </>
  );
}
