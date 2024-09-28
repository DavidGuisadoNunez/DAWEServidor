// Inicializaremos un do-while ya que tenemos un límite de oportunidades (mientras que las oportunidades sean mayor que 0).
do 
{

    // Declaro e inicializo dos variables a y b. Queremos adivinar el número de la variable a.
    let a = 42;
    let b = 40;

    // Realizamos un for ya que tenemos 6 oportunidades(hasta que las oportunidades se conviertan en cero).
    for (var i = 6; i >= 0; i--) 
    {
        // Si el número que queremos adivinar es más alto, tendremos que poner que pruebe con un número más alto.
        if (a > b) 
        {
            console.log('Pruebe con un número más alto');
        } 

        // Si el número que queremos adivinar es más bajo, tendremos que poner que pruebe con un número más bajo.
        else if (b > a) 
        {
            console.log('Pruebe con un número más bajo');
        } 
        // Y si no ocurren ninguna de las dos, las oportunidades se convierten en 0 porque lo has adivinado y sales del bucle controlado.
        else 
        {
            i = 0;
            console.log('Correcto. Lo has adivinado!!!');
            break;
        }
        // Muestra en consola el número de intenros permitidos restantes.
        console.log('Te quedan ' + i + ' intentos.');
    }
} 
// Cuando las oportunidades sean 0, sale del bucle.
while (i > 0);