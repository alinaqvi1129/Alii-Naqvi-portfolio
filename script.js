var typed = new Typed(".typing", {
  strings:[
    "Frontend Developer",
    "Java Developer",
    "Machine Learning Learner"
  ],
  typeSpeed:100,
  backSpeed:50,
  loop:true
});


// EmailJS initialization
(function(){
  emailjs.init("0S9gfAHhQCjx8pX6Ob2B");
})();


// Contact form
document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.send("service_2uwd3l9","template_z3e3rpc", {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  })
  .then(function(){
    alert("Message sent successfully!");
  })
  .catch(function(error){
    alert("Failed to send message");
    console.log(error);
  });
});


const toggle = document.getElementById("darkToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
}

// Toggle change
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});