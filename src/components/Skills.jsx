import { useEffect, useState } from "react";
import "../style/skills.css";

export function Skills() {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    fetch("/src/mocks/skills.json")
      .then((response) => response.json())
      .then((data) => {
        const groupedData = data.reduce((acc, skill) => {
          const { category } = skill;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(skill);
          return acc;
        }, {});
        setSkillsData(groupedData);
      })
      .catch((error) => console.error("Error loading projects data:", error));
  }, []);

  return (
    <section>
      <div className="section-skills">
        <h2 className="title">
          {"{"}Habilidades{"}"}
        </h2>
        <p className="description">
          Estas son las habilidades que he adquirido en mi proceso de
          aprendizaje como desarrollador de software. Mis competencias abarcan
          tanto el backend como el frontend, además de áreas esenciales como las
          bases de datos y más:
        </p>

        <ol className="skills-groups-list">
          {Object.keys(skillsData).map((category, index) => (
            <div key={index}>
              <h3 className="title-skill">{category}</h3>
              <ul className="list-skill">
                {skillsData[category].map((skill) => (
                  <li key={index} className="skill">
                    <img
                      style={{ height: "1.5rem" }}
                      src={skill.image}
                      alt={skill.name}
                    />
                    <p className="name-skill">{skill.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ol>
      </div>
    </section>
  );
}
