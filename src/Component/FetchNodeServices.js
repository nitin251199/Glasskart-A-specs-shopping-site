import Swal from 'sweetalert2';
var ServerURL = "http://localhost:5000"
var axios = require("axios");
const getData = async(URL)=>{
    try{
        
        const response = await fetch(`${ServerURL}/${URL}`, {
        headers: { "Content-Type": "application/json;charset=utf-8", authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
          })
          if(response.status==401)
          {
            Swal.fire({
              imageUrl: '/glasskart.png',
              imageWidth:200,
              title: 'Oops...',
              text: 'Session is not Valid..',
            })
           window.location.replace("/adminlogin")
          
          }
        const result = await response.json()
        return result
    }
    catch(e){
        console.log("ERROR:",e)
        return null
    }
}

const postDataAndImage = async (url, formData, config) => {
    try {
      const response = await axios.post(`${ServerURL}/${url}`, formData, config);
      if(response.status==401)
    {
      Swal.fire({
        imageUrl: '/glasskart.png',
        imageWidth:200,
        title: 'Oops...',
        text: 'Session is not Valid..',
      })
     window.location.replace("/adminlogin")
    
    }
      const result = await response.data;
      return result;
    } catch (e) {
      console.log("Error:", e);
      alert(e);
      return null;
    }
  };
  

  const postData = async (url, body) => {
    try {
      const response = await fetch(`${ServerURL}/${url}`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json;charset=utf-8", authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
        body: JSON.stringify(body),
      });

    if(response.status==401)
    {
      Swal.fire({
        imageUrl: '/glasskart.png',
        imageWidth:200,
        title: 'Oops...',
        text: 'Session is not Valid..',
      })
     window.location.replace("/adminlogin")
    
    }
    const result = await response.json();
    return result;
    } catch (e) {
      console.log("Error:", e);
      alert(e);
      return null;
    }
  };

export {ServerURL,getData,postDataAndImage,postData}