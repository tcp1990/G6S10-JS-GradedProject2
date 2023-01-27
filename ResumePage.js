// read local JSON file using jQuery
let jsonResumeObj;
const arr_Applied_for = [];
const arr_Applied_for_filtered = [];

let jsonUrl = "./Data.json";
//For testing in Chrome Browser
//let jsonUrl = "https://api.npoint.io/aeddb50e5de8ef107bf0";

$(document).ready(function (e) {
    $.getJSON(jsonUrl, function (data) {

        console.log(data);

        jsonResumeObj = data;

        console.log(jsonResumeObj);

        if (jsonResumeObj.resume.length > 0) {
            displayResume(0);
            for (let x in jsonResumeObj.resume) {
                arr_Applied_for[x] = jsonResumeObj.resume[x].basics.AppliedFor;
            }
        }
    });
});

const searchbox = document.querySelector(".SearchStr");
const butNext = document.querySelector(".butNext");
const butPre = document.querySelector(".butPrevious");

butPre.addEventListener("click", butPreClicked);
butNext.addEventListener("click", butNextClicked);
searchbox.addEventListener("change", searchString);


let can_Index = 0;
function butNextClicked() {
    if (searchbox.value.length > 0) {
        if (can_Index < (arr_Applied_for_filtered.length - 1)) {
            can_Index++;
            displayResume(arr_Applied_for_filtered[can_Index]);
        }
    } else {
        if (can_Index < (jsonResumeObj.resume.length - 1)) {
            can_Index++;
            displayResume(can_Index);
        }
    }
}
function butPreClicked() {
    if (searchbox.value.length > 0) {
        if (can_Index > 0) {
            can_Index--;
            displayResume(arr_Applied_for_filtered[can_Index]);
        }
    } else {
        if (can_Index > 0) {
            can_Index--;
            displayResume(can_Index);
        }
    }
}
function searchString() {
    arr_Applied_for_filtered.length = 0;
    //alert(searchbox.value.length);
    for (let x in arr_Applied_for) {
        //alert(arr_Applied_for[x]);
        if (arr_Applied_for[x].includes(searchbox.value)) {
            arr_Applied_for_filtered.push(x);
        }
    }
    alert(arr_Applied_for_filtered.length);
    can_Index = 0;
    displayResume(arr_Applied_for_filtered[0]);
}

/* getText("http://localhost:8080/TestWeb/Data.json");

async function getText(file) {
  let x = await fetch(file);
  let y = await x.text();
  jsonResumeObj = JSON.parse(y);
  if(jsonResumeObj.resume.length>0){
         displayResume(0);
     for (let x in jsonResumeObj.resume) {
       arr_Applied_for[x]=jsonResumeObj.resume[x].basics.AppliedFor;
     }
  }
} */

function displayResume(i) {
    //let i=0;
    const can_id = jsonResumeObj.resume[i].id;
    const userNameValue = jsonResumeObj.resume[i].basics.name;
    const appliedForJobValue = jsonResumeObj.resume[i].basics.AppliedFor;
    const can_image = jsonResumeObj.resume[i].basics.image;
    const can_email = jsonResumeObj.resume[i].basics.email;
    const can_phone = jsonResumeObj.resume[i].basics.phone;
    const can_address = jsonResumeObj.resume[i].basics.location.address;
    const can_postalCode = jsonResumeObj.resume[i].basics.location.postalCode;
    const can_city = jsonResumeObj.resume[i].basics.location.city;
    const can_state = jsonResumeObj.resume[i].basics.location.state;
    const can_network = jsonResumeObj.resume[i].basics.profiles.network;
    const can_url = jsonResumeObj.resume[i].basics.profiles.url;
    const can_skills_name = jsonResumeObj.resume[i].skills.name;
    const can_skills_level = jsonResumeObj.resume[i].skills.level;
    const can_skills_keywords = jsonResumeObj.resume[i].skills.keywords;

    const can_work = jsonResumeObj.resume[i].work;
    const can_internship = jsonResumeObj.resume[i].Internship;
    const can_projects = jsonResumeObj.resume[i].projects;
    const can_education = jsonResumeObj.resume[i].education;

    const can_achievements_Summary = jsonResumeObj.resume[i].achievements.Summary;
    const can_interests_hobbies = jsonResumeObj.resume[i].interests.hobbies;

    document.getElementById("userName").innerHTML = userNameValue;
    document.getElementById("appliedForJob").innerHTML = 'Applied For : ' + appliedForJobValue;


    let str_work = "<h3>Work Experience in Previous Company</h3><table><tr><th></th></tr>";
    for (let x in can_work) {
        str_work += "<tr><td><b>" + x + ":</b>" + can_work[x] + "</td></tr>";
    }
    str_work += "</table>";


    let str_projects = "<P><ul><h3>Projects</h3>";
    str_projects += "<li><b>" + can_projects["name"] + ": </b>" + can_projects["description"] + "</li>";
    str_projects += "</ul>";

    let str_education = "<P><ul><h4>Education</h4>";
    for (let x in can_education) {
        str_education += "<li><b>" + x + ": </b>";
        for (let y in can_education[x])
            str_education += can_education[x][y] + ",";
        str_education += "</li>";
    }
    str_education += "</ul>";

    let str_internship = "<P><ul><h4>Internship</h4>";
    for (let x in can_internship) {
        str_internship += "<li><b>" + x + ": </b>" + can_internship[x] + "</li>";
    }
    str_internship += "</ul>";

    let str_achievements = "<P><ul><h4>Achievements</h4>";
    for (let x in can_achievements_Summary) {
        str_achievements += "<li>" + can_achievements_Summary[x] + "</li>";
    }
    str_achievements += "</ul>";

    document.getElementById("centre").innerHTML = str_work + str_projects + str_education + str_internship + str_achievements;


    let str_personal_info = "<table><tr><th>Personal Information</th></tr>";
    str_personal_info += "<tr><td>" + can_phone + "</td></tr>";
    str_personal_info += "<tr><td>" + can_email + "</td></tr>";
    str_personal_info += "<tr><td><a href='" + can_url + "'>" + can_network + "</a></td></tr>";
    str_personal_info += "</table>";

    let str_technical = "<table><tr><th>Technical Skills</th></tr>";
    for (let x in can_skills_keywords) {
        str_technical += "<tr><td>" + can_skills_keywords[x] + "</td></tr>";
    }
    str_technical += "</table>";

    let str_hobbies = "<table><tr><th>Hobbies</th></tr>";
    for (let x in can_interests_hobbies) {
        str_hobbies += "<tr><td>" + can_interests_hobbies[x] + "</td></tr>";
    }
    str_hobbies += "</table>";


    document.getElementById("left").innerHTML = str_personal_info + str_technical + str_hobbies;

}