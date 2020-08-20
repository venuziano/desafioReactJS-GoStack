import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository = {
      title: `Desafio Node.js ${Date.now()}`,
	    url: "https://github.com/venuziano/Proffys",
	    techs: [
        "ReactJS",
        "React Native",
        "TypeScript",
        "Node.js",
	    ],
    }

    const response = await api.post('/repositories', repository);

    const newRepository = response.data;
    
    setRepositories([... repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories([...response.data]);
    });
  }, []);

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>    
    </div>
  );
}

export default App;
