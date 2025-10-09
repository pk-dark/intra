// Users and Courses
const users = [
  { username: "selva@admin", password: "founder@intra",
   courses: ["course1"] },
  { username: "madhusri@intra", password: "madhu@neurals", 
   courses: ["course1"] },
  { username: "ayyappa@intra", password: "ayyappa@neurals", 
   courses: ["course1"] },
  { username: "boompozhilan@intra", password: "boompozhilan@neurals", 
   courses: ["course1"] },
  { username: "ragu@intra", password: "ragu@neurals",
   courses: ["course1"] },
  { username: "abinaya@intra", password: "abi@neurals", 
   courses: ["course1"] },
  { username: "vishmitha@intra", password: "vishmitha@neurals", 
   courses: ["course1"] },
  { username: "joshwakalanithi@intra", password: "joshwa@neurals", 
   courses: ["course1"] },
  { username: "usha@intra", password: "usha@neurals",
   courses: ["course1"] },
  { username: "mahalakshmi@intra", password: "mahalakshmi@neurals",
   courses: ["course1"] },
  { username: "@intra", password: "@neurals",
   courses: ["course1"] },
];

const courses = {
  "course1": { title:"Digital Marketing", img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", videos:["https://drive.google.com/file/d/1mLZjhm_DLku3-axuBpYJQiQAdUxrzmxY/preview","https://drive.google.com/file/d/1VZFZ2Q80vlzpLrc7wX1vzfAsnt0-w_LT/preview"], badge:"new" },
  "course2": { title:"Digi", img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", videos:["https://drive.google.com/file/d/1mLZjhm_DLku3-axuBpYJQiQAdUxrzmxY/preview","https://drive.google.com/file/d/1VZFZ2Q80vlzpLrc7wX1vzfAsnt0-w_LT/preview"], badge:"new" },
  "course3": { title:"UI/UX Design", img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", videos:["https://drive.google.com/file/d/VIDEO_ID_4/preview"], badge:"upcoming" },
  "course4": { title:"Cloud Security", img:"https://source.unsplash.com/400x300/?cloud,security", videos:["https://drive.google.com/file/d/VIDEO_ID_5/preview"], badge:"upcoming" },
  "course5": { title:"Data Science", img:"https://source.unsplash.com/400x300/?data,science", videos:["https://drive.google.com/file/d/VIDEO_ID_6/preview"], badge:"upcoming" },
  "course6": { title:"Digital Marketing", img:"https://source.unsplash.com/400x300/?digital,marketing", videos:["https://drive.google.com/file/d/VIDEO_ID_7/preview"], badge:"upcoming" },
  "course7": { title:"Cyber Security", img:"https://source.unsplash.com/400x300/?cyber,security", videos:["https://drive.google.com/file/d/VIDEO_ID_8/preview"], badge:"upcoming" },
  "course8": { title:"App Development", img:"https://source.unsplash.com/400x300/?app,development", videos:["https://drive.google.com/file/d/VIDEO_ID_9/preview"], badge:"upcoming" },
  "course9": { title:"Blockchain", img:"https://source.unsplash.com/400x300/?blockchain", videos:["https://drive.google.com/file/d/VIDEO_ID_10/preview"], badge:"upcoming" },
  "course10": { title:"Cloud Computing", img:"https://source.unsplash.com/400x300/?cloud,computing", videos:["https://drive.google.com/file/d/VIDEO_ID_11/preview"], badge:"upcoming" }
};

let currentVideoIndex = 0;
let currentCourseVideos = [];

function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = users.find(u => u.username===username && u.password===password);
  if(user){ localStorage.setItem("currentUser",JSON.stringify(user)); window.location.href="dashboard.html"; }
  else{ alert("Invalid username or password!"); }
}

function logout(){ localStorage.removeItem("currentUser"); window.location.href="login.html"; }

function loadDashboard(){
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if(!user){ window.location.href="login.html"; return; }
  document.getElementById("user-name").textContent = user.username;
  const container = document.getElementById("courses-container");
  container.innerHTML="";
  user.courses.forEach(courseKey=>{
    const course=courses[courseKey];
    const card=document.createElement("div");
    card.className="course-card";
    card.innerHTML=`
      <div class="card-inner">
        ${course.badge?`<div class="badge">${course.badge}</div>`:""}
        <div class="card-front">
          <img src="${course.img}" />
          <h3>${course.title}</h3>
          <div class="video-count">${course.videos.length} Video${course.videos.length>1?'s':''}</div>
        </div>
        <div class="card-back">
          <h3>${course.title}</h3>
          <button onclick="openModal('${courseKey}')">View Videos</button>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function searchCourses(){
  const filter=document.getElementById("search-input").value.toLowerCase();
  document.querySelectorAll(".course-card").forEach(card=>{
    const title=card.querySelector(".card-front h3").textContent.toLowerCase();
    card.style.display=title.includes(filter)?"flex":"none";
  });
}

function openModal(courseKey){
  const course=courses[courseKey];
  currentCourseVideos=course.videos;
  currentVideoIndex=0;
  showVideo(currentVideoIndex);
  document.getElementById("modal-course-title").textContent=course.title;
  document.getElementById("course-modal").style.display="flex";
}

function showVideo(index){
  document.getElementById("modal-videos-list").innerHTML=`<iframe src="${currentCourseVideos[index]}" allow="autoplay"></iframe>`;
}

function prevVideo(){ if(currentVideoIndex>0){ currentVideoIndex--; showVideo(currentVideoIndex); } }
function nextVideo(){ if(currentVideoIndex<currentCourseVideos.length-1){ currentVideoIndex++; showVideo(currentVideoIndex); } }
function closeModal(){ document.getElementById("course-modal").style.display="none"; }

let darkMode=true;
function toggleMode(){
  darkMode=!darkMode;
  if(darkMode){
    document.documentElement.style.setProperty('--bg-color','#0b0c28');
    document.documentElement.style.setProperty('--card-front','linear-gradient(135deg,#001f4d,#003366)');
    document.documentElement.style.setProperty('--card-back','linear-gradient(135deg,#002266,#004080)');
    document.documentElement.style.setProperty('--text-color','white');
    document.documentElement.style.setProperty('--highlight','#00dfff');
    document.getElementById("mode-toggle").textContent="🌙";
  } else {
    document.documentElement.style.setProperty('--bg-color','#ffffff');
    document.documentElement.style.setProperty('--card-front','linear-gradient(135deg,#cce6ff,#99ccff)');
    document.documentElement.style.setProperty('--card-back','linear-gradient(135deg,#99ccff,#66b3ff)');
    document.documentElement.style.setProperty('--text-color','#001f3f');
    document.documentElement.style.setProperty('--highlight','#0073e6');
    document.getElementById("mode-toggle").textContent="☀️";
  }
}

window.addEventListener('scroll',()=>{ const scrollTop=window.pageYOffset||document.documentElement.scrollTop; const particles=document.getElementById('particles-js'); if(particles) particles.style.transform=`translateY(${scrollTop*0.2}px)`; });








