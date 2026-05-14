import { useEffect, useState } from "react";

function NavigationPortfolio(){
  const [active, setActive] = useState("home");

  const listMenu = [
    { id: "home", icon: "fa-solid fa-house", label: "Home" },
    { id: "projects", icon: "fa-solid fa-laptop-code", label: "Projects" },
    { id: "certificate", icon: "fa-solid fa-award", label: "Certificate" },
    { id: "skills", icon: "fa-solid fa-code", label: "Skills" },
  ]

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
    
  return(
    <>
      {listMenu.map((list) => (
        <li key={list.id}>
          <a
            href={`#${list.id}`}
            className={active === list.id ? "active" : ""}
            onClick={() => setActive(list.id)}>
            <i className={list.icon}></i>
            <p>{list.label}</p>
          </a>
        </li>
      ))}
    </>
  )
}

export default NavigationPortfolio;