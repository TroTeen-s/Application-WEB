import React from "react";
import Header from "../header/Header";



export default function Shop() {

    return (
        <section class="h-auto bg-white-background">
                    <div class="w-full mx-auto bg-white px-5 py-10 pb-5 text-gray-600">
                        <div class="text-center max-w-xl mx-auto pb-10">
                            <h1 class="text-5xl md:text-6xl font-bold mb-10">
                                Notre Boutique{" "}
                            </h1>
                        </div>

                        <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20 pl-20 pr-20">
                            <a class="no-underline group">
                                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                        class="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 class="mt-4 text-sm text-gray-700">
                                    Earthen Bottle
                                </h3>
                                <p class="mt-1 text-lg font-medium text-orange-300">
                                    $48
                                </p>
                            </a>

                            <a class="no-underline group">
                                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg"
                                        alt="Olive drab green insulated bottle with flared screw lid and flat top."
                                        class="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 class="mt-4 text-sm text-gray-700">
                                    Nomad Tumbler
                                </h3>
                                <p class="mt-1 text-lg font-medium text-orange-300">
                                    $35
                                </p>
                            </a>

                            <a class="no-underline group">
                                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg"
                                        alt="Person using a pen to cross a task off a productivity paper card."
                                        class="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 class="mt-4 text-sm text-gray-700">
                                    Focus Paper Refill
                                </h3>
                                <p class="mt-1 text-lg font-medium text-orange-300">
                                    $89
                                </p>
                                <button>
                                    Ajouter au panier
                                </button>
                            </a>

                            <a class="no-underline group">
                                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg"
                                        alt="Hand holding black machined steel mechanical pencil with brass tip and top."
                                        class="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 class="mt-4 text-sm text-gray-700">
                                    Machined Mechanical Pencil
                                </h3>
                                <p class="mt-1 text-lg font-medium text-orange-300">
                                    $35
                                </p>
                            </a>
                        </div>
                    </div>
                </section>

    );
}

