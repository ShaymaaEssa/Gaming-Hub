//=============== Global ======================
const inputsArray = document.querySelectorAll("input");
const registerBtn = document.querySelector("#btnRegister");

let usersArr ;
if(localStorage.getItem("users")!= null){
    usersArr = JSON.parse( localStorage.getItem("users"));
}

else usersArr = [];

//=============== Events ======================
inputsArray[0].addEventListener("input",function(){
    validateName();
});

inputsArray[1].addEventListener("input", function(){
    validateEmail();
});

inputsArray[2].addEventListener("input", function(){
    validatePassword();
});

inputsArray[3].addEventListener("input",function (){
    validateRePassword();
});

inputsArray[4].addEventListener("input",function (){
    validatePhone();
});



document.querySelector("form").addEventListener("submit",function(e){
    //to prevent load of form:
    e.preventDefault();
    console.log("hello");
    setForm();
});


//=============== Functions ===================
function setForm(){
    if(validateName() && validateEmail() && validatePassword() && validateRePassword() && validatePhone() ) {
        if(validateUniqueEmail()){
            const user={
                name: inputsArray[0].value,
                email: inputsArray[1].value,
                password: inputsArray[2].value,
                rePassword: inputsArray[3].value,
                phone: inputsArray[4].value
            }
        
            // getData(user)
    
            usersArr.push(user);
            localStorage.setItem("users", JSON.stringify(usersArr));
            alert("Your account is created successfully!");
            location.href = './login.html';
            console.log(usersArr);
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

function validateName(){
    const nameRegex =  /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
    // ([\w]{3,}) the first name should contain only letters and of length 3 or more
    // +\s the first name should be followed by a space
    // +([\w\s]{3,})+ the second name should contain only letters of length 3 or more and can be followed by other names or not
    // /i ignores the case of the letters. Can be uppercase or lowercase letters

    if(nameRegex.test(inputsArray[0].value)){
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


  function validateEmail(){
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // ([\w]{3,}) the first name should contain only letters and of length 3 or more
    // +\s the first name should be followed by a space
    // +([\w\s]{3,})+ the second name should contain only letters of length 3 or more and can be followed by other names or not
    // /i ignores the case of the letters. Can be uppercase or lowercase letters

    if(emailRegex.test(inputsArray[1].value)){
        inputsArray[1].classList.add("is-valid");
        inputsArray[1].classList.remove("is-invalid");
        return true;
    }
    else{
        inputsArray[1].classList.add("is-invalid");
        inputsArray[1].classList.remove("is-valid");
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
        inputsArray[2].classList.add("is-valid");
        inputsArray[2].classList.remove("is-invalid");
        return true;
    }
    else{
        inputsArray[2].classList.add("is-invalid");
        inputsArray[2].classList.remove("is-valid");
        return false;
    }

    function validatePasswordItem (elementIndex, regexValue){
        if(regexValue.test(inputsArray[2].value)){
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


function validateRePassword (){
    if(inputsArray[2].value === inputsArray[3].value){
        inputsArray[3].classList.add("is-valid");
        inputsArray[3].classList.remove("is-invalid");
        return true;
    }
    else {
        inputsArray[3].classList.add("is-invalid");
        inputsArray[3].classList.remove("is-valid");
        return false;
    }
}

function validatePhone(){
    const pattern = new RegExp("^01[0-2,5]{1}[0-9]{8}$");
    if(pattern.test(inputsArray[4].value)){
        inputsArray[4].classList.add("is-valid");
        inputsArray[4].classList.remove("is-invalid");
        return true;
    }
    else{
        inputsArray[4].classList.add("is-invalid");
        inputsArray[4].classList.remove("is-valid");
        return false;
    }
}

function validateUniqueEmail(){
    if(usersArr.length != 0 ){
        for(let i of usersArr){
            if(i.email === inputsArray[1].value){
                alert("This account created before!");
                return false;
            }
        }
    }
    return true;
}