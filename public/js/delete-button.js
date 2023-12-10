// deleteProduct.js

document.addEventListener('DOMContentLoaded', () => {
    const deleteProductButtons = document.querySelectorAll('[id^="deleteProductButton-"]');
  
    deleteProductButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        event.preventDefault(); // Evita la recarga de la página
        console.log('Click en el botón de eliminar'); //prueba
  
        const productId = button.getAttribute('data-product-id');
        const confirmed = confirm('¿Estás seguro de que quieres eliminar este producto?');
  
        if (confirmed) {
          try {
            const response = await fetch(`/admin/delete/${productId}`, {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json',
              },
            });
  
            if (response.ok) {
              // Manejar la respuesta exitosa, por ejemplo, redirigir a una página diferente
              window.location.href = `/admin?mensaje=Producto Borrado`;
            } else {
              console.error('Error al eliminar el producto:', response.statusText);
              // Puedes manejar el error de otra manera, por ejemplo, mostrar un mensaje de error
            }
          } catch (error) {
            console.error('Error al eliminar el producto:', error);
            // Puedes manejar el error de otra manera, por ejemplo, mostrar un mensaje de error
          }
        }
      });
    });
  });
  
  