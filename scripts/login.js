firebase.initializeApp({
  
    apiKey: "AIzaSyCMDAwseSbFj81N62ZXTfGmNRmmeB02gR8",
    authDomain: "coin-hunter-6ea16.firebaseapp.com",
    databaseURL: "https://coin-hunter-6ea16-default-rtdb.firebaseio.com",
    projectId: "coin-hunter-6ea16",
    storageBucket: "coin-hunter-6ea16.appspot.com",
    messagingSenderId: "925725828068",
    appId: "1:925725828068:web:e53217b4d86e910395ddf1",
    measurementId: "G-W27PHNHYRS"
});
    
var db = firebase.firestore();

function guardar() {
    var email = document.getElementById("name").value;
    var password = document.getElementById("last").value;
    var usuario = document.getElementById("usuario").value;
  
    db.collection("registro").add({
      Email: email,
      Password: password,
      usuario: usuario,
      puntaje: 0
    })
    .then((docRef) => {
        swal("Registro exitoso!",{ icon:"success"});
        // Almacenar el nombre de usuario y puntaje en el almacenamiento local
        localStorage.setItem("nombreUsuario", usuario);
        localStorage.setItem("puntajeUsuario", 0);
        // Redirigir al usuario a la página "index.html"
        setTimeout(function() {
          window.location.href = "index.html";
        }, 6000);
    })
    .catch((error) => {
        swal("Oops", "Error de registro", "error");
    });
  }
  


//-------------------------- Inicio de Sesion ---------------------------------------//
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("last").value;
  
    db.collection("registro")
      .where("usuario", "==", usuario)
      .where("password", "==", contraseña)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
            swal("Credenciales Incorrectas", "Vuelve a intentarlo", "error");
        } else {
          querySnapshot.forEach((doc) => {
            var datosUsuario = doc.data();
            var puntaje = datosUsuario.puntaje;
  
            swal("Registro exitoso!",{ icon:"success"});
  
            // Guardar el nombre de usuario y puntaje en el almacenamiento local
            localStorage.setItem("nombreUsuario", usuario);
            localStorage.setItem("puntajeUsuario", puntaje);
  
            // Redirigir al usuario a la página principal (index.html)
            setTimeout(function() {
                window.location.href = "index.html";
              }, 4000);
          });
        }
      })
      .catch((error) => {
        swal("Error al iniciar sesión", error, "error");
      });
}

var docId;

//----------------------------------- Sumar Puntajes ---------------------------//
function guardarPuntaje() {
  
    var nombreUsuario = document.getElementById("usuario").innerText;
    var nuevoPuntaje = parseInt(document.getElementById("puntaje").innerText);
  
    db.collection("registro")
      .where("usuario", "==", nombreUsuario)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var docId = doc.id;
          var puntajeActual = doc.data().puntaje;
  
            if (puntajeActual >= -10) {
                var puntajeTotal = (puntajeActual - 10) + nuevoPuntaje;
  
            db.collection("registro")
                .doc(docId)
                .update({
                    puntaje: puntajeTotal
                })
                .then(() => {
                    swal("Genial!","Tu puntaje ha sido guardado","success");
                    localStorage.setItem("docId", docId);
                })
                .catch((error) => {
                    swal("Error al guardar el puntaje:", error, "error");
                });
            } 
            else {
                swal("Oh no", "Tu puntaje es muy bajo, para no perjucarte no se guardará","info")
          }
        });
      })
      .catch((error) => {
        console.log("Error al obtener el documento:", error);
      });
}
  
function mostrarPuntaje() {
    var docId = localStorage.getItem("docId");
  
    if (docId) {
      db.collection("registro")
        .doc(docId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            var puntaje = doc.data().puntaje;
            var puntajeElement = document.getElementById("score");
            puntajeElement.innerText = "Tienes en total " + puntaje + " monedas" ;

            if (puntaje >= 100000){
                var footer = document.getElementById("email");
                footer.innerHTML = '<a href="https://t.me/coinn_hunter" class="premio" target="_blank">Solicitar Premio</a>';
            }
          }
        })
        .catch((error) => {
          console.log("Error al obtener el puntaje:", error);
        });
    }
  }
  
mostrarPuntaje();

