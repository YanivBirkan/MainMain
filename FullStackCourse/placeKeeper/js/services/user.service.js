 const gUser = {
    email : '',
    txtColor : '',
    bgColor : '',
    Age : '',
    birthDate: '',
    birthTime: ''
 }

function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    
    gUser.email = formData.get('email');
    gUser.Age = formData.get('age');
    gUser.bgColor = formData.get('BgColor');
    gUser.txtColor = formData.get('TxtColor');
    gUser.birthDate = formData.get('dob');
    gUser.birthTime = formData.get('tob');

    console.log("Updated User Info:", gUser);
    saveToStorage("userData" ,gUser );
    window.location = "index.html"
  
}



 function showAge(newVal) {
        document.getElementById("sAge").innerHTML = newVal;
      }

