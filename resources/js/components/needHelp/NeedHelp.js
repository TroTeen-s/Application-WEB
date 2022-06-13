
import React, { useRef, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useLoadScript } from '@react-google-maps/api'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LinearProgress } from '@mui/material';
import { AuthLoadingContext } from '../context/AuthContext';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import "./style.css";



function NeedHelp() {

    const [status, setStatus] = useState(undefined);
    const [pressing,needToBePressing] = useState({status : false});

    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [email,setEmail] = useState("")
    const [message,setMessage] = useState("")

    let [firstnameError, setFirstnameError] = useState({ error: false, helper: '' });
    let [lastnameError, setLastnameError] = useState({ error: false, helper: '' });
    let [emailError, setEmailError] = useState({ error: false, helper: '' });
    let [messageError, setMessageError] = useState({ error: false, helper: '' });

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    async function SendTicket(){

        const formData = new FormData();
        formData.append('lastname',firstname)
        formData.append('firstname',lastname)
        formData.append('email',email)
        formData.append('message',message)

        needToBePressing({status : true});

        if (firstname.trim() === '') {
            setFirstnameError({ error: false, helper: 'Champs vide' });
        } else if (firstname.trim().length < 2 || firstname.trim().length > 50) {
            setFirstnameError({ error: false, helper: 'Prénom trop court / trop long' });
        } else {
            setFirstnameError({ error: true, helper: '' });
        }
        //lastname
        if (lastname.trim() === '') {
            setLastnameError({ error: false, helper: 'Champs vide' });
        } else if (lastname.trim().length < 4 || lastname.trim().length > 50) {
            setLastnameError({ error: false, helper: 'Nom trop court / trop long' });
        }
        else {
            setLastnameError({ error: true, helper: '' });
        }


         //email
        if (email.trim() === '') {
            setEmailError({ error: false, helper: 'Champs vide' });
        } else if (!validateEmail(email.trim())) {
            setEmailError({ error: false, helper: 'format email demandé (exemple@mail.fr)' });
        }
        else {
            setEmailError({ error: true, helper: '' });
        }

        if (message.trim() === '') {
            setMessageError({ error: false, helper: 'Champs vide' });
        } else if (message.trim().length < 20) {
            setMessageError({ error: false, helper: 'Message trop court' });
        }
        else {
            setMessageError({ error: true, helper: '' });
        }


        if(firstnameError?.error === true && lastnameError?.error === true &&  emailError?.error  === true && messageError?.error  === true){

            let result = await fetch("http://localhost:8000/api/support/need",{
                method:'POST',
                body: formData
              }).then(() => {
                  setStatus({ type: 'success' });
              }).catch((error) => {
                  setStatus({ type: 'error', error });
              })

        }else{
            setStatus({ type: 'error', error });
        }



      }


    return (

<section class="pt-20 lg:pt-[120px]">
   <div class="container">
      <div class="flex flex-wrap -mx-4">
         <div class="w-full px-4">
            <div class="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">
               <span class="font-semibold text-lg text-orange-300 mb-2 block">
               Nos services
               </span>
               <h2
                  class="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  "
                  >
                 Besoin d'aide
               </h2>
               <p class="text-base text-body-color">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
               </p>
            </div>
         </div>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:flex lg:space-x-8">
         <div className="relative md:col-span-1 group lg:w-[32%]">
           <div aria-hidden="true" className="absolute top-0 w-full h-full rounded-2xl p-4 bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"></div>
              <div className="relative p-6 space-y-6">
                <div className="relative">
                    <div class=" w-[70px] h-[70px] flex items-center justify-center bg-orange-300 rounded-2xl mb-2">
                        <svg width="32"height="32"viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6746 0.26779C10.0637 -1.33065 1.86522 4.39279 0.266779 13.0037C-0.506658 17.1803 0.421467 21.3568 2.79334 24.8631C5.21678 28.3693 8.82615 30.6897 12.9512 31.4631C13.9308 31.6178 14.859 31.7209 15.7871 31.7209C23.2637 31.7209 29.9668 26.3584 31.359 18.6756C32.9574 10.0647 27.234 1.81466 18.6746 0.26779ZM29.6574 18.3662C29.5543 18.8819 29.4512 19.449 29.2965 19.9131L16.7668 15.2209V1.81466C17.2824 1.86623 17.8496 1.91779 18.3652 2.02091C25.9449 3.4131 30.998 10.735 29.6574 18.3662ZM14.9105 1.81466V14.9115H1.86522C1.91678 14.3959 1.96834 13.8287 2.07147 13.3131C3.20584 6.86779 8.67147 2.22716 14.9105 1.81466ZM13.3121 29.6584C9.65115 28.9881 6.45428 26.9256 4.28865 23.8318C2.79334 21.7178 1.96834 19.2428 1.81365 16.7678H15.6324L28.5746 21.6147C26.048 27.3381 19.7574 30.8443 13.3121 29.6584Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl text-orange-300 font-semibold">Fiabilité </h2>
                    <p class="text-body-color">
                    We dejoy working with discerning clients, people for whom
                    qualuty, service, integrity & aesthetics.
                    </p>

            </div>
         </div>
         <div className="relative md:col-span-1 group lg:w-[32%]">
           <div aria-hidden="true" className="absolute top-0 w-full h-full rounded-2xl p-4 bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"></div>
              <div className="relative p-6 space-y-6">
                <div className="relative">
                    <div class=" w-[70px] h-[70px] flex items-center justify-center bg-orange-300 rounded-2xl mb-2">
                        <svg width="32"height="32"viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M4.04684 15.5859C4.2109 15.5859 4.37497 15.5859 4.48434 15.5313L10.5547 13.3984C11.0468 13.2344 11.3203 12.6875 11.1562 12.1953C10.9922 11.7031 10.4453 11.4297 9.95309 11.5938L6.28903 12.9063C8.09372 7.92969 12.8515 4.53906 18.375 4.53906C24.2265 4.53906 29.3672 8.42188 30.789 14.0547C30.8984 14.5469 31.4453 14.875 31.9375 14.7656C32.4297 14.6563 32.7578 14.1094 32.6484 13.6172C31.0078 7.16406 25.1015 2.67969 18.375 2.67969C11.8125 2.67969 6.12497 6.89063 4.26559 13.0156L2.57028 8.25781C2.40622 7.76563 1.85934 7.49219 1.36715 7.65625C0.874967 7.82031 0.60153 8.36719 0.765592 8.85938L2.84372 14.8203C3.00778 15.2578 3.55465 15.5859 4.04684 15.5859Z"
                        fill="white"
                        />
                     <path
                        d="M34.2343 27.2891L31.9922 21.3828C31.8828 21.0547 31.6093 20.7812 31.2812 20.6719C30.9531 20.5625 30.625 20.5078 30.2968 20.6719L24.2812 22.9687C23.789 23.1328 23.5156 23.7344 23.7343 24.2266C23.8984 24.7187 24.5 24.9922 24.9922 24.7734L28.7109 23.3516C26.6328 27.6719 22.2031 30.5156 17.1718 30.5156C11.6484 30.5156 6.78122 27.0703 5.0859 21.9297C4.86715 21.4375 4.32028 21.1641 3.82809 21.3281C3.3359 21.4922 3.06247 22.0391 3.22653 22.5312C5.19528 28.4375 10.7734 32.4297 17.1172 32.4297C23.1328 32.4297 28.4922 28.875 30.6797 23.4609L32.4297 28C32.5937 28.3828 32.9218 28.6016 33.3047 28.6016C33.414 28.6016 33.5234 28.6016 33.6328 28.5469C34.1797 28.3281 34.4531 27.7813 34.2343 27.2891Z"
                        fill="white"
                        />                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl text-orange-300 font-semibold">Efficacité</h2>
                    <p class="text-body-color">
                    We dejoy working with discerning clients, people for whom
                    qualuty, service, integrity & aesthetics.
                    </p>

            </div>
         </div>
         <div className="relative md:col-span-1 group lg:w-[32%]">
           <div aria-hidden="true" className="absolute top-0 w-full h-full rounded-2xl p-4 bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"></div>
              <div className="relative p-6 space-y-6">
                <div className="relative">
                    <div class=" w-[70px] h-[70px] flex items-center justify-center bg-orange-300 rounded-2xl mb-2">
                        <svg width="32"height="32"viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M17.5 7.875C8.20312 7.875 0.65625 16.0781 0.65625 26.1406C0.65625 26.6875 1.09375 27.125 1.64062 27.125H33.3594C33.9062 27.125 34.3438 26.6875 34.3438 26.1406C34.3438 16.0781 26.7969 7.875 17.5 7.875ZM19.4687 25.2109L17.9922 20.5078C17.8281 20.0156 17.1719 20.0156 17.0078 20.5078L15.5312 25.2109H2.625C3.0625 16.625 9.57031 9.78906 17.5 9.78906C25.4297 9.78906 31.9375 16.625 32.375 25.2109H19.4687Z"
                        fill="white"
                        />
                     <path
                        d="M17.5 13.7812C16.9531 13.7812 16.5156 14.2187 16.5156 14.7656V16.1875C16.5156 16.7344 16.9531 17.1719 17.5 17.1719C18.0469 17.1719 18.4844 16.7344 18.4844 16.1875V14.7656C18.4844 14.2187 18.0469 13.7812 17.5 13.7812Z"
                        fill="white"
                        />
                     <path
                        d="M25.8672 17.8828L24.9922 18.8125C24.6094 19.1953 24.6094 19.7969 24.9922 20.1797C25.1563 20.3438 25.4297 20.4531 25.6484 20.4531C25.9219 20.4531 26.1406 20.3438 26.3594 20.1797L27.2344 19.25C27.6172 18.8672 27.6172 18.2656 27.2344 17.8828C26.8516 17.5 26.25 17.5 25.8672 17.8828Z"
                        fill="white"
                        />
                     <path
                        d="M9.13281 17.8828C8.80468 17.5 8.14843 17.4453 7.76562 17.8281C7.38281 18.1562 7.32812 18.8125 7.71093 19.1953L8.53125 20.125C8.69531 20.3437 8.96874 20.4531 9.24218 20.4531C9.46093 20.4531 9.67968 20.3984 9.89843 20.2344C10.2812 19.9062 10.3359 19.25 9.95312 18.8672L9.13281 17.8828Z"
                        fill="white"
                        />                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl text-orange-300 font-semibold">Rapidité</h2>
                    <p class="text-body-color">
                    We dejoy working with discerning clients, people for whom
                    qualuty, service, integrity & aesthetics.
                    </p>

            </div>
         </div>
       </div>
       <div className="grid grid-cols-2 mt-24">

        {/* :MAP CONTAINER */}
        <div className="order-1 col-span-full">
                <MapContainer className="max-w-7xl max-h-60" center={[45.764043, 4.835659]} zoom={14} scrollWheelZoom={false}>

                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[45.764043, 4.835659]} >
                        <Popup>
                        ID : 1 <br /> Easily customizable.
                        </Popup>
                    </Marker>

                </MapContainer>
        </div>

        <div className="order-3 md:order-2 col-span-full md:col-span-1 py-5 md:py-10 px-6">


          <form action="" className="mx-auto max-w-xl space-y-4">
            <div class="">
                <input onChange={(e) => setLastname(e.target.value)} disabled={status?.type === 'success' && true} type="text" id="nom" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom"/>
            </div>
            <div class="">
                <input  onChange={(e) => setFirstname(e.target.value)} disabled={status?.type === 'success' && true} type="text" required id="prenom" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prénom"/>
            </div>
            <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </div>
                <input onChange={(e) => setEmail(e.target.value)} disabled={status?.type === 'success' && true} type="text" required id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com"/>
            </div>

            <textarea onChange={(e) => setMessage(e.target.value)} disabled={status?.type === 'success' && true}  id="message" required rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment... ( 20 characters min ) "></textarea>

            <div>
              <button onClick={SendTicket} type="button" disabled={status?.type === 'success' && true} className="py-2 px-6 rounded bg-orange-300 text-base text-white font-semibold uppercase">{status?.type === 'success'? 'TICKET ENVOYE':'Send Message'}</button>
            </div>
          </form>


        </div>




        <div className="order-2 md:order-3 col-span-full md:col-span-1 py-5 md:py-10 px-6">

          <div className="mx-auto max-w-xl flex flex-col space-y-5">
            <h2 className="text-4xl font-oswald uppercase">Contactez-nous</h2>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis unde, voluptatibus nemo molestiae iure, repudiandae quaerat ipsam, labore sed dolorem nisi odit at esse ullam suscipit quidem necessitatibus aut modi.</p>
            <a href="#mail" className="inline-flex items-center text-sm text-blue-400 font-semibold hover:text-blue-500">
              easyscooter@gmail.com
            </a>
            <p className="text-sm text-gray-500 leading-6">18 Avenue des Champs-Élysées, <br /> 75008 Paris <br /> France</p>
            <div className="flex items-center">
              <a href="#twitter" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#1DA1F2] text-white filter hover:brightness-125" style={{ backgroundColor: "#1DA1F2" }}>
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#facebook" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#4267B2] text-white filter hover:brightness-125" style={{ backgroundColor: "#4267B2" }}>
                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16.403,9H14V7c0-1.032,0.084-1.682,1.563-1.682h0.868c0.552,0,1-0.448,1-1V3.064c0-0.523-0.401-0.97-0.923-1.005C15.904,2.018,15.299,1.999,14.693,2C11.98,2,10,3.657,10,6.699V9H8c-0.552,0-1,0.448-1,1v2c0,0.552,0.448,1,1,1l2-0.001V21c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8.003l2.174-0.001c0.508,0,0.935-0.381,0.993-0.886l0.229-1.996C17.465,9.521,17.001,9,16.403,9z"/>
                </svg>
              </a>
              <a href="#instagrap" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white filter hover:brightness-125">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>


      </div>


      {status?.type === 'success' && <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                                    <span class="font-medium">Ticket envoyé !</span> Une réponse du support vous sera addressé par mail le plus vite possible :)
                                    </div> }

      {status?.type === 'error' && (
        <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        <span class="font-medium">Erreur dans l'envoi du ticket !</span> L'équipe de maintenance s'en charge !
        </div>
      )}


    {pressing?.status == true && firstnameError?.error === false && (
         <div class="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
         <span class="font-medium">Attention ! </span> {firstnameError.helper}
         </div>
      )}

    {pressing?.status == true && lastnameError?.error === false && (
         <div class="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
         <span class="font-medium">Attention ! </span> {lastnameError.helper}
         </div>
      )}

    {pressing?.status == true && emailError?.error  === false && (
            <div class="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
            <span class="font-medium">Attention ! </span> {emailError.helper}
            </div>
        )}

    {pressing?.status == true && messageError?.error  === false && (
            <div class="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
            <span class="font-medium">Attention ! </span> {messageError.helper}
            </div>
        )}





   </div>
</section>

    );
}

export default NeedHelp;

