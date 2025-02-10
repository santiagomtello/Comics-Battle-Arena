class Añadir extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        /* Diseño general */
        :host {
            display: block;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9fafb;
            padding: 40px;
            box-sizing: border-box;
        }

        h1 {
            font-size: 2em;
            color: #333;
            text-align: center;
            margin-bottom: 20px;
            font-weight: 700;
        }

        button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-size: 1.1em;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.3s ease;
            width: 100%;
        }

        button:hover {
            background-color: #45a049;
        }

        .cuadrado {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            display: none; /* Inicialmente oculto */
            background: linear-gradient(135deg, #f3f4f7 0%, #ffffff 100%);
        }

        label {
            font-size: 1.1em;
            margin-bottom: 10px;
            display: block;
            color: #333;
            font-weight: 500;
        }

        input[type="text"], select {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border-radius: 8px;
            border: 1px solid #ddd;
            font-size: 1em;
            background-color: #f9fafb;
            transition: all 0.3s ease;
        }

        input[type="text"]:focus, select:focus {
            border-color: #4CAF50;
            outline: none;
        }

        .hero-card {
            display: inline-block;
            background-color: #fff;
            border-radius: 12px;
            padding: 16px;
            margin: 16px;
            width: 280px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
            border: 1px solid #f0f0f0;
        }

        .hero-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .hero-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 15px;
        }

        .hero-card h2 {
            margin: 12px 0;
            font-size: 1.4em;
            color: #444;
            font-weight: 600;
        }

        .hero-card p {
            font-size: 0.9em;
            color: #777;
        }

        .hero-card p strong {
            color: #4CAF50;
        }

        #hero-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        /* Estilos del modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro */
            padding-top: 100px;
        }

        .modal-content {
            background-color: #fff;
            margin: 5% auto;
            padding: 30px;
            border-radius: 12px;
            width: 80%;
            max-width: 600px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .close {
            color: #aaa;
            font-size: 30px;
            font-weight: bold;
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
        }

        .modal img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .modal h2 {
            font-size: 2em;
            color: #333;
        }

        .modal p {
            font-size: 1em;
            color: #555;
        }

        /* Estilo para pantallas más pequeñas */
        @media (max-width: 768px) {
            .cuadrado {
                width: 90%;
            }

            .hero-card {
                width: 100%;
                margin: 10px 0;
            }

            button {
                font-size: 1.1em;
            }
        }
        </style>

        <h1>Comics Battle Arena</h1>

        <button id="toggle-form">Añadir Héroe</button>

        <!-- Formulario para crear un héroe -->
        <div class="cuadrado" id="hero-form">
            <!-- Selector de héroes -->
            <div id="hero-selector">
                <label for="id-select">Selecciona un héroe</label>
                <select id="id-select">
                    <option value="">Seleccionar</option>
                </select>
            </div>

            <label for="nombre">Nombre del Héroe</label>
            <input type="text" id="nombre" placeholder="Ejemplo: Iron Man">

            <label for="descripcion">Descripción</label>
            <input type="text" id="descripcion" placeholder="Ejemplo: Héroe de Marvel">

            <label for="imagen">Imagen del Héroe</label>
            <input type="text" id="imagen" placeholder="URL de la imagen">

            <label for="universe-select">Universo</label>
            <select id="universe-select">
                <option value="marvel">Marvel</option>
                <option value="dc">DC</option>
            </select>

            <button id="submit">Añadir Héroe</button>
            <button id="update">Actualizar Héroe</button>
            <button id="delete">Eliminar Héroe</button>
        </div>

        <!-- Filtro por Universo -->
        <label for="universo-filter">Filtrar por Universo</label>
        <select id="universo-filter">
            <option value="">Seleccionar Universo</option>
            <option value="marvel">Marvel</option>
            <option value="dc">DC</option>
        </select>

        <!-- Contenedor de Héroes -->
        <div id="hero-container"></div>

        <!-- Modal de Información -->
        <div id="hero-modal" class="modal">
            <div class="modal-content">
                <span id="close-modal" class="close">&times;</span>
                <h2 id="modal-hero-name"></h2>
                <img id="modal-hero-img" src="" alt="" />
                <p id="modal-hero-description"></p>
                <p><strong>Universo:</strong> <span id="modal-hero-universe"></span></p>
            </div>
        </div>
        `;

        // Referencias a los elementos
        this.shadowRoot.querySelector('#submit').addEventListener('click', () => this.addHero());
        this.shadowRoot.querySelector('#update').addEventListener('click', () => this.updateHero());
        this.shadowRoot.querySelector('#delete').addEventListener('click', () => this.deleteHero());
        this.shadowRoot.querySelector('#universo-filter').addEventListener('change', () => this.retrieveHeroes());
        this.shadowRoot.querySelector('#toggle-form').addEventListener('click', () => this.toggleForm());
        this.shadowRoot.querySelector('#id-select').addEventListener('change', () => this.populateFields());

        // Evento para cerrar el modal
        this.shadowRoot.querySelector('#close-modal').addEventListener('click', () => this.closeModal());

        this.retrieveHeroes(); // Cargar todos los héroes al inicio
    }

    toggleForm() {
        const form = this.shadowRoot.querySelector('#hero-form');
        form.style.display = form.style.display === 'block' ? 'none' : 'block';
    }

    addHero() {
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const descripcion = this.shadowRoot.querySelector('#descripcion').value;
        const imagen = this.shadowRoot.querySelector('#imagen').value;
        const universo = this.shadowRoot.querySelector('#universe-select').value;

        if (!nombre || !descripcion || !imagen) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const hero = { nombre, descripcion, imagen, universo };

        fetch('http://localhost:3000/heroes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hero)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.retrieveHeroes(); // Actualizar la lista después de agregar un nuevo héroe
            this.clearFields(); // Limpiar los campos de entrada
            alert("Héroe añadido exitosamente.");
        })
        .catch(error => console.error('Error:', error));
    }

    updateHero() {
        const id = this.shadowRoot.querySelector('#id-select').value;
        if (!id) {
            alert("Por favor, seleccione un héroe para actualizar.");
            return;
        }

        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const descripcion = this.shadowRoot.querySelector('#descripcion').value;
        const imagen = this.shadowRoot.querySelector('#imagen').value;
        const universo = this.shadowRoot.querySelector('#universe-select').value;

        if (!nombre || !descripcion || !imagen) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const hero = { nombre, descripcion, imagen, universo };

        fetch(`http://localhost:3000/heroes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hero)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.retrieveHeroes(); // Actualizar la lista después de actualizar un héroe
            alert("Héroe actualizado exitosamente.");
        })
        .catch(error => console.error('Error:', error));
    }

    deleteHero() {
        const id = this.shadowRoot.querySelector('#id-select').value;
        if (!id) {
            alert("Por favor, seleccione un héroe para eliminar.");
            return;
        }

        fetch(`http://localhost:3000/heroes/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.retrieveHeroes(); // Actualizar la lista después de eliminar un héroe
            alert("Héroe eliminado exitosamente.");
        })
        .catch(error => console.error('Error:', error));
    }

    retrieveHeroes() {
        const universoFilter = this.shadowRoot.querySelector('#universo-filter').value;
        let url = 'http://localhost:3000/heroes';
        
        if (universoFilter) {
            url += `?universo=${universoFilter}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(heroes => {
                const heroContainer = this.shadowRoot.querySelector('#hero-container');
                heroContainer.innerHTML = ''; // Limpiar héroes existentes

                if (heroes.length === 0) {
                    heroContainer.innerHTML = '<p>No se encontraron héroes.</p>';
                } else {
                    heroes.forEach(hero => {
                        heroContainer.innerHTML += this.generateHeroCard(hero);
                    });
                }

                const heroSelect = this.shadowRoot.querySelector('#id-select');
                heroSelect.innerHTML = '<option value="">Seleccione un héroe</option>'; // Limpiar opciones previas
                heroes.forEach(hero => {
                    heroSelect.innerHTML += `<option value="${hero.id}">${hero.nombre}</option>`;
                });
            })
            .catch(error => console.error('Error:', error));
    }

    generateHeroCard(hero) {
        return `
            <div class="hero-card" data-id="${hero.id}">
                <img src="${hero.imagen}" alt="${hero.nombre}">
                <h2>${hero.nombre}</h2>
                <p>${hero.descripcion}</p>
                <p><strong>Universo:</strong> ${hero.universo}</p>
            </div>
        `;
    }

    populateFields() {
        const id = this.shadowRoot.querySelector('#id-select').value;
        if (!id) return;

        fetch(`http://localhost:3000/heroes/${id}`)
            .then(response => response.json())
            .then(hero => {
                this.shadowRoot.querySelector('#nombre').value = hero.nombre;
                this.shadowRoot.querySelector('#descripcion').value = hero.descripcion;
                this.shadowRoot.querySelector('#imagen').value = hero.imagen;
                this.shadowRoot.querySelector('#universe-select').value = hero.universo;
            })
            .catch(error => console.error('Error:', error));
    }

    clearFields() {
        this.shadowRoot.querySelector('#nombre').value = '';
        this.shadowRoot.querySelector('#descripcion').value = '';
        this.shadowRoot.querySelector('#imagen').value = '';
    }

    openModal(heroId) {
        // Obtener la información del héroe y mostrarla en el modal
        fetch(`http://localhost:3000/heroes/${heroId}`)
            .then(response => response.json())
            .then(hero => {
                this.shadowRoot.querySelector('#modal-hero-name').textContent = hero.nombre;
                this.shadowRoot.querySelector('#modal-hero-img').src = hero.imagen;
                this.shadowRoot.querySelector('#modal-hero-description').textContent = hero.descripcion;
                this.shadowRoot.querySelector('#modal-hero-universe').textContent = hero.universo;
                
                // Mostrar el modal
                this.shadowRoot.querySelector('#hero-modal').style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    }

    closeModal() {
        this.shadowRoot.querySelector('#hero-modal').style.display = 'none';
    }

    connectedCallback() {
        this.retrieveHeroes();
        
        // Evento para abrir el modal cuando se hace clic en una card
        this.shadowRoot.querySelector('#hero-container').addEventListener('click', (event) => {
            if (event.target.closest('.hero-card')) {
                const heroId = event.target.closest('.hero-card').getAttribute('data-id');
                this.openModal(heroId);
            }
        });
    }
}

customElements.define('main-page', Añadir);
