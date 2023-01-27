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
    const userNameValue = jsonResumeObj.resume[i].basics.name;
    document.getElementById("userName").innerHTML = userNameValue;

    const appliedForJobValue = jsonResumeObj.resume[i].basics.AppliedFor;
    document.getElementById("appliedForJob").innerHTML = 'Applied For : ' + appliedForJobValue;

    const can_id = jsonResumeObj.resume[i].id;
    const can_image = jsonResumeObj.resume[i].basics.image;
    const can_address = jsonResumeObj.resume[i].basics.location.address;
    const can_postalCode = jsonResumeObj.resume[i].basics.location.postalCode;
    const can_city = jsonResumeObj.resume[i].basics.location.city;
    const can_state = jsonResumeObj.resume[i].basics.location.state;
    const can_skills_name = jsonResumeObj.resume[i].skills.name;
    const can_skills_level = jsonResumeObj.resume[i].skills.level;
    const can_work = jsonResumeObj.resume[i].work;
    const can_internship = jsonResumeObj.resume[i].Internship;
    const can_projects = jsonResumeObj.resume[i].projects;
    const can_education = jsonResumeObj.resume[i].education;
    const can_achievements_Summary = jsonResumeObj.resume[i].achievements.Summary;

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
    
    const mobileNumberValue = jsonResumeObj.resume[i].basics.phone;
    document.getElementById("mobileNumber").innerHTML = mobileNumberValue;

    const emailIdValue = jsonResumeObj.resume[i].basics.email;
    document.getElementById("emailId").innerHTML = emailIdValue;

    const networkValue = jsonResumeObj.resume[i].basics.profiles.network;
    const hrefUrlValue = jsonResumeObj.resume[i].basics.profiles.url;
    var linkedIn = document.getElementById("linkedIn");
    linkedIn.innerHTML = networkValue;
    linkedIn.setAttribute('href', hrefUrlValue);

    const jsonSkillsList = jsonResumeObj.resume[i].skills.keywords;
    let strTechnical = "";
    for (let x in jsonSkillsList) {
        strTechnical += "<tr><td>" + jsonSkillsList[x] + "</td></tr>";
    }
    document.getElementById("technicalSkillsTableBody").innerHTML = strTechnical;

    const jsonHobbiesList = jsonResumeObj.resume[i].interests.hobbies;
    let strHobbies = "";
    for (let x in jsonHobbiesList) {
        strHobbies += "<tr><td>" + jsonHobbiesList[x] + "</td></tr>";
    }
    document.getElementById("hobbiesTableBody").innerHTML = strHobbies;

}

