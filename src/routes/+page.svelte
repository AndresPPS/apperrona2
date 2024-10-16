<script>

    import { onMount } from "svelte"

    let tarea = ""
    let lista_de_tareas = [
       
    ]
    
    onMount (()=>{
        obtenerDatos()
    })


    async function obtenerDatos(){
let response = await fetch("/api/obtenerDatos")
let datos = await response.json()
        
lista_de_tareas = datos
    
}
    async function agregarTarea(){
        if (tarea.length === 0) {
            alert("Pusiste una tarea vacia")
        } else {
            let response = await fetch ("/api/agregarTarea", {
                method: "POST",
                header:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre_tarea: tarea,
                    completado: false 
                })
            })


          
        }
    }
    async function eliminarTareas(id){
        alert("Eliminando")
    let response = await fetch ("/api/eliminartarea", {
                method: "DELETE",
                header:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {id:id}
                )
            })
            obtenerDatos()
   }
   async function completarTarea(tarea){
        let response = await fetch ("/api/completartarea", {
                method: "POST",
                header:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {id:tarea.id,
                    completado:tarea.completado
                    }
                )
            })
            obtenerDatos()
        }

    let isChecked = false

</script>
<main>
<h1>
    Lista de tareas
</h1>
<input type="text" placeholder="Escribe una tarea aqui" bind:value={tarea}>
<button on:click={agregarTarea}>Agregar</button>
<ul>
    {#each lista_de_tareas as tarea, indice}
    <li>
        {indice}
        <input type="checkbox" bind:checked={tarea.completado}
        on:change={()=>completarTarea(tarea)}> 

        <span class:completado={tarea.completado}> {tarea.nombre_tarea} {tarea.id}</span>
       
        <button class="container" on:click={()=>eliminarTareas(tarea.id)}>
            Eliminar
        </button>
    </li>
   
    
    {/each}
</ul>
</main>
<button on:click={obtenerDatos}>Obtener datos</button>

{#each lista_de_tareas as tarea}
        {tarea.nombre_tarea}
        {tarea.completado}
{/each}
<style>
    main {
        max-width: 400px;
        margin:0 auto;
        padding: 1em;
        text-align: center;
    }

    input[type="text"]{
        width: calc()100%-100px;
        padding: 0.5rem;
        margin-right: 0.5rem;
    }

    button{
        padding: 0.5rem;
        background-color: #6200ea;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 4px;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
    }

    .completado {
        text-decoration: line-through;
        background-color: #888;
    }

    button:hover {
        background-color: #3700b3;
    }

    input[type="checkbox"]{
        margin-right: 10px;
    }

    ul{
        list-style-type: none;
    }

    button{        
        background-color:#866fa57d;
        color: rgb(34, 33, 32);
    }
    .container{        
        background-color:#ceb02a7d;
        color: rgb(34, 33, 32);
    }
</style>




