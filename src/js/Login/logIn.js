import { main } from "@popperjs/core";
import { DashBoard } from "../dashBoard";
import { LoginAuth } from "./loginAuth.js";

export class Login{
    constructor(){
        this.main = document.querySelector('.main')
        this.body = document.getElementsByTagName('body')[0]
        
    }
    // LOGIN PAGE
    displayLogin(){
        this.loginContainer = document.createElement('div')
        this.loginContainer.className = "text-center"
        this.body.className = 'login-body'
        
        this.loginContainer.innerHTML =`
        <div class="form-signin">
        <form>
          <img class="mb-4" src="images/content/infinityLogo.svg" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      
          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
          </div>
      
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" id="logInBtn" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
      </div>
        `
        this.main.appendChild(this.loginContainer)
        this.body.onclick = (e) => {
          if(e.target.className == this.loginContainer.className || e.target.className == this.body.className){
            console.log(this.main)
            this.main.removeChild(this.loginContainer)
            this.body.classList.remove('login-body')
            const dashboardPage = new DashBoard();
            dashboardPage.authCheck()
          }
        }
        
    }

    // LOGIN PAGE CREDENTIALS CHECK
    credentialsCheck(){
      this.loginBtn = document.getElementById('logInBtn');
        this.emailInput = document.getElementById('floatingInput');
        this.passwordInput = document.getElementById('floatingPassword');

        this.login = new LoginAuth();
        

        this.loginBtn.onclick = (e) =>{
          e.preventDefault()
          const emailValue = this.emailInput.value;
          const passwordValue = this.passwordInput.value;

          this.login.getToken(emailValue, passwordValue).then(response => {
            
            
            if(response.status == 200){
             const { data } = response
              this.main.removeChild(this.loginContainer)

              const expiryDate = new Date();
              expiryDate.setMonth(expiryDate.getMonth() + 1);
              

              this.body.classList.remove('login-body')

              const dashboardPage = new DashBoard();
              dashboardPage.addDashBoard();
              
              this.setCookie('isLoggedIn', true, expiryDate.toGMTString())
              this.setCookie('token', data, expiryDate.toGMTString())
              dashboardPage.renderDashBoard()
            }
            
          })
        }
    }
    setCookie(name, param="", maxAge=""){
      const key = name
      const value = param
      const expireAfter = maxAge

      document.cookie = `${key}=${value};path=/;expires=${expireAfter};`;
    }
    start(){
        this.displayLogin()
        this.credentialsCheck()
        
    }
}
