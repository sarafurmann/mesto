let profileInfoButton = document.body.querySelector(".profile__info-button");
let profileEditform = document.body.querySelector(".popup--profile-editform");
let profileEditformCloseButton = profileEditform.querySelector(".popup__btn-close");

profileInfoButton.addEventListener("click", function clickHandler() {
    profileEditform.classList.add("active");
})

profileEditformCloseButton.addEventListener("click", function clickHandlerClose() {
    profileEditform.classList.remove("active");
})

profileEditform.addEventListener("submit", function handleFormSubmit (evt) {
    evt.preventDefault();
    let formData = new FormData(evt.target);
    let profile = {
        name: formData.get("name"),
        job: formData.get("job")
    }

    renderProfile(profile);

    profileEditform.classList.remove("active");
})

let profile = {
    name: "Жак-Ив Кусто",
    job: "Исследователь океана"
};

function renderProfile(profile) {
    let profileName = document.body.querySelector(".profile__info-name");
    profileName.textContent = profile.name;

    let profileJob = document.body.querySelector(".profile__info-job");
    profileJob.textContent = profile.job;
}

function renderProfileForm(profile) {
    let profileNameAbout = profileEditform.querySelector("#name");
    profileNameAbout.value = profile.name;

    let profileJobPlace = profileEditform.querySelector("#job");
    profileJobPlace.value = profile.job;
}

renderProfile(profile);
renderProfileForm(profile);

