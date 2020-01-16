import React from 'react';
import { client } from '../routes/routes.json';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="text-center">
    <h1>404</h1>
    <h2>Pagina no encontrada!</h2>

    <p>
      <Link to={client.home}>Volver al Inicio.</Link>
    </p>
  </div>
);

export default NotFoundPage;