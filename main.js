'use strict';

//VARIABLES
const listaProductos=document.querySelector('#listaProductos');
const input=document.querySelector('#input');
const enviar=document.querySelector('#enviar');
const borrarLista=document.querySelector('#borrarLista');
const cuerpoTabla=document.querySelector('#cuerpoTabla');
const tabla=document.querySelector('.table');
let arrayListaProductos=JSON.parse(localStorage.getItem('productos')) || [];

//EVENTOS

borrarLista.addEventListener('click',(ev)=>{
	limpiarLista();
	arrayListaProductos=[];
	input.value='';
	localStorage.removeItem('productos');
	tabla.classList.add('d-none');	
});

enviar.addEventListener('click',(ev)=>{
	if(input.value.trim().length>0){
		arrayListaProductos.push(input.value);
		limpiarLista();
		localStorage.setItem('productos',JSON.stringify(arrayListaProductos));
		agregarProductos();
		input.value='';
	}else{
		input.value='';
	}
});


input.addEventListener('keydown',(ev)=>{
		if(ev.key==='Enter'){
			const valor=input.value.trim();
			if(valor.length>0){
				arrayListaProductos.push(valor);
				limpiarLista();
				localStorage.setItem('productos',JSON.stringify(arrayListaProductos));
				agregarProductos();
				input.value='';
			}else{
				input.value='';
			}
		}	
})


cuerpoTabla.addEventListener('click',(ev)=>{

	if(ev.target.matches('.bi-trash-fill')){
		let indice=ev.target.getAttribute('data-set');
		limpiarLista();
		arrayListaProductos.splice(indice,1);
		localStorage.setItem('productos',JSON.stringify(arrayListaProductos));
		agregarProductos();
		if(arrayListaProductos.length<1){
			borrarLista.classList.add('d-none');
			tabla.classList.add('d-none');
		}
	}
})

//FUNCIONES

const limpiarLista=()=>{
	cuerpoTabla.innerHTML='';
	borrarLista.classList.add('d-none');
	cuerpoTabla.classList.remove('d-none');
}

const agregarProductos=()=>{

	const fragment=document.createDocumentFragment();
	arrayListaProductos.forEach((item,index)=>{
		const fila=document.createElement('TR');
		const elementoLista=document.createElement('TD');
		const id=document.createElement('TD');
		const iconCol=document.createElement('TD');
		const icon=document.createElement('I');
		id.textContent=`${index+1}`;
		elementoLista.textContent=`${item} `;
		icon.classList.add('bi','bi-trash-fill');
		icon.setAttribute('data-set',index);
		iconCol.append(icon);
		fila.append(id);
		fila.append(elementoLista);
		fila.append(iconCol);
		fragment.append(fila);
	});

	cuerpoTabla.append(fragment);
	tabla.classList.remove('d-none');
	borrarLista.classList.remove('d-none');
}

const init=()=>{
	if(arrayListaProductos.length>0){
		agregarProductos();
	}else{
		borrarLista.classList.add('d-none');
		cuerpoTabla.classList.add('d-none');
	}
}

init();

