// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelector("#signup-tab").addEventListener("click", function () {
//         document.querySelector("#login").classList.remove("show", "active");
//         document.querySelector("#signup").classList.add("show", "active");
//     });
//     document.querySelector("#login-tab").addEventListener("click", function () {
//         document.querySelector("#signup").classList.remove("show", "active");
//         document.querySelector("#login").classList.add("show", "active");
//     });

//     document.querySelector("#signup form").addEventListener("submit", function (e) {
//         e.preventDefault();
        
//         let name = document.querySelector("#signup-name").value;
//         let email = document.querySelector("#signup-email").value;
//         let phone = document.querySelector("#signup-phone").value;
//         let password = document.querySelector("#signup-password").value;
        
//         let user = { name, email, phone, password };
//         sessionStorage.setItem("user", JSON.stringify(user));
//         alert("Signup successful! You can now login.");
        
//         document.querySelector("#signup form").reset();
//         document.querySelector("#login-tab").click();
//     });

//     document.querySelector("#login form").addEventListener("submit", function (e) {
//         e.preventDefault();
        
//         let username = document.querySelector("#login-username").value;
//         let password = document.querySelector("#login-password").value;
//         let storedUser = JSON.parse(sessionStorage.getItem("user"));
        
//         if (storedUser && (storedUser.email === username || storedUser.phone === username) && storedUser.password === password) {
//             alert("Login successful! Welcome, " + storedUser.name);
//         } else {
//             alert("Invalid credentials. Please try again.");
//         }
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelector("#signup-tab").addEventListener("click", function () {
//         document.querySelector("#login").classList.remove("show", "active");
//         document.querySelector("#signup").classList.add("show", "active");
//     });
//     document.querySelector("#login-tab").addEventListener("click", function () {
//         document.querySelector("#signup").classList.remove("show", "active");
//         document.querySelector("#login").classList.add("show", "active");
//     });

//     document.querySelector("#signup form").addEventListener("submit", function (e) {
//         e.preventDefault();
        
//         let name = document.querySelector("#signup-name").value;
//         let email = document.querySelector("#signup-email").value;
//         let phone = document.querySelector("#signup-phone").value;
//         let password = document.querySelector("#signup-password").value;
        
//         let user = { name, email, phone, password };
//         localStorage.setItem("user", JSON.stringify(user));
//         alert("Signup successful! You can now login.");
        
//         document.querySelector("#signup form").reset();
//         document.querySelector("#login-tab").click();
//     });

//     document.querySelector("#login form").addEventListener("submit", function (e) {
//         e.preventDefault();
        
//         let username = document.querySelector("#login-username").value;
//         let password = document.querySelector("#login-password").value;
//         let storedUser = JSON.parse(localStorage.getItem("user"));
        
//         if (storedUser && (storedUser.email === username || storedUser.phone === username) && storedUser.password === password) {
//             alert("Login successful! Welcome, " + storedUser.name);
//         } else {
//             alert("Invalid credentials. Please try again.");
//         }
//     });
// });



document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#signup-tab").addEventListener("click", function () {
        document.querySelector("#login").classList.remove("show", "active");
        document.querySelector("#signup").classList.add("show", "active");
    });
    document.querySelector("#login-tab").addEventListener("click", function () {
        document.querySelector("#signup").classList.remove("show", "active");
        document.querySelector("#login").classList.add("show", "active");
    });

    document.querySelector("#signup form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        let name = document.querySelector("#signup-name").value;
        let email = document.querySelector("#signup-email").value;
        let phone = document.querySelector("#signup-phone").value;
        let password = document.querySelector("#signup-password").value;
        
        let user = { name, email, phone, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Signup successful! You can now login.");
        
        document.querySelector("#signup form").reset();
        document.querySelector("#login-tab").click();
    });

    document.querySelector("#login form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        let username = document.querySelector("#login-username").value;
        let password = document.querySelector("#login-password").value;
        let storedUser = JSON.parse(localStorage.getItem("user"));
        
        if (storedUser && (storedUser.email === username || storedUser.phone === username) && storedUser.password === password) {
            alert("Login successful! Welcome, " + storedUser.name);
            window.location.href = "http://127.0.0.1:5000/";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});
