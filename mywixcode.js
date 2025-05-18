import wixLocation from 'wix-location';
import { local as storage, memory } from 'wix-storage-frontend';
import { checkAuthEmail, makeUser, makeInitialEntry, makeInitialEntryHP, makeInitialEntryTeam, getTeamStatus, getSpecificOrder, makeCustomerOrder, logOrder, updateCustomerCart, getAllCustomerSpecificCarts, processCustomerOrder, getCustomerOrderInfo, makeHPEntry, addEntryHP, processCart, getTeamName, enterTeam, addEntryTeam, addEntry, addClass, searchCartsByUser, getChampInfo, getUserCredits, getUserEntries, teamMemberCredits, updateUserEntry, updateUserCredits, getArenaInfo, updateEntryHP, updateHPEntry, getClassInfo, getTeamMemberCredits, getEntriesTeam, firebaseSignOut, getRiders, getEntries, getUser, getHorses, updateThisUser, getJudge, updateJudgeLevel, getEntriesHP } from "public/firebaseService.js"
import { getSectionCode, getSectionName, getEpointsFormat, getHPSection, getArena, getLevelName, getMonthNameFull, getMonthName } from "public/usefulCode.js"
import { getWixOrderDetails } from 'backend/order.web'


var theseRiders = []
var theseHorses = []
var theseEntries = []
var theseEntriesHP = []
var theseEntriesTeams = []


var riderDetailsArray = []
var riderEpointsArray = []
var horseDetailsArray = []
var horseEpointsArray = []


var listRiderName = []
var listRiderID = []
var listHorseName = []
var listHorseID = []


var clicked = 0


var extraArenas = []


let riderRepeater = $w('#repeaterRider')
let horseRepeater = $w('#repeaterHorse')
let entryRepeater = $w('#repeaterEntries')
let entryHPRepeater = $w('#repeaterHP')
let teamsRepeater = $w('#repeaterTeams')


var entryArray = []
var yearArray = []
var monthArray = []
var arenaArray = []
var levelArray = []
var testArray = []
var sectionArray = []
var codeArray = []
var horseArray = []
var groupArray = []
var ePointsArray = []
var percentageArray = []
var placingArray = []
var pointsArray = []
var riderArray = []
var riderIDArray = []
var horseIDArray = []
var entriesArray = []
var judgeArray = []
var sponsorArray = []
var showArray = []
var uploadedArray = []
var arenaNameArray = []


var yearArrayHP = []
var monthArrayHP = []
var arenaArrayHP = []
var hpArray = []
var teamArray = []


var uid = ""
var judgeCode = ""
var thisAccess = ""
var loyaltyentries = 0
var credits = 0


var thisMonthString = ""
var tM = 0
var tY = 0


$w('#buttonAdmin').hide()


$w("#dropdownCountry").options = [
   { value: "United Kingdom", label: "United Kingdom" },
   { value: "USA", label: "USA" },
   { value: "Afghanistan", label: "Afghanistan" },
   { value: "Albania", label: "Albania" },
   { value: "Algeria", label: "Algeria" },
   { value: "Andorra", label: "Andorra" },
   { value: "Angola", label: "Angola" },
   { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
   { value: "Argentina", label: "Argentina" },
   { value: "Armenia", label: "Armenia" },
   { value: "Australia", label: "Australia" },
   { value: "Austria", label: "Austria" },
   { value: "Azerbaijan", label: "Azerbaijan" },
   { value: "Bahamas", label: "Bahamas" },
   { value: "Bahrain", label: "Bahrain" },
   { value: "Bangladesh", label: "Bangladesh" },
   { value: "Barbados", label: "Barbados" },
   { value: "Belarus", label: "Belarus" },
   { value: "Belgium", label: "Belgium" },
   { value: "Belize", label: "Belize" },
   { value: "Benin", label: "Benin" },
   { value: "Bhutan", label: "Bhutan" },
   { value: "Bolivia", label: "Bolivia" },
   { value: "Bosnia & Herzegovina", label: "Bosnia & Herzegovina" },
   { value: "Botswana", label: "Botswana" },
   { value: "Brazil", label: "Brazil" },
   { value: "Brunei", label: "Brunei" },
   { value: "Bulgaria", label: "Bulgaria" },
   { value: "Burkina Faso", label: "Burkina Faso" },
   { value: "Burundi", label: "Burundi" },
   { value: "Cabo Verde", label: "Cabo Verde" },
   { value: "Cambodia", label: "Cambodia" },
   { value: "Cameroon", label: "Cameroon" },
   { value: "Canada", label: "Canada" },
   { value: "Central African Republic", label: "Central African Republic" },
   { value: "Chad", label: "Chad" },
   { value: "Chile", label: "Chile" },
   { value: "China", label: "China" },
   { value: "Colombia", label: "Colombia" },
   { value: "Comoros", label: "Comoros" },
   { value: "Congo", label: "Congo" },
   { value: "Costa Rica", label: "Costa Rica" },
   { value: "Croatia", label: "Croatia" },
   { value: "Cuba", label: "Cuba" },
   { value: "Cyprus", label: "Cyprus" },
   { value: "Czech Republic", label: "Czech Republic" },
   { value: "Côte d'Ivoire", label: "Côte d'Ivoire" },
   { value: "Denmark", label: "Denmark" },
   { value: "Djibouti", label: "Djibouti" },
   { value: "Dominica", label: "Dominica" },
   { value: "Dominican Republic", label: "Dominican Republic" },
   { value: "DR Congo", label: "DR Congo" },
   { value: "Ecuador", label: "Ecuador" },
   { value: "Egypt", label: "Egypt" },
   { value: "El Salvador", label: "El Salvador" },
   { value: "Equatorial Guinea", label: "Equatorial Guinea" },
   { value: "Eritrea", label: "Eritrea" },
   { value: "Estonia", label: "Estonia" },
   { value: "Ethiopia", label: "Ethiopia" },
   { value: "Fiji", label: "Fiji" },
   { value: "Finland", label: "Finland" },
   { value: "France", label: "France" },
   { value: "Gabon", label: "Gabon" },
   { value: "Gambia", label: "Gambia" },
   { value: "Georgia", label: "Georgia" },
   { value: "Germany", label: "Germany" },
   { value: "Ghana", label: "Ghana" },
   { value: "Greece", label: "Greece" },
   { value: "Grenada", label: "Grenada" },
   { value: "Guatemala", label: "Guatemala" },
   { value: "Guinea", label: "Guinea" },
   { value: "Guinea-Bissau", label: "Guinea-Bissau" },
   { value: "Guyana", label: "Guyana" },
   { value: "Haiti", label: "Haiti" },
   { value: "Holy See", label: "Holy See" },
   { value: "Honduras", label: "Honduras" },
   { value: "Hungary", label: "Hungary" },
   { value: "Iceland", label: "Iceland" },
   { value: "India", label: "India" },
   { value: "Indonesia", label: "Indonesia" },
   { value: "Iran", label: "Iran" },
   { value: "Iraq", label: "Iraq" },
   { value: "Ireland", label: "Ireland" },
   { value: "Israel", label: "Israel" },
   { value: "Italy", label: "Italy" },
   { value: "Jamaica", label: "Jamaica" },
   { value: "Japan", label: "Japan" },
   { value: "Jordan", label: "Jordan" },
   { value: "Kazakhstan", label: "Kazakhstan" },
   { value: "Kenya", label: "Kenya" },
   { value: "Kiribati", label: "Kiribati" },
   { value: "Kuwait", label: "Kuwait" },
   { value: "Kyrgyzstan", label: "Kyrgyzstan" },
   { value: "Laos", label: "Laos" },
   { value: "Latvia", label: "Latvia" },
   { value: "Lebanon", label: "Lebanon" },
   { value: "Lesotho", label: "Lesotho" },
   { value: "Liberia", label: "Liberia" },
   { value: "Libya", label: "Libya" },
   { value: "Liechtenstein", label: "Liechtenstein" },
   { value: "Lithuania", label: "Lithuania" },
   { value: "Luxembourg", label: "Luxembourg" },
   { value: "Madagascar", label: "Madagascar" },
   { value: "Malawi", label: "Malawi" },
   { value: "Malaysia", label: "Malaysia" },
   { value: "Maldives", label: "Maldives" },
   { value: "Mali", label: "Mali" },
   { value: "Malta", label: "Malta" },
   { value: "Marshall Islands", label: "Marshall Islands" },
   { value: "Mauritania", label: "Mauritania" },
   { value: "Mauritius", label: "Mauritius" },
   { value: "Mexico", label: "Mexico" },
   { value: "Micronesia", label: "Micronesia" },
   { value: "Moldova", label: "Moldova" },
   { value: "Monaco", label: "Monaco" },
   { value: "Mongolia", label: "Mongolia" },
   { value: "Montenegro", label: "Montenegro" },
   { value: "Morocco", label: "Morocco" },
   { value: "Mozambique", label: "Mozambique" },
   { value: "Myanmar", label: "Myanmar" },
   { value: "Namibia", label: "Namibia" },
   { value: "Nauru", label: "Nauru" },
   { value: "Nepal", label: "Nepal" },
   { value: "Netherlands", label: "Netherlands" },
   { value: "New Zealand", label: "New Zealand" },
   { value: "Nicaragua", label: "Nicaragua" },
   { value: "Niger", label: "Niger" },
   { value: "Nigeria", label: "Nigeria" },
   { value: "North Korea", label: "North Korea" },
   { value: "Norway", label: "Norway" },
   { value: "Oman", label: "Oman" },
   { value: "Pakistan", label: "Pakistan" },
   { value: "Palau", label: "Palau" },
   { value: "Panama", label: "Panama" },
   { value: "Papua New Guinea", label: "Papua New Guinea" },
   { value: "Paraguay", label: "Paraguay" },
   { value: "Peru", label: "Peru" },
   { value: "Philippines", label: "Philippines" },
   { value: "Poland", label: "Poland" },
   { value: "Portugal", label: "Portugal" },
   { value: "Qatar", label: "Qatar" },
   { value: "Romania", label: "Romania" },
   { value: "Russia", label: "Russia" },
   { value: "Rwanda", label: "Rwanda" },
   { value: "Saint Kitts & Nevis", label: "Saint Kitts & Nevis" },
   { value: "Saint Lucia", label: "Saint Lucia" },
   { value: "Samoa", label: "Samoa" },
   { value: "San Marino", label: "San Marino" },
   { value: "Sao Tome & Principe", label: "Sao Tome & Principe" },
   { value: "Saudi Arabia", label: "Saudi Arabia" },
   { value: "Senegal", label: "Senegal" },
   { value: "Serbia", label: "Serbia" },
   { value: "Seychelles", label: "Seychelles" },
   { value: "Sierra Leone", label: "Sierra Leone" },
   { value: "Singapore", label: "Singapore" },
   { value: "Slovakia", label: "Slovakia" },
   { value: "Slovenia", label: "Slovenia" },
   { value: "Solomon Islands", label: "Solomon Islands" },
   { value: "Somalia", label: "Somalia" },
   { value: "South Africa", label: "South Africa" },
   { value: "South Korea", label: "South Korea" },
   { value: "South Sudan", label: "South Sudan" },
   { value: "Spain", label: "Spain" },
   { value: "Sri Lanka", label: "Sri Lanka" },
   { value: "St. Vincent & Grenadines", label: "St. Vincent & Grenadines" },
   { value: "State of Palestine", label: "State of Palestine" },
   { value: "Sudan", label: "Sudan" },
   { value: "Suriname", label: "Suriname" },
   { value: "Swaziland", label: "Swaziland" },
   { value: "Sweden", label: "Sweden" },
   { value: "Switzerland", label: "Switzerland" },
   { value: "Syria", label: "Syria" },
   { value: "Tajikistan", label: "Tajikistan" },
   { value: "Tanzania", label: "Tanzania" },
   { value: "TFYR Macedonia", label: "TFYR Macedonia" },
   { value: "Thailand", label: "Thailand" },
   { value: "Timor-Leste", label: "Timor-Leste" },
   { value: "Togo", label: "Togo" },
   { value: "Tonga", label: "Tonga" },
   { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
   { value: "Tunisia", label: "Tunisia" },
   { value: "Turkey", label: "Turkey" },
   { value: "Turkmenistan", label: "Turkmenistan" },
   { value: "Tuvalu", label: "Tuvalu" },
   { value: "Uganda", label: "Uganda" },
   { value: "Ukraine", label: "Ukraine" },
   { value: "United Arab Emirates", label: "United Arab Emirates" },
   { value: "Uruguay", label: "Uruguay" },
   { value: "Uzbekistan", label: "Uzbekistan" },
   { value: "Vanuatu", label: "Vanuatu" },
   { value: "Venezuela", label: "Venezuela" },
   { value: "Viet Nam", label: "Viet Nam" },
   { value: "Yemen", label: "Yemen" },
   { value: "Zambia", label: "Zambia" },
   { value: "Zimbabwe", label: "Zimbabwe" }
];


$w.onReady(function () {


   getAuth()


})


async function getAuth() {


   uid = "" + storage.getItem("savedUserID");


   console.log("xxx", uid, storage.getItem("setUID"))


   storage.removeItem("allRiderID")
   storage.removeItem("allPercentage")
   storage.removeItem("allYear")
   storage.removeItem("allMonth")
   storage.removeItem("allArena")
   storage.removeItem("allLevel")
   storage.removeItem("allTest")
   storage.removeItem("allGroup")
   storage.removeItem("allCode")
   storage.removeItem("allHorse")
   storage.removeItem("allGroup")
   storage.removeItem("allEpoints")
   storage.removeItem("allPlace")
   storage.removeItem("allPoints")
   storage.removeItem("allRider")
   storage.removeItem("allHorseID")
   storage.removeItem("allEntries")
   storage.removeItem("allJudge")
   storage.removeItem("listRiderName")
   storage.removeItem("listRiderID")
   storage.removeItem("listHorseName")
   storage.removeItem("listHorseID")
   storage.removeItem("allSponsor")


   if (uid == null || uid == undefined || uid == "none" || uid == "null" || uid.length < 10) {


       setTimeout(() => {
           uid = "" + storage.getItem("savedUserID");
           if (uid == null || uid == undefined || uid == "none" || uid == "null" || uid.length < 10) {
               $w('#groupAuthErr').expand()
               $w('#boxMyAccount').hide()
               $w('#textWelcome').hide()
               $w('#buttonLogOut').hide()


               setTimeout(goLogout, 5000);
           }
       }, 2000);


   } else {
       mainFunc()
   }
}


async function mainFunc() {


   let welcomeText = $w('#textWelcome')
   let nameText = $w('#textName')
   let emailText = $w('#textEmail')


   let addText1 = $w('#textAdd1')
   let addText2 = $w('#textAdd2')
   let addText3 = $w('#textAdd3')
   let addText4 = $w('#textAdd4')


   riderRepeater.onItemReady(($item, itemData) => {
       $item('#textRider').text = itemData.rider
       $item('#textRiderIndex').text = itemData.index
   });


   $w("#textRider").onClick((event) => {
       let $item = $w.at(event.context);
       let index = parseInt($item("#textRiderIndex").text)
       storage.setItem("selectedRiderID", riderDetailsArray[index])
       storage.setItem("selectedRiderEpoints", riderEpointsArray[index])
       wixLocation.to("/rider-details");
   });


   horseRepeater.onItemReady(($item, itemData) => {
       $item('#textHorse').text = itemData.horse
       $item('#textHorseIndex').text = itemData.index
   });


   $w("#textHorse").onClick((event) => {
       let $item = $w.at(event.context);
       let index = parseInt($item("#textHorseIndex").text)
       storage.setItem("selectedHorseID", horseDetailsArray[index])
       storage.setItem("selectedHorseEpoints", horseEpointsArray[index])
       wixLocation.to("/horse-details");
   });


   entryRepeater.onItemReady(($item, itemData) => {
       $item('#textEntries').text = itemData.entry
       $item('#textUploaded').text = itemData.uploaded
       $item('#textEntriesIndex').text = itemData.index


   });


   entryHPRepeater.onItemReady(($item, itemData) => {
       $item('#textHPIndex').text = itemData.index
       $item('#textRiderHP').text = itemData.rider
       $item('#textHorseHP').text = itemData.horse
       $item('#textMonthHP').text = itemData.month
       $item('#textSectionHP').text = itemData.section
       $item('#textHPCode').text = itemData.hpCode
       if ($item('#textRiderHP').text == "none") {
           $item('#unassignBtn').hide()
       } else {
           $item('#unassignBtn').show()
       }
   });


   $w("#textEntries").onClick((event) => {
       let $item = $w.at(event.context);
       let index = parseInt($item("#textEntriesIndex").text)
       storage.setItem("selectedEntryID", entryArray[index])
       storage.setItem("selectedArena", arenaNameArray[index])
       wixLocation.to("/entry-details");
   });


   teamsRepeater.onItemReady(($item, itemData) => {
       $item('#textTeamIndex').text = itemData.index
       $item('#textTournament').text = itemData.tournament
       $item('#textTeamName').text = itemData.name


   });


   $w("#boxTeam").onClick((event) => {


       let $item = $w.at(event.context);
       let index = parseInt($item("#textTeamIndex").text)
       // console.log("WWW",$item("#textTeamIndex").text,index,teamArray[index])
       storage.setItem("selectedTeamID", teamArray[index])
       wixLocation.to("/team-details");
   });


   $w("#box16").onClick((event) => {
       let $item = $w.at(event.context);
       let index = $item("#textHPIndex").text //parseInt()
       let horse = $item("#textHorseHP").text
       let rider = $item("#textRiderHP").text
       let hp = $item('#textHPCode').text
       if (horse == "none" && rider == "none") {
           storage.setItem("selectedHPID", index) //hpArray[index])
           wixLocation.to("/highest-placed-entry");
       } else {
           let splitHPCode = index.split("_")
           let thisSection = splitHPCode[1]
           let thisHP = index
           let thisHPCode = hp


           updateEntryHP(uid, thisHP, thisSection, thisHPCode, "none", "none", "none", "none").then((msg) => {


               updateHPEntry(thisHPCode, thisSection, thisHP, "none", "none", "none", "none", 0) //(tyh)
                   .then((msg) => {


                       wixLocation.to("/highest-placed-entry");
                   })
           })


       }
   });


   const today = new Date();
   let tD = parseInt(today.getDate());
   tM = parseInt(today.getMonth() + 1);
   tY = parseInt(today.getFullYear());


   thisMonthString = getMonthNameFull(tM)


   if (tM == 12) {
       let thisYear = tY + 1
       $w('#textChamps').text = "We're now in the " + thisYear + " summer qualification period."
   } else if (tM < 6) {
       $w('#textChamps').text = "We're now in the " + tY + " summer qualification period."
   } else {
       $w('#textChamps').text = "We're now in the " + tY + " winter qualification period."
   }


   const userData = await getUser(uid)
   //userData == "error"


   if (userData == "none") {


       if (uid.length > 10) {


           const userDataCheckAgain = await getUser(uid)


           const userEntry = await getEntries(uid)


           if (userDataCheckAgain == "none" && userEntry == "none") {


               $w('#boxMyAccount').hide()
               $w('#textWelcome').hide()


               $w('#groupRegError').expand()


               const thisEmail = await checkAuthEmail()


               const makeUserResult = await makeUser("tbc", thisEmail, uid, "tbc", "tbc", "tbc", "tbc", "United Kingdom")
               const makeInitialEntryResult = await makeInitialEntry(uid)
               const makeInitialEntryHPResult = await makeInitialEntryHP(uid)
               const makeInitialEntryTeamResult = await makeInitialEntryTeam(uid)


               if (makeUserResult == "success" &&
                   makeInitialEntryResult == "success" &&
                   makeInitialEntryHPResult == "success" &&
                   makeInitialEntryTeamResult == "success"
               ) {
                   $w('#buttonRefreshAccount').enable()
               } else {
                   $w('#textRegError').text = "Sorry, there's been an issue setting up your account. Please contact susie@e-riders.co.uk."
               }
           } else {


               $w('#boxMyAccount').hide()
               $w('#textWelcome').hide()
               $w('#groupRegError').expand()
               $w('#textRegError').text = "Sorry, there's been an issue loading your account. Please wait a moment and try refreshing the page."
               $w('#buttonRefreshAccount').enable()
           }
       } else {
           $w('#boxMyAccount').hide()
           $w('#textWelcome').hide()


           $w('#groupRegError').expand()
           $w('#textRegError').text = "Sorry, there's been an issue loading your account. Please wait a moment and try refreshing the page."
           $w('#buttonRefreshAccount').enable()
       }
   } else if (userData == "error") {


       $w('#boxMyAccount').hide()
       $w('#textWelcome').hide()


       $w('#groupRegError').expand()
       $w('#textRegError').text = "Sorry, there's been an issue loading your account. Please wait a moment and try refreshing the page."
       $w('#buttonRefreshAccount').enable()


   } else {


       $w('#boxMyAccount').show()
       $w('#textWelcome').show()


       $w('#groupAuthErr').collapse()


       thisAccess = userData.judge
       if (thisAccess == "admin") {
           $w('#buttonAdmin').show()
       }


       let thisEmail = userData.email
       let allRiders = userData.riders
       let allHorses = userData.horses
       let thisName = userData.name
       let firstName = thisName.split(" ")[0]


       loyaltyentries = userData.loyaltyentries
       credits = userData.credits


       let add1 = userData.address1
       let add2 = userData.address2
       let add3 = userData.address3
       let add4 = userData.address4
       let countr = userData.country


       welcomeText.text = "Hi " + firstName + ", welcome to your E-Riders account."
       nameText.text = thisName
       emailText.text = thisEmail


       $w('#inputName').value = thisName
       $w('#inputEmail').value = thisEmail


       if (add1 === undefined) {
           addText1.text = "House number or name"


       } else {
           addText1.text = add1
           $w('#inputAdd1').value = add1
       }


       if (add2 === undefined) {
           addText2.text = "Street name"
       } else {
           addText2.text = add2
           $w('#inputAdd2').value = add2
       }


       if (add3 === undefined) {
           addText3.text = "Town"
       } else {
           addText3.text = add3
           $w('#inputAdd3').value = add3
       }


       if (add4 === undefined) {
           addText4.text = "Postcode"
       } else {
           addText4.text = add4
           $w('#inputAdd4').value = add4
       }


       if (countr === undefined) {
           $w('#textCountry').text = "Country"
       } else {
           $w('#textCountry').text = countr
           $w('#dropdownCountry').value = countr
       }


       $w('#textUID').text = "Your unique user ID which you will need for team entry is: " + uid


       if (thisAccess == "y") {
           $w('#boxJudge').expand()
           judgeCode = thisName + "_" + uid
           getJudge(judgeCode).then((judgeData) => {
               $w('#textList').text = judgeData.list
               $w('#inputList').value = judgeData.list
           })


       } else {
           $w('#boxJudge').collapse()
       }


       setupLoyaltyCard()


       const msgH = await getHorses(uid)


       if (msgH == "none") {
           let horseText = $w('#text73')
           horseText.text = "You haven't added any horses yet! Tap the orange button to add one now."
           $w('#containerHorse').hide()
       } else {
           var entryCount = 0


           Object.keys(msgH).forEach((name) => {


               entryCount = entryCount + 1


               let thisData = msgH[name]


               let thisName = thisData.showname
               let thisStable = thisData.stablename
               let thisBreed = thisData.breed
               let thisPrevID = thisData.prevID
               let thisColour = thisData.colour
               let thisDOB = thisData.dob
               let thisHeight = thisData.height
               let thisID = name


               let allEpoints = getEpointsFormat(thisData)
               var allEpointsString = ""
               for (let i = 0; i < allEpoints.length; i++) {
                   allEpointsString = allEpointsString + allEpoints[i] + ","
               }


               horseEpointsArray.push(allEpointsString)


               let horseString = thisID + "!%!$$!%!" + thisName + "!%!$$!%!" + thisStable + "!%!$$!%!" + thisBreed + "!%!$$!%!" + thisPrevID + "!%!$$!%!" + thisColour + "!%!$$!%!" + thisDOB + "!%!$$!%!" + thisHeight


               horseDetailsArray.push(horseString)
               theseHorses.push({ _id: "" + (entryCount - 1), index: "" + (entryCount - 1), horse: thisName })
               horseRepeater.data = theseHorses


               listHorseName.push(thisName)
               listHorseID.push(thisID)


           })


           if (entryCount == 0) {
               let horseText = $w('#text73')
               horseText.text = "You haven't added any horses yet! Tap the orange button to add one now."
               $w('#containerHorse').hide()


           }
       }


       const msgR = await getRiders(uid)


       if (msgR == "none") {
           let riderText = $w('#text26')
           riderText.text = "You haven't added any riders yet! Tap the orange button to add one now."
           $w('#containerRider').hide()
       } else {
           var entryCount = 0


           Object.keys(msgR).forEach((name) => {


               entryCount = entryCount + 1


               let thisData = msgR[name]


               let thisName = thisData.name
               let thisCountry = thisData.country
               let thisDOB = thisData.dob
               let thisPrevID = thisData.prevID
               let thisRS = thisData.ridingSchool
               let thisRC = thisData.ridingClub
               let thisID = name


               let allEpoints = getEpointsFormat(thisData)
               var allEpointsString = ""
               for (let i = 0; i < allEpoints.length; i++) {
                   allEpointsString = allEpointsString + allEpoints[i] + ","
               }


               riderEpointsArray.push(allEpointsString)


               let riderString = thisID + "!%!$$!%!" + thisName + "!%!$$!%!" + thisCountry + "!%!$$!%!" + thisDOB + "!%!$$!%!" + thisPrevID + "!%!$$!%!" + thisRS + "!%!$$!%!" + thisRC


               riderDetailsArray.push(riderString)
               theseRiders.push({ _id: "" + (entryCount - 1), index: "" + (entryCount - 1), rider: thisName })
               riderRepeater.data = theseRiders


               listRiderName.push(thisName)
               listRiderID.push(thisID)


           })


           if (entryCount == 0) {
               let riderText = $w('#text26')
               riderText.text = "You haven't added any riders yet! Tap the orange button to add one now."


               $w('#containerRider').hide()
           }
       }


       getArenaInfo().then((querySnapshot) => {


           querySnapshot.forEach((doc) => {
               let thisArena = "" + doc.id
               let thisArenaDetails = doc.data()
               let thisArenaName = thisArenaDetails.name
               let inUse = thisArenaDetails.inuse


               extraArenas.push(thisArena + "_" + thisArenaName)


           })


           extraArenas.sort()


           getAllEntries()
       })


       getHPEntries()


       const teamMSG = await getEntriesTeam(uid)


       $w('#text95').text = "You don't have any ongoing team tournament entries."
       $w('#repeaterTeams').collapse()
       $w('#textExtraCredit').collapse()


       let thisMSG = "" + teamMSG


       const today = new Date();
       let todayDate = today.toLocaleDateString()
       let todayDateSplit = todayDate.split("/")


       let tD = parseInt(todayDateSplit[0])
       let tM = parseInt(todayDateSplit[1])
       let tY = parseInt(todayDateSplit[2])


       let thisMonthString = getMonthNameFull(tM)


       // $w('#textMonth').text = thisMonthString + " Entries"


       let theseUploaded = ""


       var numTeams = 0
       if (thisMSG == "none") {
           $w('#text95').text = "You don't have any ongoing team tournament entries."
           $w('#repeaterTeams').collapse()
           $w('#textExtraCredit').collapse()


       } else {
           var entryCount = 0


           Object.keys(teamMSG).forEach((name) => {
               numTeams = numTeams + 1


               let thisEntryName = name
               console.log("qqq",thisEntryName)


               let thisData = teamMSG[name]
               if (thisEntryName.length > 0) {


                 


                   let thisTeamTournament = thisData.teamName
                   var thisTeamName = thisData.name
                   if (thisTeamName == "none") {
                       thisTeamName = "give your team a name!"
                   }


                   let teamCode = thisData.team


                   getTeamStatus(teamCode).then((status) => {
                       if (status == "yes") {
                           // do nothin
g
                       } else {


                           teamArray.push(thisEntryName)


                           theseEntriesTeams.push({ _id: "" + entryCount, index: "" + entryCount, tournament: thisTeamTournament, name: thisTeamName })
                           teamsRepeater.data = theseEntriesTeams


                           entryCount = entryCount + 1
                       }
                   })


                   if (theseEntriesTeams.length>0){
                        $w('#text95').text = "You have entered the following team events:"
                   $w('#repeaterTeams').expand()
                   $w('#textExtraCredit').expand()
                   } else {
                       $w('#text95').text = "You don't have any ongoing team tournament entries."
           $w('#repeaterTeams').collapse()
           $w('#textExtraCredit').collapse()
                   }


               }


           });


       }


       if (numTeams != 0) {
           getTeamMemberCredits(uid).then((credits) => {


               if (credits == "none" || credits === undefined) {
                   $w('#textExtraCredit').collapse()
               } else {


                   if (credits < 0) {
                       teamMemberCredits(uid, 0)
                       $w('#textExtraCredit').collapse()
                   } else {


                       let numCredits = credits
                       if (numCredits == 0 || numCredits == "0") {
                           $w('#textExtraCredit').hide()
                       } else if (numCredits == 1 || numCredits == "1") {
                           $w('#textExtraCredit').text = "You have a team entry credit, meaning you can add a rider to any one of your teams that currently only has 3 members."
                       } else {
                           $w('#textExtraCredit').text = "You have " + numCredits + " team entry credits, meaning you can add a rider to any one of your teams that currently only has 3 members."
                       }
                       storage.setItem("teamMemberCredits", numCredits)
                   }


               }


           })
       }


   }


}


function setupLoyaltyCard() {
   if (loyaltyentries >= 9) {
       let c = (Math.ceil(loyaltyentries / 9) - 1)
       if (c < 1) {
           c = 1
       }
       credits = credits + c
       loyaltyentries = loyaltyentries - 9


       updateUserEntry(uid, loyaltyentries)
       updateUserCredits(uid, credits)
   }
   $w('#textCredits').text = "" + credits
   for (let i = 1; i < loyaltyentries + 1; i++) {
       let img = "#imageECF" + i
       $w(img).show()
   }


   if (loyaltyentries == 0 && credits > 0) {
       for (let i = 1; i < 11; i++) {
           let img = "#imageECF" + i
           $w(img).show()
       }
   }


}


// export function addLoyalty(event) {


//     if (uid == "bcRv8imqLuRAPuyp234kYnXEeIv1"){


//     let N = 2
//     getUserEntries(uid).then((currEntries) => {


//         var numEntries = 0
//         var extraCredits = 0
//         if (currEntries == 8 || currEntries == "8") {
//             numEntries = N - 1
//             extraCredits = 1
//         } else {
//             numEntries = parseInt(currEntries) + N
//         }


//         if (extraCredits == 0) {
//             updateUserEntry(uid, numEntries)
//                 loyaltyentries = numEntries
//                 console.log("kdfhakl")
//                 setupLoyaltyCard()


//         } else {


//             getUserCredits(uid).then((currCredits) => {
//                 let newCredits = parseInt(currCredits) + extraCredits
//                 loyaltyentries = numEntries
//                 credits = newCredits
//                 updateUserEntry(uid, numEntries)
//                 updateUserCredits(uid, newCredits)
//                  console.log("kdfhakl")
//                 setupLoyaltyCard()
//             });
//         }


//     });
//     }
// }


$w('#buttonLogOut').onClick(() => {


   firebaseSignOut().then((msg) => {
       storage.setItem("savedUserID", "null");
       storage.setItem("savedJudge", "null");
       wixLocation.to("/login");
   });
});


export function buttonAdd_click(event) {
   wixLocation.to("/add-rider");
}


export function buttonAddHorse_click(event) {
   wixLocation.to("/add-horse");
}


export function button2_click(event) {


   storage.setItem("allOrigin", "myAccount");


   // storage.setItem("allRiderID", riderIDArray);
   // storage.setItem("allPercentage", percentageArray);
   // storage.setItem("allYear", yearArray);
   // storage.setItem("allMonth", monthArray);
   // storage.setItem("allArena", arenaArray);
   // storage.setItem("allLevel", levelArray);
   // storage.setItem("allTest", testArray);
   // storage.setItem("allGroup", sectionArray);
   // storage.setItem("allCode", codeArray);
   // storage.setItem("allHorse", horseArray);
   // storage.setItem("allGroup", groupArray);
   // storage.setItem("allEpoints", ePointsArray);
   // storage.setItem("allPlace", placingArray);
   // storage.setItem("allPoints", pointsArray);
   // storage.setItem("allRider", riderArray);
   // storage.setItem("allHorseID", horseIDArray);
   // storage.setItem("allEntries", entriesArray);
   // storage.setItem("allJudge", judgeArray);


   // storage.setItem("listRiderName", listRiderName);
   // storage.setItem("listRiderID", listRiderID);
   // storage.setItem("listHorseName", listHorseName);
   // storage.setItem("listHorseID", listHorseID);


   wixLocation.to("/myresults");
}


/**
*   Adds an event handler that runs when the element is clicked.
   [Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*    @param {$w.MouseEvent} event
*/
export function buttonLogOut_click(event) {
   firebaseSignOut().then((msg) => {
       storage.setItem("savedUserID", "null");
       storage.setItem("savedJudge", "null");
       wixLocation.to("/login");


   });
}


export function buttonEditDetails_click(event) {


   $w('#groupAddress').hide()
   if (thisAccess != "y") {
       $w('#textName').hide()
       $w('#inputName').show()
   }


   $w('#textEmail').hide()
   $w('#buttonEditDetails').hide()
   $w('#textCountry').hide()


   $w('#buttonSaveDetails').show()


   $w('#inputEmail').show()
   $w('#text85').expand()
   $w('#inputAdd1').show()
   $w('#inputAdd2').show()
   $w('#inputAdd3').show()
   $w('#inputAdd4').show()


}


export function buttonSaveDetails_click(event) {


   let newName = $w('#inputName').value
   let newEmail = $w('#inputEmail').value


   let newAdd1 = $w('#inputAdd1').value
   let newAdd2 = $w('#inputAdd2').value
   let newAdd3 = $w('#inputAdd3').value
   let newAdd4 = $w('#inputAdd4').value
   let newCount = $w('#dropdownCountry').value


   let detailError = $w('#textErrorDet')
   detailError.collapse()


   if (newName.length < 2) {
       detailError.text = "Please enter a new name"
       detailError.expand()
   } else if (newEmail.length < 2) {
       detailError.text = "Please enter a new email"
       detailError.expand()
   } else if (newAdd1.length < 1) {
       detailError.text = "Please enter a new house name or number"
       detailError.expand()
   } else if (newAdd2.length < 2) {
       detailError.text = "Please enter a new street name"
       detailError.expand()
   } else if (newAdd3.length < 2) {
       detailError.text = "Please enter a new town or city"
       detailError.expand()
   } else if (newAdd4.length < 2) {
       detailError.text = "Please enter a new post code (or equivalent)"
       detailError.expand()
   } else if (newCount.length < 2) {
       detailError.text = "Please select a country"
       detailError.expand()


   } else {


       updateThisUser(uid, newName, newEmail, newAdd1, newAdd2, newAdd3, newAdd4, newCount)


       $w('#textName').text = newName
       $w('#textEmail').text = newEmail
       $w('#textAdd1').text = newAdd1
       $w('#textAdd2').text = newAdd2
       $w('#textAdd3').text = newAdd3
       $w('#textAdd4').text = newAdd4
       $w('#textCountry').text = newCount


       $w('#groupAddress').show()
       $w('#textName').show()
       $w('#textEmail').show()
       $w('#buttonEditDetails').show()
       $w('#textCountry').show()


       $w('#buttonSaveDetails').hide()
       $w('#inputName').hide()
       $w('#inputEmail').hide()
       $w('#text85').collapse()
       $w('#inputAdd1').hide()
       $w('#inputAdd2').hide()
       $w('#inputAdd3').hide()
       $w('#inputAdd4').hide()


   }


}


export function buttonJudgeSave_click(event) {


   $w('#errorJudge').hide()


   let newList = $w('#inputList').value
   if (newList.length < 2) {
       $w('#errorJudge').show()
       $w('#errorJudge').text = "enter a new BD list value"
   } else {
       $w('#textList').show()
       $w('#inputList').hide()
       $w('#buttonJudgeEdit').show()
       $w('#buttonJudgeSave').hide()
       updateJudgeLevel(judgeCode, newList)
   }


}


export function buttonJudgeEdit_click(event) {
   $w('#textList').hide()
   $w('#inputList').show()
   $w('#buttonJudgeEdit').hide()
   $w('#buttonJudgeSave').show()


}


$w('#btnRefreshEntries').onClick((event) => {
   $w('#btnRefreshEntries').label = "refreshing"


   $w('#btnRefreshEntries').disable()
   $w('#btnRefreshTeamEntries').disable()
   clicked = clicked + 1
   if (clicked == 1) {
       refreshEntries()
   }


})


$w('#btnRefreshTeamEntries').onClick((event) => {
   $w('#btnRefreshTeamEntries').label = "refreshing"


   $w('#btnRefreshEntries').disable()
   $w('#btnRefreshTeamEntries').disable()
   clicked = clicked + 1
   if (clicked == 1) {
       refreshEntries()
   }


})


export async function refreshEntries() {
   const allCarts = await getAllCustomerSpecificCarts(uid);
   const cartsArray = allCarts.docs; // Convert to array of documents


   // Collect all promises
   const promises = cartsArray.map(async (doc) => {
       const thisCart = "" + doc.id;
       const thisData = doc.data();
       const thisPaid = thisData.paid;


       // console.log(thisPaid)


       if (thisPaid == "yes" || thisPaid == "Failed as this order has already been processed") {
           console.log(thisCart, thisPaid, "not ok")
           return; // Skip processing this cart
       } else {
           console.log(thisCart, thisPaid, "ok")


           try {
               const orderDetails = await getWixOrderDetails(thisCart, uid)
               if (orderDetails != "none") {


                   const orderNo = "" + orderDetails.orderNo
                   const userOrder = await getSpecificOrder(orderNo)


                   if (userOrder == "none") {
                       await processOrderItems(orderDetails)
                   }
               }


           } catch (error) {
               console.error("Failed to fetch orders:", error);
           }


       }


   });


   await Promise.all(promises);


   $w('#btnRefreshEntries').label = "processing"
   $w('#btnRefreshTeamEntries').label = "processing"
   wixLocation.to(wixLocation.url)


}


async function processOrderItems(order) {


   let numItems = order.lineItems.length;
   let orderCartID = order.orderCartID
   const orderNo = "" + order.orderNo
   var summary = ""
   var numEntry = 0


   if (numItems === 0) {


       //todo
   } else {
       try {
           for (let i = 0; i < numItems; i++) {
               let thisClassCodeShort = order.lineItems[i].sku;
               let thisQuantity = order.lineItems[i].quantity;
               let numOptions = order.lineItems[i].options.length;
               let option1 = "na";
               let option2 = "na";
               if (numOptions === 1) {
                   option1 = order.lineItems[i].options[0].selection;
               } else if (numOptions === 2) {
                   if (order.lineItems[i].options[0].option.toLowerCase() === "test") {
                       option1 = order.lineItems[i].options[0].selection;
                       option2 = order.lineItems[i].options[1].selection;
                   } else {
                       option1 = order.lineItems[i].options[1].selection;
                       option2 = order.lineItems[i].options[0].selection;
                   }
               }


               summary = summary + "" + thisQuantity + "xxx" + thisClassCodeShort + "xxx" + option1 + "xxx" + option2 + "//"


               // start
               if (thisClassCodeShort.includes("hpaward")) {


                   let thisSection = option1


                   let sectioncode = thisSection.split(".")[0]


                   for (let j = 0; j < thisQuantity; j++) {
                       let r = (Math.random() + 1).toString(36).substring(7);


                       let entryID = uid + "_" + sectioncode + "_" + r


                       await makeHPEntry(thisClassCodeShort, sectioncode, entryID, entryID)
                       await addEntryHP(uid, entryID, sectioncode, thisClassCodeShort)


                   }
               } else if (thisClassCodeShort.includes("teamtournament")) {


                   let numRiders = option1


                   for (let j = 0; j < thisQuantity; j++) {
                       let r = (Math.random() + 1).toString(36).substring(7);
                       let teamCode = uid + "_" + r
                       let num = parseInt(numRiders)


                       await enterTeam(thisClassCodeShort, teamCode, num)


                       const teamName = await getTeamName(thisClassCodeShort)
                       await addEntryTeam(thisClassCodeShort, teamCode, num, uid, teamName)


                   }
               } else if (thisClassCodeShort.includes("extrateammember")) {


                   const credits = await getTeamMemberCredits(uid)


                   var newTeamCredits = 0
                   if (credits == "none" || credits === undefined) {
                       newTeamCredits = thisQuantity
                   } else {
                       newTeamCredits = credits + thisQuantity
                   }
                   await teamMemberCredits(uid, newTeamCredits)


               } else if (thisClassCodeShort.includes("ch_")) {


                   numEntry = numEntry + thisQuantity


                   let codeSplit = thisClassCodeShort.split("_")
                   let champCode = codeSplit[2] + "_" + codeSplit[3] + "_" + codeSplit[4] + "_" + codeSplit[5] + "_" + codeSplit[6]


                   const champData = await getChampInfo(champCode)


                   let shopCode1 = champData.shopCode1
                   let shopCode2 = champData.shopCode2
                   let shopCode3 = champData.shopCode3


                   var classCodeA = "none"
                   var classCodeB = "none"
                   if (shopCode1.includes(thisClassCodeShort)) {
                       classCodeA = champData.classCode1a
                       classCodeB = champData.classCode1b
                   } else if (shopCode2.includes(thisClassCodeShort)) {
                       classCodeA = champData.classCode2a
                       classCodeB = champData.classCode2b
                   } else if (shopCode3.includes(thisClassCodeShort)) {
                       classCodeA = champData.classCode3a
                       classCodeB = champData.classCode3b
                   }


                   let sectioncode = getSectionCode(classCodeA.split("_" [5]))


                   for (let j = 0; j < thisQuantity; j++) {
                       let r = (Math.random() + 1).toString(36).substring(7);


                       let entryCodeA = Date.now() + r + "_" + classCodeA
                       let entryCodeB = Date.now() + r + "_" + classCodeB


                       let entryCodeAC = entryCodeA + "_" + uid
                       let entryCodeBC = entryCodeB + "_" + uid


                       await addEntry(uid, entryCodeA, sectioncode) //.then((msg) => {
                       await addClass(classCodeA, entryCodeAC) //.then((msg) => {
                       await addEntry(uid, entryCodeB, sectioncode) //.then((msg) => {
                       await addClass(classCodeB, entryCodeBC) //.then((msg) => {
                   }


               } else {
                   numEntry = numEntry + thisQuantity


                   var thisTest = ""
                   var thisSection = ""


                   if (thisClassCodeShort.includes("FSM")) {
                       thisTest = "na"
                       thisSection = "na"
                   } else {
                       thisTest = option1
                       thisSection = option2
                   }


                   let sectioncode = getSectionCode(thisSection)


                   for (let j = 0; j < thisQuantity; j++) {
                       let r = (Math.random() + 1).toString(36).substring(7);


                       let entryCode = Date.now() + r + "_" + thisClassCodeShort + "_" + thisTest + "_" + sectioncode
                       let classCode = thisClassCodeShort + "_" + thisTest + "_" + sectioncode
                       let entryCodeC = entryCode + "_" + uid


                       await addEntry(uid, entryCode, sectioncode)
                       await addClass(classCode, entryCodeC)
                   }
               }
               // end
           }


           await afterItemLoopComplete(orderCartID, orderNo, numEntry, summary)
       } catch (error) {
           console.error("Error in processing items:", error);
       }
   }


}


async function afterItemLoopComplete(orderCartID, orderNo, numEntry, summary) {


   const today = new Date();
   let tD = parseInt(today.getDate());
   let tM = parseInt(today.getMonth() + 1);
   let tY = parseInt(today.getFullYear());


   let tH = today.getHours()
   let tMn = today.getMinutes()
   let tS = today.getSeconds()


   let timestamp = "" + tY + "-" + tM + "-" + tD + "--" + tH + "-" + tMn + "-" + tS


   let msgCart = await updateCustomerCart(orderCartID, uid, timestamp, "yes", "added missing order my account")
   let msgOrder = await makeCustomerOrder(orderCartID, uid, timestamp, summary, orderNo)
   let msgReg = await logOrder(orderNo, orderCartID, uid, timestamp, summary, "my account")


   if (numEntry > 0) {


       let currEntries = await getUserEntries(uid);
       currEntries = parseInt(currEntries); // Ensure currEntries is an integer


       // Calculate the new number of entries
       let totalEntries = currEntries + numEntry;


       // Calculate the number of free credits earned
       let freeCreditsEarned = Math.floor(totalEntries / 9);


       // Calculate the remaining entries after awarding free credits
       let remainingEntries = totalEntries % 9;


       // Update the user's credits if they earned any free credits
       if (freeCreditsEarned > 0) {
           let currCredits = await getUserCredits(uid);
           let newCredits = parseInt(currCredits) + freeCreditsEarned;


           await updateUserCredits(uid, newCredits)
           await updateUserEntry(uid, remainingEntries)


       } else {
           // Update the user's entries to the remaining number
           await updateUserEntry(uid, remainingEntries);
       }


   }
}


function goLogout() {
   firebaseSignOut().then((msg) => {
       memory.clear();
       storage.clear();
       wixLocation.to("/login");


   });
}


$w('#buttonLogout').onClick((event) => {
   goLogout()
})


async function getAllEntries() {


   const msgEntry = await getEntries(uid)


   let thisMSG = "" + msgEntry


   $w('#textMonth').text = thisMonthString + " Entries"


   let theseUploaded = ""


   var entryOrderedArray = []


   let entryText = $w('#text77')
   entryText.text = "You haven't entered any classes for this month. Tap the orange Add Entry button to go do it now!"
   $w('#containerEntry').collapse()
   $w('#buttonUpload').hide()


   if (thisMSG == "none") {
       let entryText = $w('#text77')
       entryText.text = "You haven't entered any classes for this month. Tap the orange button to go do it now!"
       $w('#containerEntry').hide()
       $w('#buttonUpload').hide()
   } else {
       var entryCount = 0


       var c = -1


       Object.keys(msgEntry).forEach((name) => {


           let thisEntryName = name


           let thisData = msgEntry[name]


           let uploaded = thisData.uploaded
           if (thisEntryName.length > 0) {


               c = c + 1


               let splitEntryCode = thisEntryName.split("_")


               if (splitEntryCode.length > 6) {


                   let thisYear = splitEntryCode[1]
                   let thisMonth = splitEntryCode[2]


                   let overallEntryName = thisYear + "_" + thisMonth + "_" + splitEntryCode[3] + "_" + splitEntryCode[4] + "_" + splitEntryCode[5] + "_" + splitEntryCode[6]


                   var show = 0
                   if (parseInt(thisYear) == tY && parseInt(thisMonth) >= (tM - 1)) {
                       show = 1


                   } else {
                       if (tM == 11 || tM == 12) {
                           if (parseInt(thisYear) == tY + 1 && parseInt(thisMonth) >= 0) {
                               show = 1
                           }
                       } else if (tM == 1) {
                           if (parseInt(thisYear) == tY - 1 && parseInt(thisMonth) == 12) {
                               show = 1
                           }
                       }
                   }


                   var thisUp = " "
                   if (uploaded == "1") {
                       thisUp = "✓"
                   }


                   if (show == 1) {


                       entryText.text = "Tap on the entry to see more details. Entries with a ✓ show that you've uploaded your video."
                       $w('#containerEntry').expand()
                       $w('#buttonUpload').show()


                       // getClassInfo(overallEntryName).then((msg) => {
                       entryCount = entryCount + 1
                       //     let thisArena = msg.arenaName
                       // if (thisArena == undefined || thisArena == "undefined") {
                       // let thisArena = getArena(splitEntryCode[3])
                       //todo
                       // }


                       let thisArenaCode = splitEntryCode[3]
                       var thisArena = "" //getArena(splitID[2])
                       if (thisArenaCode.includes("extra")) {
                           var lastChar = thisArenaCode[thisArenaCode.length - 1];
                           if (lastChar == "0") {
                               lastChar = "10"
                           }
                           var num = parseInt(lastChar)
                           if (num == 10) {
                               num = 0
                           }


                           thisArena = extraArenas[num].split("_")[1]
                       } else {
                           thisArena = getArena(splitEntryCode[3])
                       }


                       arenaNameArray.push(thisArena)


                       yearArray.push(thisYear)
                       monthArray.push(thisMonth)
                       arenaArray.push(splitEntryCode[3])
                       levelArray.push(splitEntryCode[4])
                       testArray.push(splitEntryCode[5])
                       sectionArray.push(splitEntryCode[6])


                       codeArray.push(overallEntryName)
                       groupArray.push(thisData.group)
                       ePointsArray.push(thisData.epoints)
                       percentageArray.push(thisData.percentage)
                       placingArray.push(thisData.place)
                       pointsArray.push(thisData.points)
                       riderArray.push(thisData.riderName)
                       horseArray.push(thisData.horseName)
                       judgeArray.push(thisData.judge)
                       riderIDArray.push(thisData.riderID)
                       horseIDArray.push(thisData.horseID)
                       entriesArray.push(thisEntryName)
                       sponsorArray.push(thisData.sponsorURL)


                       storage.setItem("allRiderID", riderIDArray);
                       storage.setItem("allPercentage", percentageArray);
                       storage.setItem("allYear", yearArray);
                       storage.setItem("allMonth", monthArray);
                       storage.setItem("allArena", arenaArray);
                       storage.setItem("allLevel", levelArray);
                       storage.setItem("allTest", testArray);
                       storage.setItem("allGroup", sectionArray);
                       storage.setItem("allCode", codeArray);
                       storage.setItem("allHorse", horseArray);
                       storage.setItem("allGroup", groupArray);
                       storage.setItem("allEpoints", ePointsArray);
                       storage.setItem("allPlace", placingArray);
                       storage.setItem("allPoints", pointsArray);
                       storage.setItem("allRider", riderArray);
                       storage.setItem("allHorseID", horseIDArray);
                       storage.setItem("allEntries", entriesArray);
                       storage.setItem("allJudge", judgeArray);
                       storage.setItem("allSponsor", sponsorArray)


                       storage.setItem("listRiderName", listRiderName);
                       storage.setItem("listRiderID", listRiderID);
                       storage.setItem("listHorseName", listHorseName);
                       storage.setItem("listHorseID", listHorseID);
                       showArray.push(show)


                       uploadedArray.push(thisUp)


                       let thisLevel = getLevelName(splitEntryCode[4])


                       let monthName = getMonthName(thisMonth)
                       var thisValue = monthName + " - " + thisArena + " - " + thisLevel


                       if (splitEntryCode[5] != "na") {
                           thisValue = thisValue + " " + splitEntryCode[5]
                       }


                       if (splitEntryCode[6] != "na") {
                           let thisSection = getSectionName(splitEntryCode[6])
                           thisValue = thisValue + " - " + thisSection
                       }


                       entryOrderedArray.push(thisEntryName + "!!!" + (entryCount - 1) + "!!!" + thisValue + "!!!" + uploaded)
                       // theseEntries.push({ _id: "" + (entryCount - 1), index: "" + (entryCount - 1), entry: thisValue, uploaded: thisUp })
                       // entryRepeater.data = theseEntries


                       entryArray.push(thisEntryName)


                       // })
                   }
               }


           }


       });


       entryOrderedArray.sort()


       for (let i = 0; i < entryOrderedArray.length; i++) {


           let thisEntryName = entryOrderedArray[i].split("!!!")[0]
           let thisIndex = entryOrderedArray[i].split("!!!")[1]
           let thisValue = entryOrderedArray[i].split("!!!")[2]
           let thisUploaded = entryOrderedArray[i].split("!!!")[3]


           var thisUp = " "
           if (thisUploaded == "1") {
               thisUp = "✓"
           }


           theseEntries.push({ _id: thisIndex, index: thisIndex, entry: thisValue, uploaded: thisUp })
           entryRepeater.data = theseEntries


       }
   }


}


async function getHPEntries() {
   const msgHP = await getEntriesHP(uid)


   let thisMSGHP = "" + msgHP


   const today = new Date();
   let todayDate = today.toLocaleDateString()
   let todayDateSplit = todayDate.split("/")


   let tD = parseInt(todayDateSplit[0])
   let tM = parseInt(todayDateSplit[1])
   let tY = parseInt(todayDateSplit[2])


   entryHPRepeater.collapse()
   $w('#text86').collapse()


   if (thisMSGHP == "none" || thisMSGHP == undefined || thisMSGHP.length < 2) {
       $w('#text86').collapse()
       $w('#repeaterHP').hide()


   } else {
       var entryCount = 0


       Object.keys(msgHP).forEach((name) => {


           let thisEntryName = name


           let thisData = msgHP[name]


           if (thisEntryName.length > 0) {


               let splitEntryCode = thisData.hpcode.split("_")


               let thisYear = splitEntryCode[1]
               let thisMonth = splitEntryCode[2]


               let thisHorse = thisData.horseName
               let thisRider = thisData.riderName
               let thisSection = thisData.section
               let sectionName = getHPSection(thisSection)


               var show = 0
               if (parseInt(thisYear) == tY && parseInt(thisMonth) >= tM) {
                   show = 1
               } else {
                   if (tM == 11 || tM == 12) {
                       if (parseInt(thisYear) == tY + 1 && parseInt(thisMonth) >= 0) {
                           show = 1
                       }
                   }
               }


               if (show == 1) {


                   entryHPRepeater.expand()
                   $w('#text86').expand()


                   entryCount = entryCount + 1


                   yearArrayHP.push(thisYear)
                   monthArrayHP.push(thisMonth)


                   hpArray.push(thisEntryName)


                   entryCount = entryCount + 1


                   let thisHPCode = thisData.hpcode


                   theseEntriesHP.push({ _id: "" + entryCount, index: "" + thisEntryName, hpCode: thisHPCode, rider: thisRider, horse: thisHorse, month: getMonthNameFull(thisMonth), section: sectionName })


                   entryHPRepeater.data = theseEntriesHP
               }


           }


       });


   }


}


$w('#buttonRefreshAccount').onClick((event) => {


   wixLocation.to(wixLocation.url)


})
