const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories",
  );
  const data = await response.json();
  //   console.log(data.categories);
  displayCategory(data.categories);
};

// const loadAllPet = async () => {
//   const response = await fetch(
//     "https://openapi.programming-hero.com/api/peddy/pets",
//   );
//   const data = await response.json();
// //   console.log(data.pets);
// displayPet(data.pets)
// };

const loadPet = async (category = "all") => {
  let link = "https://openapi.programming-hero.com/api/peddy/pets";
  if (category !== "all")
    link = `https://openapi.programming-hero.com/api/peddy/category/${category}`;

  const response = await fetch(link);
  const data = await response.json();
//   console.log(data);
  displayPet(category !== "all" ? data.data : data.pets);
};

function displayPet(pets) {
  const petContainer = document.getElementById("pets-container");
  petContainer.innerHTML = "";
  if (!pets.length) {
    petContainer.innerHTML = `
        <div class="col-span-full mx-auto">
            <img src="../assets/error.webp" />"
        </div>
        `;
  }
  pets.forEach((pet) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card p-5 shadow-sm">
          <figure class="">
            <img
              src="${pet.image}"
              alt="Shoes"
              class="rounded-xl"
            />
          </figure>
          <div class="border-gray-300 border-b py-5 space-y-1">
            <h2 class="card-title font-bold">Card Title</h2>
            <p class="text-sm text-gray-600">Bread: ${pet.breed}</p>
            <p class="text-sm text-gray-600">Birth: ${new Date(pet.date_of_birth).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })}</p>
            <p class="text-sm text-gray-600">Gender: ${pet.gender}</p>
            <p class="text-sm text-gray-600">Price: ${pet.price}$</p>
          </div>
          <div class="card-actions pt-5 flex justify-between flex-nowrap">
            <button class="btn px-3 btn-sm btn-outline text-[#0E7A81] border-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg></button>
            <button class="btn px-3 btn-sm btn-outline text-[#0E7A81] border-gray-200">Adopt</button>
            <button class="btn px-3 btn-sm btn-outline text-[#0E7A81] border-gray-200">Details</button>
          </div>
        </div>
        `;
    petContainer.appendChild(div);
  });
}

function displayCategory(categories) {
  let categoryContainer = document.getElementById("category-section");
  categories.forEach((element) => {
    let btn = document.createElement("div");
    btn.classList.add("w-full");
    btn.innerHTML = `
        <button onclick="loadPet('${element.category}')" class="p-8 w-full px-10 font-bold flex items-center gap-4 btn rounded-lg bg-white focus:rounded-full focus:bg-[#0e79811e] focus:border-[#0E7A81]"> <img class ="h-8" src= ${element.category_icon}/> ${element.category}</button>
        `;
    categoryContainer.appendChild(btn);
  });
}

loadCategory();
// loadAllPet();
loadPet();
