window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".logo-container").style.opacity = 0;
  
      setTimeout(() => {
        document.querySelector(".logo-container").style.display = "none";
      }, 1000);
    }, 1000);
  });

  document.querySelectorAll('.navbar-item li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
       
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
  
      const offset = 120;
      const targetPosition = targetElement.offsetTop - offset;
  
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth' 
      });
    });
  });
  
  