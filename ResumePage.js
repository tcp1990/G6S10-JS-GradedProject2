// read local JSON file using jQuery
let jsonResumeObj;
const arr_Applied_for = [];
const arr_Applied_for_filtered = [];
let resumecode=" ";


const buttonPrevious = document.querySelector(".previousButton");
const searchbox = document.querySelector(".searchTextBox");
const buttonNext = document.querySelector(".nextButton");

buttonPrevious.addEventListener("click", buttonPreviousClicked);
buttonNext.addEventListener("click", buttonNextClicked);
searchbox.addEventListener("change", searchString);


let can_Index = 0;

/*

let jsonUrl = "./Data.json";
//For testing in Chrome Browser
let jsonUrl = "https://api.npoint.io/aeddb50e5de8ef107bf0";

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
*/

//getText("http://localhost:8080/TestWeb/Data.json");
let jsonUrl = "https://api.npoint.io/aeddb50e5de8ef107bf0";
getText(jsonUrl);

async function getText(file) {
  let x = await fetch(file);
  let y = await x.text();
  jsonResumeObj = JSON.parse(y);
  if(jsonResumeObj.resume.length>0){
     for (let x in jsonResumeObj.resume) {
       arr_Applied_for[x]=jsonResumeObj.resume[x].basics.AppliedFor;
     }
     can_Index = -1;
     buttonNextClicked();
  } else{
    buttonNext.style.visibility = 'hidden';
    Alert (" No resume avaialble");
  }
} 


function buttonNextClicked() {
  /*  if (searchbox.value.length > 0) {
        if (can_Index < (arr_Applied_for_filtered.length - 1)) {
            can_Index++;
            displayResume(arr_Applied_for_filtered[can_Index]);
            buttonPrevious.style.visibility = 'visible';
            if(can_Index ==0)
            buttonPrevious.style.visibility = 'hidden';
            buttonNext.style.visibility = 'visible';
            if(can_Index == (arr_Applied_for_filtered.length - 1))
            buttonNext.style.visibility = 'hidden';
        }
    } else {
        if (can_Index < (jsonResumeObj.resume.length - 1)) {
            can_Index++;
            displayResume(can_Index);
            buttonPrevious.style.visibility = 'visible';
            if(can_Index ==0)
            buttonPrevious.style.visibility = 'hidden';
            buttonNext.style.visibility = 'visible';
            if(can_Index == (jsonResumeObj.resume.length - 1))
            buttonNext.style.visibility = 'hidden';
        }
    }*/
    let max_Index=0;
    let dis_Index=0;
    if (searchbox.value.length > 0) {
        max_Index=arr_Applied_for_filtered.length - 1;
        dis_Index=arr_Applied_for_filtered[can_Index +1];
    } else{
        max_Index=jsonResumeObj.resume.length - 1;
        dis_Index=can_Index +1;
    }
    if (can_Index < max_Index) {
        can_Index++;
        displayResume(dis_Index);
        buttonPrevious.style.visibility = (can_Index ==0)?'hidden':'visible';
        buttonNext.style.visibility =(can_Index ==  max_Index)?'hidden':'visible';
    }
}

function buttonPreviousClicked() {
    let max_Index=0;
    let dis_Index=0;
    if (searchbox.value.length > 0) {
        max_Index=arr_Applied_for_filtered.length - 1;
        dis_Index=  arr_Applied_for_filtered[can_Index -1]
    }else{
        max_Index=jsonResumeObj.resume.length - 1;
        dis_Index=  can_Index-1;
    }
    if (can_Index > 0) {
        can_Index--;
        displayResume(dis_Index);
        buttonPrevious.style.visibility = (can_Index ==0)?'hidden':'visible';
        buttonNext.style.visibility =(can_Index ==  max_Index)?'hidden':'visible';
    }

/*
    if (searchbox.value.length > 0) {
        if (can_Index > 0) {
            can_Index--;
            buttonNext.style.visibility = 'visible';
            displayResume(arr_Applied_for_filtered[can_Index]);
            if(can_Index ==0)
            buttonPrevious.style.visibility = 'hidden';
        }
    } else {
        if (can_Index > 0) {
            can_Index--;
            buttonNext.style.visibility = 'visible';
            displayResume(can_Index);
            if(can_Index ==0)
            buttonPrevious.style.visibility = 'hidden';
        }
    }
    */
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
    //alert(arr_Applied_for_filtered.length);
    if(arr_Applied_for_filtered.length>0){
        if( resumecode.length >5 ){
            document.getElementById("resumeSection").innerHTML =resumecode;
            resumecode=" ";
        }
        can_Index = -1;
        buttonNextClicked();
    }else{
        buttonNext.style.visibility = 'hidden';
        buttonPrevious.style.visibility = 'hidden';
        //alert("No Resume available");
        resumecode=document.getElementById("resumeSection").innerHTML;
        document.getElementById("resumeSection").innerHTML ="<div> <img src='Images/NoResume.jpg' alt='No Results'></div>"
    }
}



function displayResume(i) {
    // const can_id = jsonResumeObj.resume[i].id;
    // const can_image = jsonResumeObj.resume[i].basics.image;
    // const can_address = jsonResumeObj.resume[i].basics.location.address;
    // const can_postalCode = jsonResumeObj.resume[i].basics.location.postalCode;
    // const can_city = jsonResumeObj.resume[i].basics.location.city;
    // const can_state = jsonResumeObj.resume[i].basics.location.state;
    // const can_skills_name = jsonResumeObj.resume[i].skills.name;
    // const can_skills_level = jsonResumeObj.resume[i].skills.level;

   /* if (i === 0) {
        buttonPrevious.style.visibility = 'hidden';
    } else {
        buttonPrevious.style.visibility = 'visible';
    }

    let lastIndex = jsonResumeObj.resume.length - 1;
    if (i === lastIndex) {
        buttonNext.style.visibility = 'hidden';
    } else {
        buttonNext.style.visibility = 'visible';
    }
    */

    const userNameTextValue = jsonResumeObj.resume[i].basics.name;
    document.getElementById("userName").innerHTML = userNameTextValue;

    const appliedForJobTextValue = jsonResumeObj.resume[i].basics.AppliedFor;
    document.getElementById("appliedForJob").innerHTML = 'Applied For : ' + appliedForJobTextValue;

    const jsonWorkExperienceInfo = jsonResumeObj.resume[i].work;
    let workExperienceTextValue = "<h3>Work Experience in Previous Company</h3><p><ul class='noBulletsList'>";
    for (let x in jsonWorkExperienceInfo) {
        workExperienceTextValue += "<li><b>" + x + ":</b> " + jsonWorkExperienceInfo[x] + "</li><br>";
    }
    let subStringToRemoveInWorkInfo = "<br>";
    workExperienceTextValue = workExperienceTextValue.substring(0, workExperienceTextValue.length - subStringToRemoveInWorkInfo.length);
    workExperienceTextValue += "</ul></p>";

    const jsonProjectsInfo = jsonResumeObj.resume[i].projects;
    let projectsTextValue = "<h3>Projects</h3>";
    projectsTextValue += "<p><ul class='noBulletsList'><li><b>" + jsonProjectsInfo["name"] + ": </b>" + jsonProjectsInfo["description"] + "</li></ul></p>";

    const jsonEducationInfo = jsonResumeObj.resume[i].education;
    let educationTextValue = "<h3>Education</h3><p><ul>";
    for (let x in jsonEducationInfo) {
        educationTextValue += "<li><b>" + x + ": </b>";
        for (let y in jsonEducationInfo[x]) {
            educationTextValue += jsonEducationInfo[x][y] + ",";
        }
        let subStringToRemoveInWorkInfo = ",";
        educationTextValue = educationTextValue.substring(0, educationTextValue.length - subStringToRemoveInWorkInfo.length);
        educationTextValue += "</li>";
    }
    educationTextValue += "</ul></p>";

    const jsonInternshipInfo = jsonResumeObj.resume[i].Internship;
    let internshipTextValue = "<h3>Internship</h3><p><ul>";
    for (let x in jsonInternshipInfo) {
        internshipTextValue += "<li><b>" + x + ": </b>" + jsonInternshipInfo[x] + "</li>";
    }
    internshipTextValue += "</ul></p>";

    const jsonAchievementsInfo = jsonResumeObj.resume[i].achievements.Summary;
    let achievementsTextValue = "<h3>Achievements</h3><p><ul>";
    for (let x in jsonAchievementsInfo) {
        achievementsTextValue += "<li>" + jsonAchievementsInfo[x] + "</li>";
    }
    achievementsTextValue += "</ul></p>";

    let bottomRightColumnContent = workExperienceTextValue + projectsTextValue + educationTextValue + internshipTextValue + achievementsTextValue;
    document.getElementById("bottomRightColumnContent").innerHTML = bottomRightColumnContent;

    const mobileNumberTextValue = jsonResumeObj.resume[i].basics.phone;
    document.getElementById("mobileNumber").innerHTML = mobileNumberTextValue;

    const emailIdTextValue = jsonResumeObj.resume[i].basics.email;
    document.getElementById("emailId").innerHTML = emailIdTextValue;

    const networkTextValue = jsonResumeObj.resume[i].basics.profiles.network;
    const hrefUrlTextValue = jsonResumeObj.resume[i].basics.profiles.url;
    var linkedIn = document.getElementById("linkedIn");
    linkedIn.innerHTML = networkTextValue;
    linkedIn.setAttribute('href', hrefUrlTextValue);

    const jsonSkillsList = jsonResumeObj.resume[i].skills.keywords;
    let technicalSkillsTextValue = "";
    for (let x in jsonSkillsList) {
        technicalSkillsTextValue += "<tr><td>" + jsonSkillsList[x] + "</td></tr>";
    }
    document.getElementById("technicalSkillsTableBody").innerHTML = technicalSkillsTextValue;

    const jsonHobbiesList = jsonResumeObj.resume[i].interests.hobbies;
    let hobbiesTextValue = "";
    for (let x in jsonHobbiesList) {
        hobbiesTextValue += "<tr><td>" + jsonHobbiesList[x] + "</td></tr>";
    }
    document.getElementById("hobbiesTableBody").innerHTML = hobbiesTextValue;
}