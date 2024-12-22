//=============== Global ======================
const inputsArray = document.querySelectorAll("input");

let usersArr ;
if(localStorage.getItem("users")!= null){
    usersArr = JSON.parse( localStorage.getItem("users"));
}

else usersArr = [];

//=============== Events ======================

inputsArray[0].addEventListener("input", function(){
    validateEmail();
});

inputsArray[1].addEventListener("input", function(){
    validatePassword();
});




document.querySelector("form").addEventListener("submit",function(e){
    //to prevent load of form:
    e.preventDefault();
    setForm();
});


//=============== Functions ===================
function setForm(){
    if(validateEmail() && validatePassword()  ) {
        if(usersArr.length != 0){
            let flag = false;
            for (let i of usersArr){
                if(i.email === inputsArray[0].value && i.password === inputsArray[1].value){
                    flag = true;
                    alert(`Welcome ${i.name}!`);
                    localStorage.setItem("uToken",i.name);
                    location.href = './index.html';
                    break;
                }
            }
            if(!flag){
                alert("Wrong E-mail or Password!");
            }
           
        } else{
            alert("No user created yet!");
        }

    }
    
}




async function getData (user){
    const api = await fetch(`https://route-ecommerce.vercel.app/api/v1/auth/signup`, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    const response = await api.json();
    console.log("API Response = " + response);

}
//=============== Validations =================


  function validateEmail(){
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // ([\w]{3,}) the first name should contain only letters and of length 3 or more
    // +\s the first name should be followed by a space
    // +([\w\s]{3,})+ the second name should contain only letters of length 3 or more and can be followed by other names or not
    // /i ignores the case of the letters. Can be uppercase or lowercase letters

    if(emailRegex.test(inputsArray[0].value)){
        inputsArray[0].classList.add("is-valid");
        inputsArray[0].classList.remove("is-invalid");
        return true;
    }
    else{
        inputsArray[0].classList.add("is-invalid");
        inputsArray[0].classList.remove("is-valid");
        return false;
    }
}

function validatePassword(){
    let flag = true;
    let mainRegx= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    
    validatePasswordItem(0,/(?=.*[a-z])/);
    validatePasswordItem(1,/(?=.*[A-Z])/);
    validatePasswordItem(2,/(?=.*\d)/);
    validatePasswordItem(3,/(.*\W.*)/);
    validatePasswordItem(4,mainRegx);

    if(flag){
        inputsArray[1].classList.add("is-valid");
        inputsArray[1].classList.remove("is-invalid");
        return true;
    }
    else{
        inputsArray[1].classList.add("is-invalid");
        inputsArray[1].classList.remove("is-valid");
        return false;
    }

    function validatePasswordItem (elementIndex, regexValue){
        if(regexValue.test(inputsArray[1].value)){
            flag &=true;
            document.querySelectorAll(".password-validation li")[elementIndex].classList.remove("text-danger");
            document.querySelectorAll(".password-validation li")[elementIndex].classList.add("text-success");
            document.querySelectorAll(".password-validation li i")[elementIndex].classList.add("fa-circle-check");
            document.querySelectorAll(".password-validation li i")[elementIndex].classList.remove("fa-circle-xmark");
        }
        else {
            flag &= false;
            document.querySelectorAll(".password-validation li")[elementIndex].classList.add("text-danger");
            document.querySelectorAll(".password-validation li")[elementIndex].classList.remove("text-success");
            document.querySelectorAll(".password-validation li i")[elementIndex].classList.remove("fa-circle-check");
            document.querySelectorAll(".password-validation li i")[elementIndex].classList.add("fa-circle-xmark");
        }
    }
}



