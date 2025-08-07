const signupBtn = document.getElementById('signup-btn');
const signinBtn = document.getElementById('signin-btn');

if (signupBtn) 
{
   signupBtn.addEventListener('click', () => 
   {
      window.location.href = 'signUp.html';
   });
}

if (signinBtn)
{
  signinBtn.addEventListener('click', () =>
   {
      window.location.href = 'signIn.html';
   });
}
