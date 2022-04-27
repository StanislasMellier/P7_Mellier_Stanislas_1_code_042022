import React from 'react';
import './css/PageNotFound.css';
function NotFoundPages() {
	return (
		<section className='section'>
			<div>
				<h1 className='title'>Erreur 404 : Page non trouvée</h1>
				<h2 className='sub-title'>
					Vérifier l'url ou retourner en arrière pour résoudre le
					problème
				</h2>
			</div>
		</section>
	);
}

export default NotFoundPages;
