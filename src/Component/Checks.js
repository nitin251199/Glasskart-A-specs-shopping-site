import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function isEmpty(txt) {
    if(txt.length === 0)
    { return true }
    else
    { return false }

}

function isAlphabets(txt)
{ if(/^[a-z A-Z]+/.test(txt))
    {return true}
    else
    {return false}

}

function isDigits(txt)
{ if(/^[0-9]+/.test(txt))
    {return true}
    else
    {return false}

}

function isMobile(txt)
{ 
    if(/^[0-9]{10}/.test(txt))
    {return true}
    else
    {return false}

}

function isEmail(txt)
 {
   if(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(txt))
    {
       return true
    }
    else
    {return false}
}

function checkEmail(txt)
{if(checkRequire(txt))
 { var reg= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(reg.test(txt)==false)
    {return false}
    else
    {return true}
}
else
{return false}

 }

function errorMessage(message){
    toast.error(`❕❕ ${message}`, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        });
}

function checkRequire(txt){
    if(txt.length==0 || txt.indexOf(' ') == 0 )
    { 
    return false }
    else
    { 
    return true}
}

function isBlank(txt)
{ if(txt.length==0)
    return true
  else 
    return false
}
function checkPassword(txt){
    if(txt.length<=5)
    return false
    else
    return true
}

function checkUserPassword(txt){
    var reg=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    if(reg.test(txt)==false)
    return false
    else
    return true
}

function checkPin(txt){
    var reg=/^[0-9]{6}$/
    //Alert.alert('cc '+reg.test(txt))
    if(reg.test(txt)==false)
     return false
     else
     return true
}


function checkMobile(txt){
  var reg=/^[0-9]{10}$/
       //Alert.alert('cc '+reg.test(txt))
       if(reg.test(txt)==false)
        return false
        else
        return true
    
    }

 function checkPhone(txt){
        var reg=/^[0-9]+$/
             //Alert.alert('cc '+reg.test(txt))
             if(reg.test(txt)==false)
              return false
              else
              return true
          
      }

      function checkGst(txt){
        var reg=/[a-zA-Z0-9]{15}/
             //Alert.alert('cc '+reg.test(txt))
             if(reg.test(txt)==false)
              return false
              else
              return true
          
          }



export {isEmpty,isAlphabets,isEmail,isMobile,isDigits,errorMessage,checkEmail,checkRequire}